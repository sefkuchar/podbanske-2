
// ---------------------------------
// Main website app rendering and synchronization
// ---------------------------------
class ElegantMountainApp {
    constructor() {
      // Default example data - only used to initialize localStorage if empty
      const defaultData = {
        activities: [
          {
            id: 1,
            title: "Ochrana horského ekosystému",
            description:
              "Naša iniciatíva sa zameriava na obnovu a ochranu pôvodných rastlinných a živočíšnych druhov v Tatrách. V spolupráci s odborníkmi a dobrovoľníkmi monitorujeme ohrozené biotopy, vysádzame pôvodné stromy a čistíme horské chodníky od invazívnych rastlín. Výsledkom je zdravší ekosystém a lepšie podmienky pre turistov aj miestnu faunu.",
            category: "Environment",
            impact: "15 km obnovených chodníkov, 2 nové biotopy zachránené",
            image:
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
          },
          {
            id: 2,
            title: "Kultúrne dedičstvo regiónu",
            description:
              "Organizujeme folklórne festivaly, remeselné trhy a workshopy, kde miestni majstri odovzdávajú svoje zručnosti mladším generáciám. Vydali sme knihu o histórii Podbanského a digitalizovali archívne fotografie, aby tradície žili aj v digitálnom veku.",
            category: "Heritage",
            impact: "12 kultúrnych programov ročne, 1 000+ návštevníkov",
            image:
              "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
          },
          {
            id: 3,
            title: "Komunitný rozvoj",
            description:
              "Spájame generácie prostredníctvom komunitných záhrad, spoločných brigád a vzdelávacích seminárov. Podporujeme mladé rodiny, seniorov aj podnikateľov, aby sa každý cítil v Podbanskom doma. Vďaka grantom sme zrekonštruovali detské ihrisko a založili komunitnú knižnicu.",
            category: "Community",
            impact: "Podpora 120 obyvateľov, 3 nové komunitné projekty",
            image:
              "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
          },
          {
            id: 4,
            title: "Udržateľný turizmus",
            description:
              "Vytvorili sme sieť ekologických turistických trás s informačnými tabuľami o prírode a histórii regiónu. Spolupracujeme s miestnymi podnikmi na zavádzaní zero waste opatrení a propagujeme zodpovedné správanie návštevníkov. Naše podujatia sú prístupné aj pre rodiny s deťmi a osoby so zníženou pohyblivosťou.",
            category: "Sustainability",
            impact: "Zero waste program, 5 nových trás, 500+ turistov ročne",
            image:
              "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
          },
        ],
        events: [
          {
            id: 1,
            title: "Zimná gala večera",
            date: "15. december 2024",
            place: "",
            description:
              "Prestižne podujatie s degustáciou miestnych špecialít, kultúrnym programom a prezentáciou výsledkov našej práce za rok 2024.",
          },
          {
            id: 2,
            title: "Jarný festival prírody",
            date: "Apríl 2025",
            place: "",
            description:
              "Medzinárodná konferencia o ochrane horských ekosystémov spojená s praktickými workshopmi a terénnou prácou.",
          },
        ],
        team: [
          {
            name: "Dr. Elena Kováčová",
            position: "Predsedníčka",
            credentials:
              "PhD. v oblasti environmentálnych vied, špecializácia na horské ekosystémy",
            experience:
              "15 rokov v ochrane prírody Tatier. Vedie výskumné projekty, publikuje v medzinárodných časopisoch a je aktívnou členkou viacerých environmentálnych organizácií.",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            initials: "EK",
          },
          {
            name: "Ing. Matej Horák",
            position: "Podpredseda",
            credentials: "Ing. krajinnej architektúry, expert na udržateľný rozvoj",
            experience:
              "Špecialista na ekologické plánovanie a obnovu verejných priestorov. Venuje sa aj edukácii mládeže v oblasti ochrany prírody.",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            initials: "MH",
          },
          {
            name: "Mgr. Lucia Bieliková",
            position: "Projektová manažérka",
            credentials: "Mgr. v oblasti kultúrneho dedičstva",
            experience:
              "Organizuje kultúrne podujatia, vedie folklórny súbor a je autorkou viacerých publikácií o histórii regiónu.",
            image: "https://randomuser.me/api/portraits/women/65.jpg",
            initials: "LB",
          },
        ],
      };
      // Initialize default activities in localStorage if none exist
      try {
        const storedActivities = localStorage.getItem('adminActivities');
        if (!storedActivities || JSON.parse(storedActivities).length === 0) {
          localStorage.setItem('adminActivities', JSON.stringify(defaultData.activities));
        }
      } catch (err) {
        console.error('Error initializing default activities:', err);
      }
      
      this.init();
    }

