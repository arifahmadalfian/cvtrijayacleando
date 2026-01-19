// Default configuration
const defaultConfig = {
  company_name: 'CV Trijaya Cleando Pratama',
  hero_title: 'Solusi Hygiene, Jasa & Penyewaan Terpercaya',
  whatsapp_number: '6281234567890',
  primary_color: '#0c2d5e',
  secondary_color: '#1e5499',
  accent_color: '#3b82c4',
  text_color: '#1f2937',
  surface_color: '#ffffff',
  font_family: 'Plus Jakarta Sans'
};

// Initialize config
let config = { ...defaultConfig };

// Mobile menu functionality
const menuBtn = document.getElementById('menu-btn');
const closeMenu = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

document.getElementById('app-wrapper').addEventListener('scroll', function() {
  const currentScroll = this.scrollTop;
  
  if (currentScroll > 100) {
    navbar.classList.add('shadow-md');
  } else {
    navbar.classList.remove('shadow-md');
  }
  
  lastScroll = currentScroll;
});

// Update WhatsApp links function
function updateWhatsAppLinks(number) {
  const waMessage = encodeURIComponent('Halo, saya ingin konsultasi mengenai layanan CV Trijaya Cleando Pratama');
  const mscMessage = encodeURIComponent('Halo, saya tertarik dengan program MSC (Masjid Service Center)');
  
  const mainWaBtn = document.getElementById('main-wa-btn');
  const mscWaBtn = document.getElementById('msc-wa-btn');
  
  if (mainWaBtn) {
    mainWaBtn.href = `https://wa.me/${number}?text=${waMessage}`;
  }
  if (mscWaBtn) {
    mscWaBtn.href = `https://wa.me/${number}?text=${mscMessage}`;
  }
}

// Render function to update UI based on config
async function onConfigChange(cfg) {
  config = { ...defaultConfig, ...cfg };
  
  // Update company name
  const navCompanyName = document.getElementById('nav-company-name');
  const footerCompanyName = document.getElementById('footer-company-name');
  if (navCompanyName) navCompanyName.textContent = config.company_name;
  if (footerCompanyName) footerCompanyName.textContent = config.company_name;
  
  // Update hero title
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) heroTitle.textContent = config.hero_title;
  
  // Update WhatsApp links
  updateWhatsAppLinks(config.whatsapp_number);
  
  // Update font family
  document.body.style.fontFamily = `${config.font_family}, sans-serif`;
}

// Map to capabilities for recoloring and font editing
function mapToCapabilities(cfg) {
  return {
    recolorables: [
      {
        get: () => cfg.primary_color || defaultConfig.primary_color,
        set: (value) => {
          cfg.primary_color = value;
          if (window.elementSdk) window.elementSdk.setConfig({ primary_color: value });
        }
      },
      {
        get: () => cfg.secondary_color || defaultConfig.secondary_color,
        set: (value) => {
          cfg.secondary_color = value;
          if (window.elementSdk) window.elementSdk.setConfig({ secondary_color: value });
        }
      },
      {
        get: () => cfg.accent_color || defaultConfig.accent_color,
        set: (value) => {
          cfg.accent_color = value;
          if (window.elementSdk) window.elementSdk.setConfig({ accent_color: value });
        }
      },
      {
        get: () => cfg.text_color || defaultConfig.text_color,
        set: (value) => {
          cfg.text_color = value;
          if (window.elementSdk) window.elementSdk.setConfig({ text_color: value });
        }
      },
      {
        get: () => cfg.surface_color || defaultConfig.surface_color,
        set: (value) => {
          cfg.surface_color = value;
          if (window.elementSdk) window.elementSdk.setConfig({ surface_color: value });
        }
      }
    ],
    borderables: [],
    fontEditable: {
      get: () => cfg.font_family || defaultConfig.font_family,
      set: (value) => {
        cfg.font_family = value;
        if (window.elementSdk) window.elementSdk.setConfig({ font_family: value });
      }
    },
    fontSizeable: undefined
  };
}

// Map to edit panel values
function mapToEditPanelValues(cfg) {
  return new Map([
    ['company_name', cfg.company_name || defaultConfig.company_name],
    ['hero_title', cfg.hero_title || defaultConfig.hero_title],
    ['whatsapp_number', cfg.whatsapp_number || defaultConfig.whatsapp_number]
  ]);
}

// Portfolio filter functionality
const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
const portfolioImages = document.querySelectorAll('.portfolio-image-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Filter images
    portfolioImages.forEach(item => {
      if (category === 'all' || item.classList.contains(category)) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// Initialize Element SDK
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues
  });
} else {
  // Fallback: run with default config
  onConfigChange(defaultConfig);
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const closeModal = document.getElementById("close-modal");

  document.querySelectorAll(".portfolio-image-item").forEach(item => {
    item.addEventListener("click", () => {
      const image = item.getAttribute("data-image");
      const title = item.getAttribute("data-title");

      modalImage.src = image;
      modalTitle.textContent = title;
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    modalImage.src = "";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      modalImage.src = "";
    }
  });
});
