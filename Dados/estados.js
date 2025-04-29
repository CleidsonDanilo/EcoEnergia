export async function carregarEstados(selectId) {
    try {
        const response = await fetch('../Dados/estados.json');
        const estados = await response.json();
        const select = document.getElementById(selectId);

        for (const estado in estados) {
            const option = document.createElement('option');
            option.value = estado;
            option.textContent = estado;
            select.appendChild(option);
        }

        return estados;
    } catch (erro) {
        console.error("Erro ao carregar estados:", erro);
    }
}
