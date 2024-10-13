interface PredictionResponse {
  result: string;
  background_color: string;
}

function predictPercentage(): void {
  const inputElement = document.getElementById('input_text') as HTMLTextAreaElement | null;
  
  if (!inputElement) {
    console.error('Input element not found');
    return;
  }

  const inputText = inputElement.value;
  const formData = new FormData();
  formData.append('input_text', inputText);

  fetch('/predict', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then((data: PredictionResponse) => {
    const outputContainer = document.getElementById('outputContainer');
    if (outputContainer) {
      outputContainer.textContent = data.result;
    }

    const body = document.body;
    const backgroundGradient = data.background_color;

    // Apply the background gradient to the body
    body.style.backgroundImage = backgroundGradient;
  })
  .catch(error => {
    console.error('Error:', error);
  });
}