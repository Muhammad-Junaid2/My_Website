// ---------- Dark mode toggle ----------
const darkModeBtn = document.getElementById("darkModeToggle");

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  darkModeBtn.textContent = isDark ? "☀️" : "🌙";
});

// ---------- Terminal typing effect ----------
const typedLine = document.getElementById("typedLine");
const linesToType = [
  "print('Hello, I build things in Python.')",
  "from portfolio import projects",
  "status = 'open to Python developer roles'"
];
let lineIndex = 0;
let charIndex = 0;

function typeLoop() {
  const current = linesToType[lineIndex];

  if (charIndex <= current.length) {
    typedLine.textContent = current.slice(0, charIndex);
    charIndex++;
    setTimeout(typeLoop, 45);
  } else {
    setTimeout(() => {
      charIndex = 0;
      lineIndex = (lineIndex + 1) % linesToType.length;
      typeLoop();
    }, 1800);
  }
}

typeLoop();

// ---------- Fetch #1: GitHub live stats ----------
const githubData = document.getElementById("githubData");
const githubBtn = document.getElementById("githubBtn");

function loadGithubStats() {
  githubData.textContent = "Loading…";

  fetch("https://api.github.com/users/Muhammad-Junaid2")
    .then((res) => {
      if (!res.ok) throw new Error("GitHub request failed");
      return res.json();
    })
    .then((data) => {
      githubData.textContent =
        `${data.public_repos} public repos · ${data.followers} followers on GitHub`;
    })
    .catch(() => {
      githubData.textContent = "Couldn't reach GitHub right now — try again in a moment.";
    });
}

githubBtn.addEventListener("click", loadGithubStats);
loadGithubStats();

// ---------- Fetch #2: Random developer joke ----------
const quoteData = document.getElementById("quoteData");
const quoteBtn = document.getElementById("quoteBtn");

function loadJoke() {
  quoteData.textContent = "Loading…";

  fetch("https://official-joke-api.appspot.com/random_joke")
    .then((res) => {
      if (!res.ok) throw new Error("Joke request failed");
      return res.json();
    })
    .then((data) => {
      quoteData.textContent = `${data.setup} — ${data.punchline}`;
    })
    .catch(() => {
      quoteData.textContent = "Couldn't fetch a joke right now — try again in a moment.";
    });
}

quoteBtn.addEventListener("click", loadJoke);
loadJoke();

// ---------- Bonus: smooth scroll for nav links ----------
document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
