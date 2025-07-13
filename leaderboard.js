async function fetchLeaderboard() {
  try {
    const res = await fetch('http://localhost:3000/api/leaderboard');
    const data = await res.json();

    if (!Array.isArray(data)) return;

    // Sort by wagered
    data.sort((a, b) => b.wagered - a.wagered);

    // 🥇 Top 3
    const top3 = data.slice(0, 3);
    const topIds = ['top1', 'top2', 'top3'];
    const lbPrizes = [500, 250, 150];

    top3.forEach((player, i) => {
      document.getElementById(`${topIds[i]}Name`).textContent = player.name;
      document.getElementById(`${topIds[i]}Wagered`).textContent = `${player.wagered.toLocaleString()}`;
      document.getElementById(`${topIds[i]}Prize`).textContent = `$${lbPrizes[i]}`;
    });

    // 🏁 Leaderboard (ranks start from 4)
    const tbody = document.querySelector('#fullLeaderboard tbody');
    tbody.innerHTML = '';
    const lbPrizesTable = [60, 40];
    data.slice(3).forEach((player, i) => {
      let prize = '';
      if (i < lbPrizesTable.length) {
        prize = `$${lbPrizesTable[i]}`;
      } else {
        prize = '-';
      }
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${i + 4}</td>
        <td>${player.name}</td>
        <td>${player.wagered.toLocaleString()}</td>
        <td>${prize}</td>
      `;
      tbody.appendChild(tr);
    });

  } catch (err) {
    console.error('Leaderboard load failed:', err);
  }
}

function startCountdown() {
  const targetTime = new Date();
  targetTime.setUTCHours(0, 0, 0, 0);
  targetTime.setUTCDate(targetTime.getUTCDate() + 1);

  const update = () => {
    const now = new Date();
    const diff = targetTime - now;
    const hrs = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
    const mins = Math.floor((diff / (1000 * 60)) % 60).toString().padStart(2, '0');
    const secs = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
    document.querySelector('#countdown span').textContent = `${hrs}:${mins}:${secs}`;
  };

  update();
  setInterval(update, 1000);
}

function showPreviousWinners() {
  document.getElementById("winnerModal").style.display = "flex";
  document.getElementById("winnerList").innerHTML = `
    <ul>
      <li>March: Player A - $100</li>
      <li>April: Player B - $200</li>
    </ul>`;
}

function closeWinnerModal() {
  document.getElementById("winnerModal").style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {
  fetchLeaderboard();
  startCountdown();
});
