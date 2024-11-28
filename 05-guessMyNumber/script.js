'use strict';

// ========== ¿ Qué es el DOM ? ============
// 'Dom manipulation' es hacer que javascript interactúe con la página web.

/* Dom es el acrónimo para Document Object Model, y básicamente es una representación estructurada de documentos en HTML, el DOM mediante el uso de javascript, nos permite el acceso a los elementos y estilos del HTML para manipularlos. Por ejemplo cambiar textos, cambiar estilos del atributo e incluso cambiar el estilo CSS desde JavaScript.
Finalmente podemos decir que el DOM es un punto de conexión entre JS y el documento HTML. 

Arbol DOM de HTML: 
Cada documento HTML puede ser representado por una estructura de árbol similar al de la imagen, que a su vez se parece nun poco a un árbol genealógico. 
Cuando usamos este arbol podemos hablar de padres, hijos, o hermanos, cada uno de esos nodos, son elementos que a su vez encierran algún elemento del HTML. Por ejemplo una section, un paragraph, un ancor, etc. Y para interactuar con esos nodos, (elementos del HTML del arbol DOM, "nodos") es necesario utilizar JavaScript. 
Cada arbol siempre comienza con el objeto del documento en la parte superior. El 'Documenyo es un objeto especial, al cual podemos acceder desde JS. Y este objeto documento, sirve como punto de entrada al DOM. 
Podemos acdeder al DOM con el objeto especial llamado "Documento" por ejemplo 'document.querySelector()'

El primer hijo, del elemento Documento, suele ser el elemento HTML, luego el HTML suele tener dos hijos, los elementos Head y Body. Que también son hermanos en el DOM, luego a medida que profundizamos más y más en la estructura HTML anidada, vemos que seguimos agregando más y más hijos al árbol Dom. 
La regla general es que lo que esté en el documento HTML también tiene que estar en el Dom. Así es como el Dom, es una completa representación del documento HTML y podemos manipularlo de muchas maneras. 
Importante:  DOM !== JavaScript  
El Dom no es parte del lenguaje JavaScript. El Dom forma parte de las WEB APIs (Interfaz de Programación de Aplicaciones), que son una especie de bibliotecas que implementan los navegadores y a las que podemos acceder desde nuestro código JavaScript. Estas bibliotecas están escritas en JS y están disponibles para que las usemos. 
*/

////////////////////////////////////////////////////////
// ======= SELECTING AND MANIPULATING DOCUMENTS =======
/*
console.log(document.querySelector('.message').textContent); //imprime en la consola el contenido de la clase 'mensaje'.

document.querySelector('.message').textContent = '🎉 Correct Number!'; //modificamos el contenido de la clase 'mensaje' y la reemplazamos por 'Correct Number'

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

//Si colocamos el código A antes del código B, podemos imprimir en la consola el valor 23
document.querySelector('.guess').value = 23; //(código A) aca especificamos que en el imput guess tiene que aparecer el nº23.
console.log(document.querySelector('.guess').value); //(código B) con esto manipulamos el elemento 'imput' que tiene como clase 'guess'
*/

