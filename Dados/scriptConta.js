let estados = {};

// Carrega os estados e preços
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

function limparFormulario() {
  document.getElementById('consumo').value = '';
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
      <li><strong>Consumo:</strong> Insira o consumo registrado em kWh.</li>
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

  if (overlay) {
    overlay.remove();
  }

  if (alerta) {
    alerta.remove();
  }
}

carregarEstados();
