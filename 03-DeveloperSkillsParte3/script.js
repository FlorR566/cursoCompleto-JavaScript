// Remember, we're gonna use strict mode in all scripts now!
'use strict';

/*
const x = '23';

const calcAge = birthYear => 2024 - birthYear;
console.log(calcAge(1995));
*/

// ========================= TODO ========================
//PROBLEM 1:
//We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."

/* 

// ************
const tempA = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5]; // En el problema 1 solo tenemos este array y se llama 'temperatures'
const tempB = [5, -11, 2, 10, 4, 15, 26, 7]; // Array agregado en el Problema 2
const temperatures = tempA.concat(tempB); // Unimos ambos arrays para resolver lo pedido en el Problema 2

console.log(temperatures); // no hace falta, solo lo usamos para chequear qué valores tiene este array
// 1) Understanding the problem
// - what is temp amplitud? Answer: difference between highest and lowest temp.
// - How to compute the max and min temperatures?
// - What´s a sensor error? and what do do?

// 2) Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in temp array
// - Find min value in temp array
// - Subtract min from max (amplitude) and return it

const calcTempAmplitude = function (temps) {
  let max = temps[0]; // especificamos que el primer valor, es el max
  let min = temps[0]; // especificamos que el primer valor es el mín

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i]; // generamos una variable que almacene los datos, ya que lo usamos varias veces abajo.
    if (typeof curTemp !== 'number') continue; // con esto le decimos al código que si el valor de la variable 'curTemp' es diferente (!==) a 'number', es decir no es un número, entonces debe continuar con la iteración usando el valor que le sigue a ese valor que es distinto a un número. En este ejemplo cuando llegue a 'error' lo pasa por alto y continúa implementando el bucle con el 9.

    if (curTemp > max) max = curTemp; // si el valor que sigue al primer máximo es mayor, ese se tranforma en el nuevo max y si no lo es sigue iterando hasta encontrar un nuevo máximo. El fin de la iteración está marcado por el largo del array (temps.length).
    if (curTemp < min) min = curTemp; // acá sucede la misma lógica, pero al revés, buscando al menor valor para designarlo como min.
  }
  console.log(max, min); //imprime en consola el valor máximo y mínimo que encuentre.
  return max - min;
};
//calcTempAmplitude([3, 7, 4, 1, 8]); //estos son los valores, donde debemos encontrar el máximo.
const amplitude = calcTempAmplitude(temperatures); // creamos la variable 'amplitude' y dentro guardamos el valor de la función 'calcTempAmplitude' que va a tomar los valores del array 'temperatures' para calcular la función. Estos son los valores donde la función va a buscar el max y el min.
console.log(amplitude); // imprime la constante 'amplitude' que contiene el valor de la función 'calcTempAmplitude.

// *** IMPORTANTE: entonces lo que sucede es que, antes de comenzar el bucle, el código entiende que el primer elemento es el max, luego en la siguiente iteración se comienza a revisar si el valor de la posición 1, es mayor al max (3), no es mayor, entonces seguimos recorriendo los valores del array, en la posición 2, tenemos al número (7), es mayor a 3? si. Entonces se convierte en el nuevo max. Esto va sucediendo en cada iteración, se va revisando si el número que sigue es mayor al max actual, y en caso afirmativo (true), ese valor pasa a ser ese el nuevo max y así sucesivamente hasta terminar de iterar. El fin de la iteración en este ejemplo, se da cuando el loop termina de recorrer el array y el largo total se lo indicamos con --> (temps.length).

// ========================= TODO =========================
//PROBLEM 2:
// Function should now receive 2 arrays of temps.

// 1) Understanding the problem
// - Whith 2 arrays, should we implement functionality twice? No! Just merge (fucionar) two arrays

// 2) Breaking up into sub-problems
// - Merge 2 arrays

// ************ MI RESOLUCION (MAS ARRIBA) en la página de Mozilla.org encontré que se pueden concatenar 2 o más arrays --> const array3 = array1.concat(array2);

// RESOLUCIÓN UDEMY:
const calcTempAmplitudeNew = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};

const amplitudeNew = calcTempAmplitudeNew([3, 5, 1], [9, 0, 5]);
console.log(amplitudeNew);

*/

