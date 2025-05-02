
// Função para calcular o consumo de energia
const btnToggle = document.getElementById('toggle-dark');

btnToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  btnToggle.textContent = isDark ? 'Modo claro🌔' : 'Modo escuro🌒';

  // Salvar preferência no localStorage
  localStorage.setItem('Modo escuro🌒', isDark);
});

// Ao carregar a página, verifica se o modo escuro estava ativado
window.addEventListener('DOMContentLoaded', () => {
  const modoSalvo = localStorage.getItem('Modo escuro🌒') === 'true';
  if (modoSalvo) {
    document.body.classList.add('dark');
    btnToggle.textContent = 'Modo claro🌔';
  } else {
    btnToggle.textContent = 'Modo escuro🌒';
  }
});

// Salva o histórico no localStorage
const historico = JSON.parse(localStorage.getItem('historicoEnergia')) || [];
historico.push({
  potencia,
  horas,
  dias,
  estado,
  consumo: consumo.toFixed(2),
  custo: custo.toFixed(2),
  data: new Date().toLocaleString()
});
localStorage.setItem('historicoEnergia', JSON.stringify(historico));


const toggleBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

toggleBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Marcar página ativa automaticamente
const links = document.querySelectorAll('.nav-item');
const currentUrl = window.location.pathname;

links.forEach(link => {
  if (link.getAttribute('href') === currentUrl.split("/").pop()) {
    link.classList.add('active');
  }
});



