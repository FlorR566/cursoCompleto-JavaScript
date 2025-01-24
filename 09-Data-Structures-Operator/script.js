'use strict';

const weekdays = ['mon', 'tue', 'wed ', 'thu', 'fri', 'sat', 'sun'];

const openinHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literals
  openinHours, //esto agrega la propiedad "openinHours" al objeto restaurant.
  // openinHours ya es un objeto, pero está por fuera de restaurant

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    //desestructuramos el objeto "orderDelivery"
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    ); //obtenemos la cadena completa en función de los argumentos que colocamos en el objeto que armamos abajo "orderDelivery"
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta whit ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  },
};

//////////////////////////////////
// String Methods Practice
// Ejercicio práctica: tenemos el siguiente string con todos los elementos juntos (unidos) por decirlo de alguna manera y lo que vamos a hacer es dejarlo ordenado como se ve en el ejemplo:

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Ejemplo de como debería quedar:
// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = str => str.slice(0, 3).toUpperCase(); //es una refactorización que se usa en el loop for de abajo, lo que hace es: mantener los valores que están desde el index 0 hasta el index 3 y el resto lo corta/elimina, y convierte en mayúsculas las letras que quedaron, por último lo guarda en la variable 'getCode'

for (const vuelo of flights.split('+')) {
  const [type, from, to, time] = vuelo.split(';'); //Ahora vamos a extraer la información desde el strig principal y guardar los elementos que ya venían con una separación de ';'
  const output = `${type.startsWith('_Delayed') ? '🔴' : ' '}${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ':',
    'h'
  )})`.padStart(45);

  console.log(output);
}

// .padStart sirve para dejar el espacio en blanco de adelante y logramos que todas las lineas terminen a la misma columna porque el largo total del string más largo es de 43 posiciones, y marcamos que todas tengan 45 posiciones.

//////////////////////////////////
// CHALLENGE #4
/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/
/*
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value; // imprime texto con clik
  const lowerText = text.toLowerCase(); // guarda texto en minúscula
  const rows = lowerText.split('\n'); //guarda c/fila en una posición del array, los separó usando \n (new line)

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.trim().split('_');
    const result = first + second[0].toUpperCase() + second.slice(1);
    console.log(`${result.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});
*/

//////////////////////////////////
/*
// SPLIT and JOIN:
// split --> permite dividir un String en múltiples partes y convertitlo en un array
console.log('a+very+nice+string'.split('+')); // imprime: (4) ['a', 'very', 'nice', 'string']
// lo que sucede arriba es que split divide el string en los lugares donde tiene el signo '+' y coloca cada elemento resultante de la division en un array

console.log('Florencia Rodriguez'.split(' '));

const [firstName, lastName] = 'Florencia Rodriguez'.split(' ');

// Join --> unir, permite juntar strings y especificar qué queremos dejar entre cada elemento del string
const newName = ['Ms.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName); // tenemos un string completo, compuesto por tres partes unidas por el espacio en blanco que especificamos al usar join(' ')
// Se podría haber usado cualquier cosa, por ejemplo join('----') o join('**') o join('-')

// Loop-For y array con Join y Split - función que capitaliza las primeras letras de los nombres
// para comenzar con la capitalización de la primera letra en los nombres, lo primero sería colocar cada palabra dentro de un array para luego poder recorrer cada palabra con un loop-for y comenzar a capitalizarla una por una.

const capitalizeName = function (name) {
  const names = name.split(' ');
  console.log(names);
  const namesUpper = [];

  for (const nN of names) {
    // acá vamos a recorrer cada elemento del string 'names'
    // Forma Nª 1 de hacerlo:
    // namesUpper.push(nN[0].toUpperCase() + nN.slice(1));
    // Forma Nª 2:
    namesUpper.push(nN.replace(nN[0], nN[0].toUpperCase()));
    //reemplazamos en cada elemento del array la posición [0] por la misma posición pero en UPPERCASE  y lo pusheamos a la variable 'namesUpper' (guardamos el cambio)
  }
  console.log(namesUpper.join(' ')); //juntamos cada elemento del array con join para que nos quede un string completo con todos los elementos separado en este caso por espacio
};

capitalizeName('florencia peperica rodriguez'); //imprime: Florencia Peperica Rodriguez
capitalizeName('susanita perez');
capitalizeName('luna nico lima');

// padStart y padEnd (Padding)
const message = 'Go to gate 23!';
console.log(message.padStart(23, '+')); // imprime: +++++++++++Go to gate 23!  (NOTA: la longitud de toda la cadena string debería ser de 23 posiciones)

console.log('Jonas'.padStart(25, '+').padEnd(35, '+')); // el largo total va a ser de 35 caracteres, por lo que padEnd va a agregar 10 signos positivos para llegar a los 35, porque ya al inicio especificamos que el string tenga 25 de largo en padStart
// imprime: ++++++++++++++++++++Jonas++++++++++ (largo total del string 35)

console.log('¡¡¡Feliz 2025!!!'.padStart(28, '🌠 ').padEnd(43, '☺️ 🍀'));

// EJEMPLO DEL MUNDO REAL:
// cuando vemos una tarjeta en internet, por lo general vemos solo los últimos 4 números y los restantes suelen estar marcados con * * * * (esta acción se puede conocer como enmascaramiento)

// Enmascaramiento de números:
// Vamos a hacer una función que enmascare ciertos números con *
const maskCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(4557684657784545)); // imrprime: ************4545
console.log(maskCreditCard(45576587)); // imrprime: ****6587
console.log(maskCreditCard('29djfjki34i9393293294dfki343n2n3')); // imrprime: ****************************n2n3

// Repeat
// permite repetir la misma cadena múltiples veces.

const message2 = 'Bad weather... All Departues Delayed...';
console.log(message2.repeat(5)); // imprime un string largo repitiendo la misma frase 5 veces

// Ejemplo para usar 'repeat'
// supongamos que queremos imprimir una leyenda que indique la cantidad de vuelos en linea y a su vez coloque la cantidad de emojis según la cantidad de vuelos
const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈️ '.repeat(n)}`);
};

planesInLine(5);
planesInLine(3);
planesInLine(12);

*/

