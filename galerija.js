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

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-in");

    if ("IntersectionObserver" in window) {
        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        elements.forEach(el => obs.observe(el));

    } else {
        elements.forEach(el => el.classList.add("visible"));
    }
});
