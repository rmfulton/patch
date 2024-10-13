const removeSecondaryColumn = () => {
    const secondaryColumn = document.querySelector('#secondary');
    if (secondaryColumn) {
      secondaryColumn.style.display = 'none';
    }
  };
  
  // Run the function when the page loads
  removeSecondaryColumn();
  
  // Also run it when navigating to a new video
  const observer = new MutationObserver(removeSecondaryColumn);
  observer.observe(document.body, { childList: true, subtree: true
  });