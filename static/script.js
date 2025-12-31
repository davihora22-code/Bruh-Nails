const calendarDays = document.getElementById("calendarDays");
const monthYear = document.getElementById("monthYear");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

const whatsappNumber = "5571986531160";

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function renderCalendar() {
  calendarDays.innerHTML = "";

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  monthYear.innerText = `${today.toLocaleString("pt-BR", {
    month: "long",
  })} ${currentYear}`;

  for (let i = 0; i < firstDay; i++) {
    calendarDays.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.innerText = day;

    const date = new Date(currentYear, currentMonth, day);

    if (date < today) {
      dayDiv.classList.add("disabled");
    } else {
      dayDiv.onclick = () => agendar(date);
    }

    calendarDays.appendChild(dayDiv);
  }

  // trava mês seguinte até dia 28
  if (
    currentMonth > today.getMonth() &&
    today.getDate() < 28
  ) {
    nextMonth.disabled = true;
  } else {
    nextMonth.disabled = false;
  }
}

function agendar(date) {
  const dataFormatada = date.toLocaleDateString("pt-BR");

  const mensagem = encodeURIComponent(
    `Olá! 😊 Gostaria de confirmar meu agendamento de unhas 💅
📅 Data: ${dataFormatada}`
  );

  window.open(
    `https://wa.me/${whatsappNumber}?text=${mensagem}`,
    "_blank"
  );
}

prevMonth.onclick = () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
};

nextMonth.onclick = () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
};

renderCalendar();
