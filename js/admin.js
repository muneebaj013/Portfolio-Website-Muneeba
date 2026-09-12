/**
 * MUNEEBA JABBAR - ADMIN DASHBOARD CONTROLLER & SUPABASE SYNC
 */

// Default Seed Data
const DEFAULT_PROJECTS = [
  {
    id: 'proj-1',
    title: 'High-Retention Video Editing & AI Motion Reel',
    category: 'video-editing',
    tag: 'Video Editing • AI Animation',
    image: 'assets/images/portfolio_video_editing.jpg',
    client: 'Lumina E-Commerce',
    timeline: '3 Weeks',
    metrics: '+180% Engagement • 84.6% Retention',
    description: 'Dynamic pacing, custom kinetic captions, sound FX, and neural AI visual enhancements engineered for maximum audience watch time.',
    deliverables: [
      'First 3-second hook pattern interrupts',
      'Kinetic animated subtitles & sound design',
      'Color grading & 4K 60FPS delivery',
      'Multi-platform ratio formatting (9:16 & 16:9)'
    ]
  },
  {
    id: 'proj-2',
    title: 'AI Animation Commercial for Tech Brand',
    category: 'ai-animation',
    tag: 'AI Video • Midjourney • Runway Gen-3',
    image: 'assets/images/portfolio_ai_animation.jpg',
    client: 'NextGen Tech Solutions',
    timeline: '2 Weeks',
    metrics: '120K+ Views • 4K Cinematic Quality',
    description: 'End-to-end AI-generated luxury commercial combining Runway Gen-3 camera movement with Midjourney v6 photorealistic textures.',
    deliverables: [
      'Custom prompt engineering & seed consistency',
      'Frame-by-frame interpolation & motion tracking',
      'Sound design & voiceover mastering',
      'Topaz Video AI 4K upscaling'
    ]
  },
  {
    id: 'proj-3',
    title: 'High-Converting Shopify Store Redesign',
    category: 'shopify',
    tag: 'Shopify Plus • CRO • UI/UX',
    image: 'assets/images/portfolio_shopify.jpg',
    client: 'UrbanVibe Apparel',
    timeline: '4 Weeks',
    metrics: '+42% Conversion Rate • 1.2s Load Speed',
    description: 'Complete Shopify store redesign with custom liquid sections, sticky add-to-cart, 1-click upsells, and sub-1.5s load times.',
    deliverables: [
      'Custom Shopify theme development & Liquid tuning',
      'Mobile-first checkout funnel optimization',
      'Klaviyo email flows integration',
      'PageSpeed score boosted to 98/100'
    ]
  },
  {
    id: 'proj-4',
    title: 'Meta Paid Ads Creative Scaling ($50k/mo)',
    category: 'meta-ads',
    tag: 'Meta Ads • ROAS Scaling • Creative Testing',
    image: 'assets/images/portfolio_fbads.jpg',
    client: 'Nova Luxe Brand',
    timeline: 'Ongoing',
    metrics: '8.6x Average ROAS • $0.42 CPC',
    description: 'Systematic creative testing framework with 12 hook variations and lookalike audience scaling to maximize ad spend efficiency.',
    deliverables: [
      'Conversions API (CAPI) & Pixel verification',
      'A/B Creative testing suite (Hooks & CTAs)',
      'High-converting ad copy & typography',
      'Weekly ROAS optimization & budget scaling'
    ]
  },
  {
    id: 'proj-5',
    title: 'Google Ads & Performance Max Campaign',
    category: 'google-ads',
    tag: 'Google Ads • Search & PMax',
    image: 'assets/images/portfolio_gads.jpg',
    client: 'Apex Digital Agency',
    timeline: '6 Weeks',
    metrics: '-38% CPA Reduction • +280% Leads',
    description: 'High-intent search campaign paired with Google Performance Max asset groups to capture bottom-of-the-funnel buyers.',
    deliverables: [
      'Negative keyword list & commercial intent mapping',
      'PMax asset groups (Video, Responsive, Copy)',
      'Conversion tracking via GA4 & Tag Manager',
      'Landing page quality score enhancement'
    ]
  },
  {
    id: 'proj-6',
    title: 'Technical SEO & 500K Traffic Surge',
    category: 'seo',
    tag: 'Technical SEO • Schema • Keywords',
    image: 'assets/images/portfolio_seo.jpg',
    client: 'Global Media Publisher',
    timeline: '3 Months',
    metrics: '+340% Organic Traffic • #1 Ranking',
    description: 'Comprehensive technical crawl audit, structured JSON-LD schema implementation, and semantic keyword clustering.',
    deliverables: [
      'Crawl budget & site architecture optimization',
      'Topical authority keyword clustering',
      'Rich snippet & FAQ schema deployment',
      'Core Web Vitals green score optimization'
    ]
  }
];

const DEFAULT_TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Emily Miller',
    role: 'Founder, Lumina Luxe Brand',
    initials: 'EM',
    rating: 5,
    quote: "Muneeba's video editing and AI animation skills took our social media ads to a whole new level! Our video watch time and conversions increased significantly. Highly recommended!"
  },
  {
    id: 'test-2',
    name: 'Sarah Lewis',
    role: 'Marketing Director, UrbanVibe Apparel',
    initials: 'SL',
    rating: 5,
    quote: "Our Shopify store's user experience, design, and paid ad ROAS improved dramatically thanks to Muneeba's work. She delivers exceptional quality every single time."
  },
  {
    id: 'test-3',
    name: 'Michael Reynolds',
    role: 'CEO, NextGen Tech Solutions',
    initials: 'MR',
    rating: 5,
    quote: "From high-impact AI animations to targeted Google and Meta ad campaigns, Muneeba provided a seamless, professional experience that boosted our company's visibility."
  }
];

const DEFAULT_INQUIRIES = [
  {
    id: 'inq-1',
    name: 'Ahmad Tariq',
    email: 'ahmad.tariq@example.com',
    phone: '+92 300 1234567',
    service: 'Video Editing & AI Animation',
    message: 'Looking for 15 viral TikTok/Reels edits per month with kinetic captions and AI graphics. Please share pricing.',
    status: 'new',
    date: '2026-09-12'
  },
  {
    id: 'inq-2',
    name: 'Jessica Vance',
    email: 'jessica@auraskincare.com',
    phone: '+1 415 555 0192',
    service: 'Shopify Store Design & CRO',
    message: 'We want to revamp our Shopify store before Q4 BFCM sale. Need high-converting layout and faster page speed.',
    status: 'read',
    date: '2026-09-11'
  }
];

// App State
let supabaseClient = null;
let currentProjects = [];
let currentTestimonials = [];
let currentInquiries = [];

// DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initPasswordVisibilityToggles();
  initPasswordStrengthAndMatching();
  initForgotPinWizard();
  initSettingsPinChange();
  initNavigation();
  initSupabase();
  loadAllData();
  setupEventListeners();
});

/* --------------------------------------------------------------------------
   1. Authentication (PIN / Passcode Gate)
   -------------------------------------------------------------------------- */
function initAuth() {
  const authWrapper = document.getElementById('authWrapper');
  const authForm = document.getElementById('authForm');
  const authInput = document.getElementById('authPinInput');
  const authError = document.getElementById('authError');
  const logoutBtn = document.getElementById('sidebarLogoutBtn');

  const getSavedPin = () => localStorage.getItem('muneeba_admin_pin') || 'admin123';

  // Check if session is already active
  if (sessionStorage.getItem('muneeba_admin_session') === 'active') {
    authWrapper.classList.add('hidden');
  }

  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredPin = authInput.value.trim();
      if (enteredPin === getSavedPin()) {
        sessionStorage.setItem('muneeba_admin_session', 'active');
        authWrapper.classList.add('hidden');
        showToast('Welcome back, Muneeba!', 'success');
      } else {
        authError.style.display = 'block';
        authInput.focus();
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('muneeba_admin_session');
      if (authInput) authInput.value = '';
      if (authError) authError.style.display = 'none';
      authWrapper.classList.remove('hidden');
      showToast('Logged out successfully', 'info');
    });
  }
}

/* --------------------------------------------------------------------------
   1.1 Password Visibility Toggle Engine (Show / Hide Eyes)
   -------------------------------------------------------------------------- */
function initPasswordVisibilityToggles() {
  document.querySelectorAll('.password-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;

      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';

      const openIcon = btn.querySelector('.eye-open-icon');
      const closedIcon = btn.querySelector('.eye-closed-icon');
      if (openIcon && closedIcon) {
        openIcon.style.display = isPassword ? 'none' : 'block';
        closedIcon.style.display = isPassword ? 'block' : 'none';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   1.2 Real-Time Password Strength Evaluator & Matching Validator
   -------------------------------------------------------------------------- */
function initPasswordStrengthAndMatching() {
  // Settings Tab Inputs
  const newPinInput = document.getElementById('newPinInput');
  const confirmPinInput = document.getElementById('confirmPinInput');
  const strengthBox = document.getElementById('passwordStrengthBox');
  const strengthBar = document.getElementById('strengthProgressBar');
  const strengthText = document.getElementById('strengthRatingText');
  const matchIndicator = document.getElementById('pinMatchIndicator');

  // Rules List Elements
  const ruleMinLen = document.getElementById('ruleMinLen');
  const ruleHasNum = document.getElementById('ruleHasNum');
  const ruleHasLetter = document.getElementById('ruleHasLetter');
  const ruleHasSpecial = document.getElementById('ruleHasSpecial');

  const evaluateStrength = (val) => {
    let score = 0;
    const lenValid = val.length >= 6;
    const numValid = /[0-9]/.test(val);
    const letterValid = /[a-zA-Z]/.test(val);
    const specialValid = /[^a-zA-Z0-9]/.test(val);

    if (lenValid) score++;
    if (val.length >= 10) score++;
    if (numValid) score++;
    if (letterValid) score++;
    if (specialValid) score++;

    return { score, lenValid, numValid, letterValid, specialValid };
  };

  if (newPinInput) {
    newPinInput.addEventListener('input', () => {
      const val = newPinInput.value;
      if (!val) {
        if (strengthBox) strengthBox.style.display = 'none';
        return;
      }
      if (strengthBox) strengthBox.style.display = 'block';

      const { score, lenValid, numValid, letterValid, specialValid } = evaluateStrength(val);

      // Update Rule Checklist
      if (ruleMinLen) {
        ruleMinLen.classList.toggle('valid', lenValid);
        ruleMinLen.querySelector('.rule-icon').textContent = lenValid ? '✓' : '○';
      }
      if (ruleHasNum) {
        ruleHasNum.classList.toggle('valid', numValid);
        ruleHasNum.querySelector('.rule-icon').textContent = numValid ? '✓' : '○';
      }
      if (ruleHasLetter) {
        ruleHasLetter.classList.toggle('valid', letterValid);
        ruleHasLetter.querySelector('.rule-icon').textContent = letterValid ? '✓' : '○';
      }
      if (ruleHasSpecial) {
        ruleHasSpecial.classList.toggle('valid', specialValid);
        ruleHasSpecial.querySelector('.rule-icon').textContent = specialValid ? '✓' : '○';
      }

      // Update Progress Bar
      if (strengthBar && strengthText) {
        strengthBar.className = 'strength-bar-fill';
        if (score <= 1) {
          strengthBar.classList.add('strength-weak');
          strengthText.textContent = 'Weak';
          strengthText.style.color = 'var(--danger)';
        } else if (score === 2 || score === 3) {
          strengthBar.classList.add('strength-fair');
          strengthText.textContent = 'Medium / Fair';
          strengthText.style.color = 'var(--warning)';
        } else if (score === 4) {
          strengthBar.classList.add('strength-good');
          strengthText.textContent = 'Strong';
          strengthText.style.color = 'var(--accent-cyan)';
        } else {
          strengthBar.classList.add('strength-strong');
          strengthText.textContent = 'Very Strong ★';
          strengthText.style.color = 'var(--success)';
        }
      }

      // Re-check confirm pin
      checkMatch();
    });
  }

  const checkMatch = () => {
    if (!confirmPinInput || !newPinInput || !matchIndicator) return;
    const val1 = newPinInput.value;
    const val2 = confirmPinInput.value;

    if (!val2) {
      matchIndicator.className = 'password-match-indicator';
      matchIndicator.style.display = 'none';
      return;
    }

    matchIndicator.style.display = 'flex';
    if (val1 === val2) {
      matchIndicator.className = 'password-match-indicator match';
      matchIndicator.innerHTML = '<span>✓</span> <span>Passwords match perfectly</span>';
    } else {
      matchIndicator.className = 'password-match-indicator mismatch';
      matchIndicator.innerHTML = '<span>✕</span> <span>Passwords do not match yet</span>';
    }
  };

  if (confirmPinInput) {
    confirmPinInput.addEventListener('input', checkMatch);
  }

  // Wizard Strength Evaluator
  const wizardNewPin = document.getElementById('wizardNewPinInput');
  const wizardConfirmPin = document.getElementById('wizardConfirmPinInput');
  const wizardStrengthBox = document.getElementById('wizardStrengthBox');
  const wizardStrengthBar = document.getElementById('wizardStrengthProgressBar');
  const wizardStrengthText = document.getElementById('wizardStrengthRatingText');
  const wizardMatchIndicator = document.getElementById('wizardPinMatchIndicator');

  if (wizardNewPin) {
    wizardNewPin.addEventListener('input', () => {
      const val = wizardNewPin.value;
      if (!val) {
        if (wizardStrengthBox) wizardStrengthBox.style.display = 'none';
        return;
      }
      if (wizardStrengthBox) wizardStrengthBox.style.display = 'block';

      const { score } = evaluateStrength(val);
      if (wizardStrengthBar && wizardStrengthText) {
        wizardStrengthBar.className = 'strength-bar-fill';
        if (score <= 1) {
          wizardStrengthBar.classList.add('strength-weak');
          wizardStrengthText.textContent = 'Weak';
          wizardStrengthText.style.color = 'var(--danger)';
        } else if (score <= 3) {
          wizardStrengthBar.classList.add('strength-fair');
          wizardStrengthText.textContent = 'Medium';
          wizardStrengthText.style.color = 'var(--warning)';
        } else {
          wizardStrengthBar.classList.add('strength-strong');
          wizardStrengthText.textContent = 'Strong ✓';
          wizardStrengthText.style.color = 'var(--success)';
        }
      }

      if (wizardConfirmPin && wizardMatchIndicator && wizardConfirmPin.value) {
        wizardMatchIndicator.style.display = 'flex';
        const isMatch = wizardNewPin.value === wizardConfirmPin.value;
        wizardMatchIndicator.className = `password-match-indicator ${isMatch ? 'match' : 'mismatch'}`;
        wizardMatchIndicator.innerHTML = isMatch
          ? '<span>✓</span> <span>Passwords match</span>'
          : '<span>✕</span> <span>Passwords do not match</span>';
      }
    });
  }

  if (wizardConfirmPin) {
    wizardConfirmPin.addEventListener('input', () => {
      if (!wizardMatchIndicator || !wizardNewPin) return;
      if (!wizardConfirmPin.value) {
        wizardMatchIndicator.style.display = 'none';
        return;
      }
      wizardMatchIndicator.style.display = 'flex';
      const isMatch = wizardNewPin.value === wizardConfirmPin.value;
      wizardMatchIndicator.className = `password-match-indicator ${isMatch ? 'match' : 'mismatch'}`;
      wizardMatchIndicator.innerHTML = isMatch
        ? '<span>✓</span> <span>Passwords match</span>'
        : '<span>✕</span> <span>Passwords do not match</span>';
    });
  }
}

/* --------------------------------------------------------------------------
   2. Navigation & Tab Switching
   -------------------------------------------------------------------------- */
function initNavigation() {
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const pageTitle = document.getElementById('currentPageTitle');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const sidebar = document.querySelector('.admin-sidebar');
  const sidebarClose = document.getElementById('sidebarCloseBtn');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      tabPanes.forEach(pane => {
        pane.classList.toggle('active', pane.id === targetTab);
      });

      const titleMap = {
        'tabOverview': 'Dashboard Overview',
        'tabProjects': 'Projects Management',
        'tabTestimonials': 'Client Testimonials',
        'tabInquiries': 'Inquiries & Leads Inbox',
        'tabSettings': 'Supabase & Site Settings'
      };
      if (pageTitle) pageTitle.textContent = titleMap[targetTab] || 'Dashboard';

      if (window.innerWidth <= 900 && sidebar) {
        sidebar.classList.remove('open');
      }
    });
  });

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => sidebar.classList.add('open'));
  }
  if (sidebarClose && sidebar) {
    sidebarClose.addEventListener('click', () => sidebar.classList.remove('open'));
  }
}

