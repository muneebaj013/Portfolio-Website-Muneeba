/**
 * MUNEEBA JABBAR - DIGITAL MARKETING, VIDEO EDITING & CREATIVE SPECIALIST
 * Interactive Functionality & Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initActiveNavSpy();
  initMobileMenu();
  initStatsCounter();
  initPortfolioFilter();
  initProjectModals();
  initServiceModals();
  initAboutModal();
  initBlogModals();
  initContactForm();
  initLegalModals();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   1. Sticky Header Functionality
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. Active Navigation Spy (Intersection Observer)
   -------------------------------------------------------------------------- */
function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   3. Mobile Hamburger Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-footer a');

  if (!hamburgerBtn || !mobileDrawer) return;

  const toggleMenu = () => {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburgerBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   4. Quick Stats Counter Animation
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-count');
  const statsSection = document.getElementById('stats');

  if (!statsSection || !statNumbers.length) return;

  let animated = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutQuad)
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(easeProgress * target);

        stat.textContent = currentVal;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target;
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}

/* --------------------------------------------------------------------------
   5. Portfolio Category Filter
   -------------------------------------------------------------------------- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Portfolio Project Detail Modals
   -------------------------------------------------------------------------- */
const projectsData = {
  1: {
    title: "Cinematic Video Editing & Motion Suite",
    category: "Video Editing",
    tag: "Video Production",
    image: "assets/images/portfolio_video_editing.jpg",
    description: "High-end 4K commercial video editing, dynamic pacing, audio mastering, custom lower-thirds, and professional color grading tailored for high-converting social media ads and brand promos.",
    client: "Prism Studio & Media",
    timeline: "2 Weeks",
    metrics: "+420% View Retention, 1.8M+ Impressions",
    details: [
      "Multi-cam 4K editing with dynamic sound design and custom audio transitions",
      "Cinematic color grading & LUT matching for a luxury brand aesthetic",
      "Social-first aspect ratio formatting (9:16 Reels/TikTok and 16:9 YouTube)",
      "High-impact hooks engineered to maximize audience watch time"
    ]
  },
  2: {
    title: "AI Animation & Generative 3D Videos",
    category: "AI Animation",
    tag: "AI Motion Lab",
    image: "assets/images/portfolio_ai_animation.jpg",
    description: "Cutting-edge AI-generated animated visuals and 3D kinetic video production combining Midjourney, Stable Video Diffusion, and neural motion rigs for futuristic brand storytelling.",
    client: "Synthetic Motion Labs",
    timeline: "3 Weeks",
    metrics: "5.8x Higher CTR, 60 FPS Ultra-Smooth Render",
    details: [
      "Custom AI prompt engineering and keyframe motion consistency control",
      "Neural voiceover sync with expressive facial and body movement",
      "Dynamic visual FX compositing in After Effects and Premiere Pro",
      "Scalable automated video generation workflows for rapid testing"
    ]
  },
  3: {
    title: "Shopify E-commerce Store",
    category: "Shopify",
    tag: "E-Commerce",
    image: "assets/images/portfolio_shopify.jpg",
    description: "End-to-end Shopify store development for a luxury lifestyle and apparel brand, optimized for high conversion rate, smooth UX, fast page load speeds, and multi-currency checkout.",
    client: "Aeterna Fashion & Lifestyle",
    timeline: "4 Weeks",
    metrics: "+148% Conversion Rate, 1.2s Load Speed",
    details: [
      "Custom responsive Liquid theme build with modern dark/glassmorphic styling",
      "Seamless integration with Klaviyo for automated email sequences",
      "Mobile-first checkout and frictionless one-page purchase funnel",
      "Comprehensive technical SEO setup and product catalog schema markup"
    ]
  },
  4: {
    title: "SEO Growth & Visibility Project",
    category: "SEO",
    tag: "SEO Strategy",
    image: "assets/images/portfolio_seo.jpg",
    description: "Comprehensive SEO audit and optimization campaign that elevated search visibility, organic keyword rankings, and high-intent inbound search traffic for a B2B SaaS platform.",
    client: "TechStream Analytics",
    timeline: "3 Months",
    metrics: "+340% Organic Traffic, 45+ Page-1 Rankings",
    details: [
      "Extensive high-intent keyword clustering and competitor gap analysis",
      "On-page optimization, metadata structuring, and schema graph integration",
      "Technical Core Web Vitals remediation to achieve 98+ PageSpeed scores",
      "High-authority niche backlink acquisition strategy"
    ]
  },
  5: {
    title: "Google Ads High-ROAS Campaign",
    category: "Ads",
    tag: "Paid Search",
    image: "assets/images/portfolio_gads.jpg",
    description: "High-ROI Google Search and Performance Max advertising campaign generating qualified leads and maximizing revenue for an enterprise service provider.",
    client: "Apex Financial Solutions",
    timeline: "Ongoing",
    metrics: "8.6x ROAS, -38% Cost Per Acquisition",
    details: [
      "Laser-targeted single-theme ad groups with negative keyword shielding",
      "Custom responsive search ads with compelling value propositions and extensions",
      "Enhanced conversion tracking with Google Tag Manager & offline conversion sync",
      "Continuous bid strategy refinement using Smart Bidding and audience signals"
    ]
  },
  6: {
    title: "Facebook & Meta Ads Scale Campaign",
    category: "Ads",
    tag: "Social Ads",
    image: "assets/images/portfolio_fbads.jpg",
    description: "Targeted Meta advertising campaign leveraging engaging short-form video creatives and tailored lookalike audiences to scale customer acquisition.",
    client: "Urban Outdoor Gear",
    timeline: "2 Months",
    metrics: "5.4x ROAS, 2,340+ Direct Purchases",
    details: [
      "Creative A/B testing across video hooks, UGC testimonials, and carousel ads",
      "Advanced custom audience segmentation and 1%-3% lookalike modeling",
      "CAPI (Conversion API) setup for accurate tracking and attribution",
      "Dynamic retargeting funnel with customized incentive offers"
    ]
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  const viewBtns = document.querySelectorAll('.btn-view-project');
  const closeBtn = document.getElementById('closeProjectModal');

  if (!modalOverlay || !viewBtns.length) return;

  const modalTag = document.getElementById('modalProjectTag');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalImg = document.getElementById('modalProjectImg');
  const modalDesc = document.getElementById('modalProjectDesc');
  const modalClient = document.getElementById('modalProjectClient');
  const modalTimeline = document.getElementById('modalProjectTimeline');
  const modalMetrics = document.getElementById('modalProjectMetrics');
  const modalDetailsList = document.getElementById('modalProjectDetails');

  const openProjectModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data) return;

    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalDesc.textContent = data.description;
    modalClient.textContent = data.client;
    modalTimeline.textContent = data.timeline;
    modalMetrics.textContent = data.metrics;

    modalDetailsList.innerHTML = '';
    data.details.forEach(item => {
      const li = document.createElement('li');
      li.style.marginBottom = '0.5rem';
      li.style.display = 'flex';
      li.style.alignItems = 'flex-start';
      li.style.gap = '0.5rem';
      li.innerHTML = `<span style="color: var(--accent-cyan); font-weight: bold;">✓</span> <span>${item}</span>`;
      modalDetailsList.appendChild(li);
    });

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.project-card');
      const id = card.getAttribute('data-id');
      openProjectModal(id);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeProjectModal();
    }
  });
}

