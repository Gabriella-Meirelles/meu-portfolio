// script.js -- interações: menu mobile, tema, validação do formulário e simulação do envio

document.addEventListener('DOMContentLoaded', () => {

  
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }


  const themeToggle = document.getElementById('themeToggle');

  // Aplica tema salvo (se existir)
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      // Se não tiver classe, assume "light" como padrão
      if (!document.body.classList.contains('dark') &&
          !document.body.classList.contains('light')) {
        document.body.classList.add('light');
      }

      document.body.classList.toggle('dark');
      document.body.classList.toggle('light');

      // Salva apenas o tema atual
      const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem('theme', currentTheme);
    });
  }

  /* ===============================
     MENU MOBILE
  =============================== */
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      // se já está visível em "flex", esconde
      if (nav.style.display === 'flex') {
        nav.style.display = '';
        menuToggle.setAttribute('aria-expanded', 'false');
      } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.gap = '0.6rem';
        menuToggle.setAttribute('aria-expanded', 'true');
      }
    });
  }

  /* ===============================
     FORMULÁRIO DE CONTATO
  =============================== */
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  function validEmail(email) {
    // Validação simples, suficiente para o trabalho
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (form && feedback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      feedback.textContent = '';
      feedback.style.background = '';
      feedback.style.color = '';

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      // Campos obrigatórios
      if (!name || !email || !message) {
        feedback.textContent = 'Por favor, preencha todos os campos.';
        feedback.style.background = '#ffdede';
        return;
      }

      // E-mail válido
      if (!validEmail(email)) {
        feedback.textContent = 'Informe um e-mail válido (ex: usuario@dominio.com).';
        feedback.style.background = '#ffdede';
        return;
      }

      // Mensagem mínima
      if (message.length < 10) {
        feedback.textContent = 'A mensagem deve ter ao menos 10 caracteres.';
        feedback.style.background = '#ffdede';
        return;
      }

      // Simulação de envio
      feedback.textContent = 'Enviando...';
      feedback.style.background = '#fff3cd';

      setTimeout(() => {
        form.reset();
        feedback.textContent = 'Mensagem enviada com sucesso!';
        feedback.style.background = '#e6ffea';
      }, 800);
    });
  }

  /* ===============================
     SCROLL SUAVE ENTRE SEÇÕES
  =============================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Fecha o menu mobile após clicar (se estiver aberto)
      if (window.innerWidth <= 780 && nav && nav.style.display === 'flex') {
        nav.style.display = '';
        if (menuToggle) {
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

});
