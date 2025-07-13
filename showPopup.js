function showPopup(isOnline) {
  const popup = document.getElementById('offline-popup');
  popup.classList.remove('popup-hidden');
  popup.classList.add('popup-visible');
  const statusHeadline = popup.querySelector('h2');
  const statusMessage = popup.querySelector('p');
  const kickStatus = popup.querySelector('.kick-status .status-text strong');
  if (isOnline) {
    statusHeadline.textContent = 'Status';
    statusMessage.textContent = 'The stream is online.';
    kickStatus.textContent = 'Currently Online';
    kickStatus.style.color = '#00ff88';
  } else {
    statusHeadline.textContent = 'Status';
    statusMessage.textContent = 'The stream is offline.';
    kickStatus.textContent = 'Currently Offline';
    kickStatus.style.color = '#ff5555';
  }
}

// Example usage: showPopup(true) for online, showPopup(false) for offline