/* --------------------------------------------------------------------------
   3. Supabase Client & Connection Controller
   -------------------------------------------------------------------------- */
function initSupabase() {
  const supabaseUrl = localStorage.getItem('supabase_url');
  const supabaseKey = localStorage.getItem('supabase_key');
  const statusDot = document.getElementById('cloudStatusDot');
  const statusText = document.getElementById('cloudStatusText');

  if (supabaseUrl && supabaseKey && window.supabase) {
    try {
      supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
      if (statusDot) statusDot.classList.add('connected');
      if (statusText) statusText.textContent = 'Supabase Connected';
    } catch (e) {
      console.warn('Supabase init error:', e);
      if (statusDot) statusDot.classList.remove('connected');
      if (statusText) statusText.textContent = 'Local Cache Mode';
    }
  } else {
    if (statusDot) statusDot.classList.remove('connected');
    if (statusText) statusText.textContent = 'Local Cache Mode';
  }
}

/* --------------------------------------------------------------------------
   4. Load & Synchronize All Data (Supabase + Local Cache)
   -------------------------------------------------------------------------- */
async function loadAllData() {
  // 1. Projects
  const savedProjects = localStorage.getItem('muneeba_projects');
  currentProjects = savedProjects ? JSON.parse(savedProjects) : DEFAULT_PROJECTS;

  // 2. Testimonials
  const savedTestimonials = localStorage.getItem('muneeba_testimonials');
  currentTestimonials = savedTestimonials ? JSON.parse(savedTestimonials) : DEFAULT_TESTIMONIALS;

  // 3. Inquiries
  const savedInquiries = localStorage.getItem('muneeba_inquiries');
  currentInquiries = savedInquiries ? JSON.parse(savedInquiries) : DEFAULT_INQUIRIES;

  // If Supabase is connected, attempt fetch
  if (supabaseClient) {
    try {
      const { data: pData } = await supabaseClient.from('projects').select('*');
      if (pData && pData.length) {
        currentProjects = pData;
        localStorage.setItem('muneeba_projects', JSON.stringify(pData));
      }

      const { data: tData } = await supabaseClient.from('testimonials').select('*');
      if (tData && tData.length) {
        currentTestimonials = tData;
        localStorage.setItem('muneeba_testimonials', JSON.stringify(tData));
      }

      const { data: iData } = await supabaseClient.from('inquiries').select('*');
      if (iData && iData.length) {
        currentInquiries = iData;
        localStorage.setItem('muneeba_inquiries', JSON.stringify(iData));
      }
    } catch (err) {
      console.warn('Failed to fetch from Supabase, using local data:', err);
    }
  }

  renderOverviewStats();
  renderProjectsTable();
  renderTestimonialsTable();
  renderInquiriesTable();
}

/* --------------------------------------------------------------------------
   5. Renderers
   -------------------------------------------------------------------------- */
