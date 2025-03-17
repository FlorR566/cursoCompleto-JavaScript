'use strict';

/*
const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //Forma vieja de hacerlo (ES5):
  // numPassengers = numPassengers || 1; //si no tiene un valor, asignamos por defecto 1
  // price = price || 199; //si no tiene un valor, asignamos por defecto 199

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123, 2, 800');
createBooking('LH123, 5');

//NOTA: El cálculo de price usando como dato 'numPassengers' solo es posible con variables que se encuentren antes de él. Si están después de price, ya no se tienen en cuenta.
// Esto sucede porque JS especifica estos par´ámetros en los pedidos y a medida que llega.

// Por ejemplo si queremos asignar directamente el valor del precio, no podemos hacerlo así:
createBooking('LH123, 1000'); // dejando vacía la asignación de pasajeros y directamente asignando el precio luego del número de vuelo...  JS ineterpreta que el segundo valor siempre va a ser la cantidad de pasajeros, en este ejemplo se leería que la cantidad de pasajeros asciende a 1000. Y no como nuevo valor de precio como queríamos en un principio.
// Si queremos hacer esto, conviene dejar el parámetro del medio como "undefined" y luego asignar el valor como siempre. Haciéndo esto JS coloca el valor por defecto que le asignamos al número de pasajeros, o sea 1.
*/

/////////////////////////////////////////////////

// HOW TO PASS ARGUMENTS TO FUNCTIONS:
// ¿Cómo convertir argumentos a funciones?
/*
const flight = 'LH234';
const margarita = {
  name: 'Margarita Peperoni',
  passport: 23354657778,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Ms.' + passenger.name;

  if (passenger.passport === 23354657778) {
    alert('Checked in');
  } else {
    alert('Wrong passport!');
  }
};

// checkIn(flight, margarita);
// console.log(flight); // imprime: LH234
// console.log(margarita); // imprime: un objeto --> {name: 'Ms.Margarita Peperoni', passport: 23354657778}

// // Is the same as...
// const flightNum = flight; // NOTA: pasar un tipo primitivo a una función es lo mismo que crear una copia como esta fuera de la función.
// const passenger = margarita; // cuando pasamos un objeto a una función, en realidad es como copiar un objeto como este y todo lo que cambiemos en la copia, tabién cambiará en el original.

// Ahora vemos un ejemplo donde se muestra que puede suceder en los cambios realizados en un objeto, cuando trabajan muchos desarrolladores juntos:

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(margarita);
//Supongamos que ha cambiado mi número de pasaporte antes del buelo.
checkIn(flight, margarita);

// NOTA: JavaScript únicamente pasa por valor, no por referencia.
*/

/////////////////////////////////////////////////

// Funciones de primera clase (First-class citizens):

// las funciones de tratan como cualquier otro valor en el lenguaje (como numeros, strings u objetos) entonces podemos:
// 1) asignar una función a una variable.
// 2) pasar una función como argumento a otra funcion.
// 3) retornar una función desde otra función.
// En resumen las funciones en JS pueden almacenarse, pasarse y devolvers igual que cualquier otro dato, esto lo convierte en un tipo de dato muy flexible y poderoso.
// Las funciones de primera clase son la base que hace posible las funciones de orden superior.

// FUNCIONES DE ORDEN SUPERIOR:
//son funciones que cumplen al menos una de estas condiciones:
// a) reciben una o más funciones como argumento.
// b) devuelven otra función como resultado.

// En conclusión :
// Son cosas diferentes, por más que la mayoría de la gente piense que son lo mismo. Las funciones de primera clase son solo una característica que un lenguaje de programación tiene o no tiene.
// Todo lo que significa es que todas las funciones son valores, no hay funciones de primera clase en la práctica, es solo un concepto. Sin embargo en la práctica si existen funciones de orden superior. Que son posibles porque el lenguaje admite funciones de primera clase.

//Vamos a crear una función que acepte otras funciones como entrada:
/*
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// HIGHER-ORDER FUNCTION:
//Se llaman así porqu basicamente estas funciones operan en un nivel más alto de abstracción.

const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
// NOTA: solo pasamos el valor de la función, no hacemos la llamada

transformer('JavaScript is the best!', oneWord);
*/

// // JS USES CALLBACKS ALL THE TIME:

// const high5 = function () {
//   console.log('👋🏻');
// };
// document.body.addEventListener('click', high5);

// ['Jonas', 'Martha', 'Adam'].forEach(high5);

