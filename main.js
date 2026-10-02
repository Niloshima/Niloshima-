// Render Cards & Live Search / Filter Logic
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('gameGrid');
    const searchInput = document.getElementById('searchInput');
    const catBtns = document.querySelectorAll('.cat-btn');

    let currentCategory = 'all';

    function renderGames(filterText = '') {
        grid.innerHTML = '';

        const filtered = gamesList.filter(game => {
            const matchesCat = (currentCategory === 'all' || game.category === currentCategory);
            const matchesSearch = game.title.toLowerCase().includes(filterText.toLowerCase()) ||
                                  game.description.toLowerCase().includes(filterText.toLowerCase());
            return matchesCat && matchesSearch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No games found matching your search.</p>`;
            return;
        }

        filtered.forEach(game => {
            const card = document.createElement('a');
            card.href = `play.html?id=${game.id}`;
            card.className = 'game-card';
            card.innerHTML = `
                <div class="card-img-wrapper">
                    <img src="${game.image}" alt="${game.title}" loading="lazy">
                    <span class="badge">${game.badge}</span>
                </div>
                <div class="game-info">
                    <h3>${game.title}</h3>
                    <p>${game.description}</p>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Live Search Event
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderGames(e.target.value);
        });
    }

    // Category Buttons Event
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-cat');
            renderGames(searchInput ? searchInput.value : '');
        });
    });

    // Initial Render
    if (grid) renderGames();
});
