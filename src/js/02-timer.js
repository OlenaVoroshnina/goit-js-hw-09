// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';



const timePickerEl = document.querySelector('#datetime-picker');
const buttonStartEl = document.querySelector('button[data-start]');
const dataDaysEl = document.querySelector('span[data-days]');
const dataHoursEl = document.querySelector('span[data-hours]');
const dataMinutesEl = document.querySelector('span[data-minutes]');
const dataSecondsEl = document.querySelector('span[data-seconds]');

buttonStartEl.disabled = true;

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] <= new Date) {
        Notiflix.Notify.failure('Please choose a date in the future');
        
      } else {
        buttonStartEl.disabled = false;
    }  
  },
};

flatpickr(timePickerEl, options);

buttonStartEl.addEventListener('click', onButtonStartClick);


function onButtonStartClick() {
  timerId = setInterval(() => {
    let date = new Date(timePickerEl.value) - new Date();
    if (date >= 0) {
      const { days, hours, minutes, seconds } = convertMs(date);
      dataDaysEl.textContent = days;
      dataHoursEl.textContent = hours;
      dataMinutesEl.textContent = minutes;
      dataSecondsEl.textContent = seconds;
    } else {
      clearInterval(timerId); 
      buttonStartEl.disabled = true;  
      }
  }, 1000);
  
};

function addLeadingZero(value) {
      if (String(value).length < 2) {
        return String(value).padStart(2, '0');
      }
     return String(value);
};


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

