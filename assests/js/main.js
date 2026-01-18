/* =====================================================
   Resume section tabs and tab contents
===================================================== */

/* =====================================================
   Service modal open/close function
===================================================== */

/* =====================================================
   Portfolio modals, tabs and cards
===================================================== */

// Filter portfolio cards according to portfolio tabs.

// Open/Close Portfolio modals.

/* =====================================================
   Testimonial Swiper
===================================================== */

/* =====================================================
   Send/Receive emails from contact form - EmailJS
===================================================== */

/* =====================================================
   Shrink the height of the header on scroll
===================================================== */

/* =====================================================
   Bottom navigation menu
===================================================== */

// Each bottom navigation menu items active on page scroll.
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section, div[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.menu a').forEach(link => {
        link.classList.remove('current');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('current');
        }
    });
});

// ======================================
// Hero Name Typewriter Effect
// ======================================
document.addEventListener('DOMContentLoaded', () => {
    const nameEl = document.querySelector('.hero-name');
    if (!nameEl) return;

    const fullText = nameEl.dataset.text || nameEl.textContent.trim();
    const speed = 110; // ms per character
    let idx = 0;

    nameEl.textContent = '';

    function typeNext() {
        if (idx <= fullText.length) {
            nameEl.textContent = fullText.slice(0, idx);
            idx += 1;
            setTimeout(typeNext, speed);
        }
    }

    typeNext();
});

/* =====================================================
   Resume Section Tab Switching
===================================================== */
document.querySelectorAll('.resume-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const targetTab = this.dataset.tab;
        
        // Remove active class from all tabs and contents
        document.querySelectorAll('.resume-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.resume-tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        this.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Javascript to show bottom navigation menu on home(page load).
// Menu should be hidden by default, not shown on load
// Only show on user interaction

// Javascript to show/hide bottom navigation menu on home(scroll).
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const bottomNav = document.querySelector('.bottom-nav-container');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        bottomNav.style.bottom = '-150px';
    } else {
        // Scrolling up
        bottomNav.style.bottom = '50px';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Hide bottom navigation menu on click menu-hide-btn.
// (Removed - arrow button is now hidden)

// Show bottom navigation menu on click menu-show-btn.
document.querySelector('.menu-show-btn')?.addEventListener('click', () => {
    const bottomNav = document.querySelector('.bottom-nav');
    bottomNav.classList.add('active');
});

// Close menu when clicking outside the bottom nav container
document.addEventListener('click', (e) => {
    const bottomNavContainer = document.querySelector('.bottom-nav-container');
    const bottomNav = document.querySelector('.bottom-nav');
    
    // If click is outside the bottom nav container, close the menu
    if (bottomNavContainer && !bottomNavContainer.contains(e.target)) {
        bottomNav.classList.remove('active');
    }
});

// Navigation link click
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.menu a').forEach(l => l.classList.remove('current'));
        this.classList.add('current');
    });
});

/* =====================================================
   Website dark/light theme
===================================================== */
const themeBtn = document.querySelector('.theme-btn');
const rootEl = document.documentElement;
const THEME_KEY = 'theme';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem(THEME_KEY);
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

setTheme(initialTheme);

themeBtn?.addEventListener('click', () => {
    const current = rootEl.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
});

function setTheme(theme) {
    rootEl.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
}

/* =====================================================
   Projects Carousel
===================================================== */

let currentProjectIndex = 0;
const projectCards = document.querySelectorAll('.project-card');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function showProject(index) {
    // Remove active class from all cards and indicators
    projectCards.forEach(card => card.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));
    
    // Add active class to current card and indicator
    projectCards[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextProject() {
    currentProjectIndex = (currentProjectIndex + 1) % projectCards.length;
    showProject(currentProjectIndex);
}

function prevProject() {
    currentProjectIndex = (currentProjectIndex - 1 + projectCards.length) % projectCards.length;
    showProject(currentProjectIndex);
}

if (prevBtn) prevBtn.addEventListener('click', prevProject);
if (nextBtn) nextBtn.addEventListener('click', nextProject);

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentProjectIndex = index;
        showProject(currentProjectIndex);
    });
});

/* =====================================================
   Customized cursor on mousemove
===================================================== */

// Cursor effects on hover website elements.

/* =====================================================
   Website dark/light theme
===================================================== */

// Change theme and save current theme on click the theme button.

// Get saved theme icon and theme on document loaded.

/* =====================================================
   ANIMATED CUSTOM CURSOR
===================================================== */

const customCursor = document.querySelector('.custom-cursor');
const cursorBody = document.querySelector('.cursor-body');
const cursorTrail = document.querySelector('.cursor-trail');

let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;
let isMoving = false;
let moveTimeout;

// Show cursor when mouse enters window
document.addEventListener('mouseenter', () => {
    customCursor.classList.add('active');
});

// Hide cursor when mouse leaves window
document.addEventListener('mouseleave', () => {
    customCursor.classList.remove('active');
});

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Position main cursor body
    cursorBody.style.left = mouseX + 'px';
    cursorBody.style.top = mouseY + 'px';
    
    // Smooth trail following
    setTimeout(() => {
        trailX = mouseX;
        trailY = mouseY;
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
    }, 50);
    
    isMoving = true;
    clearTimeout(moveTimeout);
    
    moveTimeout = setTimeout(() => {
        isMoving = false;
    }, 100);
});

// Click effect
document.addEventListener('mousedown', () => {
    customCursor.classList.add('click-effect');
    setTimeout(() => {
        customCursor.classList.remove('click-effect');
    }, 600);
});

// Hover interactive elements
const interactiveElements = document.querySelectorAll(
    'a, button, input, textarea, [role="button"], .clickable, .project-link, .cert-link, .project-tag, .skill-tag, .carousel-btn, .indicator, .theme-btn'
);

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        customCursor.classList.add('hover-interactive');
    });
    
    element.addEventListener('mouseleave', () => {
        customCursor.classList.remove('hover-interactive');
    });
});

/* =====================================================
   CONTACT FORM HANDLING
===================================================== */

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showFormStatus('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormStatus('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual submission logic)
        // You can integrate EmailJS, FormSpree, or your backend API here
        
        showFormStatus('Processing...', 'success');
        
        // Simulate API call
        setTimeout(() => {
            showFormStatus('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }, 1500);
    });
}

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
}

/* =====================================================
   ScrollReveal JS animations
===================================================== */

// Common reveal options to create reveal animations.

// Target elements and specify options to create reveal animations.
      