//////////////////////////////////
/*
// Trabajando con Strings:

const airline = 'TAP Air Portugal';

// toLowerCase: convertimos todo el string en minúsculas
console.log(airline.toLowerCase()); // imprime: tap air portugal

// toUpperCase: convertimos todo el string en mayúsculas
console.log(airline.toUpperCase()); // imprime: TAP AIR PORTUGAL

// Arreglando mayúsculas en nombres:
const passenger = 'fLorEncIA';
console.log(passenger); // imrpime: fLorEncIA

const passengerLower = passenger.toLowerCase();
console.log(passengerLower); // imprime: florencia

const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect); // imprime: Florencia

// Comparación de emails: Ahora vamos a comprobar si un mail esta bien ingresado:
const email = 'hello@jonas.io'; // así es como quisiéramos que esté
const loginEmail = '  Hello@jonas.io  \n'; //así es como ingresaron el email

const lowerEmail = loginEmail.toLowerCase();
console.log(lowerEmail);

// Trim : solo para recortar espacios en blanco de adelante y atrás del string
const trimmedEmail = lowerEmail.trim(); //recortamos los espacios en blanco
console.log(trimmedEmail);

// Ahora vamos a hacer todo de un solo paso más rápido:
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail); // imprime: hello@jonas.io

// Creamos una función que evalúa si está bien normalizado el mail (lo escribieron correctamente)
console.log(email === normalizedEmail); // true (si), false (no)

// Reemplazos (replacing) caracteres, "." y ","
const priceGB = '288,97￡';
const priceUS = priceGB.replace('￡', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23, Boarding door 23!';

// replace y replaceAll --> diferencias:
console.log(announcement.replace('door', 'gate')); //solo reemplaza la primera aparición de la palabra 'door' por gate
console.log(announcement.replaceAll('door', 'gate')); //reemplaza a todas las palabras door por gate

// Expresiones regulares: / /g
// "/ /g" --> se suele utilizar esta bandera (expresión regular) cuando queremos especificar que algo debe ser global. En el ejemplo de abajo, door se busca en todos lados, globalmente.
// NOTA: es importante sacarle las comillas.

console.log(announcement.replaceAll(/door/g, 'ESTRELLA'));
// Se puede usar como reemplazo de replaceAll.
// También es sensible a mayúsculas y minúsculas como todos los otros métodos que ya vimos en Strings.

// Booleans:
// hay tres métodos simples al trabajar con strings que devuelven boleanos.
const plane = 'A320neo';
// incudes (): imprime true si lo que especificamos ('A320') está incluido en el string "plane"
console.log(plane.includes('A320')); // true
console.log(plane.includes('Boeing')); //false
// startWith():
console.log(plane.includes('A3')); // true
console.log(plane.includes('Tin')); // false
// endsWith():
if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the NEW Airbus family');
} // no imprime nadanada porque no esta escrito 'Airbus' en el string "plane"

// Ejercicio Práctico - booleans en strings
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};
// Es un estándar que primero coloquemos toda la frase en minúsculas si vamos a querer comparar algo. Como primer paso, hacemos esto.
// NOTA: En las llamadas a la función de abajo, colocamos las palabras a detectar con mayúsculas, si no colocamos primero toda la frase en minúsculas, no se va a detectar la palabra que buscamos a no ser que la coloquemos también en mayúsculas, pero es más engorroso.

checkBaggage('I have a laptop, some Food anf pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for prottection');
*/

//////////////////////////////////

/*
// STRINGS trabajando con algunos comandos:

const airline = 'Aerolineas Argentinas';
const plane = 'A320';

// Al igual que un array, podemos obtener los valores para cada posición de index en los Strings
console.log(plane[0]); // imprime: A
console.log(plane[1]); // imprime: 3
console.log(plane[2]); // imprime: 2
console.log('B737'[0]); // imprime: B

// Length : También podemos saber el largo del String llamando a la variable donde está alojada o directamente colocando el string en el momento
console.log(airline.length); // imprime: 21
console.log('B737'.length); // imprime: 4

// IndexOf : También como en los métodos del array, podemos saber por ejemplo la posición de algo.
console.log(airline.indexOf('r')); // imprime: 2 (donde está ubicada la "r")

// LastIndexOf : nos ayuda a obtener cual es la ultima posición del valor que especificamos
console.log(airline.lastIndexOf('r')); //imprime: 12

// También podemos buscar palabras completas con "indexOf" NOTA: es sensible a mayúsculas y minúsculas al buscar
console.log(airline.indexOf('Argentinas')); // imprime: 11

// Método Slice:
// Sirve para cortar partes del string, pero para ello es conveniente saber el indice del lugar donde queremos cortar, por eso deberíamos usarlo en conjunto con indexOf o similares
// Este método no muta la cadena, no la modifica en realidad, porque es imposible mutar strings, porque son valores primitivos. Para almacenar el nuevo string deberiamos almacenarlo en una variable o estructura de datos.
console.log(airline.slice(4)); // NOTA: 4 es la posición donde comenzará la extracción.
// imprime: lineas Argentinas (este código cortó 'Aero')

//También podemos especificar el final del corte:
console.log(airline.slice(4, 14)); // imprime: lineas Arg
//NOTA: siempre la diferencia entre ambos números da el largo total del string resultante. En este caso 14 - 4 = 10, el string 'lineas Arg' tiene 10 posiciones, partiendo de la posición 1.

// Slice sin conocer los índices del string:
// Ahora intentamos extraer la primera palabra, sin conocer los índices del string:
// Especificamos inicio (0) y fin (' ') del corte:
console.log(airline.slice(0, airline.indexOf(' '))); //imprime: Aerolineas

// Especificamos inicio (' ') + 1 y no hace falta especificar el fin en este caso:
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // imprime: Argentinas
// Arriba epecificamos que queremos cortar desde el espacio hacia adelante, y le sumamos 1 para que nos cuente desde la posición después del espacio

// Slice usando valores negativos:
console.log(airline.slice(-3)); // imprime: nas
// NOTA: con los números negativos es como si empezaran a contarse desde el lado derecho del string
console.log(airline.slice(1, -1)); // imprime: erolineas Argentinas (cortó la primera A)

// Example:
// queremos armar una función que verifique si el asiento que ingresamos en 'checkMiddleSeat' es un asiento del medio (los asientos del medio contienen las letras B y E)
const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1); // obtenemos el ultimo elemento del string ingresado en el parámetro 'seat' y lo guardamos en la variable 's'
  if (s === 'B' || s === 'E') {
    console.log('Te tocó el asiento del medio 🫠');
  } else {
    console.log('Tuviste suerte 😎');
  }
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// Boxing (para poder usar métodos en Strings):
console.log(new String('jonas')); // imprime: String {'jonas'}
console.log(typeof new String('jonas')); // imprime: Object (estamos viendo el tipo de valor que es el String en este caso)
console.log(typeof new String('jonas').slice(1)); // imprime: String (en este caso por más que trabajemos con un método en el objeto string, nos devuelve como resultado un string)
*/

