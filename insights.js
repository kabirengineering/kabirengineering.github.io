(() => {
  const host = document.getElementById('insights-posts');
  if (!host) return;

  const style = document.createElement('style');
  style.textContent = `
    #insights-posts{display:grid;gap:16px;margin:0 0 24px}
    .insight-post{border:1px solid var(--line);background:#fff;border-radius:14px;padding:20px;box-shadow:0 8px 25px rgba(7,26,49,.04)}
    .insight-post summary{cursor:pointer;list-style:none}
    .insight-post summary::-webkit-details-marker{display:none}
    .insight-post h3{margin:0 0 6px;font-size:1.2rem;color:#071a31}
    .insight-date{font-size:.88rem;color:#6a7788;font-weight:700}
    .insight-body{margin-top:18px;color:#425269;line-height:1.75}
    .insight-body p{margin:0 0 14px}
  `;
  document.head.appendChild(style);

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const formatDate = (value) => {
    const d = new Date(`${value}T00:00:00`);
    return Number.isNaN(d.getTime()) ? value : d.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
  };

  fetch(`insights.json?v=${Date.now()}`, {cache:'no-store'})
    .then(r => { if (!r.ok) throw new Error('Unable to load insights'); return r.json(); })
    .then(posts => {
      if (!Array.isArray(posts) || !posts.length) return;
      host.innerHTML = posts.map(post => {
        const paragraphs = escapeHtml(post.body || '').split(/\n\s*\n/).filter(Boolean).map(p => `<p>${p.replace(/\n/g,'<br>')}</p>`).join('');
        return `<details class="insight-post"><summary><h3>${escapeHtml(post.title || 'Untitled')}</h3><span class="insight-date">${escapeHtml(formatDate(post.date || ''))}</span></summary><div class="insight-body">${paragraphs}</div></details>`;
      }).join('');
    })
    .catch(() => { host.innerHTML = ''; });
})();
