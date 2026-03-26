/* ===================================================
   Arborist Tree Care Service — Main JavaScript
   =================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Theme Toggle ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleMobile = document.getElementById('themeToggleMobile');
  const htmlEl = document.documentElement;

  function setTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('arborist-theme', theme);
    updateToggleIcons(theme);
  }

  function updateToggleIcons(theme) {
    const icon = theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-fill';
    [themeToggle, themeToggleMobile].forEach(btn => {
      if (btn) {
        const i = btn.querySelector('i');
        if (i) {
          i.className = 'bi ' + icon;
        }
      }
    });
  }

  const savedTheme = localStorage.getItem('arborist-theme') || 'light';
  setTheme(savedTheme);

  [themeToggle, themeToggleMobile].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', function () {
        const current = htmlEl.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
      });
    }
  });

  /* ---------- Navbar Scroll Effect ---------- */
  const navbar = document.querySelector('.navbar-custom');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /* ---------- Back to Top Button ---------- */
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Active Nav Link ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'home1.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(function (link) {
    if (link.getAttribute('data-page') === currentPage) {
      link.classList.add('active');
    }
  });

  /* ---------- Scroll Fade-In Animation ---------- */
  const fadeElements = document.querySelectorAll('.fade-in-up');
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Dashboard Sidebar Toggle ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarClose = document.getElementById('sidebarClose');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');

  function openSidebar() {
    if (sidebar) sidebar.classList.add('show');
    if (sidebarBackdrop) sidebarBackdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('show');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', openSidebar);
  if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

  /* ---------- Counter Animation ---------- */
  const counters = document.querySelectorAll('.count-up');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'));
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(function () {
            current += step;
            if (current >= target) {
              el.textContent = target.toLocaleString();
              clearInterval(timer);
            } else {
              el.textContent = Math.floor(current).toLocaleString();
            }
          }, 16);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  /* ---------- Password Toggle ---------- */
  document.querySelectorAll('.password-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const input = this.previousElementSibling;
      const icon = this.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('bi-eye', 'bi-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.replace('bi-eye-slash', 'bi-eye');
      }
    });
  });

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = this.parentElement;
      const isActive = item.classList.contains('active');

      // Close all others
      document.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

});
