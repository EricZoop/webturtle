import pandas as pd
import pickle
import re
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score

class PhishingDetector:
    def preprocess_text(self, text):
        if pd.isnull(text):
            return ''
        text = str(text)
        text = text.lower()
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        tokens = word_tokenize(text)
        stop_words = set(stopwords.words('english'))
        additional_stop_words = ['mailto', 'subject', 'from', 'to']
        stop_words.update(additional_stop_words)
        tokens = [word for word in tokens if word not in stop_words]
        return ' '.join(tokens)

    def train_classifier(self, csv_file):
        try:
            data = pd.read_csv(csv_file, encoding='latin1')
        except FileNotFoundError:
            print("Error: File not found.")
            return None
        except UnicodeDecodeError:
            print("Error: Unable to decode the file using 'latin1' encoding.")
            return None

        X_column = data.columns[1]
        y_column = data.columns[0]
        X = data[X_column]
        y = data[y_column]

        # Create a pipeline for text preprocessing and model training
        pipeline = Pipeline([
            ('tfidf', TfidfVectorizer(preprocessor=self.preprocess_text, min_df=5, max_df=0.8)),
            ('scaler', StandardScaler(with_mean=False)),
            ('classifier', LogisticRegression(penalty='l2', max_iter=1000, n_jobs=-1))
        ])

        # Perform cross-validation
        cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
        accuracy = cross_val_score(pipeline, X, y, cv=cv, scoring='accuracy')
        precision = cross_val_score(pipeline, X, y, cv=cv, scoring='precision_macro')
        recall = cross_val_score(pipeline, X, y, cv=cv, scoring='recall_macro')
        f1 = cross_val_score(pipeline, X, y, cv=cv, scoring='f1_macro')
        roc_auc = cross_val_score(pipeline, X, y, cv=cv, scoring='roc_auc')

        print("Cross-Validation Results:")
        print(f"Accuracy: {accuracy.mean():.4f} ± {accuracy.std():.4f}")
        print(f"Precision: {precision.mean():.4f} ± {precision.std():.4f}")
        print(f"Recall: {recall.mean():.4f} ± {recall.std():.4f}")
        print(f"F1-score: {f1.mean():.4f} ± {f1.std():.4f}")
        print(f"ROC-AUC: {roc_auc.mean():.4f} ± {roc_auc.std():.4f}")

        # Fit the final model
        pipeline.fit(X, y)

        return pipeline

if __name__ == "__main__":
    detector = PhishingDetector()
    trained_pipeline = detector.train_classifier('Phish Hook Email Bodies V2.csv')

    # Save the trained pipeline
    with open('phish_hook_classifier.pkl', 'wb') as file:
        pickle.dump(trained_pipeline, file)