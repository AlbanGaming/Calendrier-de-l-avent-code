// --- Variables principales ---
const calendar = document.getElementById("calendar");
const codeDisplay = document.getElementById("codeDisplay");
const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");

// --- Musique ---
let isPlaying = false;
musicButton.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    musicButton.textContent = "🔇 Musique";
  } else {
    music.play();
    musicButton.textContent = "🔊 Musique";
  }
  isPlaying = !isPlaying;
});

// --- Création des 24 jours du calendrier ---
for (let i = 1; i <= 24; i++) {
  const day = document.createElement("div");
  day.classList.add("day");
  day.dataset.day = i;
  day.textContent = i;
  calendar.appendChild(day);
}

const days = document.querySelectorAll(".day");
const now = new Date();
const currentMonth = now.getMonth(); // 0 = janvier, 11 = décembre
const today = now.getDate();

// --- Vérification du mois ---
if (currentMonth !== 11) {
  codeDisplay.innerHTML = "🚫 Le calendrier n'est disponible qu'en décembre 🎅";
  days.forEach(d => d.classList.add("locked"));
} else {

  // --- Récupération des jours déjà ouverts ---
  let openedDays = JSON.parse(localStorage.getItem("openedDays")) || [];
  let firstOpenedDays = JSON.parse(localStorage.getItem("firstOpenedDays")) || [];

  // --- Morceaux de code ---
  const codeParts = {
    1: "const message = '🎄 Joyeux Noël !';",
    2: "function showMessage() {",
    3: "  console.log(message);",
    4: "  document.body.style.background = 'darkgreen';",
    5: "}",
    6: "const stars = '*'.repeat(30);",
    7: "console.log(stars);",
    8: "showMessage();",
    9: "// 🎅 Petit bonus :",
    10: "alert('Tu avances bien dans le calendrier !');",
    11: "// Tu découvriras le code complet le 24 décembre 🎁",
    24: `
      const text = document.createElement('h2');
      text.textContent = '✨ Joyeux Noël à toi, petit codeur ! ✨';
      document.body.appendChild(text);
    `
  };

  // --- Fonction pour afficher le code ---
  function showCode(day) {
    const dayEl = document.querySelector(`.day[data-day='${day}']`);

    // effet déchiré uniquement la première fois
    if (!firstOpenedDays.includes(day)) {
        dayEl.classList.add("first-open");
        setTimeout(() => dayEl.classList.add("revealed"), 50); // déclenche overlay
        firstOpenedDays.push(day);
        localStorage.setItem("firstOpenedDays", JSON.stringify(firstOpenedDays));
    }

    // glow permanent
    dayEl.classList.add("opened");

    // --- Sauvegarde dans openedDays ---
    if (!openedDays.includes(day)) {
      openedDays.push(day);
      localStorage.setItem("openedDays", JSON.stringify(openedDays));
    }

    // --- Affichage du code avec transition ---
    codeDisplay.classList.remove("visible");
    setTimeout(() => {
      codeDisplay.textContent = codeParts[day] || "💻 Code à venir...";
      codeDisplay.classList.add("visible");
    }, 300);
  }

  // --- Initialisation des jours ---
  days.forEach(dayEl => {
    const n = parseInt(dayEl.dataset.day);

    // Bloque les jours futurs
    if (n > today) {
      dayEl.classList.add("locked");
    } else {
      dayEl.addEventListener("click", () => showCode(n));
    }

    // Marque les jours déjà ouverts
    if (openedDays.includes(n)) {
      dayEl.classList.add("opened");
    }
    if (firstOpenedDays.includes(n)) {
      dayEl.classList.add("first-open", "revealed");
    }
  });
}

// --- Animation de neige ---
const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');
let flakes = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createFlakes() {
  for (let i = 0; i < 80; i++) {
    flakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      d: Math.random() + 1
    });
  }
}
createFlakes();

function drawFlakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.beginPath();
  for (let i = 0; i < flakes.length; i++) {
    let f = flakes[i];
    ctx.moveTo(f.x, f.y);
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  moveFlakes();
}

let angle = 0;
function moveFlakes() {
  angle += 0.01;
  for (let i = 0; i < flakes.length; i++) {
    let f = flakes[i];
    f.y += Math.pow(f.d, 2) + 1;
    f.x += Math.sin(angle) * 2;
    if (f.y > canvas.height) {
      flakes[i] = { x: Math.random() * canvas.width, y: 0, r: f.r, d: f.d };
    }
  }
}

setInterval(drawFlakes, 25);
