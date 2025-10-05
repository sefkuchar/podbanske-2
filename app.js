// Sophisticated Mountain Civic Association Application
// Premium JavaScript with elegant interactions

class ElegantMountainApp {
    constructor() {
        this.data = {
            activities: [
                {
                    id: 1,
                    title: "Ochrana horského ekosystému",
                    description: "Naša iniciatíva sa zameriava na obnovu a ochranu pôvodných rastlinných a živočíšnych druhov v Tatrách. V spolupráci s odborníkmi a dobrovoľníkmi monitorujeme ohrozené biotopy, vysádzame pôvodné stromy a čistíme horské chodníky od invazívnych rastlín. Výsledkom je zdravší ekosystém a lepšie podmienky pre turistov aj miestnu faunu.",
                    category: "Environment",
                    impact: "15 km obnovených chodníkov, 2 nové biotopy zachránené",
                    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                },
                {
                    id: 2,
                    title: "Kultúrne dedičstvo regiónu",
                    description: "Organizujeme folklórne festivaly, remeselné trhy a workshopy, kde miestni majstri odovzdávajú svoje zručnosti mladším generáciám. Vydali sme knihu o histórii Podbanského a digitalizovali archívne fotografie, aby tradície žili aj v digitálnom veku.",
                    category: "Heritage",
                    impact: "12 kultúrnych programov ročne, 1 000+ návštevníkov",
                    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
                },
                {
                    id: 3,
                    title: "Komunitný rozvoj",
                    description: "Spájame generácie prostredníctvom komunitných záhrad, spoločných brigád a vzdelávacích seminárov. Podporujeme mladé rodiny, seniorov aj podnikateľov, aby sa každý cítil v Podbanskom doma. Vďaka grantom sme zrekonštruovali detské ihrisko a založili komunitnú knižnicu.",
                    category: "Community",
                    impact: "Podpora 120 obyvateľov, 3 nové komunitné projekty",
                    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
                },
                {
                    id: 4,
                    title: "Udržateľný turizmus",
                    description: "Vytvorili sme sieť ekologických turistických trás s informačnými tabuľami o prírode a histórii regiónu. Spolupracujeme s miestnymi podnikmi na zavádzaní zero waste opatrení a propagujeme zodpovedné správanie návštevníkov. Naše podujatia sú prístupné aj pre rodiny s deťmi a osoby so zníženou pohyblivosťou.",
                    category: "Sustainability",
                    impact: "Zero waste program, 5 nových trás, 500+ turistov ročne",
                    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80"
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
                    credentials: "PhD. v oblasti environmentálnych vied, špecializácia na horské ekosystémy",
                    experience: "15 rokov v ochrane prírody Tatier. Vedie výskumné projekty, publikuje v medzinárodných časopisoch a je aktívnou členkou viacerých environmentálnych organizácií.",
                    image: "https://randomuser.me/api/portraits/women/44.jpg",
                    initials: "EK"
                },
                {
                    name: "Ing. Matej Horák",
                    position: "Podpredseda",
                    credentials: "Ing. krajinnej architektúry, expert na udržateľný rozvoj",
                    experience: "Špecialista na ekologické plánovanie a obnovu verejných priestorov. Venuje sa aj edukácii mládeže v oblasti ochrany prírody.",
                    image: "https://randomuser.me/api/portraits/men/32.jpg",
                    initials: "MH"
                },
                {
                    name: "Mgr. Lucia Bieliková",
                    position: "Projektová manažérka",
                    credentials: "Mgr. v oblasti kultúrneho dedičstva",
                    experience: "Organizuje kultúrne podujatia, vedie folklórny súbor a je autorkou viacerých publikácií o histórii regiónu.",
                    image: "https://randomuser.me/api/portraits/women/65.jpg",
                    initials: "LB"
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
        let adminActivities = [];
        try {
            adminActivities = JSON.parse(localStorage.getItem('adminActivities') || '[]');
        } catch {}
        const allActivities = [...adminActivities, ...this.data.activities];
        // Render activity cards
        activitiesGrid.innerHTML = allActivities.map((activity, idx) => `
            <article class="activity-card" tabindex="0" data-idx="${idx}" data-category="${(activity.category||'').toLowerCase()}">
                ${activity.image ? `<img src="${activity.image}" alt="obrázok" class="activity-card-image">` : ''}
                <span class="activity-card-category">${activity.category||''}</span>
                <h3 class="activity-card-title">${activity.title}</h3>
                <div class="activity-card-action">
                    <button type="button" class="activity-toggle" aria-label="Zobraziť detail aktivity" data-idx="${idx}">Zobraziť detail</button>
                </div>
            </article>
        `).join('');
        // Add popup modal logic
        if (!document.getElementById('activityModal')) {
            const modal = document.createElement('div');
            modal.id = 'activityModal';
            modal.style.display = 'none';
            modal.innerHTML = `
                <div id="activityModalOverlay" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.55);z-index:10000;display:flex;align-items:center;justify-content:center;">
                    <div id="activityModalContent" style="background:#fff;max-width:600px;width:90vw;max-height:90vh;overflow:auto;border-radius:18px;box-shadow:0 8px 32px rgba(0,0,0,0.18);padding:2.5em 2em;position:relative;">
                        <button id="closeActivityModal" style="position:absolute;top:18px;right:18px;font-size:1.7em;background:none;border:none;cursor:pointer;">&times;</button>
                        <div id="activityModalBody"></div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        const modal = document.getElementById('activityModal');
        const modalOverlay = modal.querySelector('#activityModalOverlay');
        const modalBody = modal.querySelector('#activityModalBody');
        const closeBtn = modal.querySelector('#closeActivityModal');
        document.querySelectorAll('.activity-toggle').forEach((btn) => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const idx = btn.getAttribute('data-idx');
                const activity = allActivities[idx];
                modalBody.innerHTML = `
                    ${activity.image ? `<img src="${activity.image}" alt="obrázok" style="width:100%;max-height:260px;object-fit:cover;border-radius:12px;">` : ''}
                    <h2 style="margin-top:1em;">${activity.title}</h2>
                    <div style="margin:1em 0 1.5em 0;color:#888;font-weight:500;">${activity.category||''}</div>
                    <div style="font-size:1.1em;">${activity.description}</div>
                    <div style="margin-top:1.5em;font-size:1.05em;"><strong>Výsledok:</strong> ${activity.impact||''}</div>
                `;
                modal.style.display = 'block';
            });
        });
        closeBtn.onclick = () => { modal.style.display = 'none'; };
        modalOverlay.onclick = (e) => { if (e.target === modalOverlay) modal.style.display = 'none'; };
    }
    
    renderEvents() {
        const eventsTimeline = document.getElementById('eventsTimeline');
        if (!eventsTimeline) return;
        let adminEvents = [];
        try {
            adminEvents = JSON.parse(localStorage.getItem('adminEvents') || '[]');
        } catch {}
        const allEvents = [...adminEvents, ...this.data.events];
        eventsTimeline.innerHTML = allEvents.map((event, idx) => `
            <article class="event-item" tabindex="0" data-idx="${idx}">
                <div class="event-date-place" style="margin-bottom:0.3em;">
                    <b>${event.date||''}</b>
                    ${event.place ? `<span style='color:#a88b2a;margin-left:0.7em;'>${event.place}</span>` : ''}
                </div>
                <h3 class="event-title">${event.title}</h3>
                <div class="event-card-action" style="margin-top:0.7em;display:flex;justify-content:center;">
                    <button type="button" class="event-toggle" aria-label="Zobraziť detail podujatia" data-idx="${idx}">Zobraziť detail</button>
                </div>
            </article>
        `).join('');
        // Modal for event details
        if (!document.getElementById('eventModal')) {
            const modal = document.createElement('div');
            modal.id = 'eventModal';
            modal.style.display = 'none';
            modal.innerHTML = `
                <div id="eventModalOverlay" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.55);z-index:10000;display:flex;align-items:center;justify-content:center;">
                    <div id="eventModalContent" style="background:#fff;max-width:600px;width:90vw;max-height:90vh;overflow:auto;border-radius:18px;box-shadow:0 8px 32px rgba(0,0,0,0.18);padding:2.5em 2em;position:relative;">
                        <button id="closeEventModal" style="position:absolute;top:18px;right:18px;font-size:1.7em;background:none;border:none;cursor:pointer;">&times;</button>
                        <div id="eventModalBody"></div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        const modal = document.getElementById('eventModal');
        const modalOverlay = modal.querySelector('#eventModalOverlay');
        const modalBody = modal.querySelector('#eventModalBody');
        const closeBtn = modal.querySelector('#closeEventModal');
        document.querySelectorAll('.event-toggle').forEach((btn) => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const idx = btn.getAttribute('data-idx');
                const event = allEvents[idx];
                modalBody.innerHTML = `
                    <h2 style="margin-top:1em;">${event.title}</h2>
                    <div style="margin:1em 0 0.5em 0;color:#888;font-weight:500;">
                        ${event.date ? `<b>${event.date}</b>` : ''}
                        ${event.place ? `<span style='color:#a88b2a;margin-left:0.7em;'>${event.place}</span>` : ''}
                    </div>
                    <div style="font-size:1.1em;">${event.description||''}</div>
                `;
                modal.style.display = 'block';
            });
        });
        closeBtn.onclick = () => { modal.style.display = 'none'; };
        modalOverlay.onclick = (e) => { if (e.target === modalOverlay) modal.style.display = 'none'; };
    }
    
