// LightPay landing: mobile menu, contact link, gentle reveal.
(() => {
  /** Where "Nous écrire" leads. Set the LightPay contact address here. */
  const CONTACT_EMAIL = '';

  const menuBtn = document.getElementById('menuBtn');
  const links = document.getElementById('navLinks');
  const setMenu = (open) => {
    links?.classList.toggle('open', open);
    menuBtn?.setAttribute('aria-expanded', String(open));
  };
  menuBtn?.addEventListener('click', () => setMenu(!links?.classList.contains('open')));
  links?.addEventListener('click', (e) => {
    if (e.target instanceof HTMLAnchorElement) setMenu(false);
  });

  if (CONTACT_EMAIL) {
    const mail = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('LightPay — intégration')}`;
    document.getElementById('contactLink')?.setAttribute('href', mail);
    document.getElementById('apiLink')?.setAttribute('href', mail);
  }

  // Night / day: flips the current theme and remembers it.
  document.getElementById('themeBtn')?.addEventListener('click', () => {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('lightpay.theme', next); } catch (e) {}
  });

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const targets = document.querySelectorAll('.col, .steps li, .list li, .code, .fees, .final, .phones');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px' }
    );
    targets.forEach((el) => io.observe(el));
  }
})();
