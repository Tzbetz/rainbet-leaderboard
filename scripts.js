// Scattered Rainbet logos
document.addEventListener('DOMContentLoaded', function() {
  var bgLogoContainer = document.getElementById('rainbet-bg-logos');
  if (!bgLogoContainer) return;
  var cols = 6;
  var rows = 3;
  var total = cols * rows;
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < cols; c++) {
      var img = document.createElement('img');
      img.src = 'icons/rainbet.png';
      img.alt = 'Rainbet Logo';
      img.style.width = '70px';
      img.style.height = 'auto';
      img.style.borderRadius = '12px';
      img.style.boxShadow = '0 0 12px #FFD60044';
      img.style.opacity = '0.18';
      img.style.zIndex = 0;
      img.style.gridColumn = (c+1);
      img.style.gridRow = (r+1);
      img.style.justifySelf = 'center';
      img.style.alignSelf = 'center';
      img.style.transform = 'rotate(' + (Math.random()*360).toFixed(0) + 'deg)';
      bgLogoContainer.appendChild(img);
    }
  }
});
// Rain bubble animation logic
document.addEventListener('DOMContentLoaded', function() {
  var bg = document.querySelector('.rain-bubbles-bg');
  if (!bg) return;
  function randomBetween(a, b) {
    return Math.random() * (b - a) + a;
  }
  function createBubble() {
    var bubble = document.createElement('div');
    bubble.className = 'bubble';
    var size = randomBetween(12, 38);
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = randomBetween(0, 100) + 'vw';
    bubble.style.animationDuration = randomBetween(5, 10) + 's';
    bubble.style.opacity = randomBetween(0.18, 0.38);
    // Randomize blink speed for lightning effect
    bubble.style.animationDelay = '0s, ' + randomBetween(0, 1.2).toFixed(2) + 's';
    bubble.style.animationDuration = bubble.style.animationDuration + ', ' + randomBetween(0.7, 1.7).toFixed(2) + 's';
    bg.appendChild(bubble);
    setTimeout(function() {
      bubble.remove();
    }, 11000);
  }
  setInterval(createBubble, 350);
});
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

checkStreamStatus();
setInterval(checkStreamStatus, 15000);
