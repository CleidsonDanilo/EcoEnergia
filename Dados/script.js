// Objeto onde vamos guardar os dados dos estados e seus preços por kWh
let estados = {};

// Função que carrega os estados a partir do arquivo JSON
async function carregarEstados() {
  try {
    const response = await fetch('../Dados/estados.json');
    estados = await response.json();
    console.log("JSON carregado:", estados);

    const select = document.getElementById('estado');

    for (const estado in estados) {
      const option = document.createElement('option');
      option.value = estado;
      option.textContent = estado;
      select.appendChild(option);
    }
  } catch (erro) {
    console.error("Erro ao carregar estados:", erro);
  }
}

// Função chamada ao clicar no botão "Calcular"
function calcular() {
  const potencia = parseFloat(document.getElementById('potencia').value);
  const horas = parseFloat(document.getElementById('horas').value);
  const dias = parseFloat(document.getElementById('dias').value);
  const estado = document.getElementById('estado').value;

  if (isNaN(potencia) || isNaN(horas) || isNaN(dias) || !estado) {
    alert('Preencha todos os campos corretamente!');
    return;
  }

  if (horas > 24) {
    alert('O número de horas por dia não pode ser maior que 24.');
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

carregarEstados();

const btnToggle = document.getElementById('toggle-dark');

btnToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  btnToggle.textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro';

  // Salvar preferência no localStorage
  localStorage.setItem('modoEscuro', isDark);
});

// Ao carregar a página, verifica se o modo escuro estava ativado
window.addEventListener('DOMContentLoaded', () => {
  const modoSalvo = localStorage.getItem('modoEscuro') === 'true';
  if (modoSalvo) {
    document.body.classList.add('dark');
    btnToggle.textContent = '☀️ Modo Claro';
  } else {
    btnToggle.textContent = '🌙 Modo Escuro';
  }
});
