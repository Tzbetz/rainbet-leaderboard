async function checkStreamStatus() {
  try {
    const res = await fetch('https://kick.com/api/v1/channels/tzbetz');
    const data = await res.json();
    const label = document.getElementById('status-label');

    if (data.livestream) {
      label.textContent = '🔴 LIVE';
      label.classList.add('live');
      label.classList.remove('offline');
    } else {
      label.textContent = '⚫ Offline';
      label.classList.add('offline');
      label.classList.remove('live');
    }
  } catch (err) {
    console.error('Stream status fetch failed:', err);
    const label = document.getElementById('status-label');
    label.textContent = '⚫ Offline';
    label.classList.add('offline');
    label.classList.remove('live');
  }
}

// Initial call + periodic refresh
checkStreamStatus();
setInterval(checkStreamStatus, 15000);