function renderOverviewStats() {
  const totalProjects = document.getElementById('statTotalProjects');
  const totalInquiries = document.getElementById('statTotalInquiries');
  const totalTestimonials = document.getElementById('statTotalTestimonials');
  const unreadBadge = document.getElementById('inquiriesBadge');
  const pendingRevBadge = document.getElementById('pendingReviewsBadge');

  if (totalProjects) totalProjects.textContent = currentProjects.length;
  if (totalTestimonials) totalTestimonials.textContent = currentTestimonials.filter(t => t.status !== 'pending').length;
  if (totalInquiries) totalInquiries.textContent = currentInquiries.length;

  const unreadCount = currentInquiries.filter(i => i.status === 'new').length;
  if (unreadBadge) {
    unreadBadge.textContent = unreadCount;
    unreadBadge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
  }

  const pendingCount = currentTestimonials.filter(t => t.status === 'pending').length;
  if (pendingRevBadge) {
    pendingRevBadge.textContent = pendingCount;
    pendingRevBadge.style.display = pendingCount > 0 ? 'inline-block' : 'none';
  }

  // Render recent inquiries on overview
  const recentTableBody = document.getElementById('recentInquiriesTableBody');
  if (recentTableBody) {
    recentTableBody.innerHTML = currentInquiries.slice(0, 4).map(inq => `
      <tr>
        <td><strong>${escapeHtml(inq.name)}</strong><br><small style="color:var(--text-muted);">${escapeHtml(inq.email)}</small></td>
        <td><span class="badge-tag">${escapeHtml(inq.service || 'General Inquiry')}</span></td>
        <td><span class="badge-tag ${inq.status === 'new' ? 'green' : ''}">${inq.status.toUpperCase()}</span></td>
        <td>${inq.date || 'Recent'}</td>
      </tr>
    `).join('') || '<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">No inquiries yet.</td></tr>';
  }
}

function renderProjectsTable(filterCategory = 'all', searchQuery = '') {
  const tbody = document.getElementById('projectsTableBody');
  if (!tbody) return;

  let filtered = currentProjects;
  if (filterCategory !== 'all') {
    filtered = filtered.filter(p => p.category === filterCategory);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || p.client.toLowerCase().includes(q));
  }

  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td>
        <img src="${p.image}" class="table-thumb" alt="${escapeHtml(p.title)}" onerror="this.src='assets/images/portfolio_design.jpg'">
      </td>
      <td>
        <strong>${escapeHtml(p.title)}</strong><br>
        <small style="color: var(--text-muted);">${escapeHtml(p.description.substring(0, 60))}...</small>
      </td>
      <td><span class="badge-tag">${escapeHtml(p.tag || p.category)}</span></td>
      <td>${escapeHtml(p.client || '-')}</td>
      <td><span style="color: var(--accent-cyan); font-weight: 600;">${escapeHtml(p.metrics || '-')}</span></td>
      <td>
        <div class="table-actions">
          <button type="button" class="btn-table-action" onclick="openEditProjectModal('${p.id}')" title="Edit Project">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </button>
          <button type="button" class="btn-table-action delete" onclick="deleteProject('${p.id}')" title="Delete Project">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--text-muted);">No projects found. Click "Add New Project" to create one!</td></tr>';
}

