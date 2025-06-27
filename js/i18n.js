// export function updateLanguage(lang) {
//   fetch(`./lang/${lang}.json`)
//     .then(res => res.json())
//     .then(translations => {
//       localStorage.setItem("lang", lang);

//       document.querySelectorAll("[data-i18n]").forEach(el => {
//         const key = el.getAttribute("data-i18n");
//         if (translations[key]) {
//           if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
//             el.placeholder = translations[key];
//           } else {
//             el.textContent = translations[key];
//           }
//         }
//       });

//       document.querySelectorAll("[data-i18n-alt]").forEach(el => {
//         const key = el.getAttribute("data-i18n-alt");
//         if (translations[key]) {
//           el.alt = translations[key];
//         }
//       });
//     })
//     .catch(err => console.error(`Error cargando idioma ${lang}`, err));
// }
import { getGitHubRepos, renderProjects } from "./github.js";
export async function updateLanguage(lang) {
  try {
    const res = await fetch(`./lang/${lang}.json`);
    const translations = await res.json();

    localStorage.setItem("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[key]) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = translations[key];
        } else {
          el.textContent = translations[key];
        }
      }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(el => {
      const key = el.getAttribute("data-i18n-alt");
      if (translations[key]) {
        el.alt = translations[key];
      }
    });

  } catch (err) {
    console.error(`Error cargando idioma ${lang}`, err);
  }
}

export function initLanguageSelector() {
  document.querySelectorAll(".lang-option").forEach(option => {
    option.addEventListener("click", async function (e) {
      e.preventDefault();
      const lang = this.dataset.lang;

      await updateLanguage(lang);

      // Vaciar proyectos actuales antes de volver a renderizar
      const projectContainer = document.querySelector(".row");
      projectContainer.innerHTML = "";

      // Volver a cargar y renderizar proyectos con el nuevo idioma
      const repos = await getGitHubRepos("elmejiasg");
      renderProjects(repos, lang);
    });
  });

  window.addEventListener("DOMContentLoaded", async () => {
    const savedLang = localStorage.getItem("lang") || "es";
    await updateLanguage(savedLang);
  });
}


// export function initLanguageSelector() {
//   document.querySelectorAll(".lang-option").forEach(option => {
//     option.addEventListener("click", function (e) {
//       e.preventDefault();
//       updateLanguage(this.dataset.lang);
//     });
//   });

//   window.addEventListener("DOMContentLoaded", () => {
//     const savedLang = localStorage.getItem("lang") || "es";
//     updateLanguage(savedLang);
//   });
// }
