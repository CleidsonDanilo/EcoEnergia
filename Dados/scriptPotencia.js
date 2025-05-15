// Tabela com o preço médio do kWh por estado (valores fictícios, atualize conforme necessário)
const estados = {
  "AC": 0.73,
  "AL": 0.72,
  "AP": 0.76,
  "AM": 0.74,
  "BA": 0.68,
  "CE": 0.70,
  "DF": 0.71,
  "ES": 0.69,
  "GO": 0.75,
  "MA": 0.67,
  "MT": 0.77,
  "MS": 0.78,
  "MG": 0.74,
  "PA": 0.66,
  "PB": 0.68,
  "PR": 0.73,
  "PE": 0.72,
  "PI": 0.67,
  "RJ": 0.76,
  "RN": 0.70,
  "RS": 0.75,
  "RO": 0.72,
  "RR": 0.74,
  "SC": 0.71,
  "SP": 0.79,
  "SE": 0.68,
  "TO": 0.69
};

// Preenche o select com os estados ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('estado');
  for (const estado in estados) {
    const option = document.createElement('option');
    option.value = estado;
    option.textContent = estado;
    select.appendChild(option);
  }

  // Restaurar modo escuro, se ativado anteriormente
  const modoSalvo = localStorage.getItem('modoEscuro') === 'true';
  if (modoSalvo) {
    document.body.classList.add('dark');
    const btn = document.getElementById('toggle-dark');
    if (btn) btn.textContent = 'Modo claro 🌔';
  }
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

  if (!potencia || !horas || !dias || !estado) {
    alert('Preencha todos os campos corretamente.');
    return;
  }

  const consumo = (potencia * horas * dias) / 1000;
  const precoKwh = estados[estado];
  const custo = consumo * precoKwh;

  document.getElementById('resultado').innerHTML = `
    <p>Consumo mensal: <strong>${consumo.toFixed(2)} kWh</strong></p>
    <p>Custo estimado: <strong>R$ ${custo.toFixed(2)}</strong></p>
  `;

  // HISTÓRICO - Salva no localStorage
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

function limparFormulario() {
  document.getElementById('potencia').value = '';
  document.getElementById('horas').value = '';
  document.getElementById('dias').value = '';
  document.getElementById('estado').selectedIndex = 0;
  document.getElementById('resultado').innerHTML = '';
}

function mostrarAjuda() {
  alert('Preencha os campos com os dados do aparelho e selecione seu estado para obter o cálculo estimado.');
}
