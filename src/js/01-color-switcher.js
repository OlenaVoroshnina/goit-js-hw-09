function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


const buttonStartEl = document.querySelector('button[data-start]');
const buttonStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;


buttonStartEl.addEventListener('click', onButtonStartClick);
buttonStopEl.addEventListener('click', onButtonStopClick);

function onButtonStartClick(event) {
    timerId = setInterval(() => {
        let color = getRandomHexColor();
        bodyEl.style.backgroundColor = color;
        buttonStartEl.disabled = event.target;
        buttonStopEl.disabled = false;
        
    }, 1000);
    
};

function onButtonStopClick(event) {
    clearInterval(timerId); 
    buttonStopEl.disabled = event.target;
    buttonStartEl.disabled = false;
    
};