//////////////////////////////////

// Challenge #3
/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

/*
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1 -
//Forma larga de llegar:
// const arrEvents = [...gameEvents.values()];
// console.log(arrEvents);

// const eventSSS = [...new Set(arrEvents)];
// console.log(eventSSS);

// 1 - Forma corta de llegar:
const events = [...new Set(gameEvents.values())]; // colocamos el spread (...) para convertir el Set en array
console.log(events);

// 2 -
gameEvents.delete(64);
console.log(gameEvents);

// 3 -
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
); // obtenemos el promedio y sabemos cada cuantos minutos pasó cada evento, tomando como base que el partido dura 90 min
const time = [...gameEvents.keys()].pop();
console.log(time);
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
); // obtenemos el promedio y sabemos cada cuantos minutos pasó cada evento, tomando como base que el partido dura 92 min

// 4 -
// Mi forma de hacerlo:
for (const [min, event] of gameEvents) {
  if (min <= 45) {
    console.log(`[PRIMERA MITAD] ${min}: ${event}`);
  } else {
    console.log(`[SEGUNDA MITAD] ${min}: ${event}`);
  }
}

// Otra forma más RAPIDa de hacerlo con operadores ternarios:
for (const [min, event] of gameEvents) {
  const half = min <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${min}: ${event}`);
}
*/

//////////////////////////////////

/*
// Maps Iterations

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);

// Convertir objetos a mapas:
//Hay una forma facil de convertir objetos a mapas

console.log(Object.entries(openinHours));

const hoursMap = new Map(Object.entries(openinHours));
console.log(hoursMap); //imprime: el objeto 'openinHours' como un mapa, ahora se llama 'hoursMap'

// Loop-for en Mapas:
// Ahora lo que vamos a hacer es imprimir las opciones de 'question'
// Y como solo queremos que se impriman los valores que tienen como key un número (es decir los tres primeros)
console.log(question.get('question')); // imrpime: What is the best programming language in the world?

for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

//const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);

console.log(question.get(question.get('correct') === answer)); // si la respuesta de answer es igual a 'question.get('correct')' o sea '3' es "true", por ende se imprime en la consola el valor de 'question.get(true), o sea "Correct".
// Si el valor de answer fuera otro, daría "false" por ende se imprimiría en la consola "Try again!"

// Convertir el mapa en un array:
console.log([...question]); // imprime un array en cada posición que contiene la key y el valor en cada posición
//console.log(question.entries());
console.log([...question.keys()]); // imprime un array con todas las keys
console.log([...question.values()]); // imprime un array con todos los valores  de cada key
*/

//////////////////////////////////
/* 

// Mapas
// Pueden tener cualquier tipo de valor, como por ejemplo: objetos, arrays u otras cosas

const rest = new Map(); //creamos un mapa

// Set (colocar)
rest.set('name', 'Classico Italiano'); //llenamos el mapa con un nuevo elemento, el primer argumento es el "key name"
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

// Get (obtener)
console.log(rest.get('name')); // imprime: Classico Italiano
console.log(rest.get(true)); // imprime: We are open :D
console.log(rest.get(1)); // imprime: Firenze, Italy

const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); //imprime: We are closed :(

// Has (tiene)
// revisamos si el mata contiene determinada clave, en este caso "categories"
console.log(rest.has('categories')); //imprime: true

// Delete (eliminar)
rest.delete(2);
console.log(rest); // imprime todo el mapa menos, en este caso, la clave 2 (Lisbon, Portugal)

// Uso de arrays y objetos como claves (key) de mapas:
const arr = [1, 2]; // guardamos el array dentro de la variable "arr"
rest.set(arr, 'Prueba'); // guardamos el 'arr' como key dentro del mapa y le asignamos el valor "Prueba"
rest.set(document.querySelector('h1'), 'Heading'); //guardamos el elemento 'h1' del html, como key en el mapa y le asignamos el valor 'Heading'
console.log(rest); // ahora el largo total del mapa es 9 y contiene el array y el elemento que agregamos

// Tamaño (cantidad de elementos que contiene)
console.log(rest.size); // imprime: 9 items

// Clear (eliminar todos los elementos del mapa)
rest.clear(); // eliminamos
console.log(rest); // imprime: Map(0) {size: 0} porque eliminamos todo el contenido
*/

//////////////////////////////////
/*
// ** Nuevas operaciones para hacer más utilizables los conjuntos (SETS) **

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

// Intersección
// Básicamente lo que hace es buscar los puntos de unión entre dos conjuntos de elementos
const commonFoods = italianFoods.intersection(mexicanFoods); // "intersection" devuelve solo los elementos presentes en ambos conjuntos
console.log('Intersection:', commonFoods);
console.log([...commonFoods]); //devuelve la intersección pero en forma de array (ver comentario de abajo)
// imprime: (2) ['tomatoes', 'garlic']

// Union
// Devuelve todos los elementos de AMBOS conjuntos, pero sin duplicarlos
const italianMexicanFusion = italianFoods.union(mexicanFoods);
console.log('Union:', italianMexicanFusion);

// Uso de Spread
// Si queremos hacer lo mismo que la Union, pero de otra forma, usando (...) Spread es posible y colocando los corchetes indicamos que lo devuelva en forma de array
console.log([...new Set([...italianFoods, ...mexicanFoods])]); //imprime: (10) ['pasta', 'gnocchi', 'tomatoes', 'olive oil', 'garlic', 'basil', 'tortillas', 'beans', 'rice', 'avocado']

// Difference
// Devuelve todos los elementos que son UNICOS en el primer conjunto (en este caso "italianFoods") Es decir, elimina aquellos elementos que son comunes en ambos conjuntos (no los devuelve)
// Acá si importa el orden en el que coloquemos ambos conjuntos de elemtos.
const uniqueItalianFoods = italianFoods.difference(mexicanFoods);
console.log('Difference italian:', uniqueItalianFoods); // imprime: Difference italian: Set(4) {'pasta', 'gnocchi', 'olive oil', 'basil'}

// el orden en el que colocamos los conjuntos importa, porque en este caso estamos evaluando los mismos conjuntos pero la devolución va a ser distinta
const uniqueMexicanFoods = mexicanFoods.difference(italianFoods);
console.log('Difference mexican:', uniqueMexicanFoods); // imprime: Difference mexican: Set(4) {'tortillas', 'beans', 'rice', 'avocado'}

// Symmetric Difference
// Acá sucede lo contrario al método de intersección.
// el orden en el que va cada conjunto acá no importa.
const uniqueItalianAndMexicanFoods =
  italianFoods.symmetricDifference(mexicanFoods);
console.log('Symmetric Difference:', uniqueItalianAndMexicanFoods); //imprime: Symmetric Difference: Set(8) {'pasta', 'gnocchi', 'olive oil', 'basil', 'tortillas', … }
// Si miramos bien vemos que en realidad nos devuelve "uniqueItalianFoods" + "uniqueMexicanFoods"

// isDisjointFrom (están desunidos)
// Revisamos si ambos conjuntos son completamente diferentes, o si un conjunto no contiene ningún elemento del otro
console.log(italianFoods.isDisjointFrom(mexicanFoods)); // imprime: false (porque están unidos por algunos elementos que tienen en común)

*/

