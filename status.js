(function () {
  const STATUS_CONFIG = {
    open:     { label: 'Otevřeno',            desc: 'Sázka přijímá tipy — zapiš svůj tip!' },
    waiting:  { label: 'Čeká na vyhodnocení', desc: 'Tipy jsou uzavřeny. Výsledek se brzy ukáže.' },
    resolved: { label: 'Rozhodnuto',           desc: 'Sázka je vyhodnocena. Vítěz znám.' },
    closed:   { label: 'Uzavřeno',             desc: 'Tato sázka je archivována.' },
  };

  function applyResult() {
    const table = document.querySelector('table[data-result]');
    if (!table) return;
    const result = table.dataset.result;
    if (!result) return;
    const rows = document.querySelectorAll('#votes-body tr');
    const winnerNames = [];

    rows.forEach(row => {
      const badge = row.querySelector('.badge');
      if (!badge) return;
      const tip = badge.classList.contains('ano') ? 'ano' : 'ne';
      if (tip === result) {
        row.classList.add('winner');
        const name = row.querySelector('td.name:nth-child(2)');
        if (name) winnerNames.push(name.textContent.trim());
      } else {
        row.classList.add('loser');
      }
    });

    const summary = document.getElementById('summary');
    if (summary && winnerNames.length) {
      const banner = document.createElement('div');
      banner.className = 'result-banner';
      const resultLabel = result === 'ano' ? 'ANO' : 'NE';
      banner.innerHTML = `<span class="trophy">🏆</span> Správný tip byl <strong>${resultLabel}</strong> — vyhrál${winnerNames.length > 1 ? 'i' : ''}: <strong>${winnerNames.join(', ')}</strong>`;
      summary.after(banner);
    }
  }

  const thisFile = window.location.pathname.split('/').pop() || 'index.html';

  fetch('index.html')
    .then(r => r.text())
    .then(html => {
      const doc    = new DOMParser().parseFromString(html, 'text/html');
      const li     = doc.querySelector(`li[data-file="${thisFile}"]`);
      if (!li) return;
      const status = li.dataset.status || 'closed';
      const cfg    = STATUS_CONFIG[status] || STATUS_CONFIG.closed;

      const el = document.getElementById('status-banner');
      if (el) {
        el.innerHTML = `
          <div class="status-banner status-${status}">
            <div class="status-dot"></div>
            <div class="status-banner-text">
              <div class="status-banner-label">${cfg.label}</div>
              <div class="status-banner-desc">${cfg.desc}</div>
            </div>
          </div>`;
      }

      if (status === 'resolved') {
        applyResult();
      }
    })
    .catch(() => {});
})();
