document.addEventListener("DOMContentLoaded", () => {
    const btnToggle = document.getElementById("toggle-dark");
    const body = document.body;
  
    // Verifica se o modo escuro está ativado no localStorage
    const modoSalvo = localStorage.getItem("modoEscuro") === "true";
    if (modoSalvo) {
      body.classList.add("dark");
      btnToggle.textContent = "🌓"; // Ícone para modo claro
    }
  
    // Alterna entre modo claro e escuro
    btnToggle.addEventListener("click", () => {
      const isDark = body.classList.toggle("dark");
      btnToggle.textContent = isDark ? "🌓" : "🌓"; // Atualiza o ícone
      localStorage.setItem("modoEscuro", isDark); // Salva a preferência
    });
  });