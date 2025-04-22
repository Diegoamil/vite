import './style.css'

// Inicialização do site SportShot
document.addEventListener('DOMContentLoaded', () => {
  // Adicionar funcionalidade aos botões se necessário
  const encontrarFotosBtn = document.querySelector('.hero-buttons .btn-primary');
  if (encontrarFotosBtn) {
    encontrarFotosBtn.addEventListener('click', () => {
      alert('Funcionalidade para encontrar fotos será implementada em breve!');
    });
  }

  const buscarEventosBtn = document.querySelector('.hero-buttons .btn-outline-light');
  if (buscarEventosBtn) {
    buscarEventosBtn.addEventListener('click', () => {
      const eventosSection = document.querySelector('.eventos-recentes');
      if (eventosSection) {
        eventosSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

