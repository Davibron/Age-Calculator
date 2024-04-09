function ageCalculator() {
  const yearInput = document.getElementById("year").value;
  const monthInput = document.getElementById("month").value;
  const dayInput = document.getElementById("day").value;

  if (!isValidDate(yearInput, monthInput, dayInput)) {
    var errorDay = document.getElementById("errorDay");
    var errorMonth = document.getElementById("errorMonth");
    var errorYear = document.getElementById("errorYear");

    errorDay.textContent = "";
    errorMonth.textContent = "";
    errorYear.textContent = "";
    document.getElementById("year").style.borderColor = "";
    document.getElementById("month").style.borderColor = "";
    document.getElementById("day").style.borderColor = "";

    if (parseInt(dayInput) > 31 || parseInt(dayInput) < 1) {
        errorDay.textContent = "Must be a valid day";
        document.getElementById("day").style.borderColor = "hsl(0, 100%, 67%)";
    } else if (parseInt(monthInput) > 12 || parseInt(monthInput) < 1) {
        errorMonth.textContent = "Must be a valid month";
        document.getElementById("month").style.borderColor = "hsl(0, 100%, 67%)";
    } else if (parseInt(yearInput) > new Date().getFullYear()) {
        errorYear.textContent = "Must be in the past";
        document.getElementById("year").style.borderColor = "hsl(0, 100%, 67%)";
    }
    return; 
  }

  document.getElementById("errorDay").textContent = "";
  document.getElementById("errorMonth").textContent = "";
  document.getElementById("errorYear").textContent = "";
  document.getElementById("year").style.borderColor = "";
  document.getElementById("month").style.borderColor = "";
  document.getElementById("day").style.borderColor = "";

  const birthdate = new Date(yearInput, monthInput - 1, dayInput);
  let currentDate = new Date();

  const ageInMilliseconds = currentDate - birthdate;
  const ageInSeconds = ageInMilliseconds / 1000;
  const ageInMinutes = ageInSeconds / 60;
  const ageInHours = ageInMinutes / 60;
  const ageInDays = ageInHours / 24;
  const ageInMonths = ageInDays / 30.436875;
  const ageInYears = ageInMonths / 12;

  const years = Math.floor(ageInYears);
  const months = Math.floor(ageInMonths % 12);
  const days = Math.floor(ageInDays % 30.436875);

  const result =  `
  <div><span class="year-age">${years}</span>years</div>
  <div><span class="month-age">${months}</span>months</div>
  <div><span class="day-age">${days}</span>days</div>
  `;
  document.getElementById("result").innerHTML = result;
}

function isValidDate(year, month, day) {
  const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; 
    const currentDay = currentDate.getDate();

    year = parseInt(year);
    month = parseInt(month);
    day = parseInt(day);

    if (year > currentYear || (year === currentYear && month > currentMonth) || (year === currentYear && month === currentMonth && day > currentDay)) {
        return false;
    }

    if (year > currentYear + 120) {
        return false;
    }

    if (month > 12 || month < 1) {
        return false;
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth || day < 1) {
        return false;
    }

    let date = new Date(year, month - 1, day);
    return !isNaN(date.getTime());
}