// Inicialização do site SportShot
document.addEventListener('DOMContentLoaded', () => {
  // Configuração do botão de acesso para redirecionar para a página de login
  const acessarBtn = document.querySelector('.nav-actions .btn-outline');
  if (acessarBtn) {
    acessarBtn.addEventListener('click', () => {
      window.location.href = './login.html';
    });
  }
  
  // Configuração do modal de selfie/upload
  const selfieModal = document.getElementById('selfieModal');
  const closeModalBtn = document.querySelector('.close-modal');
  const uploadOption = document.getElementById('uploadOption');
  const selfieOption = document.getElementById('selfieOption');
  const photoUploadInput = document.getElementById('photoUpload');
  const uploadPreviewImg = document.getElementById('uploadPreview');
  const cameraContainer = document.querySelector('.camera-container');
  const uploadPreview = document.querySelector('.upload-preview');
  const optionCards = document.querySelector('.option-cards');
  const cameraFeed = document.getElementById('cameraFeed');
  const photoCanvas = document.getElementById('photoCanvas');
  const takePhotoBtn = document.getElementById('takePhotoBtn');
  const retakePhotoBtn = document.getElementById('retakePhotoBtn');
  const backFromCameraBtn = document.getElementById('backFromCameraBtn');
  const backFromUploadBtn = document.getElementById('backFromUploadBtn');
  const changeUploadBtn = document.getElementById('changeUploadBtn');
  
  let stream = null;
  
  // Funções do modal
  function openModal() {
    if (!selfieModal) {
      console.error('Modal não encontrado no DOM');
      return;
    }
    
    // Adicionar classe active para exibir o modal
    selfieModal.classList.add('active');
    selfieModal.style.display = 'flex';
    
    // Animação de entrada do modal
    setTimeout(() => {
      const modalContent = selfieModal.querySelector('.modal-content');
      if (modalContent) {
        modalContent.style.transform = 'translateY(0)';
      }
    }, 10);
    
    console.log('Modal aberto com sucesso');
  }
  
  function closeModal() {
    if (!selfieModal) {
      console.error('Modal não encontrado no DOM');
      return;
    }
    
    const modalContent = selfieModal.querySelector('.modal-content');
    if (modalContent) {
      modalContent.style.transform = 'translateY(20px)';
    }
    
    setTimeout(() => {
      selfieModal.classList.remove('active');
      selfieModal.style.display = 'none';
      resetModal();
    }, 300);
    
    console.log('Modal fechado');
  }
  
  function resetModal() {
    try {
      stopCamera();
      
      if (optionCards) optionCards.style.display = 'grid';
      if (cameraContainer) cameraContainer.style.display = 'none';
      if (uploadPreview) uploadPreview.style.display = 'none';
      if (retakePhotoBtn) retakePhotoBtn.style.display = 'none';
      if (takePhotoBtn) takePhotoBtn.style.display = 'block';
      
      console.log('Modal resetado com sucesso');
    } catch (error) {
      console.error('Erro ao resetar o modal:', error);
    }
  }
  
  function startCamera() {
    optionCards.style.display = 'none';
    cameraContainer.style.display = 'block';
    
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
        .then(videoStream => {
          stream = videoStream;
          cameraFeed.srcObject = stream;
          cameraFeed.play();
        })
        .catch(error => {
          console.error('Erro ao acessar a câmera:', error);
          alert('Não foi possível acessar sua câmera. Verifique as permissões do navegador.');
          resetModal();
        });
    } else {
      alert('Seu navegador não suporta acesso à câmera. Tente usar a opção de upload.');
      resetModal();
    }
  }
  
  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      stream = null;
    }
  }
  
  function takePhoto() {
    const context = photoCanvas.getContext('2d');
    photoCanvas.width = cameraFeed.videoWidth;
    photoCanvas.height = cameraFeed.videoHeight;
    context.drawImage(cameraFeed, 0, 0, photoCanvas.width, photoCanvas.height);
    
    // Exibir a foto tirada no lugar do vídeo
    cameraFeed.style.display = 'none';
    photoCanvas.style.display = 'block';
    takePhotoBtn.style.display = 'none';
    retakePhotoBtn.style.display = 'inline-block';
    
    // Simular processamento da foto após 1.5 segundos
    setTimeout(() => {
      // Aqui você adicionaria a lógica para enviar a foto para processamento
      alert('Sua foto foi processada! Em breve você receberá suas fotos por email.');
      closeModal();
    }, 1500);
  }
  
  function retakePhoto() {
    photoCanvas.style.display = 'none';
    cameraFeed.style.display = 'block';
    retakePhotoBtn.style.display = 'none';
    takePhotoBtn.style.display = 'inline-block';
  }
  
  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        uploadPreviewImg.src = e.target.result;
        optionCards.style.display = 'none';
        uploadPreview.style.display = 'block';
      };
      
      reader.readAsDataURL(file);
    }
  }
  
  // Event Listeners para o modal
  const encontrarFotosBtn = document.querySelector('.hero-buttons .btn-primary');
  if (encontrarFotosBtn) {
    console.log('Botão Encontrar minhas fotos encontrado, configurando evento de clique');
    
    // Remover qualquer evento existente para evitar duplicação
    encontrarFotosBtn.removeEventListener('click', openModal);
    
    // Adicionar o evento de clique
    encontrarFotosBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Botão Encontrar minhas fotos clicado');
      openModal();
    });
  } else {
    console.error('Botão Encontrar minhas fotos não encontrado no DOM');
  }
  
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  
  // Fechar modal ao clicar fora do conteúdo
  selfieModal.addEventListener('click', (e) => {
    if (e.target === selfieModal) {
      closeModal();
    }
  });
  
  // Opção de upload
  if (uploadOption) {
    const uploadBtn = uploadOption.querySelector('.option-btn');
    uploadBtn.addEventListener('click', () => {
      photoUploadInput.click();
    });
  }
  
  // Opção de selfie
  if (selfieOption) {
    const selfieBtn = selfieOption.querySelector('.option-btn');
    selfieBtn.addEventListener('click', startCamera);
  }
  
  // Input de arquivo
  if (photoUploadInput) {
    photoUploadInput.addEventListener('change', handleFileSelect);
  }
  
  // Botões da câmera
  if (takePhotoBtn) {
    takePhotoBtn.addEventListener('click', takePhoto);
  }
  
  if (retakePhotoBtn) {
    retakePhotoBtn.addEventListener('click', retakePhoto);
  }
  
  if (backFromCameraBtn) {
    backFromCameraBtn.addEventListener('click', resetModal);
  }
  
  // Botões de upload
  if (backFromUploadBtn) {
    backFromUploadBtn.addEventListener('click', resetModal);
  }
  
  if (changeUploadBtn) {
    changeUploadBtn.addEventListener('click', () => {
      photoUploadInput.click();
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
  
  // Adicionar novos cards de eventos
  const eventosGrid = document.querySelector('.eventos-grid');
  if (eventosGrid) {
    // Array com dados dos novos eventos
    const novosEventos = [
      {
        imagem: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=400&h=300&auto=format&fit=crop',
        tag: 'Basquete',
        titulo: 'Campeonato de Basquete de Chicago',
        data: '05.06.25 - Quinta',
        local: 'Chicago, IL',
        horas: '12',
        minutos: '45',
        segundos: '30'
      },
      {
        imagem: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=400&h=300&auto=format&fit=crop',
        tag: 'Natação',
        titulo: 'Campeonato de Natação de Los Angeles',
        data: '22.08.25 - Sábado',
        local: 'Los Angeles, CA',
        horas: '08',
        minutos: '15',
        segundos: '40'
      },
      {
        imagem: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=400&h=300&auto=format&fit=crop',
        tag: 'Tênis',
        titulo: 'Torneio de Tênis de Miami',
        data: '14.09.25 - Domingo',
        local: 'Miami, FL',
        horas: '05',
        minutos: '30',
        segundos: '15'
      },
      {
        imagem: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a26?q=80&w=400&h=300&auto=format&fit=crop',
        tag: 'Ciclismo',
        titulo: 'Tour de São Francisco',
        data: '03.10.25 - Sexta',
        local: 'São Francisco, CA',
        horas: '02',
        minutos: '20',
        segundos: '55'
      },
      {
        imagem: 'https://images.unsplash.com/photo-1574271143515-5cddf8da19be?q=80&w=400&h=300&auto=format&fit=crop',
        tag: 'Vôlei',
        titulo: 'Campeonato de Vôlei de Praia',
        data: '25.07.25 - Sábado',
        local: 'San Diego, CA',
        horas: '10',
        minutos: '05',
        segundos: '20'
      },
      {
        imagem: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=400&h=300&auto=format&fit=crop',
        tag: 'Surfe',
        titulo: 'Campeonato de Surfe do Havaí',
        data: '15.11.25 - Domingo',
        local: 'Honolulu, HI',
        horas: '06',
        minutos: '12',
        segundos: '35'
      }
    ];
    
    // Criar e adicionar cada novo evento
    novosEventos.forEach((evento, index) => {
      const eventoCard = document.createElement('div');
      eventoCard.className = 'evento-card';
      eventoCard.style.backgroundImage = `url('${evento.imagem}')`;
      eventoCard.style.cursor = 'pointer'; // Adicionar cursor pointer para indicar que é clicável
      
      eventoCard.innerHTML = `
        <span class="evento-tag">${evento.tag}</span>
        <div class="evento-overlay">
          <div class="evento-info">
            <h3 class="evento-title">${evento.titulo}</h3>
            <div class="evento-meta">
              <span class="evento-date"><i class="far fa-calendar-alt"></i> ${evento.data}</span>
              <span class="evento-location"><i class="fas fa-map-marker-alt"></i> ${evento.local}</span>
            </div>
            <div class="evento-countdown">
              <p>Libera em:</p>
              <div class="countdown-timer">
                <div class="time-block">${evento.horas}</div>
                <div class="time-separator">:</div>
                <div class="time-block">${evento.minutos}</div>
                <div class="time-separator">:</div>
                <div class="time-block">${evento.segundos}</div>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // Adicionar evento de clique diretamente ao criar o card
      eventoCard.addEventListener('click', () => {
        window.location.href = './event.html';
      });
      
      eventosGrid.appendChild(eventoCard);
    });
  }
  
  // Remover o primeiro item (dias) de todos os contadores
  const contadores = document.querySelectorAll('.countdown-timer');
  contadores.forEach(contador => {
    // Pegar todos os blocos e separadores
    const elementos = Array.from(contador.children);
    
    // Se temos 8 elementos (4 blocos + 4 separadores), remover os dois primeiros (bloco de dias + separador)
    if (elementos.length === 8) {
      // Remover o primeiro bloco (dias)
      if (elementos[0] && elementos[0].classList.contains('time-block')) {
        elementos[0].remove();
      }
      // Remover o primeiro separador (:)
      if (elementos[1] && elementos[1].classList.contains('time-separator')) {
        elementos[1].remove();
      }
    }
    
    // Verificar contadores zerados e remover componentes
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
  
  // Função para configurar os links dos cards de eventos para a página de evento
  function setupEventCardLinks() {
    const eventCards = document.querySelectorAll('.evento-card');
    eventCards.forEach(card => {
      // Verificar se já tem evento de clique configurado
      const hasClickEvent = card.getAttribute('data-has-click');
      if (!hasClickEvent) {
        card.setAttribute('data-has-click', 'true');
        card.addEventListener('click', () => {
          window.location.href = './event.html';
        });
      }
    });
  }
  
  // Configurar os links dos cards de eventos para a página de evento
  setupEventCardLinks();
});