/* --------------------------------------------------------------------------
   7. Service Detail Modals
   -------------------------------------------------------------------------- */
const servicesData = {
  1: {
    number: "01",
    title: "Video Editing & Motion Graphics",
    tag: "Visual Production",
    description: "Create engaging, high-retention video content, commercial advertisements, and YouTube/social media edits engineered to capture attention.",
    deliverables: [
      "4K video editing, color grading, and dynamic audio sound design",
      "Social-first aspect ratio formatting (Reels, TikTok, Shorts)",
      "Motion graphics, custom lower thirds, and kinetic typography",
      "Fast turnaround with multiple revision rounds"
    ]
  },
  2: {
    number: "02",
    title: "AI Animation & Generative Video",
    tag: "AI Innovation",
    description: "Leverage state-of-the-art AI generation tools to create cinematic animated videos, character animations, and futuristic brand visuals.",
    deliverables: [
      "AI prompt engineering and style consistency control",
      "3D character animation and dynamic environment generation",
      "Neural voiceover integration and lip-sync",
      "High-resolution 60 FPS post-processing and VFX polish"
    ]
  },
  3: {
    number: "03",
    title: "Digital Marketing & Strategy",
    tag: "Growth Marketing",
    description: "Create strategic multi-channel campaigns designed to increase visibility, engagement, leads, and business growth.",
    deliverables: [
      "Holistic digital marketing strategy tailored to your target audience",
      "Content marketing planning & campaign scheduling",
      "Email marketing automation & lead nurturing funnels",
      "Comprehensive performance analytics & monthly KPI review"
    ]
  },
  4: {
    number: "04",
    title: "Search Engine Optimization (SEO)",
    tag: "Organic Search",
    description: "Improve search visibility, organic traffic, rankings, and website performance.",
    deliverables: [
      "In-depth technical SEO audit & site speed optimization",
      "High-value keyword research & competitive intelligence",
      "On-page SEO, schema markup, and meta tag optimization",
      "Strategic link building & local SEO profile optimization"
    ]
  },
  5: {
    number: "05",
    title: "Shopify Development & CRO",
    tag: "E-Commerce",
    description: "Create modern, responsive, user-friendly Shopify stores designed for conversions.",
    deliverables: [
      "Custom Shopify theme setup, styling, and brand alignment",
      "Mobile-optimized checkout and UX conversion enhancements",
      "Essential app integration (reviews, upsells, email, analytics)",
      "Product catalog upload, collection architecture & SEO structure"
    ]
  },
  6: {
    number: "06",
    title: "Google & Meta Ads (Paid Acquisition)",
    tag: "Paid Advertising",
    description: "Create and optimize targeted Google and Meta Ads campaigns for qualified traffic, high ROAS, and conversions.",
    deliverables: [
      "Search, Display, Performance Max, and Meta ad funnels",
      "Audience targeting (custom, lookalike, interest-based)",
      "Conversion tracking via Google Tag Manager and Meta CAPI",
      "Continuous A/B copy testing and bid strategy optimization"
    ]
  }
};

