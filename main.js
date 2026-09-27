// LightPay landing: theme, mobile menu, contact link, gentle reveal.
(() => {
  /** Where "Nous écrire" leads. Set the LightPay contact address here. */
  const CONTACT_EMAIL = '';

  const root = document.documentElement;
  const dark = () =>
    root.dataset.theme ? root.dataset.theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;

  document.getElementById('themeBtn')?.addEventListener('click', () => {
    const next = dark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('lightpay.theme', next);
    } catch (e) {
      // preference only
    }
  });

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

  const contact = document.getElementById('contactLink');
  if (contact) {
    if (CONTACT_EMAIL) contact.setAttribute('href', `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('LightPay — intégration')}`);
    else contact.setAttribute('href', '/account');
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const targets = document.querySelectorAll('.card, .flow li, .checklist li, .code, .cta, .section-head');
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