// === Handling Click Events ===
// AHORA HAREMOS QUE LA APLICACION HAGA ALGO CUANDO DEMOS CLIC EN EL BOTON VERIFICAR, agregando un EVENT LISTENER:
/*
document.querySelector('.check').addEventListener('click', function () {
  //dentro de los corchetes escribimos lo que queremos que suceda cuando ocurre el evento 'clik'.
  const guess = Number(document.querySelector('.guess').value); //cuando escribimos un número en 'imput number',se guarda en la variable 'guess', especificamos que queremos un valor numérico.
  console.log(guess, typeof guess); // el valor guardado en ‘guess’ se imprime en la consola y además muestra que tipo de valor es.


  //Con este código "If" hacemos que se imprima un texto, cada vez que ejecutemos el evento 'clik' y no haya valores ingresados para mostrar. 
  //Cuando no hay valores para mostrar, la consola imprime '0', es decir 'falso', por eso usamos el operador NOT "!" para convertirlo a verdadero y hacer que el bloque de código se ejecute, porque recordemos que el IF solo se ejecuta cuando la condición es verdadera.
  

  if (!guess) {
    document.querySelector('.message').textContent = '⛔️ No Number!';
  }
});
*/
/*
Necesitamos especificarle al que lee el evento (addEventListener) que debe hacer cuando lo recibe, más especificamente es necesario especificar la reacción al evento 'click'. 
Esto se hace colocando una función que contendrá exactamente el código que debe ejecutarse cada vez que ocurra el evento 'clik' en este botón de verificación.
Esa función que agregamos dentro de addEventListener, se llamará 'Controlador de Eventos'.

Es importante entender que 'addEventListener' también es una función con dos entradas, en el primer parámetro se coloca el nombre del evento que estamos escuchando. 
En este caso 'click' y en el segundo parámetro va el controlador de eventos, que puede ser una función, como en este caso que de como resultado un argumento con valor string, numero, etc.'

Importante: esta función se ejecutará únicamente cuando el suceda el evento 'click'. 
*/

/////////////////////////////////////////////////////////////////////
// ============== IMPLEMENTANDO LA LOGICA DEL JUEGO ================
/* Ahora suponemos 3 escenarios más y los codificamos, (utilizando la base del código anterior!!)
Debemos hacer diferentes scripts que se ejecutarán dependiendo el escenario, por el momento tenemos tres: 
1º escenario - cuando ingresamos un valor muy bajo.
2º escenario - cuando ingresamos un valor muy alto.
3º escenario - ver qué sucede si ingresamos el valor correcto.
*/

// Primero definamos el número oculto ganador. El código que se encarga de este trabajo, debe quedar por fuera del bloque de script que estamos usando, porque si lo colocamos dentro, este número oculto, se actualizará con cada tirada y entonces el juego no tendría sentido.
let secretNumber = Math.trunc(Math.random() * 20) + 1; //con eso obtenemos un número random del 1 al 20.
// Ahora creamos una variable para el puntaje (score) y luego usamos esa variable para disminuirla con cada tirada y mostrar el resultado en la etiqueta de puntaje
// Esta variable, también puede ser conocida como variable de estado, porque es parte de los datos que son relevantes para la aplicación.
let score = 20; // Ojo, este score (variable) es distinta a .score (class). Esto tiene que ver con el "Score" usamos una variable "let" porque este valor va a disminuir con cada tirada, en cambio si usáramos una constante, no podríamos, porque son inmutables.
let highscore = 0;
/*
La opción “Math.random()” únicamente nos dará números random del 1 a 10, para conseguir números del 1 al 20, debemos multiplicar el código por 20. Por otro lado “Math.trunc()” sirve para eliminar los decimales del número random que nos tire el código Math.random, porque para este ejemplo, no nos sirven. 
Finalmente agregamos “+1” porque al cortar los decimales, el número 20 nunca va a ser elegido, porque los decimales llegan hasta el 19,9999999. Agregamos ese + 1 para que ahora, los decimales corten en 20,99999. Y así el código también pueda elegir al azar el número 20. 
*/

//Ahora creamos una función para reemplazar las líneas de código donde escribimos : document.querySelector('.message').textContent = '⛔️ No Number!';
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
// Ahora también trabajamos con la parte del Score, y las vueltas o tiradas contadas.