    renderTeam() {
        const teamGrid = document.getElementById('teamGrid');
        if (!teamGrid) return;
        
        teamGrid.innerHTML = this.data.team.map(member => `
            <article class="team-member">
                <div class="member-avatar" style="width:70px;height:70px;overflow:hidden;border-radius:50%;margin-bottom:0.7em;background:#eee;display:flex;align-items:center;justify-content:center;">
                    ${member.image ? `<img src="${member.image}" alt="${member.name}" style="width:100%;height:100%;object-fit:cover;">` : member.initials}
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
            rootMargin: '0px 0px -20px 0px' // less delay
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
                        this.staggerChildAnimations(entry.target, 40); // faster
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
            element.style.transition = `opacity 0.3s ease ${index * 0.04}s, transform 0.3s ease ${index * 0.04}s`;
            observer.observe(element);
        });
    }
    
    staggerChildAnimations(parent, speed = 100) {
        const children = parent.children;
        Array.from(children).forEach((child, index) => {
            setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            }, index * speed);
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
        // Compare password as string, not as variable name
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
        if (loginScreen) loginScreen.classList.add('hidden');
        if (dashboard) dashboard.classList.remove('hidden');
    }
}


// Elegant initialization
document.addEventListener('DOMContentLoaded', () => {
    new ElegantMountainApp();
    new ElegantAdminPanel();
    setupAdminBlogPhotoManagement();
    setupAdminActivitiesEventsManagement();
});

// Blog & Photo Management for Admin Panel
function setupAdminBlogPhotoManagement() {
    // Only run on admin page
    if (!window.location.pathname.toLowerCase().includes('admin.html')) return;

    // --- Blog Management ---
    const blogForm = document.getElementById('addBlogForm');
    const blogListDiv = document.getElementById('blogList');
    let blogs = JSON.parse(localStorage.getItem('adminBlogs') || '[]');

    function renderBlogs() {
        if (!blogListDiv) return;
        if (blogs.length === 0) {
            blogListDiv.innerHTML = '<em>Žiadne blogy.</em>';
            return;
        }
        blogListDiv.innerHTML = blogs.map((b, i) => `
            <div class="admin-blog-item" style="border-bottom:1px solid #eee;padding:8px 0;display:flex;align-items:center;gap:1em;">
                ${b.image ? `<img src="${b.image}" alt="obrázok" style="width:60px;height:40px;object-fit:cover;border-radius:6px;">` : ''}
                <div style="flex:1;">
                    <strong>${b.title}</strong><br>
                    <span style="font-size:0.95em;">${b.content}</span>
                </div>
                <button onclick="deleteBlog(${i})" class="btn btn-danger" style="margin-left:1em;">Vymazať</button>
            </div>
        `).join('');
    }

    window.deleteBlog = function(idx) {
        blogs.splice(idx, 1);
        localStorage.setItem('adminBlogs', JSON.stringify(blogs));
        renderBlogs();
    };

    if (blogForm) {
        blogForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('blogTitle').value.trim();
            const content = document.getElementById('blogContent').value.trim();
            const image = document.getElementById('blogImage').value.trim();
            if (!title || !content) return;
            blogs.unshift({ title, content, image });
            localStorage.setItem('adminBlogs', JSON.stringify(blogs));
            blogForm.reset();
            renderBlogs();
        });
    }
    renderBlogs();

    // --- Photo Management ---
    const photoForm = document.getElementById('addPhotoForm');
    const photoListDiv = document.getElementById('photoList');
    let photos = JSON.parse(localStorage.getItem('adminPhotos') || '[]');

    function renderPhotos() {
        if (!photoListDiv) return;
        if (photos.length === 0) {
            photoListDiv.innerHTML = '<em>Žiadne fotografie.</em>';
            return;
        }
        photoListDiv.innerHTML = photos.map((p, i) => `
            <div class="admin-photo-item" style="border-bottom:1px solid #eee;padding:8px 0;display:flex;align-items:center;gap:1em;">
                <img src="${p.url}" alt="foto" style="width:60px;height:40px;object-fit:cover;border-radius:6px;">
                <div style="flex:1;">
                    <span>${p.caption || ''}</span>
                </div>
                <button onclick="deletePhoto(${i})" class="btn btn-danger" style="margin-left:1em;">Vymazať</button>
            </div>
        `).join('');
    }

    window.deletePhoto = function(idx) {
        photos.splice(idx, 1);
        localStorage.setItem('adminPhotos', JSON.stringify(photos));
        renderPhotos();
    };

    if (photoForm) {
        photoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const url = document.getElementById('photoUrl').value.trim();
            const caption = document.getElementById('photoCaption').value.trim();
            if (!url) return;
            photos.unshift({ url, caption });
            localStorage.setItem('adminPhotos', JSON.stringify(photos));
            photoForm.reset();
            renderPhotos();
        });
    }
    renderPhotos();
}
// Admin Management for Activities, Events, and Photos
function setupAdminActivitiesEventsManagement() {
    // Only run on admin page
    if (!window.location.pathname.toLowerCase().includes('admin.html')) return;

    // --- Activities Management ---
    const activityForm = document.getElementById('addActivityForm');
    const activityListDiv = document.getElementById('activityList');
    let activities = JSON.parse(localStorage.getItem('adminActivities') || '[]');

    function renderActivitiesAdmin() {
        if (!activityListDiv) return;
        if (activities.length === 0) {
            activityListDiv.innerHTML = '<em>Žiadne aktivity.</em>';
            return;
        }
        activityListDiv.innerHTML = activities.map((a, i) => `
            <div class="admin-activity-item" style="border-bottom:1px solid #eee;padding:8px 0;display:flex;align-items:center;gap:1em;">
                ${a.image ? `<img src="${a.image}" alt="obrázok" style="width:60px;height:40px;object-fit:cover;border-radius:6px;">` : ''}
                <div style="flex:1;">
                    <strong>${a.title}</strong><br>
                    <span style="font-size:0.95em;">${a.description}</span><br>
                    <span style="font-size:0.9em;color:#888;">${a.category || ''} ${a.impact ? '• ' + a.impact : ''}</span>
                </div>
                <button onclick="deleteActivity(${i})" class="btn btn-danger" style="margin-left:1em;">Vymazať</button>
            </div>
        `).join('');
    }

    window.deleteActivity = function(idx) {
        activities.splice(idx, 1);
        localStorage.setItem('adminActivities', JSON.stringify(activities));
        renderActivitiesAdmin();
    };

    if (activityForm) {
        activityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('activityTitle').value.trim();
            const description = document.getElementById('activityDescription').value.trim();
            const category = document.getElementById('activityCategory').value.trim();
            const impact = document.getElementById('activityImpact').value.trim();
            const image = document.getElementById('activityImage').value.trim();
            if (!title || !description) return;
            activities.unshift({ title, description, category, impact, image });
            localStorage.setItem('adminActivities', JSON.stringify(activities));
            activityForm.reset();
            renderActivitiesAdmin();
            // Re-render homepage activities if on admin page
            if (window.parent && window.parent !== window && window.parent.renderActivities) {
                window.parent.renderActivities();
            } else if (window.renderActivities) {
                window.renderActivities();
            } else if (typeof ElegantMountainApp !== 'undefined') {
                // Try to re-render if on same page
                if (document.getElementById('activitiesGrid')) {
                    new ElegantMountainApp().renderActivities();
                }
            }
        });
    }
    renderActivitiesAdmin();

    // --- Events Management ---
    const eventForm = document.getElementById('addEventForm');
    const eventListDiv = document.getElementById('eventList');
    let events = JSON.parse(localStorage.getItem('adminEvents') || '[]');

    function renderEventsAdmin() {
        if (!eventListDiv) return;
        if (events.length === 0) {
            eventListDiv.innerHTML = '<em>Žiadne podujatia.</em>';
            return;
        }
        eventListDiv.innerHTML = events.map((e, i) => `
            <div class="admin-event-item" style="border-bottom:1px solid #eee;padding:8px 0;display:flex;align-items:center;gap:1em;">
                <div style="flex:1;">
                    <strong>${e.title}</strong><br>
                    <span style="font-size:0.95em;">${e.description}</span><br>
                    <span style="font-size:0.9em;color:#888;">${e.date}${e.place ? ' | <span style=\'color:#a88b2a;\'>' + e.place + '</span>' : ''}</span>
                </div>
                <button onclick="deleteEvent(${i})" class="btn btn-danger" style="margin-left:1em;">Vymazať</button>
            </div>
        `).join('');
    }

    window.deleteEvent = function(idx) {
        events.splice(idx, 1);
        localStorage.setItem('adminEvents', JSON.stringify(events));
        renderEventsAdmin();
    };

    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('eventTitle').value.trim();
            const date = document.getElementById('eventDate').value.trim();
            const place = document.getElementById('eventPlace').value.trim();
            const description = document.getElementById('eventDescription').value.trim();
            if (!title || !date || !description) return;
            events.unshift({ title, date, place, description });
            localStorage.setItem('adminEvents', JSON.stringify(events));
            eventForm.reset();
            renderEventsAdmin();
        });
    }
    renderEventsAdmin();

    // --- Photo Management ---
    const photoForm = document.getElementById('addPhotoForm');
    const photoListDiv = document.getElementById('photoList');
    let photos = JSON.parse(localStorage.getItem('adminPhotos') || '[]');

    function renderPhotos() {
        if (!photoListDiv) return;
        if (photos.length === 0) {
            photoListDiv.innerHTML = '<em>Žiadne fotografie.</em>';
            return;
        }
        photoListDiv.innerHTML = photos.map((p, i) => `
            <div class="admin-photo-item" style="border-bottom:1px solid #eee;padding:8px 0;display:flex;align-items:center;gap:1em;">
                <img src="${p.url}" alt="foto" style="width:60px;height:40px;object-fit:cover;border-radius:6px;">
                <div style="flex:1;">
                    <span>${p.caption || ''}</span>
                </div>
                <button onclick="deletePhoto(${i})" class="btn btn-danger" style="margin-left:1em;">Vymazať</button>
            </div>
        `).join('');
    }

    window.deletePhoto = function(idx) {
        photos.splice(idx, 1);
        localStorage.setItem('adminPhotos', JSON.stringify(photos));
        renderPhotos();
    };

    if (photoForm) {
        photoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const url = document.getElementById('photoUrl').value.trim();
            const caption = document.getElementById('photoCaption').value.trim();
            if (!url) return;
            photos.unshift({ url, caption });
            localStorage.setItem('adminPhotos', JSON.stringify(photos));
            photoForm.reset();
            renderPhotos();
        });
    }
    renderPhotos();
    // End of setupAdminActivitiesEventsManagement
}

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