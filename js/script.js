document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('potencia');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const potencia = parseFloat(document.getElementById('potencia').value);
      const horas = parseFloat(document.getElementById('horas').value);
      const dias = parseFloat(document.getElementById('dias').value);
      const estado = document.getElementById('estado').value;
      const tarifas = { SP: 0.95, RJ: 1.05, MG: 0.85 };
      const consumo = (potencia * horas * dias) / 1000;
      const custo = consumo * tarifas[estado];
      localStorage.setItem('resultado', JSON.stringify({ consumo, custo }));
      window.location.href = 'resultado.html';
    });
  }

  const resultadoEl = document.getElementById('resultado');
  if (resultadoEl) {
    const dados = JSON.parse(localStorage.getItem('resultado'));
    if (dados) {
      resultadoEl.innerHTML = `
        <p>Consumo estimado: <strong>${dados.consumo.toFixed(2)} kWh</strong></p>
        <p>Custo estimado: <strong>R$ ${dados.custo.toFixed(2)}</strong></p>
      `;
    }
  }
});
