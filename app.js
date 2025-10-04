// Sophisticated Mountain Civic Association Application
// Premium JavaScript with elegant interactions

class ElegantMountainApp {
    constructor() {
        this.data = {
            activities: [
                {
                    id: 1,
                    title: "Ochrana horského ekosystému",
                    description: "Systematická starostlivosť o biodiverzitu a zachovanie prírodných hodnôt Vysokých Tatier prostredícttvom vedecky podložených projektov ochrany prírody.",
                    category: "Environment",
                    impact: "15 km obnovených chodníkov",
                    image: "https://pplx-res.cloudinary.com/image/upload/v1759527062/pplx_project_search_images/e4e8efaed7e1da4f6f1b1cd6bb8c6c9b5b1fe5d4.png"
                },
                {
                    id: 2,
                    title: "Kultúrne dedičstvo regiónu",
                    description: "Dokumentácia a zachovanie autentických tradícií horskej kultúry, organizácia prestižných kultúrnych podujatí a podpora miestnych remesiel.",
                    category: "Heritage",
                    impact: "12 kultúrnych programov ročne",
                    image: "https://pplx-res.cloudinary.com/image/upload/v1759527062/pplx_project_search_images/7f8b7f9a0b1ecfec5a8d2c6f4a7e9e0e3c6a5d5d.png"
                },
                {
                    id: 3,
                    title: "Komunitný rozvoj",
                    description: "Podpora kvality života obyvateľov prostrednícttvom vzdelávacích programov, intergenerácíných iniciatív a projektov sociálnej súdržnosti.",
                    category: "Community",
                    impact: "Podpora 120 obyvateľov",
                    image: "https://via.placeholder.com/400x250/5D4E3A/F8F6F0?text=Community+Development"
                },
                {
                    id: 4,
                    title: "Udržateľný turizmus",
                    description: "Propagácia zodpovedného turizmu a environmentálneho povedomia, vytvárame model udržateľného horského cestovného ruchu.",
                    category: "Sustainability",
                    impact: "Zero waste program",
                    image: "https://pplx-res.cloudinary.com/image/upload/v1759527061/pplx_project_search_images/bfce5d28-8c5f-4b8e-b23d-6f8e5d23c4a9.png"
                }
            ],
            
            events: [
                {
                    id: 1,
                    title: "Zimná gala večera",
                    date: "15. december 2024",
                    description: "Prestižne podujatie s degustáciou miestnych špecialít, kultúrnym programom a prezentáciou výsledkov našej práce za rok 2024."
                },
                {
                    id: 2,
                    title: "Jarný festival prírody",
                    date: "Apríl 2025",
                    description: "Medzinárodná konferencia o ochrane horských ekosystémov spojená s praktickými workshopmi a terénnou prácou."
                }
            ],
            
            team: [
                {
                    name: "Dr. Elena Kováčová",
                    position: "Predsedníčka",
                    credentials: "PhD. v oblasti environmentálnych vied",
                    experience: "15 rokov v ochrane prírody Tatier",
                    initials: "EK"
                },
                {
                    name: "Ing. Matej Horák",
                    position: "Podpredseda",
                    credentials: "Ing. krajinnej architektúry",
                    experience: "Špecialista na udržateľný rozvoj",
                    initials: "MH"
                }
            ]
        };
        
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.renderActivities();
        this.renderEvents();
        this.renderTeam();
        this.setupContactForm();
        this.initializeAnimations();
    }
    
    setupNavigation() {
        const navbar = document.getElementById('mainNav');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        // Sophisticated scroll handling
        let ticking = false;
        
        const updateNavbar = () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Update active navigation
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                if (window.pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
            
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        });
        
        // Smooth navigation scrolling
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    setupScrollEffects() {
        // Elegant parallax effect
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const heroImage = document.querySelector('.hero-image');
            
            if (heroImage && scrolled < window.innerHeight) {
                const rate = scrolled * -0.3;
                heroImage.style.transform = `translateY(${rate}px)`;
            }
            
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }
    
    renderActivities() {
        const activitiesGrid = document.getElementById('activitiesGrid');
        if (!activitiesGrid) return;
        
        activitiesGrid.innerHTML = this.data.activities.map(activity => `
            <article class="activity-card" data-category="${activity.category.toLowerCase()}">
                <div class="activity-header">
                    <span class="activity-category">${activity.category}</span>
                </div>
                <h3 class="activity-title">${activity.title}</h3>
                <p class="activity-description">${activity.description}</p>
                <div class="activity-impact">
                    <strong>Výsledok:</strong> ${activity.impact}
                </div>
            </article>
        `).join('');
    }
    
    renderEvents() {
        const eventsTimeline = document.getElementById('eventsTimeline');
        if (!eventsTimeline) return;
        
        eventsTimeline.innerHTML = this.data.events.map(event => `
            <article class="event-item">
                <div class="event-date">${event.date}</div>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
            </article>
        `).join('');
    }
    
