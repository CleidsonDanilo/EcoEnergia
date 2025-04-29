import { carregarEstados } from './estados.js';

let estados = {};

document.addEventListener('DOMContentLoaded', async () => {
    estados = await carregarEstados('estado');
});

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

window.calcularConta = calcularConta;
