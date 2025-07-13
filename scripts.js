async function checkStreamStatus() {
  try {
    const res = await fetch('https://your-endpoint.com/status.json?t=' + Date.now());
    const data = await res.json();
    const label = document.getElementById('status-label');

    if (data.isLive) {
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
  }
}

checkStreamStatus();
setInterval(checkStreamStatus, 15000);