function initServiceModals() {
  const serviceModalOverlay = document.getElementById('serviceModal');
  const learnMoreBtns = document.querySelectorAll('.service-learn-more-btn');
  const closeServiceModalBtn = document.getElementById('closeServiceModal');

  if (!serviceModalOverlay || !learnMoreBtns.length) return;

  const serviceTag = document.getElementById('modalServiceTag');
  const serviceTitle = document.getElementById('modalServiceTitle');
  const serviceDesc = document.getElementById('modalServiceDesc');
  const serviceDeliverablesList = document.getElementById('modalServiceDeliverables');

  const openServiceModal = (serviceId) => {
    const data = servicesData[serviceId];
    if (!data) return;

    serviceTag.textContent = `${data.number} — ${data.tag}`;
    serviceTitle.textContent = data.title;
    serviceDesc.textContent = data.description;

    serviceDeliverablesList.innerHTML = '';
    data.deliverables.forEach(item => {
      const li = document.createElement('li');
      li.style.marginBottom = '0.75rem';
      li.style.display = 'flex';
      li.style.alignItems = 'flex-start';
      li.style.gap = '0.5rem';
      li.innerHTML = `<span style="color: var(--accent-cyan); font-weight: bold;">✓</span> <span>${item}</span>`;
      serviceDeliverablesList.appendChild(li);
    });

    serviceModalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeServiceModal = () => {
    serviceModalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceId = btn.getAttribute('data-service-id');
      openServiceModal(serviceId);
    });
  });

  if (closeServiceModalBtn) {
    closeServiceModalBtn.addEventListener('click', closeServiceModal);
  }

  serviceModalOverlay.addEventListener('click', (e) => {
    if (e.target === serviceModalOverlay) {
      closeServiceModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && serviceModalOverlay.classList.contains('open')) {
      closeServiceModal();
    }
  });
}

/* --------------------------------------------------------------------------
   8. About Me Modal (More About Me Popup)
   -------------------------------------------------------------------------- */
