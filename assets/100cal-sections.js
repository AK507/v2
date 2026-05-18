(() => {
  if (window.__hundredCalSectionsReady) return;
  window.__hundredCalSectionsReady = true;

  const applyNavShadow = () => {
    document.querySelectorAll('[data-100cal-nav]').forEach((nav) => {
      nav.style.boxShadow = window.scrollY > 10 ? '0 2px 24px rgba(0,0,0,0.12)' : 'none';
    });
  };

  window.addEventListener('scroll', applyNavShadow, { passive: true });
  document.addEventListener('shopify:section:load', applyNavShadow);
  document.addEventListener('DOMContentLoaded', applyNavShadow);
})();
