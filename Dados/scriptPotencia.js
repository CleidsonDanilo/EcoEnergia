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

carregarEstados();