// Los callback son muy utilizados en JS porque facilitan la partición dle código en partes más reutilizables e interconectadas.
// Otra de las ventajas es que nos permite crear abstracciones, es decir poder ocultar los detalles de alguna implementación de código y que no nos importan todos esos detalles.
/*
const emojiWord = function (str) {
  return str.replaceAll(' ', '🌸').toUpperCase().slice(0, -5);
};

const emojiTwo = function (str) {
  const [first, second, ...others] = str.split(' ');
  return [...others.replaceAll('o', '🫠'), first.replaceAll('o', '🫠')].join(' ');
};

const wordTransform = function (str, fn) {
  console.log(`original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`transformed by: ${fn.name}`);
};

wordTransform('Mogul is the most powerfull candy in the world!!!!!', emojiTwo);
*/

/////////////////////////////////////////////////

// Ahora vamos a crear una función que nos devuelva otra función:

// const greeT = function (greetinG) {
//   return function (namE) {
//     console.log(`${greetinG} ${namE}`);
//   };
// };

// const greeterHey = greeT (`Hey`);
// greeterHey('Jonas');
// greeterHey('Steven');

// greeT('Hello')('Jonas');

//Utilizar funciones que devuelven otras funciones es extremadamente importante, más que nada en programación funcional.

//Ahora escribimos el mismo ejemplo de arriba pero con arrow function (una arrow function devolviendo otra arrow function)
// const greet = greeting => name => console.log(`${greeting} ${name}`);

// greet('Hola!!')('Sol =)');

/////////////////////////////////////////////////

/*
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book : function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode} ${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtman');
lufthansa.book(635, 'Nico LunaLima');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; //almacenamos en una nueva variable 'book', la función que está dentro de lufthansa que también se llama book.

// Esto no funciona -->
//book(23, 'Sarah Williams');

// Esta es la forma correcta para que funcione:
// Call, apply and enlace:
// tres métodos para decirle a JS como debe funcionar 'this' en la función

// CALL method:
book.call(eurowings, 23, 'Sarah williams');
console.log(eurowings);
//En el método "call" el primer argumento es la palabra clave "this" al que queremos apuntar

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 582, 'Mary Cooper');
console.log(swiss);

// APPLY method:
// hace casi lo mismo que call
// Actualmente en el JS moderno ya no se usa este método
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

// Ahora la forma moderna es la siguiente:
book.call(swiss, ...flightData);

// BIND method:
// al igual que el método call, bind nos permite establecer manualmente estas palabras clave
// book.call(eurowings, 23, 'Sarah Williams');

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Dana Fernadez');
bookEW23('Aldana Rufino');

// Con Event Listeners:
lufthansa.planes = 300;
//Ahora con la función de abajo queremos agregar un nuevo avión que compramos cada vez que hacemos clik en 'Buy new plane'
lufthansa.buyPlane = function () {
  console.log(this.planes);

  this.planes++;
  console.log(this.planes);
};
//lufthansa.buyPlane();

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
//addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

//Ejercicio: hacemos una función que devuelva otra función con el ejemplo de arriba.
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT1 = addTaxRate(0.23);

console.log(addVAT1(100));
console.log(addVAT1(23));
*/

/////////////////////////////////////////////////
// Challenge #1
/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

/*
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // Get Answer punto 1:
    const outputPrompt = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(outputPrompt);

    // Registrer Answer - Punto 1.2 - REGISTRO DE PUNTOS
    typeof outputPrompt === 'number' &&
      outputPrompt < this.answers.length &&
      this.answers[outputPrompt]++;

    this.displayResults(); // llamamos a la función de abajo para que se ejecute
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      // Poll results are 13, 2, 4, 1
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string'); // en este caso usamos Call porque queremos llamar a otro this, de un objeto diferente. Por eso usamos call para llamar a la función displayResults pero con un objeto distinto, el que especificamos dentro de los { }
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
*/

/////////////////////////////////////////////////

// INMEDIATELY INVOKED FUNCTION EXPRESSION (IIFE):

/* algunas veces en JS necesitamos funciones que se ejecuten una sola vez, y luego nunca más. Básicamente una función que desaparece justo después de que se llama una vez. 

Queremos ejecutar una función y no tener que guardarla en ninguna parte. 
Así es como lo hacemos: 
creamos una función sin asignarla a ninguna variable. 
Esto al principio nos va a tirar un error, pero podemos engañar a JS y hacerle pensar que toda la declaración es una expresión, encerrando la función entre paréntesis (function () {}). 
Después llamamos a la función colocando inmediatamente después de la expresión --> (); 
*/

/*

(function () {
  console.log(`This will never run again`);
})();

// También podemos hacer IIFE para las arrow functions:
(() => console.log(`This will ALSO never run again`))();
*/

