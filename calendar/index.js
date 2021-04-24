const calendarContentEl = document.getElementById("calendar-content");
const nextBtnEl = document.getElementById("next-btn");
const prevBtnEl = document.getElementById("prev-btn");
const monthYearEl = document.getElementById("month-year");
let selectedDay = dayjs();

function renderCalendar() {
  // 1. Render month & year
  monthYearEl.innerText = selectedDay.format("MMM YYYY");

  // 2. Render dates
  // 2.1. Calculate days that is of prev month
  const startOfSelectedMonth = selectedDay.startOf("month");
  const dayToSkip = startOfSelectedMonth.day();

  // 2.2. Generate days data
  const daysData = [];
  // 2.2.1. Skip days of prev month
  for (let i = 0; i < dayToSkip; i++) {
    daysData.push(undefined);
  }
  // 2.2.2. Add days of curren month
  let tempDay = startOfSelectedMonth;
  while (tempDay.isSame(selectedDay, "month")) {
    daysData.push(tempDay.date());
    tempDay = tempDay.add(1, "day");
  }

  // 2.3. Render dates by data
  calendarContentEl.innerHTML = "";
  for (let i = 0; i < 7 * 5; i++) {
    const dateNumber = daysData[i + 1];
    const isToday =
      dayjs().date() === dateNumber && selectedDay.isSame(dayjs(), "month");
    calendarContentEl.innerHTML += `
      <div class='slot ${dateNumber ? "" : "other-month"} ${
      isToday ? "today" : ""
    }'>${dateNumber || ""}</div>
    `;
  }
}
renderCalendar();

// Handle next/prev month
nextBtnEl.addEventListener("click", () => {
  selectedDay = selectedDay.add(1, "month");
  renderCalendar();
});
prevBtnEl.addEventListener("click", () => {
  selectedDay = selectedDay.subtract(1, "month");
  renderCalendar();
});
