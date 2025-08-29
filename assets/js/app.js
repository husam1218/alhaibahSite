async function loadContent() {
  try {
    const response = await fetch('content.json', { cache: 'no-store' });
    const data = await response.json();

    // Header
    document.getElementById('siteTitle').textContent = data.site.title;
    document.getElementById('siteTagline').textContent = data.site.tagline || '';
    const brandLogo = document.getElementById('brandLogo');
    if (data.site.logo) brandLogo.src = data.site.logo;

    // Hero
    document.getElementById('heroTitle').textContent = data.hero.title;
    document.getElementById('heroSubtitle').textContent = data.hero.subtitle;
    const heroImg = document.getElementById('heroImage');
    if (data.hero.image) heroImg.src = data.hero.image;

    // About
    document.getElementById('aboutText').textContent = data.about.text;
    const aboutBullets = document.getElementById('aboutBullets');
    aboutBullets.innerHTML = '';
    data.about.bullets.forEach((b) => {
      const li = document.createElement('li');
      li.textContent = b;
      aboutBullets.appendChild(li);
    });
    const whyUs = document.getElementById('whyUs');
    whyUs.innerHTML = '';
    data.about.whyUs.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      whyUs.appendChild(li);
    });

    // Services
    const servicesGrid = document.getElementById('servicesGrid');
    servicesGrid.innerHTML = '';
    data.services.forEach((svc) => {
      const el = document.createElement('div');
      el.className = 'service-card';
      el.innerHTML = `
        <div class="title">${svc.title}</div>
        <div class="description">${svc.description}</div>
      `;
      servicesGrid.appendChild(el);
    });

    // Projects Gallery
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    data.projects.forEach((p) => {
      const item = document.createElement('div');
      item.className = 'item';
      item.innerHTML = `
        <img src="${p.image}" alt="${p.caption || 'مشروع دهان'}" loading="lazy"/>
        <div class="caption">${p.caption || ''}</div>
      `;
      gallery.appendChild(item);
    });

    // Contact
    document.getElementById('contactBlurb').textContent = data.contact.blurb;
    const itemsWrap = document.getElementById('contactItems');
    itemsWrap.innerHTML = '';
    Object.entries(data.contact.details).forEach(([key, value]) => {
      const div = document.createElement('div');
      div.className = 'contact-item';
      div.innerHTML = `<span class="key">${key}:</span><span class="value">${value}</span>`;
      itemsWrap.appendChild(div);
    });
    const wa = document.getElementById('whatsappLink');
    const phone = document.getElementById('phoneLink');
    if (data.contact.whatsapp) wa.href = `https://wa.me/${data.contact.whatsapp}`;
    if (data.contact.phone) phone.href = `tel:${data.contact.phone}`;

    // Footer
    document.getElementById('footerAddress').textContent = data.footer.address || '';
    document.getElementById('year').textContent = new Date().getFullYear();
  } catch (e) {
    console.error('Failed to load content.json', e);
  }
}

// Mobile-specific enhancements
function initMobileFeatures() {
  // Smooth scrolling for mobile
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Touch-friendly gallery interactions
  const galleryItems = document.querySelectorAll('.gallery-grid .item');
  galleryItems.forEach(item => {
    let touchStartY = 0;
    let touchEndY = 0;
    
    item.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    });
    
    item.addEventListener('touchend', (e) => {
      touchEndY = e.changedTouches[0].clientY;
      const touchDiff = touchStartY - touchEndY;
      
      // If it's a tap (minimal vertical movement), show image details
      if (Math.abs(touchDiff) < 10) {
        showImageDetails(item);
      }
    });
  });

  // Mobile navigation improvements
  const header = document.querySelector('.site-header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hide/show header on scroll for mobile
    if (window.innerWidth <= 768) {
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
    }
    
    lastScrollTop = scrollTop;
  });

  // Add header transition
  header.style.transition = 'transform 0.3s ease-in-out';

  // Mobile-friendly button interactions
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('touchstart', () => {
      btn.style.transform = 'scale(0.98)';
    });
    
    btn.addEventListener('touchend', () => {
      btn.style.transform = 'scale(1)';
    });
  });

  // Optimize images for mobile
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // Add loading="lazy" for better mobile performance
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Add error handling for mobile
    img.addEventListener('error', () => {
      img.style.display = 'none';
    });
  });

  // Mobile-specific scroll behavior
  if ('scrollBehavior' in document.documentElement.style) {
    // Smooth scrolling is supported
    document.documentElement.style.scrollBehavior = 'smooth';
  } else {
    // Fallback for older browsers
    document.documentElement.style.scrollBehavior = 'auto';
  }
}

// Show image details modal for mobile
function showImageDetails(item) {
  const img = item.querySelector('img');
  const caption = item.querySelector('.caption');
  
  if (img && caption) {
    // Create a simple mobile-friendly modal
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.9);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    `;
    
    modal.innerHTML = `
      <img src="${img.src}" alt="${img.alt}" style="max-width: 100%; max-height: 70vh; object-fit: contain; border-radius: 12px;">
      <div style="color: white; margin-top: 1rem; text-align: center; font-size: 1.1rem;">${caption.textContent}</div>
      <button style="position: absolute; top: 1rem; right: 1rem; background: rgba(255,255,255,0.2); border: none; color: white; padding: 0.5rem; border-radius: 50%; width: 40px; height: 40px; font-size: 1.2rem;">×</button>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal on click
    modal.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Re-enable body scroll when modal is closed
    modal.addEventListener('click', () => {
      document.body.style.overflow = '';
    });
  }
}

// Initialize mobile features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  loadContent();
  initMobileFeatures();
});

// Handle orientation change for mobile
window.addEventListener('orientationchange', () => {
  // Small delay to let orientation change complete
  setTimeout(() => {
    // Recalculate any layout-dependent elements
    const header = document.querySelector('.site-header');
    if (header) {
      header.style.transform = 'translateY(0)';
    }
  }, 100);
});

// Performance optimization for mobile
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Register service worker for better mobile performance
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed, continue without it
    });
  });
}

