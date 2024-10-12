document.querySelectorAll('.bubble-button, .download-button').forEach(button => {
    button.addEventListener('mouseover', (e) => {
        e.preventDefault();
        e.target.classList.toggle("animate");
        setTimeout(function() {
            e.target.classList.toggle("animate");
        }, 750);
    }, false);
});