/* 
Ya sabemos que la cadena de alcance solo funciona desde el alcance interno a cualquier cosa definida afuera en el global escope, no al revez. Es decir algo definido en el global escope no tiene alcance a nada que esté dentro de un alcance interno. 

Decimos que todos los datos en un alcance interno son privados, también se dice que están encapsulados dentro del escope interno por ejemplo de la función donde se colocó. 

Muchas veces necesitamos proteger nuestras vriables para que no sean sobreescritas accodentalmente por otras partes del programa o incluso por scripts o bibliotecas externas. 

Es por esto que se crearon las IIFE, para ayudar a proteger variables. Pero en ES6 sacaron herramientas que ayudar a esto, por ejemplo las variables 'let' y 'const' tienen alcance de bloque. Todo lo declarado de esta forma en un alcance interno, no puede ser accedido desde fuera de el. 
En cambio con las variables 'var' ocurre lo contratio, siempre se puede acceder a ella, por más que esten guardadas en un alcance interno, y las estemos llamando desde un alcance externo (esta no es una buena practica en JS)
*/

/////////////////////////////////////////////////

// Closures:
// Los closures se producen automáticamente en ciertas situaciones, no se crean manualmente como un array por ejemplo.
//

// const secureBooking = function () {
//   let passengerCount = 0;

//   return function () {
//     passengerCount++;
//     console.log(`${passengerCount} passengers`);
//   };
// };

// const booker = secureBooking();

/* Ecplicación de como funciona el código de arriba: 

Antes de empezar a ejecutar la función de reserva en la parte de abajo con la variable 'booker', el código se está ejecutando en el contexto de ejecucuón global. 
Y por el momento ahí solo tenemos esta función 'secureBooking', podemos decir que el contexto global contiene ahora a 'secureBooking'. 
Luego cuando se ejecuta realmente 'secureBooking' se coloca en un nuevo contexto de ejecución en la parte superior de la Call Stack (pila de ejecución). Recordemos que cada contexto de ejecución tiene un entorno variable que contiene todas sus variables locales. En este caso solo tiene la variable 'passengerCount' con valor 0. 
Este entorno variable, es también el ambito de esta función y así la cadena de alcance de este contexto se ve algo así: 
El recuento de pasajeros --> 'secureBooking' está en el ambito local, pero por supuesto este ambito también tiene acceso a todas las variables de los ambitos de los padres y en este caso solo un ambito global. 

De todos modos en la siguiente linea de la función de reserva, una nueva función es devuelta y se almacenará en la variable 'booker'. Así que el contexto global ahora también contiene la variable booker. 

Entonces: ¿qué más ocurre cuando vuelve la función de 'secureBooking'?
Lo que sucede es que su contexto de ejecución sale de la pila de call stack y desaparece. Es decir 'secureBooking' realizó su trabajo y ha finalizado su ejecución. 
*/

// booker();
// booker();
// booker();

// Acá nos estamos preguntando como es posible que 'booker' acceda a una función que ya se ejecutó y finalizó, bueno para esto existen los 'closures'.
/* Podemos decir que un Closure hace que una función recuerde todas las variables que existían en el lugar de nacimiento de la función esencialmente. 

Si un objeto es alcanzable por un  closure, no permanecerá en el recolector de basura, en cambio se quedará en el (Heap) montón indefinidamente. 

En resúmen la variable 'passegerCount' sigue existiendo porque es accesible mediante un ciere. En este caso el motor movió el entorno variable a la pila donde pueda permanecer para siempre, porque es alcanzable por un 'closure' y por lo tanto no puede ser recolectado. 
*/

// IMPORTANTE: cualquier función siempre tiene acceso al entorno variable del contexto de ejecución en el que se creó la función. En el caso del 'booker' esta función fue creada, por lo que nació en el contexto de ejecución de secure booking que sacamos de la pila previamente. Por lo tanto la función 'booker' tendrá acceso a este entorno variable que contiene la variable de 'passengerCount'. Así es como el booker podrá leer y manipular la variable 'passengerCount'. Esta conexción es la que llamamos closure.

/* RECAPITULANDO PARA QUE QUEDE CLARO:
Una función siempre tiene acceso al entorno variable del contexto de ejecución en el que fue creada, incluso después de que ese contexto de ejecución haya desaparecido. El 'Closure' es entonces básicamente este entorno variable adjunta a la función exactamente como lo fue en el momento y lugar en que se creó la función.  

La función booker tiene acceso a la variable 'passengerCount' porque está definida en el ámbito en el la función 'booker' fue creada, así que en cierto sentido la cadena de ámbito se conserva a través del cierre, incluso cuando un ámbito ya haya sido destruido, porque su contexto de ejecución se ha ido. 
Esto significa que aunque el contexto de ejecución haya sido destruido, el entorno varuable sigue viviendo en algún lugar del motor. 

*/