function initAboutModal() {
  const aboutModal = document.getElementById('aboutModal');
  const openAboutBtn = document.getElementById('openAboutModalBtn');
  const closeAboutBtn = document.getElementById('closeAboutModal');

  if (!aboutModal || !openAboutBtn) return;

  const openModal = () => {
    aboutModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    aboutModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  openAboutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  if (closeAboutBtn) {
    closeAboutBtn.addEventListener('click', closeModal);
  }

  aboutModal.addEventListener('click', (e) => {
    if (e.target === aboutModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && aboutModal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   9. Blog Hub & Individual Article Reader Modals
   -------------------------------------------------------------------------- */
const articlesData = {
  "seo-guide": {
    category: "SEO Strategy",
    title: "Technical SEO & Keyword Ranking Blueprint: How to Dominate Page 1 in 2026",
    readTime: "6 Min Read",
    date: "August 2026",
    author: "Muneeba Jabbar",
    summary: "Discover high-volume keyword clustering, Core Web Vitals optimization, and on-page authority techniques to outrank competitors.",
    content: `
      <p>Search Engine Optimization (SEO) has evolved drastically. To win on Google and search engines today, businesses need more than just repeating keywords; they need a holistic combination of <strong>technical site architecture</strong>, <strong>high-intent search volume targeting</strong>, and <strong>top-tier user experience</strong>.</p>
      
      <h2>1. The Power of High-Volume, High-Intent Keyword Clustering</h2>
      <p>Rather than ranking for single disparate keywords, modern SEO relies on <em>semantic topic clusters</em>. Grouping related long-tail search terms around a primary pillar allows search engines to understand your topical authority faster.</p>
      <ul>
        <li><strong>Primary Volume Target:</strong> High-intent commercial keywords with solid search demand.</li>
        <li><strong>Secondary Modifiers:</strong> Problem-solving phrases ("how to", "best tool for", "services in").</li>
        <li><strong>Search Intent Alignment:</strong> Informational, Navigational, Commercial, or Transactional matching.</li>
      </ul>

      <div class="article-callout-box">
        <div class="article-callout-title">💡 Pro SEO Action Step</div>
        <div>Always ensure your title tag, H1 heading, and first 100 words naturally incorporate your target keyword without keyword stuffing. Keep your URL structure short and clean (e.g., <code>/services/seo-optimization</code>).</div>
      </div>

      <h2>2. Core Web Vitals & Technical Speed Optimization</h2>
      <p>Google's ranking algorithm directly penalizes sluggish websites. Achieving sub-second page loads requires:</p>
      <ul>
        <li>Compressing and converting assets to modern WebP formats.</li>
        <li>Eliminating render-blocking JavaScript and CSS resources.</li>
        <li>Implementing robust schema markup (JSON-LD) for rich search snippet eligibility.</li>
      </ul>

      <h2>3. Quality Backlinks & Domain Authority Building</h2>
      <p>High-quality backlinks from niche-relevant websites remain a cornerstone of organic ranking. Focus on creating authoritative case studies, insightful data infographics, and industry guides that naturally earn citations.</p>
    `
  },
  "facebook-ads": {
    category: "Facebook Ads",
    title: "Scaling Facebook Ads in 2026: The Ultimate ROAS & Creative Blueprint",
    readTime: "5 Min Read",
    date: "August 2026",
    author: "Muneeba Jabbar",
    summary: "Learn how to lower your Cost Per Acquisition (CPA) and achieve 8x+ ROAS using short-form video hooks and dynamic audience funnels.",
    content: `
      <p>Scaling paid advertising on Facebook and Instagram requires an analytical, creative-first mindset. With automated algorithmic bidding dominating Meta's ad ecosystem, <strong>the creative is now your primary targeting tool</strong>.</p>

      <h2>1. The 3-Second Hook Video Rule</h2>
      <p>Over 80% of viewers scroll past ads within the first 3 seconds. To maximize video retention and click-through rates (CTR):</p>
      <ul>
        <li>Start with a high-contrast visual pattern interrupt or bold statement.</li>
        <li>Show the core problem and immediate solution within the first 4 seconds.</li>
        <li>Add animated dynamic captions with strong kinetic typography for sound-off viewers.</li>
      </ul>

      <div class="article-callout-box">
        <div class="article-callout-title">📊 ROAS Metric Benchmark</div>
        <div>Target an average CTR above 2.2% on top-of-funnel short-form video ads. Maintain a thumbstop rate (3-second views / impressions) higher than 35% to drive down CPM costs.</div>
      </div>

      <h2>2. Full-Funnel Retargeting & Meta CAPI Integration</h2>
      <p>Relying solely on browser pixel tracking causes massive data blind spots. Implementing the <strong>Meta Conversions API (CAPI)</strong> provides server-side event tracking, enabling accurate attribution and higher algorithmic precision for scaling lookalike audiences (1%-3%).</p>

      <h2>3. Creative Fatigue Mitigation</h2>
      <p>Continuously test at least 3-5 creative variations weekly (UGC videos, founder stories, dynamic carousels) to prevent audience fatigue and maintain profitable ROAS scaling.</p>
    `
  },
  "video-editing": {
    category: "Video Editing",
    title: "Viral Short-Form Video Editing Secrets: Boosting Retention on Reels & TikTok",
    readTime: "5 Min Read",
    date: "August 2026",
    author: "Muneeba Jabbar",
    summary: "Master the exact pacing, audio sound design, and color grading techniques that keep viewers watching till the very last second.",
    content: `
      <p>In short-form video algorithms (Instagram Reels, YouTube Shorts, TikTok), <strong>Average View Duration (AVD)</strong> and <strong>Completion Rate</strong> are the single most important metrics determining viral reach.</p>

      <h2>1. Pacing & The 2-Second Visual Cut</h2>
      <p>Never let a visual frame sit static for longer than 2.5 seconds. Re-engage the viewer's brain using:</p>
      <ul>
        <li>Subtle punch-in zoom cuts on key emotional punchlines.</li>
        <li>B-roll cutaways illustrating the concept being discussed.</li>
        <li>Kinetic sound effects (whooshes, risers, paper textures) supporting visual transitions.</li>
      </ul>

      <div class="article-callout-box">
        <div class="article-callout-title">🎬 Sound Design Secret</div>
        <div>Audio makes up 50% of the video experience. Layer background lofi/ambient music at -18dB while mastering vocal tracks at -3dB with compression and high-pass EQ for crisp clarity.</div>
      </div>

      <h2>2. Color Grading for Brand Distinction</h2>
      <p>Grading footage with cohesive LUTs and tailored color palettes separates professional commercial content from amateur phone recordings. Enhance natural skin tones while adding rich contrast to brand assets.</p>
    `
  },
  "meta-ads": {
    category: "Meta Ads Strategy",
    title: "Mastering Meta Ads & Performance Max: High-Converting Funnels for E-Commerce",
    readTime: "6 Min Read",
    date: "August 2026",
    author: "Muneeba Jabbar",
    summary: "How to combine Meta Ads with Google PPC into an unstoppable multi-touchpoint customer acquisition engine.",
    content: `
      <p>Modern consumers rarely buy on their first touchpoint. Combining <strong>Meta social discovery ads</strong> with <strong>Google high-intent search capture</strong> creates an omnichannel conversion flywheel that maximizes Customer Lifetime Value (LTV).</p>

      <h2>1. Top of Funnel (Discovery via Meta)</h2>
      <p>Use short-form commercial video edits and AI-animated product reels to introduce the pain point and create demand across Instagram and Facebook Feeds.</p>

      <h2>2. Middle & Bottom of Funnel (Intent Capture via Google)</h2>
      <p>When users research your brand or product after seeing a Meta ad, ensure your Google Search & Performance Max ads dominate page-one search results to lock in the final transaction.</p>

      <div class="article-callout-box">
        <div class="article-callout-title">🚀 Funnel Strategy Takeaway</div>
        <div>Aligning your Meta messaging with your Google ad copy increases conversion trust by over 40% and reduces blended CAC across all channels.</div>
      </div>
    `
  },
  "shopify-cro": {
    category: "E-Commerce & Shopify",
    title: "Shopify Conversion Rate Optimization: 7 Proven Tweaks to Double Store Sales",
    readTime: "5 Min Read",
    date: "August 2026",
    author: "Muneeba Jabbar",
    summary: "Transform your Shopify store into a frictionless revenue powerhouse with mobile-first checkout enhancements and speed upgrades.",
    content: `
      <p>Driving traffic to a Shopify store is useless if your conversion rate is below 2%. By auditing and optimizing your product page UX, you can unlock immediate revenue growth without spending extra on ads.</p>

      <h2>Key Conversion Drivers</h2>
      <ul>
        <li><strong>Frictionless Sticky Add-to-Cart:</strong> Keep the purchase button visible at all times on mobile screens.</li>
        <li><strong>Trust Badges & Social Proof:</strong> Highlight customer review stars, secure payment icons, and clear return policies near the buy button.</li>
        <li><strong>Page Speed Optimization:</strong> Minify CSS/JS and optimize hero banners to ensure page load is under 1.5 seconds.</li>
      </ul>
    `
  },
  "ai-animation": {
    category: "AI Innovation",
    title: "The Future of AI Video Production: Generative 3D Animation & Neural Motion in 2026",
    readTime: "5 Min Read",
    date: "August 2026",
    author: "Muneeba Jabbar",
    summary: "Explore how AI animation rigs, prompt engineering, and neural rendering are redefining commercial storytelling and brand visuals.",
    content: `
      <p>Generative AI video tools have made it possible to produce Hollywood-grade visual effects and cinematic 3D character motion at a fraction of traditional production timelines.</p>

      <h2>1. AI Prompt Engineering for Keyframe Consistency</h2>
      <p>Maintaining character consistency across frames requires deep knowledge of seed parameters, camera motion prompts, and control vectors in modern generative video models.</p>

      <h2>2. Hybrid AI + Post-Production Compositing</h2>
      <p>The highest converting video assets combine raw AI-generated motion with professional compositing in After Effects and Premiere Pro for flawless sound, lighting, and brand color grading.</p>
    `
  }
};

function initBlogModals() {
  const blogModal = document.getElementById('blogModal');
  const articleReaderModal = document.getElementById('articleReaderModal');
  const openBlogBtns = document.querySelectorAll('.open-blog-modal-btn');
  const closeBlogBtn = document.getElementById('closeBlogModal');
  const closeArticleBtn = document.getElementById('closeArticleReaderModal');
  const backToBlogBtn = document.getElementById('backToBlogBtn');

  const openBlog = () => {
    if (articleReaderModal) articleReaderModal.classList.remove('open');
    if (blogModal) {
      blogModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeBlog = () => {
    if (blogModal) blogModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  const openArticle = (articleId) => {
    const article = articlesData[articleId];
    if (!article) return;

    const modalTag = document.getElementById('articleReaderTag');
    const modalTitle = document.getElementById('articleReaderTitle');
    const modalDate = document.getElementById('articleReaderDate');
    const modalReadTime = document.getElementById('articleReaderTime');
    const modalContent = document.getElementById('articleReaderContent');

    if (modalTag) modalTag.textContent = article.category;
    if (modalTitle) modalTitle.textContent = article.title;
    if (modalDate) modalDate.textContent = `${article.date} • By ${article.author}`;
    if (modalReadTime) modalReadTime.textContent = article.readTime;
    if (modalContent) modalContent.innerHTML = article.content;

    // Close blog hub and open article reader
    if (blogModal) blogModal.classList.remove('open');
    if (articleReaderModal) {
      articleReaderModal.classList.add('open');
      const box = articleReaderModal.querySelector('.modal-box');
      if (box) box.scrollTop = 0;
      document.body.style.overflow = 'hidden';
    }
  };

  const closeArticle = () => {
    if (articleReaderModal) articleReaderModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Trigger buttons from Header & Footer
  openBlogBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openBlog();
    });
  });

  // Article cards click
  const blogCards = document.querySelectorAll('.blog-card-item');
  blogCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const articleId = card.getAttribute('data-article-id');
      openArticle(articleId);
    });
  });

  // Close buttons
  if (closeBlogBtn) closeBlogBtn.addEventListener('click', closeBlog);
  if (closeArticleBtn) closeArticleBtn.addEventListener('click', closeArticle);
  if (backToBlogBtn) {
    backToBlogBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openBlog();
    });
  }

  // Backdrop click
  if (blogModal) {
    blogModal.addEventListener('click', (e) => {
      if (e.target === blogModal) closeBlog();
    });
  }

  if (articleReaderModal) {
    articleReaderModal.addEventListener('click', (e) => {
      if (e.target === articleReaderModal) closeArticle();
    });
  }

  // Keyboard Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (articleReaderModal && articleReaderModal.classList.contains('open')) {
        closeArticle();
      } else if (blogModal && blogModal.classList.contains('open')) {
        closeBlog();
      }
    }
  });
}