//////////////////////////////////

/*
// SET (conjuntos)
// colección de valores únicos, esto quiere decir que un sets nunc apuede tener valores duplicados. Esta propiedad es la que los hace útiles en determinadas situaciones.
// Tener en cuenta usar Set cuando queremos trabajar con valores únicos.
// Al igual que las matrices, los Sets también son iterables, aunque siguen siendo completamente diferentes, los sets tienen elementos únicos, y el orden de los elementos es irrelevante.
// En los conjuntos no hay índices -> i[0], como si los hay en los arrays. Por lo tanto no hay forma de extraer un valor. No es necesario extraer (obtener datos de un conjunto). Si se supone que todos los valores son únicos, no necesitamos saber en que posición (indice) del Set está, solo nos alcanza con saber si está o no está en el Set.

const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet); // imprime: set(3) {'Pasta', 'Pizza', 'Risotto'}

// "Size" -> muestra cuántas comidas diferentes va a tener que preparar nuestro chef.
console.log(ordersSet.size); // imprime: 3

// "Has" -> Metodo para confirmar si algo de lo que busco está en el Set, este método es similar al include en arrays
console.log(ordersSet.has('Pizza')); // imprime: true
console.log(ordersSet.has('Bread')); // imprime: false

// "Add" -> agregar nuevos elementos al Set
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');

console.log(ordersSet); // imprime: set(4) {'Pasta', 'Pizza', 'Risotto', 'Garlic Bread'}

// "Delete" -> Eliminar elementos del Set
ordersSet.delete('Risotto');

console.log(ordersSet); // imprime: set(3) {'Pasta', 'Pizza', 'Garlic Bread'}

//NO HAY FORMA DE EXTRAER UN VALOR DE UN CONJUNTO UTILIZANDO SU INDICE, PORQUE NO USA INDICES COMO LOS ARRAYS
// No es necesario extraer (obtener datos de un conjunto). Si se supone que todos los valores son únicos, no necesitamos saber en que posición (indice) del Set está, solo nos alcanza con saber si está o no está en el Set. Para eso usamos el método HAS.

// "Clear" -> eliminar todos los elementos del Set
// ordersSet.clear();
// console.log(ordersSet); // imprime: Set (0) {size: 0}

// "Loop For" en Set -> también es posible utilizar loops en los conjuntos
for (const order of ordersSet) console.log(order);

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// Queremos obtener un array único con los valores de "staff" pero sin los duplicados
// Ahora queremos convertir un Set en un Array, esto es facil de hacer porque ambos son iterables.
// Utilizando el Spread (...) operator
const staffUnique = [...new Set(staff)]; // el spread operator (...) saca todos los elementos iterables del set "staff"y los escribe separados por comas y los guarda en la constante "staffUnique"
console.log(staffUnique); // imprime: (3) ['Waiter', 'Chef', 'Manager']

// Si solo quisiéramos saber cuantas posiciones diferentes hay:
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
); // imprime: 3

// Si quisiera saber cuantas letras diferentes hay en un string
console.log(new Set('florenciaRodriguez').size);
*/

//////////////////////////////////

// CODING CHALLENGE #2
/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// Punto 1:
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

// Punto 2:
const odds = Object.values(game.odds);
let average = 0;
for (const odd of odds) average += odd;
average /= odds.length;
console.log(average);

// Punto 3 - primera opción, no muy eficiente.
// for (const [i, element] of Object.entries(odds)) {
//   if (i === '0') {
//     console.log(`Odd of victory "Bayer Munich": ${element}`);
//   } else if (i === '1') {
//     console.log(`Odd of victory "draw": ${element}`);
//   } else if (i === '2') {
//     console.log(`Odd of victory "Borrussia Dortmund": ${element}`);
//   } else {
//     console.log('Hola Flor');
//   }
// }

// ** Punto 3 ** segunda opción, más eficiente:
for (const [i, element] of Object.entries(game.odds)) {
  const teamStr = i === 'x' ? 'draw' : `victory ${game[i]}`;
  console.log(`Odds of ${teamStr}: ${element}`);
}
// Punto 4 - BONUS:
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
*/
/////////////////////////////////////////////////
/*
// Looping Objects: Object Keys, Values, and Entries

// Property NAMES
const properties = Object.keys(openinHours);
console.log(properties); // imprime: (3) ['thu', 'fri', 'sat']

let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr); // imprime: We are open on 3 days: thu, fri, sat,

// Property VALUES
const values = Object.values(openinHours);
console.log(values); // imprime los valores interiores de cada propiedad del objeto openinHours

// Entire object
const entries = Object.entries(openinHours);
// console.log(entries); // imprime un array con ls key y el valor.
// imprime:
// [
//   ['thu', { open: 12, close: 22 }],
//   ['fri', { open: 11, close: 23 }],
//   ['sat', { open: 0, close: 24 }]
// ]
// Devuelve un array con pares [key, value], es decir, una representación completa del objeto en forma de array.

// [key, value]
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
} //imprime: un mensaje para cada día con su horario
// On thu we open at 12 and close at 22
// On fri we open at 11 and close at 23
// On sat we open at 0 and close at 24
*/

