document.addEventListener('DOMContentLoaded', () => {
  // Funcionalidade para mostrar/ocultar senha
  const togglePasswordBtn = document.querySelector('.toggle-password');
  const passwordInput = document.getElementById('password');
  
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      
      // Alternar ícone
      const icon = togglePasswordBtn.querySelector('i');
      if (type === 'password') {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      } else {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      }
    });
  }
  
  // Lidar com o envio do formulário
  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const remember = document.getElementById('remember').checked;
      
      // Aqui você adicionaria a lógica de autenticação
      console.log('Login tentado com:', { email, password, remember });
      
      // Simulação de login bem-sucedido
      alert('Login realizado com sucesso!');
      window.location.href = './index.html';
    });
  }
});