// Podemos mirar las variables de los closures de la siguiente manera:

// console.dir(booker);

// siempre que veamos dobles corchetes en alguna palabra de la consola, quiere decir que es una propiedad o algo a lo que no podemos acceder.

///////////////////////////////////////////////

// Más ejemplos de CLOSURES:
/*
// Example 1:
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Se reasigna la función 'f'
h();
f();
console.dir(f);
// Cuando reasignamos la función a un nuevo valor ese cierre anterior desaparece (es decir que la 'const a' esté asociada a la función 'f' en su closure. Ahora el nuevo closure es la 'const b' del lugar de nacimiento donde fue reasignada.

// NOTA: En el ejemplo de arriba, primero nació en la constante ‘g’ y luego renació de nuevo en la constante ‘h’. Así primero el closure contenía la variable ‘a’ de su primer lugar de nacimiento y luego cuando renació para seguir con nuestra analogía, recordó esta variable ‘b’ de su segundo lugar de nacimiento.

// Esto es lo más sorprendente de Closure, como puede ir cambiando a medida que se reasigna la variable. Entonces es cierto que un cierre siempre asegura que una función no pierda la conexción con las variables que están presentes en su lugar de nacimiento. Siempre los recordará.

// Example 2:

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`); //la 'n' que usamos acá es el parámetro de la función
    console.log(`There are three groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

// const perGroup = 1000; // El Closure siempre tiene prioridad incluso al scope chain. Si dejáramos esta variable usable, el closure seguiría usando la variable 'perGroup' del 'boardPassengers'.
boardPassengers(180, 3);
// Entonces inmediatamente cuando llamemos a la función 'boardPassengers' se creará la variable 'perGroup', luego llamará al tiempo de espera establecido (setTimeout) y registrará esta función de devolución de llamada aquí y luego se llamará (ejecutará la función) después de tres segundos. Pero de inmediato también el 'console.log' se llamará. El 'console.log' no va a esperar los 3 segundos.

// La única formade que la función de devolución de llamada del 'setTimeout' pueda tener acceso a las variables que están definidas en la función de 'boardPassengers' ex que tiene una jecución finalizada hace mucho tiempo y se creó un closure. Así es como tenemos acceso a 'perGroup' y al agumento de la función 'n'
*/

//
// *** TIMERS: son temporizadores que llevan dentro funciones que se ejecutan en el tiempo que le indicamos, en el ejemplo de abajo se ejecuta apenas pasen 1000 milisegundos. Es decir, después de 1 segundo, la función se ejecuta y se imprime en la consola 'Timer - Hola sol!!!'
// Esto es escensialmente una call back function:

// setTimeout(function () {
//   console.log('Timer - Hola sol!!');
// }, 1000);

///////////////////////////////////////////////

// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    const newColor = (header.style.color = 'blue');
  });
})();

// Otra opción que imprime en qué parte hicimos clic:

// (function () {
//   const header = document.querySelector('h1');
//   header.style.color = 'red';

//   document.querySelector('body').addEventListener('click', function (event) {
//     const newColor = (header.style.color = 'blue');
//     console.log('Se hizo clic en: ', event.target);
//   });
// })();

/*
El cambio de color se da por varias razones, primero la función IIFE cambia el h1 a rojo, después el eventListener lo cambia a azul, esto sucede porque colocamos el listener dentro de la función anónima IIFE (función de invocación inmediata) permitiendo que el listener llegue al scope del const = header para usarlo. Como las variables const tienen alcance de bloque, si tenemos una función con listener por fuera de ese scope (por ejemplo en el scope global) y el const dentro de una función, el listener no lo va a poder leer a no ser que esté declarada en el ámbito global. 

Header está declarada en el scope del IIFE y addEventListener puede acceder a ella porque en JS las funciones recuerdan el scope en el que fueron creadas, esto se llama closure. 
*/

/* Explicación de Jonas: 
En este ejmplo particular, el closure es necesario porque para cuando se ejecuta la callback, el IIFE ya se ha ejecutado, y con él la variable 'header' desaparece. 
Pero como la función del callback (event Listener) está asociada al elemento body entonces está esperando que suceda algún evento ahí. Y cuando suceda ese evento, la función de eventListener se ejecutará. 
A pesar de que el entorno en el que se creó esta función (event Listener), ya desapareció, todavía puede acceder a las variables que se crearon en esa variable en el momento en el que nació la función. La variable 'header' está en la mochila de la función 'event Listener'. 
*/