    init() {
      this.setupNavigation();
      this.setupScrollEffects();
  this.renderActivities();
  // history/nature/rules/magic are global functions (renderers), call them directly
  renderHistory();
  renderNature();
  renderRules();
  renderMagic();
      this.setupContactForm();
  
      this.loadAndApplyAllSections();
  
      this.initializeAnimations();
      this.setupLocalStorageListener();
      // When the tab/window regains focus, re-load sections from localStorage.
      // This helps when admin edits in the same browser (navigating between pages)
      window.addEventListener('focus', () => {
        try {
          this.loadAndApplyAllSections();
        } catch (err) {
          console.error('Error reloading sections on focus', err);
        }
      });
    }
  
    setupNavigation() {
      const navbar = document.getElementById("mainNav");
      const navLinks = document.querySelectorAll(".nav-link");
      const sections = document.querySelectorAll("section[id]");
      let ticking = false;
      const updateNavbar = () => {
        if (window.scrollY > 100) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
        let current = "";
        sections.forEach((section) => {
          const sectionTop = section.offsetTop - 150;
          if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
          }
        });
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href").substring(1) === current) {
            link.classList.add("active");
          }
        });
        ticking = false;
      };
      window.addEventListener("scroll", () => {
        if (!ticking) {
          requestAnimationFrame(updateNavbar);
          ticking = true;
        }
      });
      navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = link.getAttribute("href").substring(1);
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: "smooth",
            });
          }
        });
      });
    }
  
    setupScrollEffects() {
      let ticking = false;
      const updateParallax = () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector(".hero-image");
        if (heroImage && scrolled < window.innerHeight) {
          const rate = scrolled * -0.3;
          heroImage.style.transform = `translateY(${rate}px)`;
        }
        ticking = false;
      };
      window.addEventListener("scroll", () => {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      });
    }
  
    renderActivities() {
      const activitiesGrid = document.getElementById("activitiesGrid");
      if (!activitiesGrid) return;
      // Load all activities from localStorage
      let activities = [];
      try {
        activities = JSON.parse(localStorage.getItem("adminActivities") || "[]");
      } catch (err) {
        console.error('Error loading activities:', err);
      }
      activitiesGrid.innerHTML = activities
        .map(
          (activity, idx) => `
        <article class="activity-card" tabindex="0" data-idx="${idx}" data-category="${
            (activity.category || "").toLowerCase()
          }">
            ${
              activity.image
                ? `<img src="${activity.image}" alt="obrázok" class="activity-card-image">`
                : ""
            }
            <span class="activity-card-category">${activity.category || ""}</span>
            <h3 class="activity-card-title">${activity.title}</h3>
            <div class="activity-card-action">
                <button type="button" class="activity-toggle" aria-label="Zobraziť detail aktivity" data-idx="${idx}">Zobraziť detail</button>
            </div>
        </article>
        `
        )
        .join("");
      if (!document.getElementById("activityModal")) {
        const modal = document.createElement("div");
        modal.id = "activityModal";
        modal.style.display = "none";
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
      const modal = document.getElementById("activityModal");
      const modalOverlay = modal.querySelector("#activityModalOverlay");
      const modalBody = modal.querySelector("#activityModalBody");
      const closeBtn = modal.querySelector("#closeActivityModal");
      document.querySelectorAll(".activity-toggle").forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          const idx = btn.getAttribute("data-idx");
          const activity = activities[idx];
          modalBody.innerHTML = `
            ${
              activity.image
                ? `<img src="${activity.image}" alt="obrázok" style="width:100%;max-height:260px;object-fit:cover;border-radius:12px;">`
                : ""
            }
            <h2 style="margin-top:1em;">${activity.title}</h2>
            <div style="margin:1em 0 1.5em 0;color:#888;font-weight:500;">${activity.category || ""}</div>
            <div style="font-size:1.1em;">${activity.description}</div>
            <div style="margin-top:1.5em;font-size:1.05em;"><strong>Výsledok:</strong> ${
              activity.impact || ""
            }</div>
            `;
          modal.style.display = "block";
        });
      });
      closeBtn.onclick = () => {
        modal.style.display = "none";
      };
      modalOverlay.onclick = (e) => {
        if (e.target === modalOverlay) modal.style.display = "none";
      };
    }
  
    renderEvents() {
      const eventsTimeline = document.getElementById("eventsTimeline");
      if (!eventsTimeline) return;
      let adminEvents = [];
      try {
        adminEvents = JSON.parse(localStorage.getItem("adminEvents") || "[]");
      } catch {}
      const allEvents = [...adminEvents, ...this.data.events];
      eventsTimeline.innerHTML = allEvents
        .map(
          (event, idx) => `
      <article class="event-item" tabindex="0" data-idx="${idx}">
        <div class="event-date-place" style="margin-bottom:0.3em;">
            <b>${event.date || ""}</b>
            ${
              event.place
                ? `<span style='color:#a88b2a;margin-left:0.7em;'>${event.place}</span>`
                : ""
            }
        </div>
        <h3 class="event-title">${event.title}</h3>
        <div class="event-card-action" style="margin-top:0.7em;display:flex;justify-content:center;">
            <button type="button" class="event-toggle" aria-label="Zobraziť detail podujatia" data-idx="${idx}">Zobraziť detail</button>
        </div>
      </article>
      `
        )
        .join("");
      if (!document.getElementById("eventModal")) {
        const modal = document.createElement("div");
        modal.id = "eventModal";
        modal.style.display = "none";
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
      const modal = document.getElementById("eventModal");
      const modalOverlay = modal.querySelector("#eventModalOverlay");
      const modalBody = modal.querySelector("#eventModalBody");
      const closeBtn = modal.querySelector("#closeEventModal");
      document.querySelectorAll(".event-toggle").forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          const idx = btn.getAttribute("data-idx");
          const event = allEvents[idx];
          modalBody.innerHTML = `
            <h2 style="margin-top:1em;">${event.title}</h2>
            <div style="margin:1em 0 0.5em 0;color:#888;font-weight:500;">
                ${event.date ? `<b>${event.date}</b>` : ""}
                ${
                  event.place
                    ? `<span style='color:#a88b2a;margin-left:0.7em;'>${event.place}</span>`
                    : ""
                }
            </div>
            <div style="font-size:1.1em;">${event.description || ""}</div>
            `;
          modal.style.display = "block";
        });
      });
      closeBtn.onclick = () => {
        modal.style.display = "none";
      };
      modalOverlay.onclick = (e) => {
        if (e.target === modalOverlay) modal.style.display = "none";
      };
    }
  
    renderTeam() {
      const teamGrid = document.getElementById("teamGrid");
      if (!teamGrid) return;
      let teamData = JSON.parse(localStorage.getItem("teamMembers")) || this.data.team;
      teamGrid.innerHTML = teamData
        .map(
          (member) => `
        <article class="team-member">
          <div class="member-avatar" style="width:70px;height:70px;overflow:hidden;border-radius:50%;margin-bottom:0.7em;background:#eee;display:flex;align-items:center;justify-content:center;">
            ${
              member.image
                ? `<img src="${member.image}" alt="${member.name}" style="width:100%;height:100%;object-fit:cover;">`
                : member.initials || ""
            }
          </div>
          <h3 class="member-name">${member.name || ""}</h3>
          <div class="member-position">${member.position || ""}</div>
          <div class="member-credentials">${member.credentials || ""}</div>
          <div class="member-experience">${member.experience || ""}</div>
        </article>
      `
        )
        .join("");
    }
  
    setupContactForm() {
      // Your contact form code if any
    }
  
    initializeAnimations() {
      // Your animation init code if any
    }
  
    setupLocalStorageListener() {
      window.addEventListener("storage", (event) => {
        if (!event.key) return;
  try {
          switch (event.key) {
            case "heroSection":
              applyHeroSection(JSON.parse(event.newValue || '{}'));
              break;
            case "aboutSection":
              applyAboutSection(JSON.parse(event.newValue || '{}'));
              break;
            case "adminActivities":
              // re-render activities both on admin list and public grid
              this.renderActivities();
              break;
            case "adminEvents":
              this.renderEvents();
              break;
            case "historySection":
              renderHistory();
              break;
            case "natureSection":
              renderNature();
              break;
            case "rulesSection":
              renderRules();
              break;
            case "magicSection":
              renderMagic();
              break;
            case "contactInfo":
              try { applyContactInfo(JSON.parse(event.newValue || '{}')); } catch {}
              break;
            case "footerText":
              applyFooterText(event.newValue || '');
              break;
            default:
              break;
          }
        } catch (err) {
          console.error('Error handling storage event for', event.key, err);
        }
      });
    }
  
    loadAndApplyAllSections() {
      ['heroSection', 'aboutSection', 'adminActivities', 'adminEvents', 'historySection', 'natureSection', 'rulesSection', 'magicSection', 'contactInfo'].forEach((key) => {
        let data = localStorage.getItem(key);
        if (!data) return;
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
        switch(key){
          case 'heroSection': applyHeroSection(data); break;
          case 'aboutSection': applyAboutSection(data); break;
          case 'adminActivities': this.renderActivities(); break;
          case 'adminEvents': this.renderEvents(); break;
          case 'historySection': renderHistory(); break;
          case 'natureSection': renderNature(); break;
          case 'rulesSection': renderRules(); break;
          case 'magicSection': renderMagic(); break;
          case 'contactInfo': applyContactInfo(data); break;
        }
      });

      // footerText is stored as a plain string, not JSON
      const footerText = localStorage.getItem('footerText');
      if (footerText) applyFooterText(footerText);
    }
  }
  
  function applyHeroSection(data) {
    const eyebrow = document.querySelector(".hero-eyebrow");
    if (eyebrow) eyebrow.textContent = data.eyebrow || "";
    const mainHeadline = document.querySelector(".hero-headline-main");
    if (mainHeadline) mainHeadline.textContent = data.mainHeadline || "";
    const subHeadline = document.querySelector(".hero-headline-sub");
    if (subHeadline) subHeadline.textContent = data.subHeadline || "";
    const description = document.querySelector(".hero-description");
    if (description) description.textContent = data.description || "";
    const heroImage = document.querySelector(".hero-image");
    if (heroImage && data.backgroundImage) {
      heroImage.style.backgroundImage = `linear-gradient(rgba(58, 47, 42, 0.3), rgba(44, 74, 57, 0.4)), url('${data.backgroundImage}')`;
      heroImage.style.backgroundAttachment = "fixed";
      heroImage.style.backgroundPosition = "center";
      heroImage.style.backgroundRepeat = "no-repeat";
      heroImage.style.backgroundSize = "cover";
    }
  }
  
  function applyAboutSection(data) {
    const leadEl = document.querySelector(".lead-text");
    if(leadEl) leadEl.textContent = data.lead || '';
    const paragraphs = document.querySelectorAll(".about-narrative p");
    if(paragraphs.length >=2){
      // support older shape (paragraph1/2) and newer shape (content)
      if (data.paragraph1 || data.paragraph2) {
        paragraphs[0].textContent = data.paragraph1 || '';
        paragraphs[1].textContent = data.paragraph2 || '';
      } else if (data.content) {
        // split content into two paragraphs if possible
        const parts = data.content.split('\n\n');
        paragraphs[0].textContent = parts[0] || '';
        paragraphs[1].textContent = parts.slice(1).join('\n\n') || '';
      }
    }
    const imgEl = document.querySelector(".about-visual img");
    if(imgEl) imgEl.src = data.image || '';
  }
  
  
  function applyImpactMetrics(metrics) {
    const metricsGrid = document.querySelector(".metrics-grid");
    if (!metricsGrid) return;
  
    metricsGrid.innerHTML = metrics
      .map(
        (m) => `
        <div class="metric-card" tabindex="0">
          <div class="metric-value">${m.value || ""}<span class="metric-unit">${m.unit || ""}</span></div>
          <div class="metric-label">${m.label || ""}</div>
        </div>`
      )
      .join("");
  }
  
  function applyTeamMembers(team) {
    const teamGrid = document.getElementById("teamGrid");
    if (!teamGrid) return;
  
    teamGrid.innerHTML = team
      .map(
        (m) => `
      <article class="team-member">
        <div class="member-avatar" style="width:70px;height:70px;overflow:hidden;border-radius:50%;margin-bottom:0.7em;background:#eee;display:flex;align-items:center;justify-content:center;">
          ${
            m.image
              ? `<img src="${m.image}" alt="${m.name}" style="width:100%;height:100%;object-fit:cover;">`
              : ""
          }
        </div>
        <h3 class="member-name">${m.name || ""}</h3>
        <div class="member-position">${m.position || ""}</div>
        <div class="member-credentials">${m.credentials || ""}</div>
        <div class="member-experience">${m.experience || ""}</div>
      </article>`
      )
      .join("");
  }
  
  function applyContactInfo(data) {
    const contactSection = document.getElementById("contact");
    if (!contactSection) return;
    const contactMethods = contactSection.querySelectorAll(".contact-method .method-details p");
    if (contactMethods.length >= 3) {
      contactMethods[0].innerHTML = (data.address || "").replace(/\n/g, "<br>");
      contactMethods[1].textContent = data.phone || "";
      contactMethods[2].textContent = data.email || "";
    }
  }
  
  function applyFooterText(text) {
    const footerP = document.querySelector(".footer-bottom p");
    if (footerP) footerP.textContent = text || "";
  }

  // New section rendering functions
  function renderHistory() {
    const historyContent = document.getElementById("historyContent");
    if (!historyContent) return;
    
    try {
      const historyData = JSON.parse(localStorage.getItem("historySection")) || {};
      historyContent.innerHTML = `
        <div class="content-layout">
          <div class="content-text">
            <h3>${historyData.title || ""}</h3>
            <div class="content-body">${historyData.content || ""}</div>
          </div>
          ${historyData.image ? `
            <div class="content-image">
              <img src="${historyData.image}" alt="História Podbanského">
            </div>
          ` : ""}
        </div>
      `;
    } catch (err) {
      console.error("Error rendering history section:", err);
    }
  }

  function renderNature() {
    const natureContent = document.getElementById("natureContent");
    if (!natureContent) return;
    
    try {
      const natureData = JSON.parse(localStorage.getItem("natureSection")) || {};
      natureContent.innerHTML = `
        <div class="content-layout">
          <div class="content-text">
            <h3>${natureData.title || ""}</h3>
            <div class="content-body">${natureData.content || ""}</div>
          </div>
          ${natureData.image ? `
            <div class="content-image">
              <img src="${natureData.image}" alt="Príroda Podbanského">
            </div>
          ` : ""}
        </div>
      `;
    } catch (err) {
      console.error("Error rendering nature section:", err);
    }
  }

  function renderRules() {
    const rulesContent = document.getElementById("rulesContent");
    if (!rulesContent) return;
    
    try {
      const rulesData = JSON.parse(localStorage.getItem("rulesSection")) || {};
      rulesContent.innerHTML = `
        <div class="content-layout">
          <div class="content-text">
            <h3>${rulesData.title || ""}</h3>
            <div class="content-body">${rulesData.content || ""}</div>
          </div>
        </div>
      `;
    } catch (err) {
      console.error("Error rendering rules section:", err);
    }
  }

  function renderMagic() {
    const magicContent = document.getElementById("magicContent");
    if (!magicContent) return;
    
    try {
      const magicData = JSON.parse(localStorage.getItem("magicSection")) || {};
      magicContent.innerHTML = `
        <div class="content-layout">
          <div class="content-text">
            <h3>${magicData.title || ""}</h3>
            <div class="content-body">${magicData.content || ""}</div>
          </div>
          ${magicData.image ? `
            <div class="content-image">
              <img src="${magicData.image}" alt="Magické Podbanské">
            </div>
          ` : ""}
        </div>
      `;
    } catch (err) {
      console.error("Error rendering magic section:", err);
    }
  }
  
  // ---------------------------------
  // Admin panel functionality
  // ---------------------------------
  class ElegantAdminPanel {
    constructor() {
      this.setupAdmin();
    }
  
    setupAdmin() {
      if (window.location.pathname.includes("admin.html")) {
        this.initAdminPage();
      }
    }
  
    initAdminPage() {
      const loginForm = document.getElementById("adminLoginForm");
      if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
          e.preventDefault();
          this.handleLogin();
        });
      }
    }
  
    handleLogin() {
      const username = document.getElementById("adminUsername")?.value.trim();
      const password = document.getElementById("adminPassword")?.value.trim();
  
      if (username === "admin" && password === "podban2024") {
        this.showAdminDashboard();
      } else {
        this.showLoginError();
      }
    }
  
    showLoginError() {
      const errorDiv = document.getElementById("adminLoginError");
      if (errorDiv) {
        errorDiv.textContent = "Nesprávne prihlasovacie údaje.";
        errorDiv.style.display = "block";
        setTimeout(() => {
          errorDiv.style.display = "none";
        }, 3000);
      }
    }
  
    showAdminDashboard() {
      const loginScreen = document.getElementById("adminLoginScreen");
      const dashboard = document.getElementById("adminDashboard");
      if (!loginScreen || !dashboard) {
        console.error("Login screen or dashboard not found");
        return;
      }
      loginScreen.classList.add("hidden");
      dashboard.classList.remove("hidden");
      // Hide login screen and show dashboard
      loginScreen.classList.add("hidden");
      dashboard.classList.remove("hidden");
      // Initialize admin management UI and handlers
      this.initAdminManagement();
    }
  
    initAdminManagement() {
      this.setupNavigationManagement();
      this.setupHeroSectionManagement();
      this.setupAboutSectionManagement();
      this.setupActivitiesManagement();
      this.setupEventsManagement();
      this.setupContactManagement();
      this.setupFooterManagement();
    }
  
    // Navigation management - example
    setupNavigationManagement() {
      let navData =
        JSON.parse(localStorage.getItem("siteNavigation")) || [
          { label: "Domov", href: "#home" },
          { label: "O združení", href: "#about" },
          { label: "Naša činnosť", href: "#activities" },
          { label: "Výsledky", href: "#impact" },
          { label: "Tím", href: "#team" },
          { label: "Kontakt", href: "#contact" },
        ];
      const navEditForm = document.getElementById("navEditForm");
      const navList = document.getElementById("navList");
  
      function renderNavItems() {
        if (!navList) return;
        navList.innerHTML = navData
          .map(
            (item, i) => `
            <div style="display:flex;gap:1em;align-items:center;margin-bottom:8px;">
              <span><strong>${item.label}</strong> (${item.href})</span>
              <button data-index="${i}" class="btn-delete btn btn-danger">Vymazať</button>
              <button data-index="${i}" class="btn-edit btn btn-outline">Upraviť</button>
            </div>`
          )
          .join("");
        // Attach event listeners
        navList.querySelectorAll(".btn-delete").forEach((btn) => {
          btn.addEventListener("click", () => {
            navData.splice(parseInt(btn.dataset.index), 1);
            saveAndRender();
          });
        });
        navList.querySelectorAll(".btn-edit").forEach((btn) => {
          btn.addEventListener("click", () => {
            const idx = parseInt(btn.dataset.index);
            document.getElementById("navItemLabel").value = navData[idx].label;
            document.getElementById("navItemHref").value = navData[idx].href;
            navEditForm.onsubmit = (e) => {
              e.preventDefault();
              navData[idx] = {
                label: document.getElementById("navItemLabel").value,
                href: document.getElementById("navItemHref").value,
              };
              saveAndRender();
              navEditForm.reset();
              navEditForm.onsubmit = defaultNavSubmit;
            };
          });
        });
      }
  
      function updatePageNavigation() {
        const navMenu = document.getElementById("navMenu");
        if (!navMenu) return;
        navMenu.innerHTML = navData
          .map((item) => `<li><a href="${item.href}" class="nav-link">${item.label}</a></li>`)
          .join("");
      }
  
      function saveAndRender() {
        localStorage.setItem("siteNavigation", JSON.stringify(navData));
        renderNavItems();
        updatePageNavigation();
      }
  
      const defaultNavSubmit = (e) => {
        e.preventDefault();
        navData.push({
          label: document.getElementById("navItemLabel").value,
          href: document.getElementById("navItemHref").value,
        });
        saveAndRender();
        navEditForm.reset();
      };
  
      navEditForm.onsubmit = defaultNavSubmit;
      renderNavItems();
      updatePageNavigation();
    }
  
    // Hero Section management with image upload
    setupHeroSectionManagement() {
      const form = document.getElementById("heroEditForm");
      if (!form) return;
  
      let heroData = JSON.parse(localStorage.getItem("heroSection")) || {
        eyebrow: "",
        mainHeadline: "",
        subHeadline: "",
        description: "",
        backgroundImage: "",
      };
  
      ["heroEyebrow", "heroMainHeadline", "heroSubHeadline", "heroDescription"].forEach(
        (id) => {
          const el = document.getElementById(id);
          if (el) el.value = heroData[id.replace("hero", "").replace(/^\w/, (c) => c.toLowerCase())];
        }
      );
  
      // File input cannot have value set programmatically, so no setting for 'heroBackgroundImage'
  
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const eyebrow = document.getElementById("heroEyebrow").value.trim();
        const mainHeadline = document.getElementById("heroMainHeadline").value.trim();
        const subHeadline = document.getElementById("heroSubHeadline").value.trim();
        const description = document.getElementById("heroDescription").value.trim();
  
        const fileInput = document.getElementById("heroBackgroundImage");
        let backgroundImage = heroData.backgroundImage;
  
        if (fileInput.files && fileInput.files[0]) {
          try {
            backgroundImage = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.onerror = () => reject("Nepodarilo načítať obrázok");
              reader.readAsDataURL(fileInput.files[0]);
            });
          } catch (error) {
            alert(error);
            return;
          }
        }
  
        heroData = {
          eyebrow,
          mainHeadline,
          subHeadline,
          description,
          backgroundImage,
        };
  
        localStorage.setItem("heroSection", JSON.stringify(heroData));
        alert("Zmeny uložené");
  
        applyHeroSection(heroData);
      });
  
      applyHeroSection(heroData);
    }
  
    setupAboutSectionManagement() {
      const form = document.getElementById("aboutEditForm");
      if (!form) return;
  
      let aboutData = JSON.parse(localStorage.getItem("aboutSection")) || {
        lead: "",
        paragraph1: "",
        paragraph2: "",
        image: "",
      };
  
      document.getElementById("aboutLeadText").value = aboutData.lead;
      document.getElementById("aboutParagraph1").value = aboutData.paragraph1;
      document.getElementById("aboutParagraph2").value = aboutData.paragraph2;
      document.getElementById("aboutImage").value = aboutData.image;
  
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        aboutData = {
          lead: document.getElementById("aboutLeadText").value,
          paragraph1: document.getElementById("aboutParagraph1").value,
          paragraph2: document.getElementById("aboutParagraph2").value,
          image: document.getElementById("aboutImage").value.trim(),
        };
        localStorage.setItem("aboutSection", JSON.stringify(aboutData));
        alert("Zmeny uložené");
      });
    }
  
    // Activities management with image upload from file
    async handleActivityFormSubmit(event) {
      event.preventDefault();
  
      const title = document.getElementById("activityTitle").value.trim();
      const description = document.getElementById("activityDescription").value.trim();
      const category = document.getElementById("activityCategory").value.trim();
      const impact = document.getElementById("activityImpact").value.trim();
  
      const imageInput = document.getElementById("activityImage");
      let imageDataUrl = "";
  
      if (imageInput.files && imageInput.files[0]) {
        try {
          imageDataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = () => reject("Nepodarilo sa načítať obrázok");
            reader.readAsDataURL(imageInput.files[0]);
          });
        } catch (error) {
          alert(error);
          return;
        }
      }
  
      if (!title || !description) {
        alert("Názov a popis sú povinné.");
        return;
      }
  
      const activities = JSON.parse(localStorage.getItem("adminActivities") || "[]");
      activities.unshift({
        title,
        description,
        category,
        impact,
        image: imageDataUrl,
      });
  
      localStorage.setItem("adminActivities", JSON.stringify(activities));
      alert("Aktivita bola pridaná.");
      event.target.reset();
      this.renderActivities();
    }
  
    setupActivitiesManagement() {
      const form = document.getElementById("addActivityForm");
      if (!form) return;
      form.addEventListener("submit", this.handleActivityFormSubmit.bind(this));
      this.renderActivities();
    }
  
    renderActivities() {
      const container = document.getElementById("activityList");
      if (!container) return;
      const activities = JSON.parse(localStorage.getItem("adminActivities") || "[]");
      if (activities.length === 0) {
        container.innerHTML = "<em>Žiadne aktivity.</em>";
        return;
      }
      container.innerHTML = activities
        .map(
          (activity) => `
        <div style="border-bottom:1px solid #eee;padding:8px 0; display:flex; gap:1rem; align-items:center;">
          ${
            activity.image
              ? `<img src="${activity.image}" alt="${activity.title}" style="max-width:80px; max-height:60px; object-fit:cover; border-radius:6px;">`
              : ""
          }
          <div>
            <strong>${activity.title}</strong><br />
            <small>${activity.category || ""} • ${activity.impact || ""}</small>
            <p style="margin:0;">${activity.description}</p>
          </div>
          <button onclick="ElegantAdminPanel.deleteActivity(event)" data-title="${
            activity.title
          }" class="btn btn-danger" style="margin-left:auto;">Vymazať</button>
        </div>
      `
        )
        .join("");
      container.querySelectorAll("button[data-title]").forEach((button) => {
        button.addEventListener("click", (e) =>
          ElegantAdminPanel.deleteActivity.call(this, e)
        );
      });
    }
  
    static deleteActivity(event) {
      const title = event.target.dataset.title;
      const activities = JSON.parse(localStorage.getItem("adminActivities") || "[]");
      const updated = activities.filter((a) => a.title !== title);
      localStorage.setItem("adminActivities", JSON.stringify(updated));
      // Reload activities
      const panel = new ElegantAdminPanel();
      panel.renderActivities();
    }
  
    // Events management (similar pattern omitted here...)
  
    setupContactManagement() {
      const form = document.getElementById("contactEditForm");
      if (!form) return;
      let contactData =
        JSON.parse(localStorage.getItem("contactInfo")) || {
          address: "Podbanské 123\n059 55 Poprad-Matej",
          phone: "+421 902 123 456",
          email: "info@ozpodbanske.sk",
        };
      document.getElementById("contactAddress").value = contactData.address;
      document.getElementById("contactPhone").value = contactData.phone;
      document.getElementById("contactEmail").value = contactData.email;
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        contactData = {
          address: document.getElementById("contactAddress").value,
          phone: document.getElementById("contactPhone").value,
          email: document.getElementById("contactEmail").value,
        };
        localStorage.setItem("contactInfo", JSON.stringify(contactData));
        alert("Zmeny uložené");
      });
    }
  
    setupFooterManagement() {
      const form = document.getElementById("footerEditForm");
      if (!form) return;
      let footerText =
        localStorage.getItem("footerText") ||
        "© 2024 Občianske združenie Podbanské. Všetky práva vyhradené.";
      document.getElementById("footerText").value = footerText;
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        footerText = document.getElementById("footerText").value;
        localStorage.setItem("footerText", footerText);
        alert("Zmeny uložené");
      });
    }
  }
  
  
  // Start apps and admin panel on DOM load
  document.addEventListener("DOMContentLoaded", () => {
    new ElegantMountainApp();
    new ElegantAdminPanel();
  });
  