document.querySelector('.check').addEventListener('click', function () {
  //dentro de los corchetes escribimos lo que queremos que suceda cuando ocurre el evento 'clik'.
  const guess = Number(document.querySelector('.guess').value); //cuando escribimos un número en 'imput number',se guarda en la variable 'guess', especificamos que queremos un valor numérico.
  console.log(guess, typeof guess); // el valor guardado en ‘guess’ se imprime en la consola y además muestra que tipo de valor es.

  //Con este código "If" hacemos que se imprima un texto, cada vez que ejecutemos el evento 'clik' y no haya valores ingresados para mostrar.
  //Cuando no hay valores para mostrar, la consola imprime '0', es decir 'falso', por eso usamos el operador NOT "!" para convertirlo a verdadero y hacer que el bloque de código se ejecute, porque recordemos que el IF solo se ejecuta cuando la condición es verdadera.

  // When there is no input
  if (!guess) {
    // se ejecuta si no se ingresó ningún número.
    //document.querySelector('.message').textContent = '⛔️ No Number!';
    displayMessage('⛔️ No Number!'); //llamamos a la función 'displayMessage' para imprimir el mensaje que está entre paréntesis, forma abreviada de escribir el código de la línea anterior, con una función.
    // When player wins
  } else if (guess === secretNumber) {
    // 3º escenario -- > se ejecuta si el número ingresado es igual al número secreto  y el usuario acierta al número.
    //document.querySelector('.message').textContent = '🎉 Correct Number!';
    displayMessage('🎉 Correct Number!'); // forma abreviada de escribir el código de la línea anterior, usando una función.
    document.querySelector('.number').textContent = secretNumber; //hacemos que el número secreto se muestre en el <div> 'number'.

    //Acá modificamos algunos stilos del CSS: IMPORTANTE usar siempre ".style" y luego especificar la propiedad del CSS que vamos a modificar, usando minúsculas y mayúsculas en caso de que haya dos o más palabras. El valor final, siempre debe ser un string.
    document.querySelector('body').style.backgroundColor = '#60b347'; //cambiamos el color de fondo del elemento 'body', no ponemos un '.' adelante de body, porque en esta oportunidad queremos llamar al elemento y no una clase. Es importante saber que debido a normas de escritura, si tengo más de un nombre en alguna propiedad de un estilo de CSS, que quiera usar en javascript, debo nombrarla usando mayúsculas para las palabras que vienen después de la primera.
    document.querySelector('.number').style.width = '30rem'; //cambiamos el tamaño de la class 'number'. Debemos escribir el número más la unidad como un string, es decir entre comillas, si o si, para que javascript lo tome como válido.

    if (score > highscore) {
      // Si el puntaje actual (score) es mayor al highscore de la partida actual, entonces sucede lo siguiente...
      highscore = score; // Le asignamos a la variable 'highscore' que guarde el dato actual de 'score'.
      document.querySelector('.highScore').textContent = highscore; // Hacemos que la sección '🥇 Highscore' en el html aparece como (class = highScore), muestre el nuevo valor de score que acabamos de guardar en la variable "highscore", siempre y cuando el puntaje actual sea mayor al de la partida anterior, si no es mayor, se queda con el puntaje (score) anterior.
    }

    // When guess wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // esto se ejecuta si el score se mantiene por arriba de 0.
      //document.querySelector('.message').textContent =
      //guess > secretNumber ? '📈 Too High!' : '📉 Too low!';
      displayMessage(guess > secretNumber ? '📈 Too High!' : '📉 Too low!'); // forma abreviada de escribir el código de la línea anterior, usando una función.
      score--; // Esto disminuye el puntaje (score) con cada tirada. es igual a escribir 'score = score - 1;'
      document.querySelector('.score').textContent = score; // imprime el puntaje contabilizado en el elemento 'score'
    } else {
      //este bloque else, ayuda a que todo lo anterior en el bloque if, funcione siempre y cuando el puntaje esté por arriba de cero.
      //Si el puntaje baja y es menor a 0, automáticamente se ejecuta este bloque else.
      //document.querySelector('.message').textContent = '💀 You Lost the game!';
      displayMessage('💀 You Lost the game!'); // forma abreviada de escribir el código de la línea anterior, usando una función.
      document.querySelector('.score').textContent = 0; //imprime '0' en el sector de 'score' en la pantalla, cuando ya no quedan intentos disponibles.
    }
  }
  /* //EL CODIGO QUE SE MUESTRA DE ACA PARA ABAJO ES IGUAL AL BLOQUE ELSE IF ANTERIOR, LO REEMPLAZAMOS PORQUE ERA MUY REPETITIVO Y EL DE ARRIBA ACOPLA BIEN LA FUNCIONALIDAD DE ESTOS ELSE IF DE ABAJO (COMENTADOS)
    // When guess is to high
  } else if (guess > secretNumber) {
    // 2º escenario --> cuando se ingresó un valor muy alto.
    if (score > 1) {
      // esto se ejecuta si el score se mantiene por arriba de 0.
      document.querySelector('.message').textContent = '📈 Too High!';
      score--; // Esto disminuye el puntaje (score) con cada tirada. es igual a escribir 'score = score - 1;'
      document.querySelector('.score').textContent = score; // imprime el puntaje contabilizado en el elemento 'score'
    } else {
      //este bloque else, ayuda a que todo lo anterior en el bloque if, funcione siempre y cuando el puntaje esté por arriba de cero.
      //Si el puntaje baja y es menor a 0, automáticamente se ejecuta este bloque else.
      document.querySelector('.message').textContent = '💀 You Lost the game!';
      document.querySelector('.score').textContent = 0; //imprime '0' en el sector de 'score' en la pantalla, cuando ya no quedan intentos disponibles.
    }

    // When guess is to low
  } else if (guess < secretNumber) {
    // 1º escenario --> cuando se ingresó un valor muy bajo.
    if (score > 1) {
      document.querySelector('.message').textContent = '📉 Too low!';
      score--; //tiene que ver con la sección del score
      document.querySelector('.score').textContent = score; // imprime el puntaje contabilizado en el elemento 'score'
    } else {
      //este bloque else, ayuda a que todo lo anterior en el bloque if, funcione siempre y cuando el puntaje esté por arriba de cero.
      //Si el puntaje baja y es menor a 0, automáticamente se ejecuta este bloque else.
      document.querySelector('.message').textContent = '💀 You Lost the game!';
      document.querySelector('.score').textContent = 0; //imprime '0' en el sector de 'score' en la pantalla, cuando ya no quedan intentos disponibles.
    }
  }
  */
});

