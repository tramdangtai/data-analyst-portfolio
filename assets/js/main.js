async function loadJSON(path) {
  const res = await fetch(path);
  return res.json();
}


async function init() {
  const profile = await loadJSON('data/profile.json');
  document.getElementById('name').innerText = profile.name;
  document.getElementById('headline').innerText = profile.headline;
  document.getElementById('summary').innerHTML = profile.summary;


  const projects = await loadJSON('data/projects.json');
  window.PROJECTS = projects;
  renderProjects(projects);


  const certs = await loadJSON('data/certs.json');
  renderCerts(certs);


  const posts = await loadJSON('data/posts.json');
  renderPosts(posts);


  renderContact(profile.contacts);
}


function renderProjects(projects) {
  const container = document.getElementById('project-list');
  container.innerHTML = projects.map(p => `
<div class="project-card">
<h3>${p.title}</h3>
<h4>Period: From ${p.start} To ${p.end}</h4>
<hr>
<p>${p.description}</p>
<hr>
<p><strong>Technical:</strong> ${p.skills.technical.join(', ')}</p>
<p><strong>Soft Skills:</strong> ${p.skills.soft.join(', ')}</p>
<p><strong>Company/Customer:</strong> ${p.company_customer}</p>
<p><a href="${p.link}" target="_blank">View Project Repo/ Detail</a></p>
</div>
`).join('');
}




function renderCerts(certs) {
  const container = document.getElementById('cert-list');

  container.innerHTML = certs.map(c => {
    // build skills HTML if present
    const skillsHTML = Array.isArray(c.skills) && c.skills.length
      ? `<div class="cert-skills">${c.skills.map(s => `<span class="cert-skill">${escapeHtml(s)}</span>`).join('')}</div>`
      : '';

    return `
      <div class="cert-card">
        <h3 class="cert-title">${escapeHtml(c.title)}</h3>
        <div class="cert-provider">${escapeHtml(c.provider)}</div>

        <div class="cert-meta">
          ${c.date ? `<span>${new Date(c.date).toLocaleDateString('vi-VN')}</span>` : ''}
        </div>

        ${skillsHTML}

        ${c.url ? `<a class="cert-link" href="${c.url}" target="_blank" rel="noopener">Xem chứng chỉ</a>` : ''}
      </div>
    `;
  }).join('');
}
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}





function renderPosts(posts) {
  const container = document.getElementById('post-list');

  container.innerHTML = posts.map(p => `
    <div class="post-card">
      <h3 class="post-title">
        <a href="${p.url}" target="_blank">${p.title}</a>
      </h3>

      <div class="post-meta">
        ${p.date ? `<span>${new Date(p.date).toLocaleDateString('vi-VN')}</span>` : ''}
        ${p.platform ? `<span class="post-platform">${p.platform}</span>` : ''}
      </div>
    </div>
  `).join('');
}


function renderContact(contacts) {
  const wrap = document.getElementById('contact-icons');

  wrap.innerHTML = `
    <a href="mailto:${contacts.email}" class="contact-item" title="Email">
      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/gmail.svg" alt="Email"/>
    </a>

    <a href="${contacts.linkedin}" target="_blank" class="contact-item" title="LinkedIn">
      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn"/>
    </a>

    <a href="${contacts.facebook}" target="_blank" class="contact-item" title="Facebook">
      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook"/>
    </a>

    <a href="${contacts.github}" target="_blank" class="contact-item" title="GitHub">
      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg" alt="GitHub"/>
    </a>
  `;
}



init();