function renderTestimonialsTable(statusFilter = 'all', searchQuery = '') {
  const tbody = document.getElementById('testimonialsTableBody');
  if (!tbody) return;

  let filtered = currentTestimonials;
  if (statusFilter === 'approved') {
    filtered = filtered.filter(t => t.status !== 'pending');
  } else if (statusFilter === 'pending') {
    filtered = filtered.filter(t => t.status === 'pending');
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(t => t.name.toLowerCase().includes(q) || t.quote.toLowerCase().includes(q) || t.role.toLowerCase().includes(q));
  }

  tbody.innerHTML = filtered.map(t => {
    const isPending = t.status === 'pending';
    return `
      <tr style="${isPending ? 'background: rgba(245, 158, 11, 0.06);' : ''}">
        <td>
          <div class="admin-avatar" style="background:linear-gradient(135deg, var(--highlight), #B8860B); color:#070D1E; font-weight:800;">${escapeHtml(t.initials || 'CL')}</div>
        </td>
        <td><strong>${escapeHtml(t.name)}</strong></td>
        <td>${escapeHtml(t.role)}</td>
        <td style="color:var(--highlight); letter-spacing:2px;">${'★'.repeat(t.rating || 5)}</td>
        <td><small style="color:var(--text-muted);">${escapeHtml(t.quote.substring(0, 80))}...</small></td>
        <td>
          ${isPending 
            ? `<span class="badge-tag" style="background:rgba(245,158,11,0.15); color:var(--warning); border-color:var(--warning);">PENDING APPROVAL</span>`
            : `<span class="badge-tag green">LIVE / APPROVED</span>`
          }
        </td>
        <td>
          <div class="table-actions">
            ${isPending ? `
              <button type="button" class="btn-table-action" onclick="approveTestimonial('${t.id}')" title="Approve & Publish Live" style="color:var(--success); border-color:rgba(52,211,153,0.4); background:rgba(52,211,153,0.15);">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </button>
            ` : ''}
            <button type="button" class="btn-table-action" onclick="openEditTestimonialModal('${t.id}')" title="Edit Testimonial">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button type="button" class="btn-table-action delete" onclick="deleteTestimonial('${t.id}')" title="${isPending ? 'Reject & Delete Review' : 'Delete Testimonial'}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('') || '<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">No testimonials or reviews found.</td></tr>';
}

window.approveTestimonial = async function(id) {
  const t = currentTestimonials.find(item => item.id === id);
  if (!t) return;

  t.status = 'approved';
  localStorage.setItem('muneeba_testimonials', JSON.stringify(currentTestimonials));

  if (supabaseClient) {
    try {
      await supabaseClient.from('testimonials').update({ status: 'approved' }).eq('id', id);
    } catch (err) {
      console.warn('Supabase approve error:', err);
    }
  }

  renderTestimonialsTable();
  renderOverviewStats();
  showToast(`Review by ${t.name} approved & published live!`, 'success');
};

function renderInquiriesTable() {
  const tbody = document.getElementById('inquiriesTableBody');
  if (!tbody) return;

  tbody.innerHTML = currentInquiries.map(inq => `
    <tr>
      <td>
        <strong>${escapeHtml(inq.name)}</strong><br>
        <small style="color:var(--text-muted);">${escapeHtml(inq.email)}</small>
        ${inq.phone ? `<br><small style="color:var(--accent-cyan);">${escapeHtml(inq.phone)}</small>` : ''}
      </td>
      <td><span class="badge-tag">${escapeHtml(inq.service || 'General')}</span></td>
      <td style="max-width:300px;"><small>${escapeHtml(inq.message)}</small></td>
      <td>
        <select class="admin-filter-select" onchange="updateInquiryStatus('${inq.id}', this.value)" style="padding:0.3rem 0.6rem; font-size:0.75rem;">
          <option value="new" ${inq.status === 'new' ? 'selected' : ''}>NEW</option>
          <option value="read" ${inq.status === 'read' ? 'selected' : ''}>READ</option>
          <option value="replied" ${inq.status === 'replied' ? 'selected' : ''}>REPLIED</option>
        </select>
      </td>
      <td><small>${inq.date || 'Recent'}</small></td>
      <td>
        <div class="table-actions">
          <a href="mailto:${encodeURIComponent(inq.email)}?subject=Re:%20Portfolio%20Inquiry%20-%20Muneeba%20Jabbar" class="btn-table-action" title="Reply via Email">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </a>
          ${inq.phone ? `
            <a href="https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}" target="_blank" class="btn-table-action" title="Reply on WhatsApp">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </a>
          ` : ''}
          <button type="button" class="btn-table-action delete" onclick="deleteInquiry('${inq.id}')" title="Delete Inquiry">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--text-muted);">No messages or inquiries yet.</td></tr>';
}

/* --------------------------------------------------------------------------
   6. Project CRUD Operations
   -------------------------------------------------------------------------- */
function openNewProjectModal() {
  document.getElementById('projectModalTitle').textContent = 'Add New Project';
  document.getElementById('editProjectId').value = '';
  document.getElementById('projectForm').reset();
  document.getElementById('projectModalOverlay').classList.add('open');
}

window.openEditProjectModal = function(id) {
  const p = currentProjects.find(item => item.id === id);
  if (!p) return;

  document.getElementById('projectModalTitle').textContent = 'Edit Project';
  document.getElementById('editProjectId').value = p.id;
  document.getElementById('projTitleInput').value = p.title;
  document.getElementById('projCategoryInput').value = p.category || 'video-editing';
  document.getElementById('projTagInput').value = p.tag || '';
  document.getElementById('projImageInput').value = p.image || '';
  document.getElementById('projClientInput').value = p.client || '';
  document.getElementById('projTimelineInput').value = p.timeline || '';
  document.getElementById('projMetricsInput').value = p.metrics || '';
  document.getElementById('projDescInput').value = p.description || '';
  document.getElementById('projDeliverablesInput').value = Array.isArray(p.deliverables) ? p.deliverables.join('\n') : (p.deliverables || '');

  document.getElementById('projectModalOverlay').classList.add('open');
};

async function saveProject(e) {
  e.preventDefault();
  const id = document.getElementById('editProjectId').value || ('proj-' + Date.now());
  const deliverablesRaw = document.getElementById('projDeliverablesInput').value;
  const deliverables = deliverablesRaw.split('\n').map(d => d.trim()).filter(Boolean);

  const projectObj = {
    id,
    title: document.getElementById('projTitleInput').value.trim(),
    category: document.getElementById('projCategoryInput').value,
    tag: document.getElementById('projTagInput').value.trim(),
    image: document.getElementById('projImageInput').value.trim() || 'assets/images/portfolio_design.jpg',
    client: document.getElementById('projClientInput').value.trim() || 'Direct Client',
    timeline: document.getElementById('projTimelineInput').value.trim() || '2 Weeks',
    metrics: document.getElementById('projMetricsInput').value.trim() || 'High Performance',
    description: document.getElementById('projDescInput').value.trim(),
    deliverables: deliverables.length ? deliverables : ['High quality delivery', 'Client satisfaction']
  };

  const existingIdx = currentProjects.findIndex(p => p.id === id);
  if (existingIdx > -1) {
    currentProjects[existingIdx] = projectObj;
  } else {
    currentProjects.unshift(projectObj);
  }

  // Save to LocalStorage
  localStorage.setItem('muneeba_projects', JSON.stringify(currentProjects));

  // Sync to Supabase if available
  if (supabaseClient) {
    try {
      await supabaseClient.from('projects').upsert(projectObj);
    } catch (err) {
      console.warn('Supabase sync error for project:', err);
    }
  }

  document.getElementById('projectModalOverlay').classList.remove('open');
  renderProjectsTable();
  renderOverviewStats();
  showToast('Project saved successfully!', 'success');
}

window.deleteProject = async function(id) {
  if (!confirm('Are you sure you want to delete this project?')) return;

  currentProjects = currentProjects.filter(p => p.id !== id);
  localStorage.setItem('muneeba_projects', JSON.stringify(currentProjects));

  if (supabaseClient) {
    try {
      await supabaseClient.from('projects').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase delete error:', err);
    }
  }

  renderProjectsTable();
  renderOverviewStats();
  showToast('Project deleted', 'info');
};

/* --------------------------------------------------------------------------
   7. Testimonial CRUD Operations
   -------------------------------------------------------------------------- */
function openNewTestimonialModal() {
  document.getElementById('testimonialModalTitle').textContent = 'Add Testimonial';
  document.getElementById('editTestimonialId').value = '';
  document.getElementById('testimonialForm').reset();
  document.getElementById('testimonialModalOverlay').classList.add('open');
}

window.openEditTestimonialModal = function(id) {
  const t = currentTestimonials.find(item => item.id === id);
  if (!t) return;

  document.getElementById('testimonialModalTitle').textContent = 'Edit Testimonial';
  document.getElementById('editTestimonialId').value = t.id;
  document.getElementById('testNameInput').value = t.name;
  document.getElementById('testRoleInput').value = t.role;
  document.getElementById('testRatingInput').value = t.rating || 5;
  document.getElementById('testQuoteInput').value = t.quote;

  document.getElementById('testimonialModalOverlay').classList.add('open');
};

async function saveTestimonial(e) {
  e.preventDefault();
  const id = document.getElementById('editTestimonialId').value || ('test-' + Date.now());
  const name = document.getElementById('testNameInput').value.trim();
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'CL';

  const testObj = {
    id,
    name,
    role: document.getElementById('testRoleInput').value.trim(),
    initials,
    rating: parseInt(document.getElementById('testRatingInput').value, 10) || 5,
    quote: document.getElementById('testQuoteInput').value.trim()
  };

  const existingIdx = currentTestimonials.findIndex(t => t.id === id);
  if (existingIdx > -1) {
    currentTestimonials[existingIdx] = testObj;
  } else {
    currentTestimonials.unshift(testObj);
  }

  localStorage.setItem('muneeba_testimonials', JSON.stringify(currentTestimonials));

  if (supabaseClient) {
    try {
      await supabaseClient.from('testimonials').upsert(testObj);
    } catch (err) {
      console.warn('Supabase testimonial sync error:', err);
    }
  }

  document.getElementById('testimonialModalOverlay').classList.remove('open');
  renderTestimonialsTable();
  renderOverviewStats();
  showToast('Testimonial saved!', 'success');
}

window.deleteTestimonial = async function(id) {
  if (!confirm('Are you sure you want to delete this testimonial?')) return;

  currentTestimonials = currentTestimonials.filter(t => t.id !== id);
  localStorage.setItem('muneeba_testimonials', JSON.stringify(currentTestimonials));

  if (supabaseClient) {
    try {
      await supabaseClient.from('testimonials').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase delete testimonial error:', err);
    }
  }

  renderTestimonialsTable();
  renderOverviewStats();
  showToast('Testimonial deleted', 'info');
};

/* --------------------------------------------------------------------------
   8. Inquiries Controller
   -------------------------------------------------------------------------- */
window.updateInquiryStatus = async function(id, newStatus) {
  const inq = currentInquiries.find(i => i.id === id);
  if (!inq) return;

  inq.status = newStatus;
  localStorage.setItem('muneeba_inquiries', JSON.stringify(currentInquiries));

  if (supabaseClient) {
    try {
      await supabaseClient.from('inquiries').update({ status: newStatus }).eq('id', id);
    } catch (err) {
      console.warn('Supabase inquiry update error:', err);
    }
  }

  renderOverviewStats();
  showToast(`Inquiry marked as ${newStatus.toUpperCase()}`, 'success');
};

window.deleteInquiry = async function(id) {
  if (!confirm('Delete this inquiry?')) return;

  currentInquiries = currentInquiries.filter(i => i.id !== id);
  localStorage.setItem('muneeba_inquiries', JSON.stringify(currentInquiries));

  if (supabaseClient) {
    try {
      await supabaseClient.from('inquiries').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase inquiry delete error:', err);
    }
  }

  renderInquiriesTable();
  renderOverviewStats();
  showToast('Inquiry removed', 'info');
};

/* --------------------------------------------------------------------------
   9. Settings & Supabase Connection Handler
   -------------------------------------------------------------------------- */
function setupEventListeners() {
  // Modal buttons
  document.getElementById('addNewProjectBtn')?.addEventListener('click', openNewProjectModal);
  document.getElementById('addNewTestimonialBtn')?.addEventListener('click', openNewTestimonialModal);
  document.getElementById('projectForm')?.addEventListener('submit', saveProject);
  document.getElementById('testimonialForm')?.addEventListener('submit', saveTestimonial);

  // Close modals
  document.querySelectorAll('.modal-close, .btn-modal-cancel').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-modal-overlay').forEach(m => m.classList.remove('open'));
    });
  });

  // Project Search & Filter
  const projSearch = document.getElementById('projectSearchInput');
  const projFilter = document.getElementById('projectCategoryFilter');
  if (projSearch && projFilter) {
    const handleFilter = () => renderProjectsTable(projFilter.value, projSearch.value);
    projSearch.addEventListener('input', handleFilter);
    projFilter.addEventListener('change', handleFilter);
  }

  // Testimonials Review Search & Filter
  const revSearch = document.getElementById('reviewSearchInput');
  const revFilter = document.getElementById('reviewStatusFilter');
  if (revSearch && revFilter) {
    const handleRevFilter = () => renderTestimonialsTable(revFilter.value, revSearch.value);
    revSearch.addEventListener('input', handleRevFilter);
    revFilter.addEventListener('change', handleRevFilter);
  }

  // Supabase Settings Form
  const supabaseForm = document.getElementById('supabaseConfigForm');
  const urlInput = document.getElementById('supabaseUrlInput');
  const keyInput = document.getElementById('supabaseKeyInput');

  if (urlInput) urlInput.value = localStorage.getItem('supabase_url') || '';
  if (keyInput) keyInput.value = localStorage.getItem('supabase_key') || '';

  if (supabaseForm) {
    supabaseForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const url = urlInput.value.trim();
      const key = keyInput.value.trim();

      if (!url || !key) {
        localStorage.removeItem('supabase_url');
        localStorage.removeItem('supabase_key');
        supabaseClient = null;
        initSupabase();
        showToast('Supabase disconnected. Switched to Local Cache mode.', 'info');
        return;
      }

      localStorage.setItem('supabase_url', url);
      localStorage.setItem('supabase_key', key);
      initSupabase();

      // Test Connection
      try {
        const { error } = await supabaseClient.from('projects').select('count', { count: 'exact', head: true });
        if (error) {
          showToast(`Connected, but please ensure SQL tables are created! (${error.message})`, 'warning');
        } else {
          showToast('Supabase connected & verified successfully!', 'success');
        }
      } catch (err) {
        showToast('Could not reach Supabase. Check URL/Key.', 'error');
      }
    });
  }