// ============= CHALLENGE #1 =========
// Implement a game rest functionality, so that the player can make a new guess! Here is how:
// Tenemos que codificar la funcionalidad de jugar nuevamente al juego.
/*
1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the score and number variables
3. Restore the initial conditions of the message, number, score and guess input field
4. Also restore the original background (#222) and number wigth (15rem)
// Opción A: colocar un "controlador de eventos" para el evento click (hacemos clic y recarga la página)
// Opción B: (en el caso de haber ganado) el Score debe volver a ser 20 y el background volver a ser negro

//Esta es mi resolución del challenge: OJO NO SIRVE, PORQUE NO GUARDARÍA EL PUNTAJE MAS ALTO EN CADA PARTIDA EN EL HIGHSCORE.
document.querySelector('.again').addEventListener('click', _ => {
  location.reload();
});
*/
// Resolución Udemy:
document.querySelector('.again').addEventListener('click', function () {
  //esta es una función anónima, porque no tiene nombre.
  score = 20; //esta es la cantidad de intentos que se tienen.
  secretNumber = Math.trunc(Math.random() * 20) + 1; //reasignamos un número secreto a la variable "let secretNumber"
  //document.querySelector('.message').textContent = 'Start guessing...'; //configuramos para que aparezca este mensaje al comenzar.
  displayMessage('Start guessing...'); // forma abreviada de escribir el código de la línea anterior, usando una función.
  document.querySelector('.score').textContent = score; //la puntuación es de 20 apenas comienza.
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = ''; //el casillero 'guess' se queda vacío nuevamente.
  document.querySelector('body').style.backgroundColor = '#222'; //cambiamos el color de fondo
  document.querySelector('.number').style.width = '15rem'; //cambiamos el tamaño de la caja 'number'
});
