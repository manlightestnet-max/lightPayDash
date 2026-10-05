// Before the page paints: the visitor's saved theme (else the phone's setting applies).
try {
  var t = localStorage.getItem('lightpay.theme');
  if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
} catch (e) {}