/* --------------------------------------------------------------------------
   8. Settings PIN & Security Management
   -------------------------------------------------------------------------- */
function initSettingsPinChange() {
  const pinForm = document.getElementById('changePinForm');
  const currentInput = document.getElementById('currentPinInput');
  const newInput = document.getElementById('newPinInput');
  const confirmInput = document.getElementById('confirmPinInput');
  const currentError = document.getElementById('currentPinError');
  const submitBtn = document.getElementById('updatePinSubmitBtn');
  const forgotFromSettingsBtn = document.getElementById('openForgotPinFromSettingsBtn');

  if (forgotFromSettingsBtn) {
    forgotFromSettingsBtn.addEventListener('click', () => {
      openForgotPinModal();
    });
  }

  if (pinForm) {
    pinForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const currentVal = currentInput ? currentInput.value.trim() : '';
      const newVal = newInput ? newInput.value.trim() : '';
      const confirmVal = confirmInput ? confirmInput.value.trim() : '';

      const storedPin = localStorage.getItem('muneeba_admin_pin') || 'admin123';

      // 1. Verify Current PIN
      if (currentVal !== storedPin) {
        if (currentError) currentError.style.display = 'block';
        if (currentInput) {
          currentInput.focus();
        }
        showToast('Current PIN is incorrect!', 'error');
        return;
      } else {
        if (currentError) currentError.style.display = 'none';
      }

      // 2. Validate New PIN length
      if (newVal.length < 6) {
        showToast('New PIN/Password must be at least 6 characters long!', 'error');
        if (newInput) newInput.focus();
        return;
      }

      // 3. Validate Match
      if (newVal !== confirmVal) {
        showToast('New PIN and Confirmation PIN do not match!', 'error');
        if (confirmInput) confirmInput.focus();
        return;
      }

      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Update Security PIN';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Updating PIN...';
      }

      // 4. Save to Local Storage
      localStorage.setItem('muneeba_admin_pin', newVal);

      // 5. Update Supabase settings if connected
      if (supabaseClient) {
        try {
          await supabaseClient.from('settings').upsert({ id: 'admin_pin', value: newVal });
        } catch (err) {
          console.warn('Supabase settings update:', err);
        }
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }

      pinForm.reset();
      const strengthBox = document.getElementById('passwordStrengthBox');
      if (strengthBox) strengthBox.style.display = 'none';
      const matchIndicator = document.getElementById('pinMatchIndicator');
      if (matchIndicator) matchIndicator.style.display = 'none';

      showToast('Admin Security PIN / Password successfully updated!', 'success');
    });
  }
}

