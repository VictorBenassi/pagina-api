document.addEventListener('DOMContentLoaded', () => {
    const searchTextarea = document.getElementById('search');

    function adjustHeight() {
        searchTextarea.style.height = 'auto'; // Reseta a altura
        searchTextarea.style.height = `${searchTextarea.scrollHeight}px`; // Ajusta a altura com base no conteúdo
    }

    searchTextarea.addEventListener('input', adjustHeight);

    // Ajuste inicial
    adjustHeight();
});
