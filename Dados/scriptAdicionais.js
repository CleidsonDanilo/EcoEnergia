// HISTÓRICO - Salva consumo no localStorage
if (typeof potencia !== 'undefined' && typeof horas !== 'undefined' && typeof dias !== 'undefined' && typeof estado !== 'undefined' && typeof consumo !== 'undefined' && typeof custo !== 'undefined') {
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
}

// MENU RESPONSIVO - Alternar menu e ícones
const toggleBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggleBtn && navLinks) {
  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Configuração inicial dos ícones ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  const iconHamburger = toggleBtn.querySelector('.icon-hamburger');
  const iconClose = toggleBtn.querySelector('.icon-close');

  if (iconHamburger && iconClose) {
    iconHamburger.style.display = 'block';
    iconClose.style.display = 'none';
  }
});

// MARCAR LINK ATIVO
const links = document.querySelectorAll('.nav-links a');
const currentPage = window.location.pathname.split("/").pop();

links.forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('ativo');
  }
});

// MODO ESCURO
const btnToggle = document.getElementById('toggle-dark');

if (btnToggle) {
  btnToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    btnToggle.textContent = isDark ? 'Modo claro 🌔' : 'Modo escuro 🌒';
    localStorage.setItem('modoEscuroAtivado', isDark);
  });

  // Ao carregar a página
  window.addEventListener('DOMContentLoaded', () => {
    const modoSalvo = localStorage.getItem('modoEscuroAtivado') === 'true';
    if (modoSalvo) {
      document.body.classList.add('dark');
      btnToggle.textContent = 'Modo claro 🌔';
    } else {
      btnToggle.textContent = 'Modo escuro 🌒';
    }
  });
  // Adiciona o evento de clique ao botão
  btnToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    btnToggle.textContent = isDark ? 'Modo claro 🌔' : 'Modo escuro 🌒';
    localStorage.setItem('modoEscuroAtivado', isDark);
  });
  function calcular() {
  const potencia = parseFloat(document.getElementById('potencia').value);
  const horas = parseFloat(document.getElementById('horas').value);
  const dias = parseFloat(document.getElementById('dias').value);
  const estado = document.getElementById('estado').value;
    if (horas > 24) {
        alert('O número de horas por dia não pode ser maior que 24.');
        return;
    }
  if (isNaN(potencia) || isNaN(horas) || isNaN(dias) || !estado) {
    alert('Preencha todos os campos corretamente!');
    return;
  }
  
  const consumo = (potencia * horas * dias) / 1000;
  const precoKwh = estados[estado];
  const custo = consumo * precoKwh;

  document.getElementById('resultado').innerHTML = `
    <p>Consumo mensal: <strong>${consumo.toFixed(2)} kWh</strong></p>
    <p>Custo estimado: <strong>R$ ${custo.toFixed(2)}</strong></p>
  `;
}
}
