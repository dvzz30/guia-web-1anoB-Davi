// Menu responsivo
const menuToggle = document.getElementById('menu-toggle');
const mainMenu = document.getElementById('main-menu');

if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mainMenu.classList.toggle('active');
    });
}

// Fechar menu ao clicar fora
document.addEventListener('click', (event) => {
    if (!event.target.closest('nav') && mainMenu.classList.contains('active')) {
        mainMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});
