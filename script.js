const projects = [
  {
    id: 1,
    title: "SmartCare-Clinic",
    category: "Backend",
    summary: "A clinic appointment and diagnosis system that grew from an OOP terminal project into a FastAPI application.",
    learned: "I learned SQLAlchemy ORM modeling, Alembic migrations, FastAPI session lifecycles, and Docker Compose orchestration.",
    image: "images/smartcare_clinic.webp",
    images: [
      { src: "images/smartcare_clinic.webp", alt: "SmartCare-Clinic terminal preview", width: 800, height: 500 },
      { src: "images/smartcare_clinic_api.webp", alt: "SmartCare-Clinic API preview", width: 800, height: 500 }
    ],
    alt: "SmartCare-Clinic project preview",
    repo: "https://github.com/rania-rashid/SmartCare-Clinic",
    demo: ""
  },
  {
    id: 2,
    title: "File Organizer",
    category: "Automation",
    summary: "A command-line utility that organizes files into folders by type and date while handling locked files safely.",
    learned: "I learned to use pathlib and shutil for filesystem work and built a Streamlit interface for non-terminal users.",
    image: "images/file_organizer.webp",
    width: 800,
    height: 500,
    alt: "File Organizer project preview",
    repo: "https://github.com/rania-rashid/File-Organizer",
    demo: "https://rania-file-organizer.streamlit.app/"
  },
  {
    id: 3,
    title: "FreelanceLens",
    category: "Data",
    summary: "A data analysis project exploring freelance listings, common skills, categories, and budget patterns.",
    learned: "I learned to keep fixed-price and hourly listings separate and document the limits of small samples and recorded budget ranges.",
    image: "images/freelancelens.webp",
    width: 800,
    height: 500,
    alt: "FreelanceLens project preview",
    repo: "https://github.com/rania-rashid/Freelancelens",
    demo: ""
  }
];

const root = document.documentElement;
const btn = document.querySelector("#theme-toggle");

function applyLabel() {
  const dark = root.dataset.theme === "dark";
  btn.textContent = dark ? "Light" : "Dark";
}
applyLabel();

btn.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
  applyLabel();
});

const phrases = [
  "build tools that solve real problems",
  "learn AI one step at a time",
  "turn messy data into useful answers",
  "make small ideas work"
];
const typing = document.querySelector("#typing");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion) {
  typing.textContent = phrases[0];
} else {
  let phrase = 0;
  let index = phrases[0].length;
  let deleting = true;

  function tick() {
    const full = phrases[phrase];
    typing.textContent = full.slice(0, index);
    if (!deleting && index < full.length) { index++; setTimeout(tick, 70); }
    else if (!deleting) {
      if (phrase === phrases.length - 1) return;
      deleting = true; setTimeout(tick, 1200);
    }
    else if (index > 0) { index--; setTimeout(tick, 35); }
    else { deleting = false; phrase++; setTimeout(tick, 300); }
  }

  setTimeout(tick, 1500);
}

const grid = document.querySelector("#project-grid");
const empty = document.querySelector("#empty");
const pills = document.querySelectorAll(".pill");

function renderProjects(list) {
  empty.hidden = list.length > 0;
  grid.innerHTML = list.map(p => {
    const images = p.images || [{ src: p.image, alt: p.alt, width: p.width, height: p.height }];
    const carousel = images.length > 1 ? `
      <div class="carousel" data-carousel-id="${p.id}">
        <button class="carousel-control carousel-prev" type="button" data-carousel-action="prev" aria-label="Previous ${p.title} image">‹</button>
        <button class="carousel-control carousel-next" type="button" data-carousel-action="next" aria-label="Next ${p.title} image">›</button>
        <p class="carousel-status" aria-live="polite">1 / ${images.length}</p>
      </div>` : "";
    return `
    <article class="card">
      <div class="card-media">
        <img src="${images[0].src}" alt="${images[0].alt}" width="${images[0].width}" height="${images[0].height}" loading="lazy">
        ${carousel}
      </div>
      <h3>${p.title}</h3>
      <p>${p.summary}</p>
      <p><strong>What I learned:</strong> ${p.learned}</p>
      <div class="project-links">
        <a href="${p.repo}" aria-label="${p.title} repository">View repo <span aria-hidden="true">↗</span></a>
        ${p.demo ? `<a href="${p.demo}" aria-label="${p.title} live demo">Live demo <span aria-hidden="true">↗</span></a>` : ""}
      </div>
    </article>`;
  }).join("");

  list.filter(p => p.images && p.images.length > 1).forEach(p => {
    const carousel = grid.querySelector(`[data-carousel-id="${p.id}"]`);
    const image = carousel.previousElementSibling;
    let current = 0;
    carousel.addEventListener("click", event => {
      const control = event.target.closest("[data-carousel-action]");
      if (!control) return;
      current = control.dataset.carouselAction === "next"
        ? (current + 1) % p.images.length
        : (current - 1 + p.images.length) % p.images.length;
      image.src = p.images[current].src;
      image.alt = p.images[current].alt;
      carousel.querySelector(".carousel-status").textContent = `${current + 1} / ${p.images.length}`;
    });
  });
}

pills.forEach(pill => pill.addEventListener("click", () => {
  const f = pill.dataset.filter;
  pills.forEach(x => x.setAttribute("aria-pressed", x === pill));
  renderProjects(f === "all" ? projects : projects.filter(p => p.category === f));
}));

renderProjects(projects);