/////////////////////////////////////////////////

// // Opcional Chaining
// if (restaurant.openinHours && restaurant.openinHours.mon)
//   console.log(restaurant.openinHours.mon);

// // WITH opcional chaining
// console.log(restaurant.openinHours.mon?.open);
// console.log(restaurant.openinHours?.mon?.open);

// //Example:
// const days = ['mon', 'tue', 'wed ', 'thu', 'fri', 'sat', 'sun'];

// for (const day of days) {
//   const open = restaurant.openinHours[day]?.open ?? 'closed'; //si queremos usar el nombre de una variable como propiedad en un objeto, debemos colocarla entre corchetes.
//   console.log(`On ${day}, we open at ${open}`);
// }
// // Recorremos el array e imprimimos en la consola si el restaurante está abierto o cerrado cada día. Utilizamos el encadenamiento opcional y el operador de coalescencia nula ??.

// // Ahora vamos a revisar si un metodo existe, antes de ser llamado:
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist'); //imprime: (2) ['Focaccia', 'Pasta']

// console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist'); //imprime: Method does not exist

// // Array : revisar si un array está vacío
// const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
// //const users = [];

// console.log(users[0]?.name ?? 'User array empty'); // imprime: Jonas

// if (users.length > 0) console.log(users[0].name);
// else console.log('user array empty'); // imprime: Jonas

//////////////////////////////////////////////
// /* The for-of Loop */
// /* Sabemos que abajo se usa Spread(...) "espandimos" porque los puntitos están a la derecha del signo ""="*/
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu]; //creamos el array menú, (...)Spread toma los elementos de cada array (starterMenú y mainMenú) y los expande dentro de un nuevo array "menu"
// console.log(menu);

// for (const [index, item] of menu.entries()) {
//   console.log(
//     `En la iteración ${
//       index + 1
//     } guardamos en la variable "item" el elemento: ${item} `
//   );
// } //se imprime cada elemento del array menú uno abajo del otro.
// /* Lo que sucede en eñ bucle For Of es que se toma cada elemento del array menú y se lo guarda en la variable "item", esto sucede en cada iteración. Console.log lo que hace es imprimir ese item que es guardado en cada iteración, por eso aparece 1 abajo del otro.

// /* Otra forma: colocando un item abajo de otro */
// for (const item of menu) console.log(item);

// /* Otra forma: ponemos un item por abajo de otro colocando al inicio el index (la posición dentro del arrray) esto lo podemos hacer porque usamos ".entries" */
// for (const item of menu.entries()) {
//   console.log(item);
// } //al usar ".entries" obtenemos un array iterador

// /* Otra forma: colocando un item abajo de otro y adelante el indice */
// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1}: ${el}`);
// } /* esto imprime:
// 1: Focaccia
// 2: Bruschetta
// 3: Garlic Bread
// 4: Caprese Salad
// 5: Pizza
// 6: Pasta
// 7: Risotto
// */

///////////////////////////////////////////////////////////
// Coding CHALLENGE #1
/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// Punto 1:
// crear dos arrays (variables 'players1' y 'players2') que guarde los jugadores de cada equipo
const [players1, players2] = game.players; //Desestructuración directa

console.log('Equipo 1 "Bayern Munich": ', players1);
console.log('Equipo 2 "Borrussia Dortmund":', players2);

// Punto 2:
// crear una variable gk para el nombre del portero (1er nombre de cada array) y crear una matriz 'fieldPlayer's con los 10 jugadores restantes
const [gk, ...fieldPlayers] = players1;

console.log('Arquero E1:', gk);
console.log('Jugadores E1:', fieldPlayers);

// Punto 3:
// crear un array 'allPlayers' que conteng todos los nombres de ambos equipos.
const allPlayers = [...players1, ...players2];
console.log('Los 22 jugadores son:', allPlayers);

// Punto 4:
// para el equipo 1 (Bayern Munich) crear una matriz 'players1Final' que contenga a los 11 jugadores originales + 'Thiago', 'Coutinho' and 'Perisic'
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

// Punto 5:
// Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

//otra forma de hacerlo:
// const team1 = game.odds.team1;
// const draw = game.odds.x;
// const team2 = game.odds.team2;
//console.log(team1, draw, team2);

// Punto 6:
//Escriba una función ('printGoals') que reciba una cantidad arbitraria de nombres de jugadores (NO una matriz) e imprima cada uno de ellos en la consola, junto con la cantidad de goles que se marcaron en total (cantidad de nombres de jugadores ingresados)
const printGoals = function (...players) {
  console.log(players);
  console.log(`${players.length} : goals were scored`);
};

printGoals(...game.scored);
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');

// Punto 7:
// El equipo con la odd más baja tiene más probabilidades de ganar. Imprima en la consola qué equipo tiene más probabilidades de ganar, SIN usar una declaración if/else o el operador ternario.
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');
*/

///////////////////////////////////////////////////////////////////////////////
/* 
// Logical Assignment Operators 
const rest1 = {
  name: 'Capri',
  //numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};
*/

/* OR assignment operator */
/*
rest1.numGuests = rest1.numGuests || 10; // el primer valor es "20" (truthy) entonces el evaluador se detiene
rest2.numGuests = rest2.numGuests || 10; // el primer valor es undefined, por eso se toma el segundo valor "10"

rest1.numGuests ||= 10;  //es la forma abreviada de escribir el código de arriba: "rest1.numGuests = rest1.numGuests || 10; "
rest2.numGuests ||= 10;  // idem anterior
*/

/* Nullish assignment operator (null or undefined)*/
/*
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;
*/

/* AND assignment operator*/
/*
rest1.owner = rest1.owner && '<ANONYMOUS'; // imrpime: el objeto con propiedad "owner: undefined"
rest2.owner = rest2.owner && '<ANONYMOUS'; // imrpime: el objeto con propiedad "owner: <ANONYMOUS>"

rest1.owner &&= '<ANONYMOUS'; //El objeto se mantiene igual, porue el primer valor evaluado es falso y no está, por ende no cambió nada.
rest2.owner &&= '<ANONYMOUS'; //El objeto cambia una de sus propiedades, el primer valor es truthy y es reemplazado por <ANONYMOUS>
*/