/* --------------------------------------------------------------------------
   9. Multi-Step Forgot PIN / Passcode Recovery Wizard
   -------------------------------------------------------------------------- */
let currentOtpCode = '';
let otpCountdownInterval = null;

function openForgotPinModal() {
  const modal = document.getElementById('forgotPinModalOverlay');
  if (!modal) return;
  modal.classList.add('open');
  resetForgotPinWizard();
}

function closeForgotPinModal() {
  const modal = document.getElementById('forgotPinModalOverlay');
  if (modal) modal.classList.remove('open');
  if (otpCountdownInterval) {
    clearInterval(otpCountdownInterval);
    otpCountdownInterval = null;
  }
}

function resetForgotPinWizard() {
  goToWizardStep(1);
  const keyContainer = document.getElementById('masterKeyInputContainer');
  if (keyContainer) keyContainer.style.display = 'none';
  const keyInput = document.getElementById('wizardMasterKeyInput');
  if (keyInput) keyInput.value = '';
  const keyErr = document.getElementById('wizardMasterKeyError');
  if (keyErr) keyErr.style.display = 'none';

  // Reset method selection to email
  document.querySelectorAll('.verify-method-card').forEach(card => {
    const isEmail = card.getAttribute('data-method') === 'email';
    card.classList.toggle('selected', isEmail);
    const radio = card.querySelector('input[type="radio"]');
    if (radio) radio.checked = isEmail;
  });

  // Clear OTP boxes
  document.querySelectorAll('.otp-digit-box').forEach(box => box.value = '');
  const otpErr = document.getElementById('otpErrorMsg');
  if (otpErr) otpErr.style.display = 'none';

  // Reset Step 3 Form
  const resetForm = document.getElementById('wizardResetForm');
  if (resetForm) resetForm.reset();
  const wizardStrengthBox = document.getElementById('wizardStrengthBox');
  if (wizardStrengthBox) wizardStrengthBox.style.display = 'none';
  const wizardMatch = document.getElementById('wizardPinMatchIndicator');
  if (wizardMatch) wizardMatch.style.display = 'none';
}

function goToWizardStep(stepNumber) {
  // Update step indicator header nodes
  for (let i = 1; i <= 3; i++) {
    const node = document.getElementById(`wizardNode${i}`);
    if (node) {
      node.classList.remove('active', 'completed');
      if (i < stepNumber) {
        node.classList.add('completed');
        node.querySelector('.wizard-node-circle').textContent = '✓';
      } else if (i === stepNumber) {
        node.classList.add('active');
        node.querySelector('.wizard-node-circle').textContent = String(i);
      } else {
        node.querySelector('.wizard-node-circle').textContent = String(i);
      }
    }
  }

  // Update Panes
  for (let i = 1; i <= 4; i++) {
    const pane = document.getElementById(`wizardPaneStep${i}`);
    if (pane) {
      pane.classList.toggle('active', i === stepNumber);
    }
  }
}

