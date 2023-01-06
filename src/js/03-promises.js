import Notiflix from 'notiflix';

const buttonCreatePromisesEl = document.querySelector('button');
const delayEl = document.querySelector('input[name = "delay"]');
const stepEl = document.querySelector('input[name = "step"]');
const amountEl = document.querySelector('input[name = "amount"]');


buttonCreatePromisesEl.addEventListener('click', onButtonCreatePromisesClick);


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
   
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      
      } else {
        reject({ position, delay });
        
      }
    }, delay);
  }, )
}


function onButtonCreatePromisesClick(event){
  event.preventDefault();
  let delay = Number(delayEl.value);
  let step = Number(stepEl.value);
  let amount = Number(amountEl.value);

  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay + i * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      })
  };
};


