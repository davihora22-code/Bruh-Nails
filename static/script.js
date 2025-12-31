const calendar = document.getElementById("calendar");
const hoje = new Date();
const diaHoje = hoje.getDate();

function renderMes(offset = 0) {
  const data = new Date(hoje.getFullYear(), hoje.getMonth() + offset, 1);
  const mes = data.getMonth() + 1;
  const ano = data.getFullYear();

  const titulo = document.createElement("h3");
  titulo.innerText = data.toLocaleString("pt-BR", { month: "long" });
  calendar.appendChild(titulo);

  for (let dia = 1; dia <= 31; dia++) {
    if (offset === 0 && dia < diaHoje) continue;

    const btn = document.createElement("button");
    btn.innerText = `Dia ${dia}`;

    btn.onclick = () => {
      document.getElementById("dataSelecionada").value =
        `${ano}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
    };

    calendar.appendChild(btn);
  }
}

renderMes(0);

if (diaHoje >= 28) {
  renderMes(1);
}