///////////////////////////////////////////////////////////
// ============== DEBUGING ================
// Ejemplo: supongamos que seguimos con nuestro termómetro inteligente, y necesitamos hacer algunas mediciones en una unidad llamada Kelvin.
/*
const measureKelvin = function () {
  const measurement = {
    //creamos un objeto para la medición
    type: 'temp',
    unit: 'celsius',

    // C) FIX the error:
    // value: Number(prompt('Degress celsius:')), //la función prompt siempre devuelve un valor de tipo string, por eso agregamos 'Number' para que nos devuelta un valor de tipo numérico
    value: 10,
  };

  // B) FIND the bug:
  // imrpimimos en la consola el objeto completo para revisar donde podria estar el bug
  console.log(measurement);
  console.table(measurement); //imprime un tabla con las propiedades y el tipo de propiedad, del objeto que hayamos seleccionado.

  //imprimimos en la consola la propiedad 'value' del objeto para revisar si el bug está ahí
  // console.log(measurement.value);
  // console.warn(measurement.value);   --> es una forma de advertir en la consola
  // console.error(measurement.value);   --> es una forma de mostrar un error en la consola

  const Kelvin = measurement.value + 273;
  return Kelvin;
};
// A) IDENTIFY the bug:
console.log(measureKelvin());

////////////////////////
// USING A DEBUGER:
const calcTempAmplitudeBug = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = 0;
  let min = 0;

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
// A) IDENTIFY the bug
console.log(amplitudeBug);
*/

////////////////////////////////////////////////////////////
// ================ TODO CHALLENGE #1 ==================
/* 
Given an array of forecasted maximun temperatures, the termometer displays a string whit these temperatures. 

Example: [17, 21, 23] will print "...17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.
Use the problem.solving framework: Understan the problem and break it un into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]

1) Understanding the problem: 
Mostrar en pantalla un string como este: "...17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."
Imprimir el string primero con el test data 1 y luego con el teest data 2.
Crear una función 'printForecast' que tome los valores del array 'arr'.
¿Qué es el problem.solving framework: ?

2) Breaking up into sub-problems:
Cómo mostrar algo en pantalla? : "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."
Cómo crear una función que tome valores de un array
La función debe tener en cuenta el largo total de elementos del array para saber cuantas veces va a iterar
Tener en cuenta las posiciones de los valores en los arrays
*/

// FORMA Nº1 - imrpime -->>> ...17ºC in 1 day...21ºC in 2 days...23ºC in 3 days

const printForecast = function (t1) {
  let result = '';
  for (let i = 0; i < t1.length; i++) {
    result += `${t1[i]}ºC in ${i + 1} day${i + 1 === 1 ? '' : 's'} ... `; //la última parte evalúa si 'i+1===1' entonces queda 'day', si es distinto, se le agrega la 's' y queda 'days'
  }
  console.log('... ' + result); // print the final string
};
//TEST DATA:
const arrA = [17, 21, 23];
const arrB = [12, 5, -5, 0, 4];

printForecast(arrB);

// FORMA Nº2 - imrpime -->>>  ...17ºC in 1 day, ...21ºC in 2 day, ...23ºC in 3 day

const arrAb = [17, 21, 23];
const arrBa = [12, 5, -5, 0, 4];
const printForecastNew = [];

const forecastA = function (t1) {
  for (let i = 0; i < t1.length; i++) {
    printForecastNew.push(
      `${t1[i]}ºC in ${i + 1} day${i + 1 === 1 ? '' : 's'} ... `
    );
  }
};

const arrayInUseA = forecastA(arrAb);
console.log('... ' + printForecastNew.toString());

// FORMA Nº 3- imrpime un ARRAY -->>> ['...17ºC in 1 days', '...21ºC in 2 days', '...23ºC in 3 days']

const arrAbc = [17, 21, 23];
const arrBcd = [12, 5, -5, 0, 4];
const printForecastA = [];

const forecast = function (t1) {
  for (let i = 0; i < t1.length; i++) {
    printForecastA.push(
      `${t1[i]}ºC in ${t1.indexOf(t1[i]) + 1} day${i + 1 === 1 ? '' : 's'} ... `
    );
  }
};
const arrayInUse = forecast(arrAbc);
console.log('... ' + printForecastA);

// Resolución Udemy
/*
1) Understanding the problem: 
- Array transformed to string, separated by ... 
- what is the X days ? Answer: index + 1

2) Breaking up into sub-problems:
- Transform this array into a string
- Transform each element yo string with ºC
- Strings needs to contain day (index + 1) 
- Add ... between alements and start and end of string 
- Log string to the console
*/

const data1 = [17, 21, 23];
const dat2 = [12, 5, -5, 0, 4];

const printForecastTT = function (arr) {
  let str = '';
  for (let i = 0; i < arr.length; i++) {
    str += `${arr[i]}ºC in ${i + 1} days ... `;
  }
  console.log('... ' + str);
};
printForecastTT(data1);
