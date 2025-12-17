    // --- Dropdown behavior (right side navbar) ---
    const dropdownBtn = document.getElementById('dropdownBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');

    function openDropdown() {
        if (!dropdownMenu) return;
        dropdownMenu.setAttribute('aria-hidden', 'false');
        dropdownMenu.classList.add('show');
        dropdownBtn.setAttribute('aria-expanded', 'true');
        // Prevent background scroll while menu is open
        document.body.style.overflow = 'hidden';
    }

    function closeDropdown() {
        if (!dropdownMenu) return;
        dropdownMenu.setAttribute('aria-hidden', 'true');
        dropdownMenu.classList.remove('show');
        dropdownBtn.setAttribute('aria-expanded', 'false');
        // Restore scrolling
        document.body.style.overflow = 'auto';
    }

    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', function(e) {
            const isOpen = dropdownMenu && dropdownMenu.getAttribute('aria-hidden') === 'false';
            if (isOpen) closeDropdown(); else openDropdown();
            e.stopPropagation();
        });

        // Close when clicking outside or on overlay background
        document.addEventListener('click', function(e) {
            if (!dropdownMenu) return;
            // Click directly on the overlay background (the menu element) should close
            if (e.target === dropdownMenu) { closeDropdown(); return; }
            // Click outside both menu and button should close
            if (!dropdownMenu.contains(e.target) && e.target !== dropdownBtn) closeDropdown();
        });

        // Close on ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.key === 'Esc') closeDropdown();
        });
    }
// LANGUAGE SWITCHING - Show Active Language Only
const langToggle = document.getElementById("langToggle");
let currentLang = localStorage.getItem("language") || "en";

langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "sr" : "en";
    switchLanguage(currentLang);
});

function switchLanguage(lang) {
    localStorage.setItem("language", lang);
    
    document.querySelectorAll("[data-en][data-sr]").forEach(element => {
        element.textContent = element.dataset[lang];
    });

    // Show only active language
    langToggle.textContent = lang === "en" ? "EN" : "SR";
    document.documentElement.lang = lang;
}

// Initialize with saved language
switchLanguage(currentLang);
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } else {
            entry.target.classList.remove("visible");
        }
    });
}, { threshold: 0.2 });

var buttons = document.getElementsByClassName('category-btn');
var contents = document.getElementsByClassName('category-content');

// Funkcija za zatvaranje svih kategorija
function closeAll() {
  for (var i = 0; i < contents.length; i++) {
    contents[i].style.display = "none";
  }
}

// Klik na dugme → otvori/zatvori samo njegov sadržaj
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function (event) {
    event.stopPropagation(); // sprečava da klik na dugme zatvori sve

    var content = this.nextElementSibling;
    var isOpen = content.style.display === "block";

    closeAll(); // zatvori sve ostale

    // Ako nije bilo otvoreno → otvori
    if (!isOpen) {
      content.style.display = "block";
    }
  });
}

// Klik bilo gde van menija → zatvara sve
document.addEventListener('click', function () {
  closeAll();
});

// Sprečava da klik unutar otvorenog teksta zatvori sadržaj
for (var i = 0; i < contents.length; i++) {
  contents[i].addEventListener('click', function (event) {
    event.stopPropagation();
  });
}