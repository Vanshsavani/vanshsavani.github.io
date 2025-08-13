/* Main behavior: year, theme toggle, and projects render */
document.getElementById('year').textContent = new Date().getFullYear();

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

async function loadProjects() {
  try {
    const res = await fetch('/assets/data/projects.json');
    const projects = await res.json();
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';
    projects.forEach(p => {
      const card = document.createElement('article');
      card.className = 'card rounded-2xl border border-slate-200 dark:border-slate-800 p-6 transition';
      card.innerHTML = `
        <div class="text-xs uppercase tracking-wide text-slate-500">${p.category}</div>
        <h3 class="mt-2 text-xl font-semibold">${p.title}</h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">${p.summary}</p>
        <div class="mt-3 flex flex-wrap gap-2 text-xs">
          ${p.tags.map(t => `<span class="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800">${t}</span>`).join('')}
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (e) {
    console.error('Failed to load projects.json', e);
  }
}
loadProjects();