/*
console.log(rest1); // imprime: todo el objeto y la propiedad numGuests: 20
console.log(rest2); // imprime: todo el objeto y la propiedad numGuests: 10
*/

/////////////////////////////

// TODO EJEMPLOS: Operador de coalescencia nula (??)
/*
const nullValue = null;
const emptyText = ' '; // falsy
const someNumber = 42;

const valA = nullValue ?? 'predeterminado para A';
const valB = emptyText ?? 'predeterminado para B';
const valC = someNumber ?? 0;

console.log(valA); // "predeterminado para A"
console.log(valB); // "" (ya que el valor vacío no es null ni undefined)
console.log(valC); // 42
//Siempre se da que si el valor de la constante es verdadera, se imprime ese valor. Si es falsa, en las segundas constantes se analizan si son null o undefined, en caso de que sean, se activa el operador coalescente y por ejemplo en la primer variable se imprime en consola "predeterminado para A"
*/

/* Otro ejemplo mío jeje: */
// const colorTermo = undefined;

// const valorColorTer = colorTermo ?? 'verde';

// console.log(valorColorTer);

///////////////////

// Operador NULLISH COALESCING (??)
/*
//Nullish: null and undefined (NOT 0 or '')
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests); //imprime 10. El operador OR || evlúa expresiones, y devuelve la primera que sea "truthy" si ningún valor es "truthy" devuelve el segundo valor.

const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect); // imprime 0. El operador NULLISH ?? evalúa expresiones y devuelve el primer valor que NO sea "null" o "undefined". *** Este operador no considera falsy otros valores como "0" o " ".
*/

//////////////////////////////////////////////////////////

// TODO Short Circuiting (&& and ||)
/*
console.log('---- OR ----');
// Use ANY data type, return data type, short-circuiting (cortocircuito)
// SHORT-CIRCUITING cuando usamos un operador OR (||) y se da que el primer valor es truthy, inmediatamente devolverá ese primer valor y el segundo valor operando ni siquiera será evaluado. El segundo valor se imprime cuando el primer valor es falsy.
// Podemos usar el operador OR para establecer valores predeterminados
console.log(3 || 'Jonas'); //imprime: 3
console.log('' || 'Jonas'); //imprime: Jonas
console.log(true || 0); //imprime: true
console.log(undefined || null); //imprime: null
console.log(null || undefined); // imprime: undefined

console.log(undefined || 0 || '' || 'Hello' || 23 || null); //imprime: Hello
console.log(undefined || 0 || '' || false || NaN || null); // imprime: null (en este caso son todos valores falsy)

restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10; // Queremos chequear si existe el numero de invitados, y en caso de no existir se le coloca un valor por deful de 10.
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2); //imprime 10 porque es el primer valor truthy que encuentra, 0 en operadores OR es falsy.

console.log('---- AND ----');
// TODO SHORT-CIRCUITING cuando usamos un operador &&, evalúa espresiones de izquiera a derecha y devuelve el primer valor falsy que encuentre. Si se da que el primer valor es falso, devuelve inmediatamente ese valor falso, sin evaluar al segundo operando. Si se da que el primer valor es verdadero, la evaluación continúa y simplemente se devuelve el primer valor falso que aparezca o el último valor si todos son verdaderos. Entonces si lo pensamos bien, el operador AND (&&) únicamente es verdadero, si todos sus operadores son verdaderos.
// Podemos usar el operador AND para ejecutar código en el segundo operando si el primero es verdadero
console.log(0 && 'Jonas'); //imprime: 0
console.log(7 && 'Jonas'); //imprime: Jonas

console.log('Hello' && 23 && null && 'Jonas'); //imprime: null
console.log('Hello' && 23 && 'rosa' && 'Jonas' && 'mate'); // imprime: mate , porque todos los valores son truthy.

if (restaurant.orderPizza) {
  //primero revisamos si existe "orderPizza" y luego lo ejecutamos
  restaurant.orderPizza('ajo', 'espinaca');
}
// Forma de REEMPLAZAR la SENTENCIA IF usando el operador AND (&&)
restaurant.orderPizza && restaurant.orderPizza('ajo', 'espinaca');
*/

// *** REST (...) PATTERN AND PARAMETERS (operador de descanso y parámetros):
/*
// tiene la misma sintaxis que el Spread operator, pero hace exactamente lo opuesto.

// 1) Destructuring
// SPREAD Sabemos que es esto porque está en el lado derecho del signo igual.
// SPREAD, because on RIGHT side of =
const arr = [1, 2, ...[3, 4]];
console.log(arr); //imprime: [1, 2, 3, 4]

const arrx = [2, 4, 6, 8, ...[4, 4, 4, ...[2, 2, 2, 2, 2, 2]]];
console.log(arrx); //imprime: [2, 4, 6, 8, 4, 4, 4, 2, 2, 2, 2, 2, 2]

// REST, because on LEFT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others); // imprime: 1 2 y el array [3, 4, 5]

// Podemos usar el operador REST (...) en ambos lados del signo igual:

const [pizza, , risotto, ...othersFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
]; //ignoramos a pasta

console.log(pizza, risotto, othersFood); //imprime: Pizza Risotto y el arrray ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']
// La sintaxis REST reopila toda la matriz después de la última variable.
// El REST patron siempre debe ser el último por lo menos en la asignación de desestructuración, porque de lo contrario,cómo sabrá JS hasta cuanto debería recopilar el resto de la matriz. (El REST element debe ser el ULTIMO y solo puede haber UNO por desestructuración)

// Objects
const { sat, ...weekdays } = restaurant.openinHours;
console.log(weekdays); // imprime el objeto weekdays y sus propiedades. Es un nuevo objeto que agrupa todas las propiedades del objeto restaurant.openinHours menos la propiedad "sat", porque la desestructuramos, la quitamos.

// 2) Functions

// const add = function (...numbers) {
//   // El Rest operator toma multiples números o valores y los empaqueta en un array, hace lo opuesto al operador spread.
//   console.log(numbers);
// };

const add = function (...numbers) {
  //suma todos los elementos del array formado mediante el operador REST (...) tomando en cuenta el largo total del array para finalizar la suma
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
}; // Es muy útil para sumas de varios números, donde no se el total de los elementos.
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x); //Llamo a la función add y le digo que trabaje con la constante x, pero primero desestructuramos (rest) el array para que se puedan sumar los numeros internos.

restaurant.orderPizza('hongos', 'ajo', 'tomate', 'albahaca');
restaurant.orderPizza('hongos');

//La sintaxis Spread y Rest son muy similares, pero se usan de manera opuesta dependiento de donde se usen.
// El Spread operator se usa en situaciones donde escribiriamos valores separados por una coma.
// Por otro lado, el Rest operator se usa donde de otra manera escribiríamos nombres de variables separados por comas (y no valores separados por comas).
*/