    renderTeam() {
        const teamGrid = document.getElementById('teamGrid');
        if (!teamGrid) return;
        
        teamGrid.innerHTML = this.data.team.map(member => `
            <article class="team-member">
                <div class="member-avatar">
                    ${member.initials}
                </div>
                <h3 class="member-name">${member.name}</h3>
                <div class="member-position">${member.position}</div>
                <div class="member-credentials">${member.credentials}</div>
                <div class="member-experience">${member.experience}</div>
            </article>
        `).join('');
    }
    
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form data elegantly
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Sophisticated validation
            const errors = this.validateContactForm(data);
            
            if (errors.length > 0) {
                this.showNotification(errors[0], 'error');
                return;
            }
            
            // Simulate elegant form submission
            this.showNotification(
                'Vaša správa bola úspešne odoslaná. Ozvéme sa vám v najkratšom čase.',
                'success'
            );
            
            contactForm.reset();
        });
    }
    
    validateContactForm(data) {
        const errors = [];
        
        if (!data.firstName?.trim()) {
            errors.push('Meno je povinné pole.');
        }
        
        if (!data.lastName?.trim()) {
            errors.push('Priezvisko je povinné pole.');
        }
        
        if (!data.email?.trim()) {
            errors.push('E-mailová adresa je povinná.');
        } else if (!this.validateEmail(data.email)) {
            errors.push('Zadajte platnú e-mailovú adresu.');
        }
        
        if (!data.subject) {
            errors.push('Vyberte predmet správy.');
        }
        
        if (!data.message?.trim()) {
            errors.push('Správa je povinná.');
        } else if (data.message.trim().length < 10) {
            errors.push('Správa musí mať aspoň 10 znakov.');
        }
        
        return errors;
    }
    
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    initializeAnimations() {
        // Sophisticated intersection observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add staggered animation for grids
                    if (entry.target.classList.contains('activities-grid') ||
                        entry.target.classList.contains('metrics-grid') ||
                        entry.target.classList.contains('team-grid')) {
                        this.staggerChildAnimations(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements for elegant animations
        const animatedElements = document.querySelectorAll(`
            .activity-card,
            .metric-card,
            .event-item,
            .team-member,
            .contact-method,
            .section-header
        `);
        
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(element);
        });
    }
    
    staggerChildAnimations(parent) {
        const children = parent.children;
        Array.from(children).forEach((child, index) => {
            setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    showNotification(message, type) {
        // Elegant notification system
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    ${type === 'success' ? '✓' : '⚠'}
                </div>
                <div class="notification-message">${message}</div>
            </div>
        `;
        
        // Sophisticated styling
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '24px',
            background: type === 'success' ? 'var(--forest-green)' : 'var(--primary-brown)',
            color: 'var(--text-on-dark)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-xl)',
            zIndex: '1001',
            transform: 'translateX(100%)',
            transition: 'transform var(--transition-base)',
            maxWidth: '350px',
            fontSize: '0.95rem',
            fontWeight: '500'
        });
        
        // Elegant notification content styling
        const content = notification.querySelector('.notification-content');
        content.style.display = 'flex';
        content.style.alignItems = 'center';
        content.style.gap = 'var(--space-3)';
        
        const icon = notification.querySelector('.notification-icon');
        Object.assign(icon.style, {
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 'bold'
        });
        
        document.body.appendChild(notification);
        
        // Sophisticated animations
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        // Elegant auto-removal
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 250);
        }, 5000);
    }
}

// Sophisticated Admin Panel (Hidden Access)
class ElegantAdminPanel {
    constructor() {
        this.setupAdmin();
    }
    
    setupAdmin() {
        if (window.location.pathname.includes('admin.html')) {
            this.initAdminPage();
        }
    }
    
    initAdminPage() {
        const loginForm = document.getElementById('adminLoginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
    }
    
    handleLogin() {
        const username = document.getElementById('adminUsername')?.value;
        const password = document.getElementById('adminPassword')?.value;
        
        if (username === 'admin' && password === 'podban2024') {
            this.showAdminDashboard();
        } else {
            this.showLoginError();
        }
    }
    
    showLoginError() {
        const errorDiv = document.getElementById('adminLoginError');
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.textContent = 'Nesprávne prihlasovacie údaje.';
            
            setTimeout(() => {
                errorDiv.style.display = 'none';
            }, 3000);
        }
    }
    
    showAdminDashboard() {
        const loginScreen = document.getElementById('adminLoginScreen');
        const dashboard = document.getElementById('adminDashboard');
        
        if (loginScreen) loginScreen.style.display = 'none';
        if (dashboard) dashboard.style.display = 'block';
    }
}

// Elegant initialization
document.addEventListener('DOMContentLoaded', () => {
    new ElegantMountainApp();
    new ElegantAdminPanel();
});

// Performance optimization
if ('IntersectionObserver' in window) {
    // Sophisticated image lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    // Observe lazy images
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}