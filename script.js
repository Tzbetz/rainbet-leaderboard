// Create stars background
function createStars(count) {
const container = document.getElementById("stars-bg");
for (let i = 0; i < count; i++) {
const star = document.createElement("div");
star.classList.add("star");
star.style.left = Math.random() * 100 + "%";
star.style.top = Math.random() * 100 + "%";
star.style.animationDuration = (1 + Math.random() * 3) + "s";
star.style.animationDelay = Math.random() * 4 + "s";
container.appendChild(star);
}
}
createStars(100);

// Countdown to end of current month at 11:59 PM EST (UTC-4)
function updateCountdown() {
const now = moment().utcOffset("-04:00");
const end = moment(now).endOf('month').set({ hour: 23, minute: 59, second: 59 });

const duration = moment.duration(end.diff(now));
const days = String(duration.days()).padStart(2, '0');
const hours = String(duration.hours()).padStart(2, '0');
const minutes = String(duration.minutes()).padStart(2, '0');
const seconds = String(duration.seconds()).padStart(2, '0');

document.getElementById("countdown").textContent =
Ends in: ${days}d ${hours}h ${minutes}m ${seconds}s;

setTimeout(updateCountdown, 1000);
}
updateCountdown();

// Load leaderboard from Google Sheets
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQLuX2Ta2veASjc85NnEfOIDXXKzVUGm9m-ag_ubn202I8nxmq27_B3UoNS2_h8yEzuVQWOKTP4yKVj/pub?gid=0&single=true&output=csv';

fetch(csvUrl)
.then(response => response.text())
.then(text => {
const rows = text.trim().split('\n').slice(1);
const tbody = document.querySelector("#leaderboard tbody");
rows.forEach((row, index) => {
  const cols = row.split(',');
  const tr = document.createElement('tr');

  // Add rank number
  const rankTd = document.createElement('td');
  rankTd.textContent = `#${index + 1}`;
  tr.appendChild(rankTd);

  cols.forEach(col => {
    const td = document.createElement('td');
    td.textContent = col.replace(/^"|"$/g, '');
    tr.appendChild(td);
  });

  tbody.appendChild(tr);
});
});
