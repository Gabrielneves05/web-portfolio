const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const themeToggle = document.querySelector('.theme-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const sections = document.querySelectorAll('section');
const heroTitle = document.querySelector('.hero-title');

let interactiveElementsArray = [];

const createBackToTopButton = () => {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    
    backToTopBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    interactiveElementsArray.push(backToTopBtn);
};

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.setAttribute('data-theme', 'dark');
} else {
    document.body.removeAttribute('data-theme');
}

themeToggle.addEventListener('click', () => {
    if (document.body.getAttribute('data-theme') === 'dark') {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('menu-open');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('menu-active');
    
    if (document.body.classList.contains('menu-active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('menu-open');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-active');
        document.body.style.overflow = '';
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const observerOptions = {
    root: null,
    rootMargin: '-100px 0px',
    threshold: 0.2 
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
            
            mobileNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        navLinks.forEach(link => link.classList.remove('active'));
        mobileNavLinks.forEach(link => link.classList.remove('active'));
        
        this.classList.add('active');
        
        if (targetElement) {
            const headerOffset = header.offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            document.documentElement.style.scrollBehavior = 'smooth';
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            if (typeof resetAutoScrollTimer === 'function') {
                resetAutoScrollTimer();
            }
        }
    });
});

window.addEventListener('scroll', () => {
    
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.body.offsetHeight;
    
    if (scrollPosition >= pageHeight - 150) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#contato') {
                link.classList.add('active');
            }
        });
        
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#contato') {
                link.classList.add('active');
            }
        });
    }
});

const animateOnScroll = () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.8) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursorDot);

const cursorOutline = document.createElement('div');
cursorOutline.className = 'cursor-outline';
document.body.appendChild(cursorOutline);

document.addEventListener('mousemove', (e) => {
    cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    
    setTimeout(() => {
        cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }, 50);
});

const interactiveElements = document.querySelectorAll('a, button, .btn, .theme-toggle, .social-link');

interactiveElements.forEach(element => {
    interactiveElementsArray.push(element);
    
    element.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('expand');
    });
    
    element.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('expand');
    });
});

window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('loaded');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1000);
    }
    
    createBackToTopButton();
    
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('expand');
        });
        
        backToTopBtn.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('expand');
        });
    }
});

document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
    
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    }
});

const updateCustomProperties = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
};

window.addEventListener('resize', updateCustomProperties);
updateCustomProperties();

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.body.offsetHeight;
    
    if (scrollPosition >= pageHeight - 10) {
        console.log('Reached end of page');
    }
});

const setupAutoScroll = () => {
    let currentSectionIndex = 0;
    let autoScrollTimeout;
    let isAutoScrolling = false;
    const autoScrollDelay = 5000;
    const allSections = Array.from(sections);
    
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const scrollToNextSection = () => {
        currentSectionIndex = (currentSectionIndex + 1) % allSections.length;
        
        const nextSection = allSections[currentSectionIndex];
        
        isAutoScrolling = true;
        
        const headerOffset = header.offsetHeight;
        const elementPosition = nextSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        const id = nextSection.getAttribute('id');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
        
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
        
        setTimeout(() => {
            isAutoScrolling = false;
        }, 1500);
        
        resetAutoScrollTimer();
    };
    
    const resetAutoScrollTimer = () => {
        clearTimeout(autoScrollTimeout);
        autoScrollTimeout = setTimeout(scrollToNextSection, autoScrollDelay);
    };
    
    resetAutoScrollTimer();
    
    document.addEventListener('mousemove', () => {
        if (!isAutoScrolling) {
            resetAutoScrollTimer();
        }
    });
    
    document.addEventListener('scroll', () => {
        if (!isAutoScrolling) {
            for (let i = 0; i < allSections.length; i++) {
                const section = allSections[i];
                const rect = section.getBoundingClientRect();
                
                if (rect.top >= -100 && rect.top <= 100) {
                    currentSectionIndex = i;
                    break;
                }
            }
            
            resetAutoScrollTimer();
        }
    });
    
    document.addEventListener('click', () => {
        if (!isAutoScrolling) {
            resetAutoScrollTimer();
        }
    });
    
    interactiveElementsArray.forEach(element => {
        element.addEventListener('mouseenter', () => {
            clearTimeout(autoScrollTimeout);
        });
        
        element.addEventListener('mouseleave', () => {
            if (!isAutoScrolling) {
                resetAutoScrollTimer();
            }
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (autoScrollTimeout) {
                clearTimeout(autoScrollTimeout);
                autoScrollTimeout = null;
                console.log('Auto-scroll desativado');
            } else {
                resetAutoScrollTimer();
                console.log('Auto-scroll ativado');
            }
        }
    });
};

window.addEventListener('load', () => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        html {
            scroll-behavior: smooth;
        }
        body {
            scroll-behavior: smooth;
        }
        @media (prefers-reduced-motion: reduce) {
            html, body {
                scroll-behavior: auto;
            }
        }
    `;
    document.head.appendChild(styleElement);
    
    setTimeout(() => {
        setupAutoScroll();
    }, 1500);
});