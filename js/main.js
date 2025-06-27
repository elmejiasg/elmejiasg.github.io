import { getGitHubRepos, renderProjects } from "./github.js";
import { initThemeSwitch } from "./theme.js";
import { initLanguageSelector, updateLanguage  } from "./i18n.js";

document.addEventListener("DOMContentLoaded", async () => {
  initThemeSwitch();
  initLanguageSelector();

  const lang = localStorage.getItem("lang") || "es";
  await updateLanguage(lang); 
  const repos = await getGitHubRepos("elmejiasg");
  renderProjects(repos, lang);
});



// //Dark-ligth theme
// const switchInput = document.getElementById('themeSwitch');

// switchInput.addEventListener('change', function () {
//   if (this.checked) {
//     document.documentElement.setAttribute('data-theme', 'dark');
//   } else {
//     document.documentElement.setAttribute('data-theme', 'light');
//   }
// });

// // Establecer tema claro por defecto
// document.documentElement.setAttribute('data-theme', 'light');

// //Languages
// function updateLanguage(lang) {
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

// document.querySelectorAll(".lang-option").forEach(option => {
//   option.addEventListener("click", function (e) {
//     e.preventDefault();
//     updateLanguage(this.dataset.lang);
//   });
// });

// window.addEventListener("DOMContentLoaded", () => {
//   const savedLang = localStorage.getItem("lang") || "es";
//   updateLanguage(savedLang);
// });