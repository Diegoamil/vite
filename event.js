// Variáveis globais
let photosContainer;
let stream = null;

document.addEventListener('DOMContentLoaded', () => {
  // Elementos do DOM
  const openFacialModalBtn = document.getElementById('open-facial-modal');
  photosContainer = document.getElementById('photos-container');
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
  const confirmUploadBtn = document.getElementById('confirmUploadBtn');

  // Inicializar a grade de fotos com exemplos
  loadSamplePhotos();

  // Funções do modal
  function openModal() {
    selfieModal.classList.add('active');
    setTimeout(() => {
      selfieModal.querySelector('.modal-content').style.transform = 'translateY(0)';
    }, 10);
  }
  
  function closeModal() {
    selfieModal.querySelector('.modal-content').style.transform = 'translateY(20px)';
    setTimeout(() => {
      selfieModal.classList.remove('active');
      resetModal();
    }, 300);
  }
  
  function resetModal() {
    stopCamera();
    if (optionCards) optionCards.style.display = 'grid';
    if (cameraContainer) cameraContainer.style.display = 'none';
    if (uploadPreview) uploadPreview.style.display = 'none';
    if (retakePhotoBtn) retakePhotoBtn.style.display = 'none';
    if (takePhotoBtn) takePhotoBtn.style.display = 'block';
  }
  
  function startCamera() {
    if (optionCards) optionCards.style.display = 'none';
    if (cameraContainer) cameraContainer.style.display = 'block';
    
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
        .then(videoStream => {
          stream = videoStream;
          if (cameraFeed) {
            cameraFeed.srcObject = stream;
            cameraFeed.play();
          }
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
    if (!photoCanvas || !cameraFeed) return;
    
    const context = photoCanvas.getContext('2d');
    photoCanvas.width = cameraFeed.videoWidth;
    photoCanvas.height = cameraFeed.videoHeight;
    context.drawImage(cameraFeed, 0, 0, photoCanvas.width, photoCanvas.height);
    
    // Exibir a foto tirada no lugar do vídeo
    cameraFeed.style.display = 'none';
    photoCanvas.style.display = 'block';
    if (takePhotoBtn) takePhotoBtn.style.display = 'none';
    if (retakePhotoBtn) retakePhotoBtn.style.display = 'inline-block';
    
    // Simular processamento da foto após 1.5 segundos
    setTimeout(() => {
      // Aqui você adicionaria a lógica para enviar a foto para processamento
      closeModal();
      
      // Mostrar feedback de carregamento
      photosContainer.innerHTML = '<div class="loading-message"><i class="fas fa-spinner fa-spin"></i> Buscando suas fotos...</div>';
      
      // Simular tempo de processamento
      setTimeout(() => {
        loadSamplePhotos(true);
        
        // Rolar para a seção de fotos
        document.querySelector('.photo-grid').scrollIntoView({ behavior: 'smooth' });
      }, 2000);
    }, 1500);
  }

  // Configurar o botão para abrir o modal
  if (openFacialModalBtn) {
    openFacialModalBtn.addEventListener('click', openModal);
  }
  
  // Configurar botão de fechar modal
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  
  // Configurar opção de upload
  if (uploadOption) {
    const uploadBtn = uploadOption.querySelector('.option-btn');
    if (uploadBtn) {
      uploadBtn.addEventListener('click', () => {
        if (photoUploadInput) photoUploadInput.click();
      });
    }
  }
  
  // Configurar opção de selfie
  if (selfieOption) {
    const selfieBtn = selfieOption.querySelector('.option-btn');
    if (selfieBtn) {
      selfieBtn.addEventListener('click', startCamera);
    }
  }
  
  // Configurar botões da câmera
  if (takePhotoBtn) {
    takePhotoBtn.addEventListener('click', takePhoto);
  }
  
  if (retakePhotoBtn) {
    retakePhotoBtn.addEventListener('click', () => {
      if (photoCanvas) photoCanvas.style.display = 'none';
      if (cameraFeed) cameraFeed.style.display = 'block';
      if (retakePhotoBtn) retakePhotoBtn.style.display = 'none';
      if (takePhotoBtn) takePhotoBtn.style.display = 'inline-block';
    });
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
      if (photoUploadInput) photoUploadInput.click();
    });
  }
  
  if (photoUploadInput) {
    photoUploadInput.addEventListener('change', function() {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
          if (uploadPreviewImg) uploadPreviewImg.src = e.target.result;
          if (optionCards) optionCards.style.display = 'none';
          if (uploadPreview) uploadPreview.style.display = 'block';
        };
        
        reader.readAsDataURL(this.files[0]);
      }
    });
  }
  
  if (confirmUploadBtn) {
    confirmUploadBtn.addEventListener('click', () => {
      closeModal();
      
      // Mostrar feedback de carregamento
      photosContainer.innerHTML = '<div class="loading-message"><i class="fas fa-spinner fa-spin"></i> Buscando suas fotos...</div>';
      
      // Simular tempo de processamento
      setTimeout(() => {
        loadSamplePhotos(true);
        
        // Rolar para a seção de fotos
        document.querySelector('.photo-grid').scrollIntoView({ behavior: 'smooth' });
      }, 2000);
    });
  }
  
  // Fechar modal ao clicar fora
  if (selfieModal) {
    selfieModal.addEventListener('click', (e) => {
      if (e.target === selfieModal) {
        closeModal();
      }
    });
  }

  function loadSamplePhotos(personalizedResults = false, nonIdentified = false) {
    // Limpar container
    photosContainer.innerHTML = '';
    
    // Número de fotos a serem exibidas
    const numPhotos = 12;
    
    // Título da seção
    const sectionTitle = document.querySelector('.section-title');
    if (personalizedResults) {
      sectionTitle.textContent = 'Suas fotos encontradas';
    } else if (nonIdentified) {
      sectionTitle.textContent = 'Fotos não identificadas';
    } else {
      sectionTitle.textContent = 'Fotos do evento';
    }
    
    // Imagens de triathlon para demonstração
    const triathlonImages = [
      'https://images.unsplash.com/photo-1530137073521-28cda9e40e47?q=80&w=400&h=500&auto=format&fit=crop', // Natação
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=400&h=500&auto=format&fit=crop', // Corrida
      'https://images.unsplash.com/photo-1486218119243-13883505764c?q=80&w=400&h=500&auto=format&fit=crop', // Ciclismo
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=400&h=500&auto=format&fit=crop', // Natação 2
      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=400&h=500&auto=format&fit=crop', // Corrida 2
      'https://images.unsplash.com/photo-1517931524326-bdd55a541177?q=80&w=400&h=500&auto=format&fit=crop', // Ciclismo 2
      'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=400&h=500&auto=format&fit=crop', // Chegada
      'https://images.unsplash.com/photo-1530137073521-28cda9e40e47?q=80&w=400&h=500&auto=format&fit=crop', // Natação 3
      'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=400&h=500&auto=format&fit=crop', // Transição
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=400&h=500&auto=format&fit=crop', // Ciclismo 3
      'https://images.unsplash.com/photo-1585341840941-98553e474d84?q=80&w=400&h=500&auto=format&fit=crop', // Corrida 3
      'https://images.unsplash.com/photo-1585341840904-15c0a0d50082?q=80&w=400&h=500&auto=format&fit=crop'  // Pódio
    ];
    
    // Categorias das fotos
    const categories = [
      'Natação', 'Corrida', 'Ciclismo', 'Natação', 'Corrida', 'Ciclismo',
      'Chegada', 'Natação', 'Transição', 'Ciclismo', 'Corrida', 'Pódio'
    ];
    
    // Gerar fotos de exemplo
    for (let i = 0; i < numPhotos; i++) {
      // Criar elemento de foto
      const photoItem = document.createElement('div');
      photoItem.className = 'photo-item';
      
      // Criar imagem
      const img = document.createElement('img');
      img.src = triathlonImages[i];
      img.alt = `Foto de ${categories[i]}`;
      
      // Criar overlay
      const overlay = document.createElement('div');
      overlay.className = 'photo-overlay';
      
      // Criar info
      const info = document.createElement('div');
      info.className = 'photo-info';
      
      // ID da foto
      const photoId = document.createElement('div');
      photoId.className = 'photo-id';
      photoId.textContent = `#${Math.floor(1000 + Math.random() * 9000)} - ${categories[i]}`;
      
      // Adicionar elementos ao DOM
      info.appendChild(photoId);
      overlay.appendChild(info);
      photoItem.appendChild(img);
      photoItem.appendChild(overlay);
      photosContainer.appendChild(photoItem);
      
      // Adicionar evento de clique
      photoItem.addEventListener('click', () => {
        // Abrir visualização da foto em tamanho maior (simulação)
        const modal = document.createElement('div');
        modal.className = 'photo-view-modal active';
        modal.innerHTML = `
          <div class="photo-view-content">
            <button class="close-photo-view">&times;</button>
            <img src="${img.src}" alt="${img.alt}">
            <div class="photo-view-info">
              <h3>${photoId.textContent}</h3>
              <p>Tirada em: 20.04.25 - Rio de Janeiro</p>
              <div class="photo-actions">
                <button class="btn btn-primary"><i class="fas fa-shopping-cart"></i> Comprar</button>
                <button class="btn btn-outline"><i class="fas fa-share-alt"></i> Compartilhar</button>
              </div>
            </div>
          </div>
        `;
        
        document.body.appendChild(modal);
        
        // Fechar modal ao clicar no botão de fechar
        const closeBtn = modal.querySelector('.close-photo-view');
        closeBtn.addEventListener('click', () => {
          modal.remove();
        });
        
        // Fechar modal ao clicar fora da imagem
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.remove();
          }
        });
      });
    }
    
    // Adicionar estilos para o modal de visualização de fotos
    if (!document.getElementById('photo-view-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'photo-view-styles';
      styleEl.textContent = `
        .photo-view-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          z-index: 2000;
          align-items: center;
          justify-content: center;
        }
        
        .photo-view-modal.active {
          display: flex;
        }
        
        .photo-view-content {
          position: relative;
          max-width: 90%;
          max-height: 90vh;
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .photo-view-content img {
          max-width: 100%;
          max-height: 70vh;
          object-fit: contain;
        }
        
        .close-photo-view {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: rgba(0, 0, 0, 0.5);
          color: #fff;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
        }
        
        .photo-view-info {
          padding: 1rem;
        }
        
        .photo-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
      `;
      document.head.appendChild(styleEl);
    }
  }
});

// Adicionar funcionalidade para redirecionar para a página de evento ao clicar em um card de evento na página principal
export function setupEventCardLinks() {
  const eventCards = document.querySelectorAll('.evento-card');
  
  console.log('Configurando links de eventos, cards encontrados:', eventCards.length);
  
  eventCards.forEach(card => {
    card.addEventListener('click', () => {
      console.log('Card de evento clicado, redirecionando...');
      window.location.href = './event.html';
    });
  });
}
