'use strict';

// Hay dos formas de seleccionar un elemento usando "querySelector" o "getElementById" que funcionan de la misma manera.

//Lo primero que haremos será poner las puntuaciones en 0 y hacer que el dado desaparezca.

// SELECTING ELEMENTS:
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); // Guardamos en la constante 'score0El' el elemento que contiene el ID '#score--0'
const score1El = document.getElementById('score--1'); // Guardamos en la variable 'score0El' el elemento que contiene el ID 'score--0'
// Esta es una 2da forma de seleccionar elementos en base a su ID, el 'getElementById' es un poco más rápido que el selector de consultas 'querySelector'. RECORDAR no usar #, porque ya indicamos que estamos obteniendo el elemento en base al ID.
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing; //Declaramos variables a las cuales les asignaremos distintos valores a lo largo del script

// STARTING CONDITIONS:
const init = function () {
  // Declaramos la consntante 'init' (inicialización) que tiene asociada la función con las siguientes condiciones iniciales del juego:

  // Asignamos valores a las variables declaradas más arriba:
  scores = [0, 0]; // asignamos valores inciales al array que contiene los puntajes del player 0 en la posición 0 y el player 1 en la posición 1.
  currentScore = 0; // asignamos un valor a la variable que guarda la puntuación actual, pero separada de la función de otras funciones para que no se actualice con cada tirada.
  activePlayer = 0; // asignamos un valor a la variable que contiene al jugador activo, en este caso es el player 0
  playing = true; // asignamos un valor a esta variable booleana que guarda: TRUE para indicar si queremos que siga jugando y FALSE para indicar que queremos detener el juego.

  // Actualizar las puntuaciones visibles
  score0El.textContent = 0; // dejo el valor del elemento 'score0El' en 0
  score1El.textContent = 0; // dejo el valor del elemento 'score1El' en 0
  current0El.textContent = 0; // dejo el valor del elemento 'current0El' en 0
  current1El.textContent = 0; // dejo el valor del elemento 'current1El' en 0

  diceEl.classList.add('hidden'); //agregamos la clase 'hiden' (esconder) a la clase 'dice' de la imagen del dado que está asociada a la const 'diceEl'

  // Restablecer clases y estilos
  player0El.classList.remove('player--winner'); //removemos la calse '.player--winner' de player0El
  player1El.classList.remove('player--winner'); //removemos la calse '.player--winner' de player1El
  player0El.classList.add('player--active'); //agregamos la calse '.player--active' de player0El
  player1El.classList.remove('player--active'); //removemos la calse '.player--active' de player1El
};
init(); //ejecutamos la función 'init' para que cada vez que recarguemos la página, JS muestre las condiciones iniciales del juego según las aclaraciones que hicimos adentro de la función 'init'(inicialización).

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // Seleccionamos al jugador perdió el turno y mostramos en pantalla su puntaje = 0.
  currentScore = 0; // Perdemos el puntaje acumulado y el contador baja a 0
  activePlayer = activePlayer === 0 ? 1 : 0; //cambiamos el valor del 'activePlayer' de 0 a 1 o de 1 a 0. Comprobando si el jugador activo actual es igual a 0 ? si, no (true, false). En base a la respuesta, se le asigna el valor 1 si ya era 0 (true), o se le asigna 0 si el jugador activo era el 1 (false).
  player0El.classList.toggle('player--active'); //En 'player0El' usamos 'toggle' (cambiar o alternar) para agregarle la clase 'player--active' en caso de que no lo tenga, y si ya lo tiene, se lo sacamos. Toggle sirve para ambas opciones, repetimos abajo, porque también queremos que lo haga con el 'player1El'.
  player1El.classList.toggle('player--active');
};

// ROLING DICE FUNCTIONALITY: (Funcionalidad de los dados)
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Si playing = true entonces la función del btnRoll va a reaccionar al evento click
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden'); //le quitamos la propiedad hidden al elemento diceEl
    diceEl.src = `dice-${dice}.png`; //coloca la imagen del dado según el número random que salga.

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Ad dice to current score
      currentScore += dice; // (currentScore = currentScore + dice) la puntuación actual es igual a la puntuación actual más el 'dice'.
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // Seleccionamos dinámicamente en base al jugador que esté activo en ese momento y le asignamos que muestre la puntuación = al currentScore.
    } else {
      // Switch to next player (cambiamos de jugador si 'dice' es === 1)
      switchPlayer(); //Llamamos a esta función que cambia al jugador activo
      /* //ESTE BLOQUE DE CÓDIGO ES EXACTAMENTE LO MISMO QUE HAY DENTRO DE LA  FUNCIÓN "switchPlayer":  
    document.getElementById(`current--${activePlayer}`).textContent = 0; // Seleccionamos al jugador perdió el turno y mostramos en pantalla su puntaje = 0.
    currentScore = 0; // Perdemos el puntaje acumulado y el contador baja a 0
    activePlayer = activePlayer === 0 ? 1 : 0; //cambiamos el valor del 'activePlayer' de 0 a 1 o de 1 a 0. Comprobando si el jugador activo actual es igual a 0 ? si, no (true, false). En base a la respuesta, se le asigna el valor 1 si ya era 0 (true), o se le asigna 0 si el jugador activo era el 1 (false).
    player0El.classList.toggle('player--active'); //En 'player0El' usamos 'toggle' (cambiar o alternar) para agregarle la clase 'player--active' en caso de que no lo tenga, y si ya lo tiene, se lo sacamos. Toggle sirve para ambas opciones, repetimos abajo, porque también queremos que lo haga con el 'player1El'.
    player1El.classList.toggle('player--active'); //Lo mismo que sucede en player0El usando toggle (cambiar o alternar).
    //Colocar la opción togle (cambiar o alternar) en ambos asegura que 'player--active' sólo esté activo en uno de los jugadores a la vez
    */
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Si playing = true entonces la función del btnHold va a reaccionar al evento click
    // 1. Add current score to active player´s score
    scores[activePlayer] += currentScore;
    // scores[1] = scores + scores[1]; (Dice lo mismo de arriba pero ecrito diferente)
    // cuando esté activado el player1,lo que está entre corchetes será el puntaje del player1. Y eso va a ser igual a ese valor + el currentScore (puntaje actual). Lo mismo ocurriría si estamos usando al player0. --> scores[0] = scores + scores[0];

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player´s score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false; //hace que ya no se puedan seguir usando los botones,porque solo funcionan si playing = true
      diceEl.classList.add('hidden'); //le quitamos la propiedad hidden al elemento diceEl

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); //agregamos la calse '.player--winner' al ganador y esto le da otro color de fondo.
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); //removemos la clase '.player--active' en el ganador para que no se superponga con la clase '.player--winner'.
    } else {
      // Switch to the next player
      switchPlayer();
      //Llamamos a esta función que cambia al jugador activo
    }
  }
});

//===== CHALLENGE ======
/* Cuando hagamos click en el botón New Game queremos:
1 - remover la clase winner del jugador 
2 - restaurar los valores de ambos jugadores a 0 (totales y current) 
3 - la suma acumulada comience desde 0 */
// Reiniciamos la partida:
btnNew.addEventListener('click', init); //JS va a llamar a la función 'init' apenas hagamos click en el botón 'btnNew'.

/*
playing = true; //permitir que los botones vuelvan a funcionar
scores[0] = 0; // Puntaje acumulado del jugador 0 a 0
scores[1] = 0; // Puntaje acumulado del jugador 1 a 0
currentScore = 0; // Puntaje actual a 0
*/
