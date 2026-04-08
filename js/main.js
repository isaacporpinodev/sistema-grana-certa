const userBtn = document.querySelector(".user-button");
const dropdownMenu = document.querySelector(".dropdown-menu");
const userMenu = document.querySelector(".user-menu");
const themeToggleBtn = document.querySelector(".theme-toggle");

function toggleDropdownMenu() {
  dropdownMenu.classList.toggle("open");
}

function handleClickOutsideDropdown(event) {
  const clickedElement = event.target;

  if (!userMenu.contains(clickedElement)) {
    dropdownMenu.classList.remove("open");
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  saveThemePreference();
}

function saveThemePreference() {
  let theme;

  if (document.body.classList.contains("dark")) {
    theme = "dark";
  } else {
    theme = "light";
  }

  localStorage.setItem("theme", theme);
}

function loadThemePreference() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
}

function initializeThemeToggle() {
  if (!themeToggleBtn) {
    return;
  }

  themeToggleBtn.addEventListener("click", toggleTheme);
}

function initializeUserMenu() {
  if (!userBtn || !dropdownMenu || !userMenu) {
    return;
  }

  userBtn.addEventListener("click", toggleDropdownMenu);
  document.addEventListener("click", handleClickOutsideDropdown);
}

function initializeApp() {
  loadThemePreference();
  initializeUserMenu();
  initializeThemeToggle();
}

initializeApp();
