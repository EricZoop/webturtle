// Word counter
const textarea = document.getElementById('input_text') as HTMLTextAreaElement;
const wordCount = document.getElementById('wordCount') as HTMLElement;
const characterCount = document.getElementById('characterCount') as HTMLElement;

// Character counter
textarea.addEventListener('input', updateCounts);

function updateCounts(): void {
    const inputText = textarea.value.trim();
    const wordsCount = inputText === '' ? 0 : inputText.split(/\s+/).length;
    const charactersCount = inputText.length;

    const wordCountText = wordsCount === 1 ? '1 word' : `${wordsCount} words`;
    const characterCountText = charactersCount === 1 ? '1 character' : `${charactersCount} characters`;

    wordCount.textContent = wordCountText;
    characterCount.textContent = characterCountText;
}

function handleFocus(isFocused: boolean): void {
    const textarea = document.getElementById('input_text') as HTMLTextAreaElement;
    if (isFocused) {
        textarea.placeholder = '';
    } else {
        textarea.placeholder = 'Paste Suspicious Text Here...';
    }
}