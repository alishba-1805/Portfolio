/* =====================================================
   Optimized Scroll Listener (Header shrink + Nav)
===================================================== */
let lastScrollY = 0;
let ticking = false;
const header = document.querySelector('.sue-header');
const bottomNav = document.querySelector('.bottom-nav-container');

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (header) {
                header.classList.toggle('scroll-header', scrollTop >= 50);
            }

            if (bottomNav) {
                bottomNav.style.bottom = scrollTop > lastScrollY ? '-150px' : '50px';
            }

            lastScrollY = Math.max(0, scrollTop);
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

/* =====================================================
   Intersection Observer — Active Menu Highlight
===================================================== */
const menuLinks = document.querySelectorAll('.menu a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            menuLinks.forEach(link => {
                link.classList.toggle(
                    'current',
                    link.getAttribute('href') === '#' + entry.target.id
                );
            });
        }
    });
}, { root: null, rootMargin: '-20% 0px -80% 0px', threshold: 0 });

document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

/* =====================================================
   Intersection Observer — Reveal on Scroll
===================================================== */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

document.querySelectorAll(
    '.section-header, .about-intro, .about-image-wrapper, .stats-grid, ' +
    '.focus-card, .timeline-item, .cert-card, .contact-item, ' +
    '.contact-form-wrapper, .contact-info-wrapper, .resume-tabs, ' +
    '.resume-content, .projects-carousel, .continuous-learning, ' +
    '.about-actions, .footer-content'
).forEach(el => {
    el.classList.add('reveal-element');
    revealObserver.observe(el);
});

/* =====================================================
   Hero Typewriter Effect
===================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const nameEl = document.querySelector('.hero-name');
    if (!nameEl) return;

    const fullText = nameEl.dataset.text || nameEl.textContent.trim();
    let idx = 0;
    nameEl.textContent = '';

    function typeNext() {
        if (idx <= fullText.length) {
            nameEl.textContent = fullText.slice(0, idx);
            idx++;
            setTimeout(typeNext, 100);
        }
    }
    typeNext();
});

/* =====================================================
   Resume Tab Switching
===================================================== */
document.querySelectorAll('.resume-tab').forEach(tab => {
    tab.addEventListener('click', function () {
        const target = this.dataset.tab;
        document.querySelectorAll('.resume-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.resume-tab-content').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        document.getElementById(target)?.classList.add('active');
    });
});

/* =====================================================
   Bottom Navigation Toggle
===================================================== */
document.querySelector('.menu-show-btn')?.addEventListener('click', () => {
    document.querySelector('.bottom-nav')?.classList.add('active');
});

document.addEventListener('click', (e) => {
    const container = document.querySelector('.bottom-nav-container');
    const nav = document.querySelector('.bottom-nav');
    if (container && nav && !container.contains(e.target)) {
        nav.classList.remove('active');
    }
});

document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', function () {
        document.querySelectorAll('.menu a').forEach(l => l.classList.remove('current'));
        this.classList.add('current');
    });
});

/* =====================================================
   Dark / Light Theme
===================================================== */
const themeBtn = document.querySelector('.theme-btn');
const rootEl = document.documentElement;
const THEME_KEY = 'theme';

const savedTheme = localStorage.getItem(THEME_KEY) ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

themeBtn?.addEventListener('click', () => {
    setTheme((rootEl.getAttribute('data-theme') || 'dark') === 'dark' ? 'light' : 'dark');
});

function setTheme(theme) {
    rootEl.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
}

/* =====================================================
   Projects Carousel
===================================================== */
let currentProject = 0;
const projectCards = document.querySelectorAll('.project-card');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function showProject(i) {
    projectCards.forEach(c => c.classList.remove('active'));
    indicators.forEach(d => d.classList.remove('active'));
    if (projectCards[i]) projectCards[i].classList.add('active');
    if (indicators[i]) indicators[i].classList.add('active');
}

prevBtn?.addEventListener('click', () => {
    currentProject = (currentProject - 1 + projectCards.length) % projectCards.length;
    showProject(currentProject);
});

nextBtn?.addEventListener('click', () => {
    currentProject = (currentProject + 1) % projectCards.length;
    showProject(currentProject);
});

indicators.forEach((ind, i) => {
    ind.addEventListener('click', () => { currentProject = i; showProject(i); });
});



/* =====================================================
   Optimized Custom Cursor
===================================================== */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Only run cursor logic on non-touch devices
if (window.matchMedia("(pointer: fine)").matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    let outlineSize = 40;

    function animateCursor() {
        if (cursorDot) {
            cursorDot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
        }
        
        outlineX += (mouseX - outlineX) * 0.2;
        outlineY += (mouseY - outlineY) * 0.2;
        
        if (cursorOutline) {
            cursorOutline.style.transform = `translate(${outlineX - (outlineSize / 2)}px, ${outlineY - (outlineSize / 2)}px)`;
        }
        
        requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Hover effects
    const interactives = document.querySelectorAll('a, button, .project-card, .cert-card, .skill-category, .theme-btn, .menu-show-btn');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorOutline) {
                outlineSize = 60;
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(88, 165, 255, 0.1)';
            }
        });
        el.addEventListener('mouseleave', () => {
            if (cursorOutline) {
                outlineSize = 40;
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
            }
        });
    });
}