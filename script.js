// Animate stars
function createStars(count) {
  const container = document.getElementById("stars-bg");
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDuration = (1 + Math.random() * 4) + "s";
    star.style.animationDelay = Math.random() * 4 + "s";
    container.appendChild(star);
  }
}
createStars(100);

// Countdown timer (to June 20, 2025)
function updateCountdown() {
  const endTime = moment("2025-06-20 23:59:59");
  const now = moment();
  const diff = moment.duration(endTime.diff(now));
  if (diff.asMilliseconds() > 0) {
    document.getElementById("countdown").textContent =
      "Ends in: " + diff.days() + "d " + diff.hours() + "h " +
      diff.minutes() + "m " + diff.seconds() + "s";
  } else {
    document.getElementById("countdown").textContent = "Leaderboard ended.";
  }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Load leaderboard data from Google Sheets CSV
const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQLuX2Ta2veASjc85NnEfOIDXXKzVUGm9m-ag_ubn202I8nxmq27_B3UoNS2_h8yEzuVQWOKTP4yKVj/pub?gid=0&single=true&output=csv";

fetch(csvUrl)
  .then(response => response.text())
  .then(text => {
    const rows = text.trim().split("\n").slice(1); // skip header
    const data = rows.map(row => row.split(","));
    const sorted = data.sort((a, b) => +b[2] - +a[2]); // sort by wager amount

    const tbody = document.querySelector("#leaderboard tbody");
    sorted.forEach((row, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>#${i + 1}</td>
        <td>${row[1]}</td>
        <td>$${row[2]}</td>
        <td>${row[3]}</td>`;
      tbody.appendChild(tr);
    });
  });