///////////////////////////////////////////////////////

// SPREAD OPERATOR (...) (operador de ampliación):
/*
//*** FORMA NO PRACTICA DE EXPANDIR EL ARRAY
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

// *** FORMA MAS EFICIENTE...
const newArr = [1, 2, ...arr];
console.log(newArr);
//Con el operador Spread "..." lo que hacemos es sacar individualmente los elementos del array que necesitamos incluir en el array que estamos haciendo, y así se escriben uno a uno en el array nuevo.

// IMPORTANTE!! Podemos usar el operador "..." Spread, siempre que de otra manera escribiríamos múltiples valores separados por comas.

//También podemos usar este método para ampliar o imprimir los valores de por ejemplo un array de manera aislada, como se ve abajo (como si se hubieran escrito individualmente)
console.log(...newArr); // imprime: "1 2 7 8 9" FORMA EFICIENTE
console.log(1, 2, 7, 8, 9); // imprime: lo mismo de arriba "1 2 7 8 9", pero de FORMA NO EFICIENTE

//TODO
const newMenu = [...restaurant.mainMenu, 'Gnocci']; //creamos un nuevo array "newMenu" en base al 'mainMenu' (lo expandimos usando '...'), y le agregamos un elemento nuevo 'Gnocci' al final.
console.log(newMenu); //imprime: 'Pizza', 'Pasta', 'Risotto', 'Gnocci'

// COPY ARRAY
const mainMenuCopy = [...restaurant.mainMenu];

// JOIN TWO ARRAIS OR MORE: (juntar 2 o más arrays)
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// ITERABLES: arrays, strings, maps, sets. NOT objects.
// El operador Spread (...) funciona en todos los llamados "iterales de JS" es decir, arrays, strings, mapas o conjuntos (sets), pero no objetos.
const str = 'Florencia';
const letters = [...str, '', 'R.'];
console.log(letters); // imrpime: ['F', 'l', 'o', 'r', 'e', 'n', 'c', 'i', 'a', '', 'R.']

console.log(...str); // imrpime: F l o r e n c i a

// console.log(${...str}); --> ESTO NO SE PUEDE HACER

// REAL-WORLD EXAMPLE:
const ingredients = [
  // prompt("Let's make pasta! Ingredient 1?"),
  // prompt('Ingredient 2?'),
  // prompt('Ingredient 3?'),
];
console.log(ingredients);

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]); //imprime: ['tomate', 'ajo', 'albahaca']
restaurant.orderPasta(...ingredients); // imprime  lo mismo de arriba, pero el código es más prolijo ['tomate', 'ajo', 'albahaca']

// OBJETOS:
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Giuseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name); // imprime: Ristorante Roma
console.log(restaurant.name); // imprime: Classico Italiano
*/

////////////////////////////////////////////////////////////////

/*
// ======== DESESTRUCTURACION DE OBJETOS ========***
const { name, openinHours, categories } = restaurant; //creamos tres variables, basadas en el objeto restaurant.
console.log(name, openinHours, categories);

const {
  //Renombramos las propiedades del objeto en otras variables
  name: restaurantName,
  openinHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Default values:
// Establecemos valores predeterminados:
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutando variables:
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
console.log(a, b);

// Nested objects: (objetos anidados)
const {
  fri: { open: o, close: c },
} = openinHours;
console.log(o, c); // imprime: "11 23"

// creamos objetos que desestructuramos en la función "orderDelivery" de arriba
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

// ========= DESESTRUCTURACION DE ARRAYS =========
const arr = [2, 3, 4];
const aA = arr[0];
const bB = arr[1];
const cC = arr[2];

const [x, y, z] = arr; //desestructuramos la matriz, x sería el elemento 1, y sería el elemento 2 y z sería el elemento 3 del array. Parece que este parámetro es un array, pero no lo es, sólo está desestructurando.
// Cada vez que JS vea el signo igual del lado izquierdo, sabe que debe realizar la desestructuración, es importante no olvidar también declarar la variable.
console.log(x, y, z);
console.log(arr);

// *** Cómo IMPRIMIR ELEMENTOS de un array:
let [main, , secondary] = restaurant.categories; //pedimos que del array se tomen el primer elemento y el tercero
console.log(main, secondary); //imprime la constante de arriba

// *** SWITCHING VARIABLES (cabiar variables):
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

[main, secondary] = [secondary, main]; //reasignamos a la variable la desestructuración (se invirtieron los logares)
console.log(main, secondary);

// *** RECEIVE 2 RETURN VALUES FROM A FUNCTION:
// ahora imprimimos 2 valores obtenidos desde la función "order"
const [starter, mainCourse] = restaurant.order(2, 0); //restorant es el objeto donde mirar los arrays, order es la función de con la que vamos a sacar los valores
console.log(starter, mainCourse); // imprime la constante stater y mainCourse, según los valores indicados (de starterMenu la posición 2 "Garlic Bread" y de mainMenu la posción 0, "Pizza") entonces console log imprime como resultado: "Garlic Bread Pizza"

// *** NESTED ARRAY (matriz anidada): es decir una matriz anidada (un array dentro de otro)
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j); //imprime: "2 [5,6]
const [i, , [j, k]] = nested;
console.log(i, j, k); // imprime: "2 5 6"
// Lo que hicimos antes es hacer la desestructuración, dentro de la desestructuración.

// DEFAULT VALUES:
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
// imprime: "8 9 1" Lo que hicimos arriba puede ser ùtil cuando queremos obtener datos de una API, por ejemplo en este caso seteamos que todas las letras tengan por default valor = 1. En caso de no tener un valor asignado para el lugar r, por ejemplo, se imprime 1 en ese lugar. La p y la q tienen numeros asignados para imprimir.
*/

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// Ejemplos de ejercicios practicos para afianzar el uso de ".entries()", la desestructuración y el buce "for...of"

