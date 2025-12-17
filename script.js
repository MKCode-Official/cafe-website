
// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, phone, message });
            
            // Show success message (in a real app, you'd want something more sophisticated)
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Make current year dynamic in footer
    document.getElementById('year').textContent = new Date().getFullYear();
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
// PREVODI
const translations = {
    en: {
        home: "Home",
        pricing: "Price List",
        gallery: "Gallery",
        contact: "Contact",

        getInTouch: "Get in Touch",
        getInTouchText:
            "We'd love to hear from you. Whether you have a question about our menu, reservations, or anything else, our team is ready to answer all your questions.",

        sendMessage: "Send us a message",
        yourName: "Your Name",
        emailAddress: "Email Address",
        phoneNumber: "Phone Number",
        yourMessage: "Your Message",
        sendBtn: "Send Message",

        contactInfo: "Contact Information",
        ourLocation: "Our Location",
        phone: "Phone Number",
        email: "Email Address",
        openingHours: "Opening Hours",
        vreme: "Monday - Saturday: 8:00 AM - 12:00 PM",
        vreme2: "Sunday: 9:00 AM - 12:00 PM",

        followUs: "Follow Us",

        footerDesc: "Authentic Italian cafe experience in the heart of the city.",
        quickLinks: "Quick Links",
        contactInfoFooter: "Contact Info"
    },

    sr: {
        home: "Početna",
        pricing: "Cenovnik",
        gallery: "Galerija",
        contact: "Kontakt",

        getInTouch: "Kontaktirajte nas",
        getInTouchText:
            "Rado ćemo čuti vaše mišljenje. Ako imate pitanje o našem meniju, rezervacijama ili bilo čemu drugom – naš tim je tu da vam pomogne.",

        sendMessage: "Pošaljite poruku",
        yourName: "Vaše ime",
        emailAddress: "Email adresa",
        phoneNumber: "Broj telefona",
        yourMessage: "Vaša poruka",
        sendBtn: "Pošalji poruku",

        contactInfo: "Kontakt podaci",
        ourLocation: "Naša lokacija",
        phone: "Broj telefona",
        email: "Email adresa",
        openingHours: "Radno vreme",
        vreme: "Ponedeljak - Subota: 8:00 - 00:00",
        vreme2: "Nedelja: 9:00 - 00:00",

        followUs: "Pratite nas",

        footerDesc: "Autentično italijansko iskustvo u srcu grada.",
        quickLinks: "Brzi linkovi",
        contactInfoFooter: "Kontakt informacije"
    }
};

// DETEKCIJA JEZIKA BROWSERA
let currentLang = navigator.language.startsWith("sr") ? "sr" : "en";

// PRIMENA PREVODA
function applyTranslations(lang) {
    document.querySelectorAll("[data-lang]").forEach(el => {
        const key = el.getAttribute("data-lang");

        if (key === "sendBtn") {
            el.innerHTML = `<i data-feather="send"></i> ${translations[lang][key]}`;
        } else {
            el.textContent = translations[lang][key];
        }
    });

    feather.replace(); // obnovi ikonice
}

// AŽURIRANJE TEKSTA NA DUGMETU
function updateLangButton() {
    const btn = document.getElementById("langToggle");
    btn.textContent = currentLang === "en" ? "EN" : "SR";
}

// KLIK NA DUGME
document.getElementById("langToggle").addEventListener("click", () => {
    currentLang = currentLang === "en" ? "sr" : "en";
    applyTranslations(currentLang);
    updateLangButton();
});

// KADA SE STRANICA UCITA
document.addEventListener("DOMContentLoaded", () => {
    applyTranslations(currentLang);
    updateLangButton();
});