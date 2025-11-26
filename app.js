// =============================================================================
// GITHUB-ONLY DATA SYNC - No localStorage for content data
// =============================================================================

const GITHUB_CONFIG = {
  owner: 'sefkuchar',
  repo: 'podbanske-2',
  branch: 'main',
  dataFile: 'data.json'
};

// Build URLs for fetching/pushing
function getGitHubRawUrl() {
  return `https://raw.githubusercontent.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/${GITHUB_CONFIG.dataFile}?t=${Date.now()}`;
}

function getGitHubApiUrl() {
  return `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.dataFile}`;
}

// =============================================================================
// GLOBAL DATA STORE - single source of truth
// =============================================================================
let siteData = {
  hero: {},
  about: {},
  activities: [],
  history: {},
  nature: {},
  rules: {},
  magic: {},
  contact: {},
  footer: ''
};

// =============================================================================
// FETCH DATA FROM GITHUB
// =============================================================================
async function fetchDataFromGitHub() {
  const url = getGitHubRawUrl();
  console.log('🔎 Fetching data from GitHub:', url);
  
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('✅ Loaded data from GitHub:', data);
    
    // Merge with defaults
    siteData = {
      hero: data.hero || {},
      about: data.about || {},
      activities: data.activities || [],
      history: data.history || {},
      nature: data.nature || {},
      rules: data.rules || {},
      magic: data.magic || {},
      contact: data.contact || {},
      footer: data.footer || ''
    };
    
    return siteData;
  } catch (err) {
    console.error('❌ Failed to fetch from GitHub:', err);
    return siteData;
  }
}

