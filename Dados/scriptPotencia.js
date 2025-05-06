let estados = {};

async function carregarEstados() {
    const response = await fetch('../dados/estados.json');
    estados = await response.json();

  const select = document.getElementById('estado');
  for (const estado in estados) {
    const option = document.createElement('option');
    option.value = estado;
    option.textContent = estado;
    select.appendChild(option);
  }
}

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

function limparFormulario() {
  document.getElementById('potencia').value = '';
  document.getElementById('horas').value = '';
  document.getElementById('dias').value = '';
  document.getElementById('estado').selectedIndex = 0;
  document.getElementById('resultado').innerHTML = '';
}

function mostrarAjuda() {
  // Criar elementos para o alerta personalizado
  const overlay = document.createElement('div');
  overlay.className = 'overlay';

  const alerta = document.createElement('div');
  alerta.className = 'alerta-personalizado';

  alerta.innerHTML = `
    <h2>Ajuda</h2>
    <p>Preencha os campos da seguinte forma:</p>
    <ul>
      <li><strong>Potência:</strong> Insira a potência do aparelho em Watts.</li>
      <li><strong>Horas:</strong> Informe o número de horas que o aparelho é usado por dia (máximo 24).</li>
      <li><strong>Dias:</strong> Informe o número de dias que o aparelho é usado por mês.</li>
      <li><strong>Estado:</strong> Selecione o estado para calcular o custo com base na tarifa local.</li>
    </ul>
    <button onclick="fecharAjuda()">Fechar</button>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(alerta);
}

function fecharAjuda() {
  const overlay = document.querySelector('.overlay');
  const alerta = document.querySelector('.alerta-personalizado');

  if (overlay) overlay.remove();
  if (alerta) alerta.remove();
}

carregarEstados();
