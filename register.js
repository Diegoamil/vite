// Inicialização da página de cadastro do SportShot
document.addEventListener('DOMContentLoaded', () => {
  // Elementos do DOM
  const registerForm = document.querySelector('.register-form');
  const togglePasswordBtns = document.querySelectorAll('.toggle-password');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const fullnameInput = document.getElementById('fullname');
  const phoneInput = document.getElementById('phone');
  const cpfInput = document.getElementById('cpf');
  const emailInput = document.getElementById('email');
  
  // Função para alternar a visibilidade da senha
  function togglePasswordVisibility(button, inputField) {
    if (inputField.type === 'password') {
      inputField.type = 'text';
      button.querySelector('i').classList.remove('fa-eye');
      button.querySelector('i').classList.add('fa-eye-slash');
    } else {
      inputField.type = 'password';
      button.querySelector('i').classList.remove('fa-eye-slash');
      button.querySelector('i').classList.add('fa-eye');
    }
  }
  
  // Adicionar evento de clique aos botões de mostrar/ocultar senha
  togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const inputField = btn.previousElementSibling;
      togglePasswordVisibility(btn, inputField);
    });
  });
  
  // Função para formatar o telefone enquanto o usuário digita
  function formatPhone(value) {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a formatação
    if (numbers.length <= 2) {
      return `(${numbers}`;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  }
  
  // Função para formatar o CPF enquanto o usuário digita
  function formatCPF(value) {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a formatação
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    } else if (numbers.length <= 9) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    } else {
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
    }
  }
  
  // Adicionar evento de input ao campo de telefone para formatação automática
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      const cursorPosition = e.target.selectionStart;
      const previousLength = e.target.value.length;
      
      e.target.value = formatPhone(e.target.value);
      
      // Ajusta a posição do cursor após a formatação
      const newLength = e.target.value.length;
      const newPosition = cursorPosition + (newLength - previousLength);
      e.target.setSelectionRange(newPosition, newPosition);
    });
  }
  
  // Adicionar evento de input ao campo de CPF para formatação automática
  if (cpfInput) {
    cpfInput.addEventListener('input', (e) => {
      const cursorPosition = e.target.selectionStart;
      const previousLength = e.target.value.length;
      
      e.target.value = formatCPF(e.target.value);
      
      // Ajusta a posição do cursor após a formatação
      const newLength = e.target.value.length;
      const newPosition = cursorPosition + (newLength - previousLength);
      e.target.setSelectionRange(newPosition, newPosition);
    });
  }
  
  // Validação do formulário no envio
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      let errorMessage = '';
      
      // Validar nome completo (pelo menos nome e sobrenome)
      if (fullnameInput && fullnameInput.value.trim().split(' ').length < 2) {
        isValid = false;
        errorMessage = 'Por favor, informe seu nome completo (nome e sobrenome).';
      }
      
      // Validar telefone (deve ter pelo menos 14 caracteres com a formatação)
      else if (phoneInput && phoneInput.value.replace(/\D/g, '').length < 10) {
        isValid = false;
        errorMessage = 'Por favor, informe um número de telefone válido.';
      }
      
      // Validar CPF (deve ter 11 dígitos)
      else if (cpfInput && cpfInput.value.replace(/\D/g, '').length !== 11) {
        isValid = false;
        errorMessage = 'Por favor, informe um CPF válido.';
      }
      
      // Validar email (formato básico)
      else if (emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        isValid = false;
        errorMessage = 'Por favor, informe um endereço de e-mail válido.';
      }
      
      // Validar senha (pelo menos 6 caracteres)
      else if (passwordInput && passwordInput.value.length < 6) {
        isValid = false;
        errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      }
      
      // Validar confirmação de senha
      else if (passwordInput && confirmPasswordInput && passwordInput.value !== confirmPasswordInput.value) {
        isValid = false;
        errorMessage = 'As senhas não coincidem.';
      }
      
      if (!isValid) {
        alert(errorMessage);
        return;
      }
      
      // Se tudo estiver válido, simular o envio do formulário
      alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
      window.location.href = '/login.html';
    });
  }
});
