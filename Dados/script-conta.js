let estados = {};

// Carrega os estados e preços
async function carregarEstados() {
    const response = await fetch('../Dados/estados.json');
    if (!response.ok) {
        console.error('Erro ao carregar estados:', response.statusText);
        return;
    }
  estados = await response.json();

  const select = document.getElementById('estado');
  for (const estado in estados) {
    const option = document.createElement('option');
    option.value = estado;
    option.textContent = estado;
    select.appendChild(option);
  }
}

function calcularConta() {
  const consumo = parseFloat(document.getElementById('consumo').value);
  const estado = document.getElementById('estado').value;

  if (isNaN(consumo) || !estado) {
    alert('Preencha todos os campos corretamente!');
    return;
  }

  const preco = estados[estado];
  const custo = consumo * preco;

  document.getElementById('resultado').innerHTML = `
    <p>Você consumiu <strong>${consumo.toFixed(2)} kWh</strong></p>
    <p>Valor estimado: <strong>R$ ${custo.toFixed(2)}</strong></p>
  `;
}

// Dark mode reutilizado
const btnToggle = document.getElementById('toggle-dark');
btnToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  btnToggle.textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro';
  localStorage.setItem('modoEscuro', isDark);
});

window.addEventListener('DOMContentLoaded', () => {
  const modoSalvo = localStorage.getItem('modoEscuro') === 'true';
  if (modoSalvo) {
    document.body.classList.add('dark');
    btnToggle.textContent = '☀️ Modo Claro';
  } else {
    btnToggle.textContent = '🌙 Modo Escuro';
  }

  carregarEstados();
});
