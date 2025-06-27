export function initThemeSwitch() {
  const switchInput = document.getElementById('themeSwitch');

  switchInput?.addEventListener('change', function () {
    if (this.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  });
  
  document.documentElement.setAttribute('data-theme', 'light');
}