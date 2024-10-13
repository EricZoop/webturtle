window.addEventListener('load', function() {
  // Get the desired scroll position (adjust this value as needed)
  var desiredScrollPosition = 35; // 500 pixels from the top

  // Scroll to the desired position
  window.scrollTo(0, desiredScrollPosition);

  // Disable scrolling
  document.body.style.overflowY = 'hidden';
});