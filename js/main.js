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