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

// Mostrar ou ocultar a seção de FAQ e o fundo ao clicar em "Ajuda"
document.getElementById('help-link').addEventListener('click', function(e) {
    e.preventDefault();
    const faqSection = document.getElementById('faq-section');
    const backdrop = document.getElementById('backdrop');
    
    if (faqSection.style.display === 'none' || faqSection.style.display === '') {
      faqSection.style.display = 'block';
      backdrop.style.display = 'block'; // Mostrar o fundo
    } else {
      faqSection.style.display = 'none';
      backdrop.style.display = 'none'; // Esconder o fundo
    }
  });
  
  // Fechar a FAQ e o backdrop se o fundo for clicado
  document.getElementById('backdrop').addEventListener('click', function() {
    document.getElementById('faq-section').style.display = 'none';
    document.getElementById('backdrop').style.display = 'none';
  });
  