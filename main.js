document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const counter = document.getElementById('counter');
    const mainContent = document.getElementById('mainContent');
    const about = document.getElementById('about');
    const heroVideoEl = document.getElementById('heroVideo');
    const heroTop = document.getElementById('hero') || document.querySelector('.hero') || document.querySelector('header');
    const footer = document.querySelector('footer');

    /* ================================
       ✅ NEW: show loader ONLY on first visit
       ================================ */
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (hasVisited) {
        // User already inside the site → skip loading screen
        if (loadingScreen) loadingScreen.style.display = 'none';
        if (mainContent) mainContent.style.display = 'block';
        if (about) about.style.display = 'block';
        if (footer) footer.style.display = 'block';
        document.body.style.overflow = 'auto';
        return;
    } else {
        sessionStorage.setItem('hasVisited', 'true');
    }
    /* ================================ */

    // -------- Prevent flicker: hide everything immediately --------
    if (about) about.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (mainContent) mainContent.style.display = 'none';
    document.body.style.overflow = 'hidden';

    // -------- Counter animation --------
    const startYear = 2006;
    const endYear = 2025;
    const countDuration = 900;
    const maxLoadingTime = 2500;

    let rafId = null;
    let startTs = null;

    function stepCounter(ts) {
        if (!startTs) startTs = ts;
        const progress = Math.min(1, (ts - startTs) / countDuration);
        const year = startYear + Math.floor(progress * (endYear - startYear));

        if (counter) counter.textContent = year;

        if (progress < 1) {
            rafId = requestAnimationFrame(stepCounter);
        } else {
            counter.textContent = endYear;
            setTimeout(hideLoadingScreen, 300);
        }
    }

    if (typeof requestAnimationFrame === "function") {
        rafId = requestAnimationFrame(stepCounter);
    } else {
        counter.textContent = endYear;
        setTimeout(hideLoadingScreen, 300);
    }

    // Safety fallback
    const maxLoadingTimeout = setTimeout(() => hideLoadingScreen(true), maxLoadingTime);

    // -------- Hide loader and show hero --------
    function hideLoadingScreen(immediate = false) {
        clearTimeout(maxLoadingTimeout);
        if (rafId) cancelAnimationFrame(rafId);

        if (!immediate) {
            loadingScreen.classList.add('fade-out');
            setTimeout(finishReveal, 450);
        } else {
            finishReveal();
        }
    }

    function finishReveal() {
        if (loadingScreen) loadingScreen.style.display = 'none';
        if (mainContent) mainContent.style.display = 'block';
        document.body.style.overflow = 'auto';

        forceShowHeroTop();
        revealAboutWhenVideoReady();
    }

    // -------- Force scroll to hero --------
    function forceShowHeroTop() {
        if (location.hash) {
            history.replaceState(null, document.title, location.pathname + location.search);
        }

        window.scrollTo({ top: 0, behavior: 'auto' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        if (heroTop) {
            heroTop.setAttribute('tabindex', '-1');
            heroTop.focus({ preventScroll: true });
            setTimeout(() => heroTop.removeAttribute('tabindex'), 600);
        }
    }

    // -------- Reveal about + footer when video ready --------
    function revealAboutWhenVideoReady() {
        if (!about) return;

        const showSections = () => {
            about.style.display = 'block';
            if (footer) footer.style.display = 'block';
        };

        if (!heroVideoEl) return showSections();
        if (heroVideoEl.style.display === 'none') return showSections();
        if (!heroVideoEl.paused && !heroVideoEl.ended) return showSections();

        const fallback = setTimeout(showSections, 1200);

        function onReady() {
            clearTimeout(fallback);
            showSections();
            heroVideoEl.removeEventListener('playing', onReady);
            heroVideoEl.removeEventListener('canplay', onReady);
        }

        heroVideoEl.addEventListener('playing', onReady);
        heroVideoEl.addEventListener('canplay', onReady);
    }

    // Autoplay video or hide video if blocked
    if (heroVideoEl) {
        const playPromise = heroVideoEl.play();
        if (playPromise) {
            playPromise.catch(() => {
                heroVideoEl.pause();
                heroVideoEl.style.display = 'none';
            });
        }
    }
});

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
// ---------------- Language Switch ----------------
const langToggle = document.getElementById("langToggle");
let currentLang = localStorage.getItem("language") || "en";

function switchLanguage(lang) {
    localStorage.setItem("language", lang);

    document.querySelectorAll("[data-en][data-sr]").forEach(el => {
        el.textContent = el.dataset[lang];
    });

    langToggle.textContent = lang === "en" ? "EN" : "SR";
    document.documentElement.lang = lang;
}

if (langToggle) {
    langToggle.addEventListener("click", () => {
        currentLang = currentLang === "en" ? "sr" : "en";
        switchLanguage(currentLang);
    });
}
switchLanguage(currentLang);

// ---------------- Intersection Animations ----------------
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry =>
        entry.target.classList.toggle("visible", entry.isIntersecting)
    );
}, { threshold: 0.2 });

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
