// 1. Obtener repos públicos desde GitHub
export async function getGitHubRepos(username) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!res.ok) throw new Error("No se pudieron obtener los repositorios");
    const all = await res.json();
    return all.filter(repo => !repo.fork && !repo.private);
  } catch (error) {
    console.error("Error al cargar los repositorios:", error);
    return [];
  }
}

// 2. Obtener portfolio.config.json de cada repo (si existe)
async function fetchRepoConfig(repo) {
  const configUrl = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/main/portfolio.config.json`;

  try {
    const res = await fetch(configUrl);
    if (!res.ok) throw new Error("No existe config");
    return await res.json();
  } catch (err) {
    return null;
  }
}


const defaultBanners = [
  "../assets/img/banners/banner1.png",
  "../assets/img/banners/banner2.png",
  "../assets/img/banners/banner3.png",
  "../assets/img/banners/banner4.png",
  "../assets/img/banners/banner5.png"
];

export async function renderProjects(repos, lang = "es") {
  const projectContainer = document.querySelector(".row");
  projectContainer.innerHTML = "";

  for (const repo of repos) {
    const config = await fetchRepoConfig(repo);

    // Obtener lenguajes
    const langRes = await fetch(repo.languages_url);
    const languagesData = await langRes.json();
    const languages = Object.keys(languagesData).join(" | ") || "Sin lenguajes";

    // Títulos y descripción por idioma
    const title = config?.title?.[lang] || repo.name;
    const description = config?.description?.[lang] || repo.description || "Sin descripción.";
    const tags = config?.tags?.join(" | ") || languages;

    // Banner: si config tiene banner, usarla; sino uno aleatorio
    const banner = config?.banner || defaultBanners[Math.floor(Math.random() * defaultBanners.length)];

    const col = document.createElement("div");
    col.classList.add("col");
    col.innerHTML = `
      <a href="${repo.html_url}" target="_blank" class="card-link text-decoration-none text-dark">
        <div class="card h-100 shadow-sm">
          <img src="${banner}" class="card-img-top" alt="Imagen de proyecto" data-i18n-alt="projectPicAlt">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold mb-3">${title}</h5>
            <p class="card-text flex-grow-1">${description}</p>
            <p class="tech">${tags}</p>
          </div>
        </div>
      </a>
    `;
    projectContainer.appendChild(col);
  }
}
