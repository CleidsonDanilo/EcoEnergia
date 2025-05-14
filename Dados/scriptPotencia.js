let estados = {};

async function carregarEstados() {
    try {
        const response = await fetch('../dados/estados.json');
        if (!response.ok) {
            throw new Error(`Erro ao carregar estados: ${response.statusText}`);
        }
        estados = await response.json();

        const select = document.getElementById('estado');
        for (const estado in estados) {
            const option = document.createElement('option');
            option.value = estado;
            option.textContent = estado;
            select.appendChild(option);
        }
    } catch (error) {
        console.error('Erro ao carregar estados:', error);
        alert('Não foi possível carregar os estados. Verifique sua conexão ou tente novamente mais tarde.');
    }
}

carregarEstados();