// =============================================================================
// SAVE DATA TO GITHUB (for admin)
// =============================================================================
async function saveDataToGitHub(newData) {
  const token = localStorage.getItem('github-token');
  if (!token) {
    alert('GitHub token nie je nastavený! Choď do Nastavenia a zadaj token.');
    return false;
  }

  try {
    // First get current file to get SHA
    const apiUrl = getGitHubApiUrl();
    console.log('📤 Saving to GitHub:', apiUrl);
    
    const getResponse = await fetch(apiUrl, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    let sha = null;
    if (getResponse.ok) {
      const fileInfo = await getResponse.json();
      sha = fileInfo.sha;
    }
    
    // Prepare content
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(newData, null, 2))));
    
    // Push update
    const putResponse = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Update data.json - ${new Date().toLocaleString('sk-SK')}`,
        content: content,
        sha: sha,
        branch: GITHUB_CONFIG.branch
      })
    });
    
    if (!putResponse.ok) {
      const errData = await putResponse.json();
      throw new Error(errData.message || `HTTP ${putResponse.status}`);
    }
    
    console.log('✅ Data saved to GitHub successfully');
    siteData = newData;
    return true;
  } catch (err) {
    console.error('❌ Failed to save to GitHub:', err);
    alert('Chyba pri ukladaní na GitHub: ' + err.message);
    return false;
  }
}

// =============================================================================
// APPLY FUNCTIONS - render data to DOM
// =============================================================================

function applyHeroSection(data) {
  if (!data) return;
  
  const eyebrow = document.querySelector('.hero-eyebrow');
  if (eyebrow) eyebrow.textContent = data.eyebrow || '';
  
  const mainHeadline = document.querySelector('.hero-headline-main');
  if (mainHeadline) mainHeadline.textContent = data.mainHeadline || '';
  
  const subHeadline = document.querySelector('.hero-headline-sub');
  if (subHeadline) subHeadline.textContent = data.subHeadline || '';
  
  const description = document.querySelector('.hero-description');
  if (description) description.textContent = data.description || '';
  
  const heroImage = document.querySelector('.hero-image');
  if (heroImage && data.backgroundImage) {
    heroImage.style.backgroundImage = `linear-gradient(rgba(58, 47, 42, 0.3), rgba(44, 74, 57, 0.4)), url('${data.backgroundImage}')`;
    heroImage.style.backgroundAttachment = 'fixed';
    heroImage.style.backgroundPosition = 'center';
    heroImage.style.backgroundRepeat = 'no-repeat';
    heroImage.style.backgroundSize = 'cover';
  }
}

function applyAboutSection(data) {
  if (!data) return;
  
  const aboutSection = document.querySelector('#about');
  if (aboutSection) {
    const header = aboutSection.querySelector('.section-header');
    if (header) {
      const eyebrow = header.querySelector('.section-eyebrow');
      const title = header.querySelector('.section-title');
      const description = header.querySelector('.section-description');
      if (eyebrow) eyebrow.textContent = data.eyebrow || 'O NAŠOM ZDRUŽENÍ';
      if (title) title.textContent = data.title || 'Posvätenosť horám a komunite';
      if (description) description.textContent = data.description || '';
    }
  }

  const leadEl = document.querySelector('.lead-text');
  if (leadEl) leadEl.textContent = data.lead || '';
  
  const paragraphs = document.querySelectorAll('.about-narrative p');
  if (paragraphs.length >= 2) {
    if (data.paragraph1 || data.paragraph2) {
      paragraphs[0].textContent = data.paragraph1 || '';
      paragraphs[1].textContent = data.paragraph2 || '';
    } else if (data.content) {
      const parts = data.content.split('\n\n');
      paragraphs[0].textContent = parts[0] || '';
      paragraphs[1].textContent = parts.slice(1).join('\n\n') || '';
    }
  }
  
  const imgEl = document.querySelector('.about-visual img');
  if (imgEl && data.image) imgEl.src = data.image;
}

function applyContactInfo(data) {
  if (!data) return;
  
  const contactSection = document.getElementById('contact');
  if (!contactSection) return;
  
  const contactMethods = contactSection.querySelectorAll('.contact-method .method-details p');
  if (contactMethods.length >= 3) {
    contactMethods[0].innerHTML = (data.address || '').replace(/\n/g, '<br>');
    contactMethods[1].textContent = data.phone || '';
    contactMethods[2].textContent = data.email || '';
  }
}

function applyFooterText(text) {
  const footerP = document.querySelector('.footer-bottom p');
  if (footerP) footerP.textContent = text || '';
}

function renderActivities() {
  const activitiesGrid = document.getElementById('activitiesGrid');
  if (!activitiesGrid) return;

  const activities = siteData.activities || [];
  
  // Update section header
  const activitiesSection = document.getElementById('activities');
  if (activitiesSection) {
    const header = activitiesSection.querySelector('.section-header');
    if (header) {
      header.innerHTML = `
        <p class="section-eyebrow">Naše aktivity</p>
        <h2 class="section-title">Rozsiahla činnosť pre ochranu a rozvoj</h2>
        <p class="section-description">Každý z našich projektov predstavuje precízne spojenie odbornosti, miestnej znalosti a dlhodobej vízie udržateľného rozvoja.</p>
      `;
    }
  }

  activitiesGrid.innerHTML = activities.map((activity, idx) => `
    <article class="activity-card" tabindex="0" data-idx="${idx}" data-category="${(activity.category || '').toLowerCase()}">
      ${activity.image ? `<img src="${activity.image}" alt="obrázok" class="activity-card-image">` : ''}
      <span class="activity-card-category">${activity.category || ''}</span>
      <h3 class="activity-card-title">${activity.title || ''}</h3>
      <div class="activity-card-action">
        <button type="button" class="activity-toggle" aria-label="Zobraziť detail aktivity" data-idx="${idx}">Zobraziť detail</button>
      </div>
    </article>
  `).join('');

  // Setup modal
  setupActivityModal(activities);
}

function setupActivityModal(activities) {
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
      const idx = parseInt(btn.getAttribute('data-idx'));
      const activity = activities[idx];
      if (!activity) return;
      
      modalBody.innerHTML = `
        ${activity.image ? `<img src="${activity.image}" alt="obrázok" style="width:100%;max-height:260px;object-fit:cover;border-radius:12px;">` : ''}
        <h2 style="margin-top:1em;">${activity.title || ''}</h2>
        <div style="margin:1em 0 1.5em 0;color:#888;font-weight:500;">${activity.category || ''}</div>
        <div style="font-size:1.1em;">${activity.description || ''}</div>
        <div style="margin-top:1.5em;font-size:1.05em;"><strong>Výsledok:</strong> ${activity.impact || ''}</div>
      `;
      modal.style.display = 'block';
    });
  });

  closeBtn.onclick = () => { modal.style.display = 'none'; };
  modalOverlay.onclick = (e) => { if (e.target === modalOverlay) modal.style.display = 'none'; };
}

function renderGenericSection(sectionId, contentId, data) {
  const contentEl = document.getElementById(contentId);
  if (!contentEl) return;

  const section = document.getElementById(sectionId);
  if (section) {
    const header = section.querySelector('.section-header');
    if (header) {
      header.innerHTML = `
        ${data.eyebrow ? `<p class="section-eyebrow">${data.eyebrow}</p>` : ''}
        <h2 class="section-title">${data.title || ''}</h2>
        ${data.description ? `<p class="section-description">${data.description}</p>` : ''}
      `;
    }
  }

  const subsections = data.subsections || [];
  contentEl.innerHTML = `
    <div class="content-layout">
      <div class="content-text">
        <div class="content-body">${data.content || ''}</div>
        ${subsections.length > 0 ? `
          <div class="content-subsections">
            ${subsections.map(sub => `
              <div class="subsection-item">
                ${sub.title ? `<h4 class="subsection-title">${sub.title}</h4>` : ''}
                ${sub.content ? `<div class="subsection-content">${sub.content}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
      ${data.image ? `
        <div class="content-image">
          <img src="${data.image}" alt="${data.title || ''}">
        </div>
      ` : ''}
    </div>
  `;
}

function renderHistory() {
  renderGenericSection('history', 'historyContent', siteData.history || {});
}

function renderNature() {
  renderGenericSection('nature', 'natureContent', siteData.nature || {});
}

function renderRules() {
  renderGenericSection('rules', 'rulesContent', siteData.rules || {});
}

function renderMagic() {
  const data = siteData.magic || {};
  const contentEl = document.getElementById('magicContent');
  if (!contentEl) return;

  const section = document.getElementById('magic');
  if (section) {
    const header = section.querySelector('.section-header');
    if (header) {
      header.innerHTML = `
        ${data.eyebrow ? `<p class="section-eyebrow">${data.eyebrow}</p>` : ''}
        <h2 class="section-title">${data.title || ''}</h2>
        ${data.description ? `<p class="section-description">${data.description}</p>` : ''}
      `;
    }
  }

  const subsections = data.subsections || [];
  const images = data.images || [];
  
  contentEl.innerHTML = `
    <div class="content-layout">
      <div class="content-text">
        <div class="content-body">${data.content || ''}</div>
        ${subsections.length > 0 ? `
          <div class="content-subsections">
            ${subsections.map(sub => `
              <div class="subsection-item">
                ${sub.title ? `<h4 class="subsection-title">${sub.title}</h4>` : ''}
                ${sub.content ? `<div class="subsection-content">${sub.content}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
      ${images.length > 0 ? `
        <div class="magic-images-grid">
          ${images.map(img => `
            <div class="magic-image-item">
              <img src="${img.url}" alt="${img.caption || 'Magické Podbanské'}">
              ${img.caption ? `<p class="image-caption">${img.caption}</p>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

// =============================================================================
// APPLY ALL SECTIONS
// =============================================================================
function applyAllSections() {
  applyHeroSection(siteData.hero);
  applyAboutSection(siteData.about);
  renderActivities();
  renderHistory();
  renderNature();
  renderRules();
  renderMagic();
  applyContactInfo(siteData.contact);
  applyFooterText(siteData.footer);
}

// =============================================================================
// MAIN APP CLASS (for index.html)
// =============================================================================
class ElegantMountainApp {
  constructor() {
    this.init();
  }

  async init() {
    // Load data from GitHub first
    await fetchDataFromGitHub();
    
    // Apply all sections
    applyAllSections();
    
    // Setup UI interactions
    this.setupNavigation();
    this.setupScrollEffects();
    
    // Auto-refresh every 30 seconds
    setInterval(async () => {
      console.log('🔄 Auto-refresh from GitHub...');
      await fetchDataFromGitHub();
      applyAllSections();
    }, 30000);
    
    // Refresh on window focus
    window.addEventListener('focus', async () => {
      await fetchDataFromGitHub();
      applyAllSections();
    });
  }

  setupNavigation() {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    let ticking = false;
    const updateNavbar = () => {
      if (!navbar) { ticking = false; return; }
      navbar.classList.toggle('scrolled', window.scrollY > 100);
      
      let current = '';
      sections.forEach((section) => {
        if (window.pageYOffset >= section.offsetTop - 150) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href')?.substring(1) === current);
      });
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href')?.substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupScrollEffects() {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const heroImage = document.querySelector('.hero-image');
          if (heroImage && window.pageYOffset < window.innerHeight) {
            heroImage.style.transform = `translateY(${window.pageYOffset * -0.3}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }
}

// =============================================================================
// ADMIN PANEL CLASS (for admin.html)
// =============================================================================
class AdminPanel {
  constructor() {
    this.init();
  }

  async init() {
    // Check if we're on admin page
    if (!window.location.pathname.includes('admin')) return;
    
    // Load current data from GitHub
    await fetchDataFromGitHub();
    
    // Setup all admin forms
    this.setupGitHubSettings();
    this.setupHeroForm();
    this.setupAboutForm();
    this.setupActivitiesForm();
    this.setupContactForm();
    this.setupFooterForm();
    
    // Populate forms with current data
    this.populateForms();
  }

  setupGitHubSettings() {
    const tokenInput = document.getElementById('githubToken');
    const saveBtn = document.getElementById('saveGithubSettings');
    
    if (tokenInput) {
      tokenInput.value = localStorage.getItem('github-token') || '';
    }
    
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const token = tokenInput?.value?.trim();
        if (token) {
          localStorage.setItem('github-token', token);
          alert('GitHub token uložený!');
        }
      });
    }
  }

  populateForms() {
    // Hero
    const heroEyebrow = document.getElementById('heroEyebrow');
    const heroMain = document.getElementById('heroMainHeadline');
    const heroSub = document.getElementById('heroSubHeadline');
    const heroDesc = document.getElementById('heroDescription');
    
    if (heroEyebrow) heroEyebrow.value = siteData.hero?.eyebrow || '';
    if (heroMain) heroMain.value = siteData.hero?.mainHeadline || '';
    if (heroSub) heroSub.value = siteData.hero?.subHeadline || '';
    if (heroDesc) heroDesc.value = siteData.hero?.description || '';
    
    // About
    const aboutEyebrow = document.getElementById('aboutEyebrow');
    const aboutTitle = document.getElementById('aboutTitle');
    const aboutLead = document.getElementById('aboutLeadText');
    const aboutP1 = document.getElementById('aboutParagraph1');
    const aboutP2 = document.getElementById('aboutParagraph2');
    const aboutImg = document.getElementById('aboutImage');
    
    if (aboutEyebrow) aboutEyebrow.value = siteData.about?.eyebrow || '';
    if (aboutTitle) aboutTitle.value = siteData.about?.title || '';
    if (aboutLead) aboutLead.value = siteData.about?.lead || '';
    if (aboutP1) aboutP1.value = siteData.about?.paragraph1 || '';
    if (aboutP2) aboutP2.value = siteData.about?.paragraph2 || '';
    if (aboutImg) aboutImg.value = siteData.about?.image || '';
    
    // Contact
    const contactAddr = document.getElementById('contactAddress');
    const contactPhone = document.getElementById('contactPhone');
    const contactEmail = document.getElementById('contactEmail');
    
    if (contactAddr) contactAddr.value = siteData.contact?.address || '';
    if (contactPhone) contactPhone.value = siteData.contact?.phone || '';
    if (contactEmail) contactEmail.value = siteData.contact?.email || '';
    
    // Footer
    const footerText = document.getElementById('footerText');
    if (footerText) footerText.value = siteData.footer || '';
    
    // Activities list
    this.renderActivitiesList();
  }

  setupHeroForm() {
    const form = document.getElementById('heroEditForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const eyebrow = document.getElementById('heroEyebrow')?.value?.trim() || '';
      const mainHeadline = document.getElementById('heroMainHeadline')?.value?.trim() || '';
      const subHeadline = document.getElementById('heroSubHeadline')?.value?.trim() || '';
      const description = document.getElementById('heroDescription')?.value?.trim() || '';
      
      // Handle image upload
      const fileInput = document.getElementById('heroBackgroundImage');
      let backgroundImage = siteData.hero?.backgroundImage || '';
      
      if (fileInput?.files?.[0]) {
        backgroundImage = await this.fileToDataUrl(fileInput.files[0]);
      }

      siteData.hero = { eyebrow, mainHeadline, subHeadline, description, backgroundImage };
      
      const success = await saveDataToGitHub(siteData);
      if (success) {
        alert('Hero sekcia uložená na GitHub!');
        applyHeroSection(siteData.hero);
      }
    });
  }

  setupAboutForm() {
    const form = document.getElementById('aboutEditForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      siteData.about = {
        eyebrow: document.getElementById('aboutEyebrow')?.value?.trim() || '',
        title: document.getElementById('aboutTitle')?.value?.trim() || '',
        lead: document.getElementById('aboutLeadText')?.value?.trim() || '',
        paragraph1: document.getElementById('aboutParagraph1')?.value?.trim() || '',
        paragraph2: document.getElementById('aboutParagraph2')?.value?.trim() || '',
        image: document.getElementById('aboutImage')?.value?.trim() || ''
      };
      
      const success = await saveDataToGitHub(siteData);
      if (success) {
        alert('O nás sekcia uložená na GitHub!');
        applyAboutSection(siteData.about);
      }
    });
  }

  setupActivitiesForm() {
    const form = document.getElementById('addActivityForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const title = document.getElementById('activityTitle')?.value?.trim() || '';
      const description = document.getElementById('activityDescription')?.value?.trim() || '';
      const category = document.getElementById('activityCategory')?.value?.trim() || '';
      const impact = document.getElementById('activityImpact')?.value?.trim() || '';
      
      if (!title || !description) {
        alert('Názov a popis sú povinné!');
        return;
      }

      // Handle image
      const fileInput = document.getElementById('activityImage');
      let image = '';
      if (fileInput?.files?.[0]) {
        image = await this.fileToDataUrl(fileInput.files[0]);
      }

      siteData.activities = siteData.activities || [];
      siteData.activities.unshift({ title, description, category, impact, image });
      
      const success = await saveDataToGitHub(siteData);
      if (success) {
        alert('Aktivita pridaná na GitHub!');
        form.reset();
        this.renderActivitiesList();
        renderActivities();
      }
    });
  }

  renderActivitiesList() {
    const container = document.getElementById('activityList');
    if (!container) return;

    const activities = siteData.activities || [];
    
    if (activities.length === 0) {
      container.innerHTML = '<em>Žiadne aktivity.</em>';
      return;
    }

    container.innerHTML = activities.map((activity, idx) => `
      <div style="border-bottom:1px solid #eee;padding:12px 0;display:flex;gap:1rem;align-items:center;">
        ${activity.image ? `<img src="${activity.image}" alt="${activity.title}" style="max-width:80px;max-height:60px;object-fit:cover;border-radius:6px;">` : ''}
        <div style="flex:1;">
          <strong>${activity.title}</strong><br>
          <small>${activity.category || ''} • ${activity.impact || ''}</small>
          <p style="margin:4px 0 0;font-size:0.9em;color:#666;">${(activity.description || '').substring(0, 100)}...</p>
        </div>
        <button type="button" class="btn btn-danger delete-activity-btn" data-idx="${idx}">Vymazať</button>
      </div>
    `).join('');

    // Attach delete handlers
    container.querySelectorAll('.delete-activity-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const idx = parseInt(btn.dataset.idx);
        if (confirm('Naozaj vymazať túto aktivitu?')) {
          siteData.activities.splice(idx, 1);
          const success = await saveDataToGitHub(siteData);
          if (success) {
            this.renderActivitiesList();
            renderActivities();
          }
        }
      });
    });
  }

  setupContactForm() {
    const form = document.getElementById('contactEditForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      siteData.contact = {
        address: document.getElementById('contactAddress')?.value || '',
        phone: document.getElementById('contactPhone')?.value?.trim() || '',
        email: document.getElementById('contactEmail')?.value?.trim() || ''
      };
      
      const success = await saveDataToGitHub(siteData);
      if (success) {
        alert('Kontaktné údaje uložené na GitHub!');
        applyContactInfo(siteData.contact);
      }
    });
  }

  setupFooterForm() {
    const form = document.getElementById('footerEditForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      siteData.footer = document.getElementById('footerText')?.value || '';
      
      const success = await saveDataToGitHub(siteData);
      if (success) {
        alert('Päta uložená na GitHub!');
        applyFooterText(siteData.footer);
      }
    });
  }

  fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Nepodarilo sa načítať súbor'));
      reader.readAsDataURL(file);
    });
  }
}

// =============================================================================
// INITIALIZE ON DOM LOAD
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Check which page we're on
  const isAdmin = window.location.pathname.includes('admin');
  
  if (isAdmin) {
    console.log('🔧 Initializing Admin Panel...');
    new AdminPanel();
  } else {
    console.log('🏔️ Initializing Mountain App...');
    new ElegantMountainApp();
  }
});
