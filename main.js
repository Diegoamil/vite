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
  
  // Verificar contadores zerados e remover componentes
  const contadores = document.querySelectorAll('.countdown-timer');
  contadores.forEach(contador => {
    const blocos = contador.querySelectorAll('.time-block');
    let todosZerados = true;
    
    // Verifica se todos os blocos estão com valor zero
    blocos.forEach(bloco => {
      if (bloco.textContent !== '00') {
        todosZerados = false;
      }
    });
    
    // Se todos os blocos estiverem zerados, remove o componente de contagem
    if (todosZerados) {
      const eventoCountdown = contador.closest('.evento-countdown');
      if (eventoCountdown) {
        eventoCountdown.remove();
      }
    }
  });
});

