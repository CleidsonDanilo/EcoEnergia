import { carregarEstados } from './estados.js';

let estados = {};

document.addEventListener('DOMContentLoaded', async () => {
    estados = await carregarEstados('estado');
});

function calcularPotencia() {
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
    const preco = estados[estado];
    const custo = consumo * preco;

    document.getElementById('resultado').innerHTML = `
        <p>Consumo mensal: <strong>${consumo.toFixed(2)} kWh</strong></p>
        <p>Custo estimado: <strong>R$ ${custo.toFixed(2)}</strong></p>
    `;
}

window.calcularPotencia = calcularPotencia;
