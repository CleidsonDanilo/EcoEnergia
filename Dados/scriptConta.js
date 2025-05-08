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

carregarEstados();
