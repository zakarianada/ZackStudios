(() => {
  const banner = document.createElement('div');
  banner.textContent = 'PORTFOLIO DEMO — Orders, bookings and messages are not sent.';
  banner.setAttribute('role', 'note');
  Object.assign(banner.style, {
    position:'fixed', bottom:'0', left:'0', right:'0', zIndex:'2147483647',
    padding:'9px 14px', background:'#0b0b0b', color:'#ddd',
    borderTop:'1px solid rgba(255,255,255,.15)', textAlign:'center',
    font:'10px/1.4 Arial, sans-serif', letterSpacing:'.06em'
  });
  document.body.appendChild(banner);

  const originalFetch = window.fetch.bind(window);
  window.fetch = (input, options = {}) => {
    const url = new URL(typeof input === 'string' ? input : input.url, window.location.href);
    if (url.origin === window.location.origin && url.pathname.startsWith('/api/')) {
      if (url.pathname === '/api/shipping-quote') {
        const amount = Number(url.searchParams.get('subtotal')) >= 2500 ? 0 : 49;
        return Promise.resolve(new Response(JSON.stringify({ amount, label:'Preview delivery estimate' }), { headers:{'Content-Type':'application/json'} }));
      }
      const message = 'Portfolio preview only — orders, bookings and messages are not sent.';
      return Promise.resolve(new Response(JSON.stringify({ error:message, message, details:[message] }), { status:409, headers:{'Content-Type':'application/json'} }));
    }
    return originalFetch(input, options);
  };
})();