// EJERCICIO 1 - Chat GPT
// const fruits = ['Apple', 'Banana', 'Cherry', 'Mango'];

// for (const [index, fruiTTT] of fruits.entries()) {
//   console.log(`Fruit ${index + 1}: ${fruiTTT} `);
// }

// EJERCICIO 2 - Chat GPT
// const team = ['Neuer', 'Pavard', 'Martinez', 'Alaba', 'Davies'];

// for (const [i, playerTeam] of team.entries()) {
//   console.log(`Player ${i + 1}: ${playerTeam}`);
// }

// EJERCICIO 3 - Chat GPT
// const items = ['Book', 'Pen', 'Notebook', 'Eraser', 'Marker'];

// for (const [i, element] of items.entries()) {
//   const indexType = i % 2 === 0 ? '(even index)' : '(odd index)';
//   console.log(`Index ${i} ${indexType}: ${element}`);
// }

// EJERCICIO 4 - Chat GPT
// const scored = ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'];

// for (const [i, player] of scored.entries()) {
//   const indexType = player === 'Lewandowski' ? '(Star Player)' : '';
//   console.log(`Goal ${i + 1}: ${player} ${indexType}`);
// }

// EJERCICIO 5 - Chat GPT
// const scored = [
//   'Lewandowski',
//   'Gnarby',
//   'Lewandowski',
//   'Hummels',
//   'Lewandowski',
// ];

// const appearances = {};

// for (const [i, player] of scored.entries()) {
//   if (appearances[player]) {
//     appearances[player] += 1;
//   } else {
//     appearances[player] = 1;
//   }
//   console.log(`Goal ${i + 1}: ${player} (Appearance ${appearances[player]})`);
// }

// EJERCICIO 6 - Chat GPT
// const tasks = [
//   'Do the dishes',
//   'Take out the trash',
//   'Study JavaScript',
//   'Water the plants',
// ];

// for (const [i, tasK] of tasks.entries()) {
//   console.log(`Task ${i + 1}: ${tasK} ☑️`);
// }

// EJERCICIO 7 - Chat GPT
// const students = ['Ana', 'Luis', 'María', 'Carlos', 'Sofía'];

// for (const [i, studenT] of students.entries()) {
//   console.log(
//     `Student ${i + 1}: ${studenT} - Score: ${Math.floor(Math.random() * 101)}`
//   );
// }

// EJERCICIO 8 - Chat GPT
// const inventory = ['Apples', 'Oranges', 'Bananas', 'Grapes', 'Peaches'];

// for (const [i, fruit] of inventory.entries()) {
//   console.log(`Item ${i + 1}: ${fruit} - Quiantity: ${i + 5}`);
// }

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// Otros ejercicios para afianzar el uso de ".entries()", desestructuración y el buce "for...of"

// EJERCICIO 1 - Chat GPT
// const person = {
//   name: 'Flor',
//   age: 29,
//   profession: 'Developer',
// };

// for (const [index, element] of Object.entries(person)) {
//   console.log(`La clave es "${index}" y el valor es "${element}"`);
// }

// EJERCICIO 2 - Chat GPT
// const book = {
//   title: 'Clean Code',
//   author: 'Robert C. Martin',
//   pages: 464,
//   published: 2008,
// };

// let count = 0; // Contador para las propiedades tipo "string"

// for (const [key, value] of Object.entries(book)) {
//   if (typeof value === 'string') {
//     count += 1; // Incrementa el contador si el valor es un string
//   }
// }
// console.log(`Número total de propiedades tipo "string" : ${count}`);

// EJERCICIO 3 - Chat GPT
// const expenses = {
//   rent: 500,
//   groceries: 200,
//   taxes: 'paid',
//   transport: 100,
//   entertainment: 150,
//   electricity: 'without estimating',
// };

// let totalExpenses = 0;

// for (const [key, value] of Object.entries(expenses)) {
//   if (typeof value === 'number') {
//     totalExpenses += value;
//   }
// }
// console.log(`El costo total es: $${totalExpenses}`);

// EJERCICIO 4 - Chat GPT
// const products = {
//   laptop: 1200,
//   phone: 800,
//   tablet: 400,
//   monitor: 300,
// };

// for (const [key, value] of Object.entries(products)) {
//   if (value > 500) {
//     console.log(`El producto ${key} cuesta: $${value} `);
//   }
// }

// EJERCICIO 5 - Chat GPT
// const userInfo = {
//   username: 'flor_123',
//   email: 'flor@example.com',
//   country: 'Argentina',
// };

// const phrasesSaved = [];

// for (const [key, value] of Object.entries(userInfo)) {
//   const phrase = `La clave "${key}" tiene el valor "${value}"`;
//   phrasesSaved.push(phrase);
// }
// console.table(phrasesSaved); // .table muestra las frases como una tabla en la consola, puede ser útil para depuración o presentación

// EJERCICIO 6 - Chat GPT
// const word = 'javascript';
// // 1. Crear el objeto para contar las repeticiones de cada letra
// let letterCount = {}; // objeto para contar las apariciones de cada letra

// for (const letter of word) {
//   // Si la letra ya existe en el objeto, incrementar su valor, si no, inicializarlo
//   letterCount[letter] = (letterCount[letter] || 0) + 1;
// }
// // 2. Usar Object.entries() para iterar sobre el objeto resultante
// for (const [letter, count] of Object.entries(letterCount)) {
//   // 3. Mostrar un mensaje para cada letra
//   console.log(
//     `La letra "${letter}" aparece ${count} ${count === 1 ? 'vez' : 'veces'}`
//   );
// }

// console.log(letterCount); // si ejecutamos todo el código con word = "javascript" obtendremos: {j: 2, a:1, v:1, a:1, s:1, c:1, r:1, i:1, p:1, t:1}

// EJERCICIO 7 - Chat GPT
// const students = {
//   Alice: 8,
//   Bob: 4,
//   Carol: 6,
//   Daniel: 9,
// };

// // const newArr = [];

// // for (const [key, value] of Object.entries(students)) {
// //   value >= 6 ? newArr.push(key) : '';
// // }

// // console.log(newArr);

// // ** Otra forma **
// const newArr = Object.keys(students).filter(
//   qualificationStudent => students[qualificationStudent] >= 6
// );
// console.log(newArr);
