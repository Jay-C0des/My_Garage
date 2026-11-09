// search.js: shared car search for every page.
// Paths are relative to the site root. Pages in subfolders set data-base="../" on <body>.

const CARS = {
  "Ferrari F40 Competizione": "Ferrari/F40C.html",
  "Ferrari Dino 246 GT": "Ferrari/Dino.html",
  "Ferrari 365 GTB4": "Ferrari/GTB4.html",
  "Ferrari 12Cilindri": "Ferrari/12Cilindri.html",
  "Ferrari SF90 Stradale": "Ferrari/SF90.html",
  "Enzo Ferrari": "Ferrari/Enzo.html",
  "Lamborghini Huracan STO": "Lambo/Huracan.html",
  "Pagani Utopia": "Pagani/Utopia.html",
  "Pagani Zonda Cinque Toon'd": "Pagani/Zonda_Tooned.html",
  "JDMs": "JDM.html",
  "Eurocars": "Eurocars.html",
  "FreedoMotors": "FreedoMotors.html",
  "Album": "album.html"
};

// Shown when the search box is empty. Names must exist in CARS.
const HIGHLIGHTS = ["Ferrari F40 Competizione", "Enzo Ferrari", "Lamborghini Huracan STO", "Pagani Utopia", "Album"];

const searchForm = document.getElementById("car-search");
const searchInput = document.getElementById("car-input");
const suggestions = document.getElementById("car-suggestions");
const base = document.body.dataset.base || "";

function addLink(name) {
  if (!CARS[name]) return;                 // skip names missing from CARS
  const link = document.createElement("a");
  link.className = "car-suggestion";
  link.href = base + CARS[name];
  link.textContent = name;
  suggestions.appendChild(link);
}

function showSuggestions() {
  const typed = searchInput.value.trim().toLowerCase();
  suggestions.innerHTML = "";

  if (!typed) {
    const title = document.createElement("div");
    title.className = "car-suggestions-title";
    title.textContent = "Highlights";
    suggestions.appendChild(title);
    HIGHLIGHTS.forEach(addLink);
  } else {
    Object.keys(CARS)
      .filter(function (name) { return name.toLowerCase().includes(typed); })
      .forEach(addLink);
  }

  suggestions.style.display = suggestions.children.length ? "block" : "none";
}

searchInput.addEventListener("input", showSuggestions);
searchInput.addEventListener("focus", showSuggestions);

// Enter opens the first suggestion without reloading the page
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const first = suggestions.querySelector("a");
  if (first) window.location.href = first.href;
});

// Close the list when tapping or clicking anywhere outside the search
document.addEventListener("click", function (e) {
  if (!searchForm.contains(e.target)) suggestions.style.display = "none";
});

// Our own clear button: show it when there's text, clear the box when tapped
const clearButton = document.getElementById("car-clear");

function toggleClear() {
  clearButton.style.display = searchInput.value ? "block" : "none";
}

searchInput.addEventListener("input", toggleClear);

clearButton.addEventListener("click", function () {
  searchInput.value = "";
  toggleClear();
  showSuggestions();     // refresh the list to show Highlights again
  searchInput.focus();
});