(function () {
  const STATUS_CONFIG = {
    open:     { label: 'Otevřeno',            desc: 'Sázka přijímá tipy — zapiš svůj tip!' },
    waiting:  { label: 'Čeká na vyhodnocení', desc: 'Tipy jsou uzavřeny. Výsledek se brzy ukáže.' },
    resolved: { label: 'Rozhodnuto',           desc: 'Sázka je vyhodnocena. Vítěz znám.' },
    closed:   { label: 'Vyrovnáno',             desc: 'Tato sázka je vyrovnána.' },
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
        let countdownHtml = '';
        const deadline = li.dataset.deadline;
        if (deadline && status !== 'resolved' && status !== 'closed') {
          const daysLeft = Math.ceil((new Date(deadline) - new Date()) / 86400000);
          if (daysLeft > 0) {
            countdownHtml = `<div style="margin-top:6px;font-size:10px;letter-spacing:0.12em;color:var(--muted2);">⏱ ${daysLeft} dní do termínu</div>`;
          } else {
            countdownHtml = `<div style="margin-top:6px;font-size:10px;letter-spacing:0.12em;color:var(--muted2);">⏱ Termín vypršel</div>`;
          }
        }
        el.innerHTML = `
          <div class="status-banner status-${status}">
            <div class="status-dot"></div>
            <div class="status-banner-text">
              <div class="status-banner-label">${cfg.label}</div>
              <div class="status-banner-desc">${cfg.desc}</div>
              ${countdownHtml}
            </div>
          </div>`;
      }

      if (status === 'resolved' || status === 'closed') {
        applyResult();
      }
    })
    .catch(() => {});
})();