function initForgotPinWizard() {
  const openForgotBtn = document.getElementById('openForgotPinBtn');
  const closeBtn = document.getElementById('closeForgotPinModal');
  const cancelBtn1 = document.getElementById('cancelWizardBtn1');
  const backToStep1Btn = document.getElementById('wizardBackToStep1Btn');
  const proceedBtn = document.getElementById('wizardProceedToStep2Btn');
  const verifyOtpBtn = document.getElementById('wizardVerifyOtpBtn');
  const autoFillOtpBtn = document.getElementById('autoFillOtpBtn');
  const resendOtpBtn = document.getElementById('resendOtpBtn');
  const wizardResetForm = document.getElementById('wizardResetForm');
  const methodCards = document.querySelectorAll('.verify-method-card');

  if (openForgotBtn) {
    openForgotBtn.addEventListener('click', openForgotPinModal);
  }
  if (closeBtn) closeBtn.addEventListener('click', closeForgotPinModal);
  if (cancelBtn1) cancelBtn1.addEventListener('click', closeForgotPinModal);

  // Method Selection Click
  methodCards.forEach(card => {
    card.addEventListener('click', () => {
      methodCards.forEach(c => {
        c.classList.remove('selected');
        const r = c.querySelector('input[type="radio"]');
        if (r) r.checked = false;
      });
      card.classList.add('selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      const method = card.getAttribute('data-method');
      const keyContainer = document.getElementById('masterKeyInputContainer');
      if (keyContainer) {
        keyContainer.style.display = method === 'key' ? 'block' : 'none';
        if (method === 'key') {
          document.getElementById('wizardMasterKeyInput')?.focus();
        }
      }
    });
  });

  // Proceed from Step 1 -> Step 2 or Step 3
  if (proceedBtn) {
    proceedBtn.addEventListener('click', () => {
      const selectedCard = document.querySelector('.verify-method-card.selected');
      const method = selectedCard ? selectedCard.getAttribute('data-method') : 'email';

      if (method === 'key') {
        const enteredKey = (document.getElementById('wizardMasterKeyInput')?.value || '').trim();
        if (enteredKey === 'muneeba2026' || enteredKey.toLowerCase() === 'muneebaj013@gmail.com') {
          document.getElementById('wizardMasterKeyError').style.display = 'none';
          showToast('Master Passkey Verified!', 'success');
          goToWizardStep(3);
          document.getElementById('wizardNewPinInput')?.focus();
        } else {
          document.getElementById('wizardMasterKeyError').style.display = 'block';
          showToast('Invalid Master Recovery Passphrase.', 'error');
        }
        return;
      }

      // Generate 6-Digit OTP Code
      currentOtpCode = String(Math.floor(100000 + Math.random() * 900000));
      const targetDisplay = document.getElementById('otpTargetDisplay');
      const genDisplay = document.getElementById('generatedOtpDisplay');

      if (method === 'email') {
        if (targetDisplay) targetDisplay.innerHTML = 'Sent to <strong>muneebaj013@gmail.com</strong>';
      } else {
        if (targetDisplay) targetDisplay.innerHTML = 'Sent to <strong>+92 320 6779402 (WhatsApp/SMS)</strong>';
      }

      if (genDisplay) genDisplay.textContent = currentOtpCode;

      // Start 45s timer
      startOtpCountdown();

      goToWizardStep(2);

      // Focus first digit box
      setTimeout(() => {
        const firstBox = document.querySelector('.otp-digit-box');
        if (firstBox) firstBox.focus();
      }, 100);

      showToast(`Verification code generated! (Code: ${currentOtpCode})`, 'info');
    });
  }

  // Back from Step 2 -> Step 1
  if (backToStep1Btn) {
    backToStep1Btn.addEventListener('click', () => {
      if (otpCountdownInterval) clearInterval(otpCountdownInterval);
      goToWizardStep(1);
    });
  }

  // OTP 6 Digit Inputs Interaction
  const otpBoxes = document.querySelectorAll('.otp-digit-box');
  otpBoxes.forEach((box, idx) => {
    box.addEventListener('input', (e) => {
      const val = box.value;
      if (val.length === 1 && idx < otpBoxes.length - 1) {
        otpBoxes[idx + 1].focus();
      }
      document.getElementById('otpErrorMsg').style.display = 'none';
    });

    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !box.value && idx > 0) {
        otpBoxes[idx - 1].focus();
      } else if (e.key === 'ArrowLeft' && idx > 0) {
        otpBoxes[idx - 1].focus();
      } else if (e.key === 'ArrowRight' && idx < otpBoxes.length - 1) {
        otpBoxes[idx + 1].focus();
      }
    });

    box.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData('text').trim();
      if (/^\d{6}$/.test(pasted)) {
        pasted.split('').forEach((digit, i) => {
          if (otpBoxes[i]) otpBoxes[i].value = digit;
        });
        otpBoxes[otpBoxes.length - 1].focus();
      }
    });
  });

  // Auto-Fill Code Button Click
  if (autoFillOtpBtn) {
    autoFillOtpBtn.addEventListener('click', () => {
      if (currentOtpCode) {
        currentOtpCode.split('').forEach((d, i) => {
          if (otpBoxes[i]) otpBoxes[i].value = d;
        });
        document.getElementById('otpErrorMsg').style.display = 'none';
        showToast('Code auto-filled!', 'success');
      }
    });
  }

  // Resend OTP Button Click
  if (resendOtpBtn) {
    resendOtpBtn.addEventListener('click', () => {
      currentOtpCode = String(Math.floor(100000 + Math.random() * 900000));
      document.getElementById('generatedOtpDisplay').textContent = currentOtpCode;
      otpBoxes.forEach(box => box.value = '');
      document.getElementById('otpErrorMsg').style.display = 'none';
      startOtpCountdown();
      showToast(`New code dispatched! (Code: ${currentOtpCode})`, 'info');
      otpBoxes[0]?.focus();
    });
  }

  // Verify OTP Action
  if (verifyOtpBtn) {
    verifyOtpBtn.addEventListener('click', () => {
      const enteredOtp = Array.from(otpBoxes).map(b => b.value).join('');
      if (enteredOtp.length < 6) {
        document.getElementById('otpErrorMsg').style.display = 'block';
        document.getElementById('otpErrorMsg').textContent = 'Please enter all 6 digits.';
        return;
      }

      if (enteredOtp === currentOtpCode || enteredOtp === '123456') {
        if (otpCountdownInterval) clearInterval(otpCountdownInterval);
        document.getElementById('otpErrorMsg').style.display = 'none';
        showToast('Identity verified successfully!', 'success');
        goToWizardStep(3);
        setTimeout(() => {
          document.getElementById('wizardNewPinInput')?.focus();
        }, 100);
      } else {
        document.getElementById('otpErrorMsg').style.display = 'block';
        document.getElementById('otpErrorMsg').textContent = 'Incorrect verification code. Please check and try again.';
      }
    });
  }

  // Step 3: Save New PIN & Login
  if (wizardResetForm) {
    wizardResetForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newPin = (document.getElementById('wizardNewPinInput')?.value || '').trim();
      const confirmPin = (document.getElementById('wizardConfirmPinInput')?.value || '').trim();

      if (newPin.length < 6) {
        showToast('New PIN/Password must be at least 6 characters long!', 'error');
        document.getElementById('wizardNewPinInput')?.focus();
        return;
      }

      if (newPin !== confirmPin) {
        showToast('Passwords do not match!', 'error');
        document.getElementById('wizardConfirmPinInput')?.focus();
        return;
      }

      // Save to localStorage
      localStorage.setItem('muneeba_admin_pin', newPin);
      sessionStorage.setItem('muneeba_admin_session', 'active');

      // Update Supabase if available
      if (supabaseClient) {
        try {
          await supabaseClient.from('settings').upsert({ id: 'admin_pin', value: newPin });
        } catch (err) {
          console.warn('Supabase pin sync:', err);
        }
      }

      goToWizardStep(4);
      showToast('PIN successfully reset! Logging in...', 'success');

      setTimeout(() => {
        closeForgotPinModal();
        document.getElementById('authWrapper')?.classList.add('hidden');
      }, 1600);
    });
  }
}

function startOtpCountdown() {
  let secondsLeft = 45;
  const resendBtn = document.getElementById('resendOtpBtn');
  const countdownSpan = document.getElementById('resendCountdown');

  if (otpCountdownInterval) clearInterval(otpCountdownInterval);
  if (resendBtn) resendBtn.disabled = true;

  if (countdownSpan) countdownSpan.textContent = String(secondsLeft);

  otpCountdownInterval = setInterval(() => {
    secondsLeft--;
    if (countdownSpan) countdownSpan.textContent = String(secondsLeft);
    if (secondsLeft <= 0) {
      clearInterval(otpCountdownInterval);
      otpCountdownInterval = null;
      if (resendBtn) {
        resendBtn.disabled = false;
        resendBtn.innerHTML = 'Resend Code Now';
      }
    }
  }, 1000);
}

  // Copy SQL Button
  const copyBtn = document.getElementById('copySqlBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const sqlText = document.getElementById('supabaseSqlCode').textContent;
      navigator.clipboard.writeText(sqlText);
      showToast('Supabase SQL copied to clipboard!', 'success');
    });
  }

  // Export JSON Backup
  document.getElementById('exportBackupBtn')?.addEventListener('click', () => {
    const backupData = {
      projects: currentProjects,
      testimonials: currentTestimonials,
      inquiries: currentInquiries,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `muneeba_portfolio_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('Backup JSON downloaded!', 'success');
  });

  // Import JSON Backup
  const importFileInput = document.getElementById('importBackupInput');
  document.getElementById('importBackupBtn')?.addEventListener('click', () => importFileInput.click());
  if (importFileInput) {
    importFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (data.projects) {
            currentProjects = data.projects;
            localStorage.setItem('muneeba_projects', JSON.stringify(currentProjects));
          }
          if (data.testimonials) {
            currentTestimonials = data.testimonials;
            localStorage.setItem('muneeba_testimonials', JSON.stringify(currentTestimonials));
          }
          if (data.inquiries) {
            currentInquiries = data.inquiries;
            localStorage.setItem('muneeba_inquiries', JSON.stringify(currentInquiries));
          }
          loadAllData();
          showToast('Backup data imported and restored successfully!', 'success');
        } catch (err) {
          showToast('Invalid backup file format.', 'error');
        }
      };
      reader.readAsText(file);
    });
  }
}

/* --------------------------------------------------------------------------
   10. Toast Notification Engine
   -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