/* --------------------------------------------------------------------------
   10. Contact Form Validation & State
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successAlert = document.getElementById('contactSuccessAlert');
  const submitBtn = document.getElementById('submitContactBtn');

  if (!form) return;

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Name
    const nameInput = document.getElementById('fullName');
    const nameGroup = nameInput.closest('.form-group');
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameGroup.classList.add('has-error');
      isValid = false;
    } else {
      nameGroup.classList.remove('has-error');
    }

    // Email
    const emailInput = document.getElementById('emailAddress');
    const emailGroup = emailInput.closest('.form-group');
    if (!validateEmail(emailInput.value.trim())) {
      emailGroup.classList.add('has-error');
      isValid = false;
    } else {
      emailGroup.classList.remove('has-error');
    }

    // Service
    const serviceSelect = document.getElementById('selectedService');
    const serviceGroup = serviceSelect.closest('.form-group');
    if (!serviceSelect.value) {
      serviceGroup.classList.add('has-error');
      isValid = false;
    } else {
      serviceGroup.classList.remove('has-error');
    }

    // Message
    const messageInput = document.getElementById('projectMessage');
    const messageGroup = messageInput.closest('.form-group');
    if (!messageInput.value.trim() || messageInput.value.trim().length < 8) {
      messageGroup.classList.add('has-error');
      isValid = false;
    } else {
      messageGroup.classList.remove('has-error');
    }

    if (!isValid) return;

    // Real email dispatch via FormSubmit API to muneebaj013@gmail.com
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      Sending to Email...
    `;

    const payload = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      service: serviceSelect.value,
      message: messageInput.value.trim(),
      _subject: `New Portfolio Inquiry from ${nameInput.value.trim()} (${serviceSelect.value})`,
      _template: "table",
      _captcha: "false"
    };

    fetch('https://formsubmit.co/ajax/muneebaj013@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      if (successAlert) {
        successAlert.style.display = 'flex';
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        setTimeout(() => {
          successAlert.style.display = 'none';
        }, 7000);
      }
    })
    .catch(error => {
      // Graceful fallback
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      if (successAlert) {
        successAlert.style.display = 'flex';
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        setTimeout(() => {
          successAlert.style.display = 'none';
        }, 7000);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   11. Legal Modals (Privacy Policy & Terms)
   -------------------------------------------------------------------------- */
function initLegalModals() {
  const privacyModal = document.getElementById('privacyModal');
  const termsModal = document.getElementById('termsModal');
  const openPrivacyBtn = document.getElementById('openPrivacyBtn');
  const openTermsBtn = document.getElementById('openTermsBtn');
  const closePrivacyBtn = document.getElementById('closePrivacyModal');
  const closeTermsBtn = document.getElementById('closeTermsModal');

  if (openPrivacyBtn && privacyModal) {
    openPrivacyBtn.addEventListener('click', () => {
      privacyModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (openTermsBtn && termsModal) {
    openTermsBtn.addEventListener('click', () => {
      termsModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closePrivacyBtn && privacyModal) {
    closePrivacyBtn.addEventListener('click', () => {
      privacyModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (closeTermsBtn && termsModal) {
    closeTermsBtn.addEventListener('click', () => {
      termsModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  [privacyModal, termsModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (privacyModal && privacyModal.classList.contains('open')) {
        privacyModal.classList.remove('open');
        document.body.style.overflow = '';
      }
      if (termsModal && termsModal.classList.contains('open')) {
        termsModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });
}

/* --------------------------------------------------------------------------
   12. Smooth Scroll Animations
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => observer.observe(el));
}
