/* 
**** Let    --> declara una variable let que puede ser modificada **** tiene alcance de bloque
*** Var     --> declara una variable var que puede ser modificada **** tiene alcance de función 
*** Const   --> declara una constante const que no puede ser modificada **** SE LE DEBE DECLARAR EL VALOR EN EL MISMO MOMENTO EN EL QUE ES DECLARADA
**** Console.log    --> imrpime algo en la consola ****

let js = "amazing";     --> declara una variable llamada js y le asigna el valor de caadena de texto amazing. 
console.log(40+8+23-10);    --> en este caso la función console.log() imprime el resultado de la operación matemática dentro de los paréntesis. Está sumando y restando numeros, para ver en la consola el número 61. 

console.log("Jonas");    --> imrpime "Jonas" en la consola
console.log(23);    --> imrpime 23 en la consola

let firstName= "Matilda"    --> se está declarando una variable llamada firstName y se le asigna el valor "Matilda", la variable puede ser reutilizada después


console.log(firstName);    --> imrpime el valor de la variable firstName que es "Matilda"
console.log(firstName);
console.log(firstName);

let jonas_matilda = "JM";    --> declara la variable jonas_matilda y le da el valor de cadena "JM"
let $function = 27;    --> declara la variable $function con el valor 27, aunque usar $ está permitido, puede ser confuso

let person= "jonas";    --> se declara la variable person, con el valor "jonas"
let PI = 3.1415;    --> se declara la variable PI el valor del número 3.1415

let myFirstJob = "Coder";    --> se declara la variable myFirstJob con el valor "Coder"
let myCurrentJob = "Teacher";    --> se declara la variable myCurrentJob con el valor "Teacher"

let job1 = "programmer";    --> se declara la varibale job1 con el valor "programer"
let job2 = "teacher";    --> se declara la variable job2 con el valor "teacher"

console.log(myFirstJob);    --> imprime el valor de la varibale myFirstJob que en este caso es "Coder"

let javascriptIsFun = true;    --> declara una variable booleana llamada javascriptIsFun y le asigna el valor true, que india una afirmación positiva
console.log(javascriptIsFun);   --> imrpime el valor de la variable javascriptIsFun, (que es true) en la consola

// console.log(typeof true);    --> utiloza el operador typeof que devuelve el dato de lo que esté a su derecha, en este caso es el valor true que es un booleano 
console.log(typeof javascriptIsFun);    --> typeof devuelve que el dato a la derecha es undefined
console.log(typeof 'javascriptIsFun');    --> typeof vevuelve que el dato de la derecha es string (tener en cuenta que tiene comillas)
// console.log(typeof 23);    --> typeof dice que es number
// console.log(typeof 'Jonas');    --> typeof dice que es string
// console.log(typeof null);    --> typeof dice que es un object (esto es un "quirk" de JavaScript, es decir un comportamiento inesperado o peculiar, que puede no ser intuitivo para los desarrolladores) 

javascriptIsFun = 'YES!';    --> asignamos el valor de la cadena de texto 'YES!' a la variable javascriptIsFun, como no estamos usando let, const o var, esta variable se convertirá en global en entornos que lo permitan, como el navegador. Si javascriptIsFun ya estaba definida como una variable en un contexto anterior, se sobreescribirá
console.log(typeof javascriptIsFun);    --> como ahora la variable tiene una caena de texto, si le pedimos typeof devolverá string

let year;   --> declaramos la variable year, pero no le asignamos un valor por lo tanto en la consola se verá undefined
console.log(year);    --> esto imprime el valor de year, que es undefined porque no le asignamos un valor aún, por lo tanto imprime undefined
console.log(typeof year);    --> typeof verica el tipo del valor que nos arrija la variable year, que por el momento nos da undefined, por lo tanto el tipo también es undefined

year = 1991;     --> indicamos un valor para la variable year
console.log(typeof year);    --> imprimimos en la consola el tipo de valor de la variable, en este caso es number

console.log(typeof null);   --> imprime el valor de la variable null, que es object
 

let age = 30;    --> declaramos la variable age, con el valor numbr 30
age = 31;      --> cambiamos el valor de la variable age a 31

const birthYear= 1991;     --> declaramos una constante llamada birthYear, las constantes no pueden ser reasignadas, por lo que si quisiéramos cambiar el valor, nos daría error
// birthYear= 1990;      --> no podria utilizar esto para sustituir la constante anterior, porque no se pueden reasignar las constantes
// const job;      --> declaramos una constante, sin valor, si la descomentamos daria error, porque las constantes deben ser inicializadas al momento de la declaración, SI O SI, ESTO GARANTIZA QUE EL VALOR DE LA CONSTANTE NO SEA CAMBIADO MAS TARDE

var job = 'programmer';    --> declaramos la variable job, con valor 'programer'
job = 'teacher'            --> reasignamos un nuevo valor, 'teacher', a la variable job, podemos reasignar la varibale var sin problemas
 
lastName = 'Schmedtmann';     --> (VARIABLE GLOBAL) asignamos el valor 'Schmedtmann' a lastName. No se declara la variable con var, let o const, así que javascript lo convertirá en una variable global. Puede ser confuzo y no es buena práctica. 
console.log (lastName);        --> imprime el valor de lastName, en este caso sería 'Schmedtmann'


//////////////////////////////////////
//Basic Operators
// Math operators 
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah);

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2 

// Concatenar diferentes palabras usando operadores
const firstName= 'Jonas';
const lastName = 'Schmedtmann';
console.log(firstName + ' ' + lastName);

// Assignment operators / operador de asignación (=) y operador (+)
let x = 10 + 5; // igual a 15 --> operador de signo igual, se ejecuta antes que el operador signo + 
x += 10; // x = x + 10 = 25
x * 4; // x = x * 4 = 100
x ++; // X = x + 1
x --; // x = x - 1 

console.log(x);

// Comparison operators 
console.log(ageJonas > ageSarah); // >, <, >=, >= 
console.log(ageSarah >= 18); 

const isFullAge = ageSarah >= 18;     --> esta linea guarda la comparación ageSarah >=18 en una constante llamada isFullAge. Será true si Sarah tiene 18 o más años, y falsa si no

console.log(now - 1991 > now - 2018);

//operación de comparación usando resta
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);    --> compara si la edad de Jonas es es mayor que la de Sarah


let x, y; 
x = y = 25 - 10 -  5; // x = y = 10, x = 10
console.log(x, y);

const averaAge= (ageJonas + ageSarah) / 2
console.log (ageJonas, ageSarah, averaAge);


//////////////////////////////////////////////////
// Ejercicio práctica 

//Punto 1
const massMark = 78; // peso de Mark en Kg
const heightMark = 1.69; // altura de Mark en metros
const massJohn = 92; // peso de John en Kg
const heightJohn = 1.95; // altura de John en metros

//Punto 2 - Cálculo del BMI (índice de masa muscular) 
const BMIMark = massMark / (heightMark * heightMark);
const BMIJohn = massJohn / (heightJohn * heightJohn);
console.log(BMIMark, BMIJohn);

//Punto 3 - Creación de la variable booleana 
const markHigherBMI= (BMIMark > BMIJohn);

// Registro en la consola
console.log ("Mark has a higher BMI than John: " + markHigherBMI);



///////////////////////////////////////////////////
// Distintas formas (plantillas) de encadenamiento de datos
const firstName = 'Jonas';
const job = 'teacher';
const birthYear = 1991;
const year = 2037;

//Forma Nª1
const jonas = "I'm " + firstName + ', a ' +  (year - birthYear) + ' years old ' + job + '!';
console.log(jonas);

//Forma Nª2 --> método implementado en el ES6 
const jonasNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;
console.log(jonasNew);

// Forma Nª3 
console.log(`Just a regular string...`);

//Forma Nª4 --> en multiples líneas
console.log( 'cadenas en \n\
múltiples \n\
lineas');

//Forma Nº5 --> es similar al anterior, pero sin \n\
console.log(`String
multiple
lines`);


//////////////////////////////////////////////////////
//TAKING DESITIONS IF/ELSE STATEMENTS (Para tomar decisiones)
//Este ejmplo es para saber si alguien puede obtener o no el regitro en base a su edad:

const age = 19; // edad de la persona
const isOldEnough = age >= 18; //es verdadero cuando el resultado da 18 años o más

//Este còdigo de bloque se esjecuta, siempre y cuando el código, que coloquemos entre paréntesis de como resultado: true

if(isOldEnough) {
  console.log('Sarah can start driving licence 🚗');
}


//A estos bloques comúnmente se los llama Estructuras de Control o SENTENCIAS CONDICIONALES
//En el día a día a este tipo de códigos los podemos encontrar de la siguiente forma:
// ejemplo edad mínoma para manejar:
const age = 17;
//agregamos código con "else" para que sea el que se ejecute cuando de falso. 
if(age >= 18) {
  console.log('Nacho can start driving licence 🚗'); //si este resultado es falso, se ejecuta el siguiente código... 
} else {    
  const yearsLeft = 18 - age; //calculamos cuantos años le quedan a Sarah para tener su licencia
  console.log (`Nacho is too young. Wait another ${yearsLeft} years :)`);
}   //este código debería calcular 18 menos la edad de Sarah y decir cuantos le falta


//ejemplo determinar el siglo basado en el año de nacimiento:
//para que se pueda imprimir el còdigo del bloque,tenemos que colocar "let century" afuera
const birthYear = 1991; 

let century;
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);


///////////////////////////////////////////////////////
//Ejercicio Nº2
const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

const BMIMark = massMark / (heightMark * heightMark);
const BMIJohn = massJohn / (heightJohn * heightJohn);
console.log(BMIMark, BMIJohn);

//punto 1
if ( BMIMark > BMIJohn) {
  console.log ("Mark's BMI is higher than John's!")
} else {
  console.log ("John's BMI is higher than Mark's!")
}

//punto 2
if ( BMIMark > BMIJohn) {
  console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`)
} else {
  console.log (`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`)
}



//////////////////////////////////////////////////
// TYPE CONVERSION
//En este caso queremos tipificar nuestros imputs
const inputYear = '1991';
console.log(Number(inputYear), inputYear);  //cuando ponemos "Number" especifcamos que queremos imprimir un número, el segundo es un string
console.log(Number(inputYear) + 18); //suma entre número + string = 2009

console.log(Number('Jonas')); //No es algo válido (NaN)
console.log(typeof NaN); //dice que el tipo NaN es un tipo de número, eso no es correcto

console.log(String(23), 23); //el primero es un string y el segundo un número

//TYPE COERCION  
//Sucede cuando uno de los dos valores no es igual al otro, entonces JS por detrás convierte el tipo de uno de los dos para que coincidan y sean ambos del mismo tipo y la operación final se pueda ejecutar
console.log(' I am ' + 23 + ' years old')    /* de esta forma JS convirtió automáticamente todos los integrantes de la suma en strings para que no tengamos que especificarlo manualmente, si usamos signos + convierte a todos en string, en cambio con signos - los convierte a numeros
console.log('23' - '10' - 3);
console.log ('23' / '2');
console.log ('23' * '2');

//En el caso de divisiones y multiplicaciones también convierte todo lo que está dentro del parentesis principal en númros porque esta es la única forma de hacer estas dos operaciones matemáticas

let n = '1' + 1; // '11' --> string 
n = n - 1; 
console.log (n); // '11' - 1 = 10 --> número (convirtió el string 11 en numero)



//////////////////////////////////////////////////////
// 5 falsy values: 0, '' , undefined, null, NaN

console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('Jonas'));
console.log(Boolean({}));
console.log(Boolean(''));

const money = 100; 
if (money) {
  console.log("Don't spend it all ;)");
} else {
  console.log('You should get a job!');
}

let height = 0;
if (height) {
  console.log('YAY! Height is defined');
} else {
  console.log('Height is UNDEFINED')
}
//OJO CON ESTE TIPO DE CODIGOS porque podemos tener un BUG
//cuando no tengo especificado el valor de height, lo toma como valor 0 -> falso
//por otro lado, si especificamos un valor mayor a cero, es verdadero... 


///////////////////////////////////////
//COMPARACION ESTRICTA VS COMPARACION LAXA
//Igualdad estricta (no realiza corrección de tipo)
const age = 18;
if (age === 18) console.log('You just became an adult :D (stricta)');      --> si la edad es exactamente 18, entonces la consola imprime la frase estricta. 

//Igualdad estricta que si hace corección de tipo
if (age == 18) console.log('You just became an adult :D (loose/laxa)');
// por las dudas siempre usar el comparador con === signos iguales,
//porque el de dos signos es confuso, y no hace comparaciones estrictas
//el de tres === si 

//Solicitar un número al usuario: 
const favourite = Number(prompt("What's your favourite number?"));     --> prompt hace que el usuario ingrese, en este caso su numero favorito, como el valor devuelto por promp es string, se usa number para convertirlo a tipo numérico

console.log(favourite);
console.log(typeof favourite);

if (favourite === 23) {   // 22 === 23 -> FALSE
  console.log('Cool! 23 is an amazing number!')    ---> la consola muestra esta frase si el numero es estrictamente 23
} else if (favourite === 7) {
  console.log('7 is also a cool number')        ---> la consola muestra esta frase si el numero es estrictamente 7
} else if (favourite ===9 ) {
  console.log('9 is also a cool number')     ---> la consola muestra esta frase si el numero es estrictamente 9
} else {
  console.log('Numer is not 23 or 7 or 9')     ---> la consola muestra esta frase si ninguno de los numeros ingresados es estrictamente 23, 9 o 7
}
//podemos también hacer sugerencias, colocando el sguiente código 
if (favourite !==23) console.log('Why not 23?');        ---> con !== podemos hacer sugerencias, con verificación de desigualdad estricta, este ultimo condicional comprueba si el numero no es estrictamente igual a 23, entonces imprime la frase (Si el número no es 23, pregunta al usuario por qué no eligió 23)
*/

//////////////////////////////////////////////
//Comprobamos Sarah puede manejar, teniendo en cuenta 2 factores (A y B)
/* const hasDriversLicense = true; // A
const hasGoodVision = true; // B

//Logical operator -> AND - OR - NOT
console.log(hasDriversLicense && hasGoodVision);   //operador AND (&&) devuelve true si ambas condiciones son verdaderas, pero en este caso una de las condiciones es false, por lo que imrpimirá false en la consola
console.log(hasDriversLicense || hasGoodVision);   //operador OR (||) devuelve true si al menos una de las condiciones se cumple, en este caso se cumple que Sarah tiene licencia
console.log(!hasDriversLicense);     //operador NOT (!) invierte el valor de hasDrivesLicense que es true a false y lo imprime. Este operador permite verificar que algo no es verdadero, se usa para negar o invertir una condición. Es util cuando necesitas verificar que una condición no cumple o para somplificar la lógica en situaciones donde las condiciones deben ser lo contrario de lo que normalmente verificarías. 

const shouldDrive = hasDriversLicense && hasGoodVision;    //lógica de desición, se almacena en la constante shouldDrive el resultado de la evaluación (hasDriversLicense && hasGoodVision) ambos deben ser true, pero en este caso el primero es true y el segundo es false, por lo que shouldDrive será false

// if(shouldDrive) {
//   console.log('Sarah is able to drive!');        --> se imprime esto si ambas condiciones son true
// } else { 
//  console.log('Someone else should drive...');     --> se imprime cuando una de ellas es false, este es el caso y se imprime en la consola que deberia manejar otro
//}

const isTired= false; //C
console.log(hasDriversLicense && hasGoodVision && isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log ('Sarah puede manejar!');
} else {
  console.log ('Deberia manejar otra persona que no esté cansada');
}
*/

////////////////////////////////////////////////////////
// Ejercicio: 
//Punto 1 
// const scoreDolphins= (97 + 112 + 103) /3;
// const scoreKoalas= (88 + 110 + 105) /3;
// console.log (scoreDolphins, scoreKoalas);

//Punto 2
// if (scoreDolphins > scoreKoalas && scoreDolphins >=100){
//    console.log ('Dolphins win the trophy 🏆');
// } else if (scoreDolphins < scoreKoalas && scoreKoalas >=100) {
//    console.log ('Koalas win the trophy 🏆');
// } else if (scoreDolphins === scoreKoalas && scoreDolphins >=100 && scoreKoalas >=100) {
//    console.log ('Both win the trophy 🏆🏅');
// } else {
//    console.log ('No one wins the trophy 😖')
// }

//en el ejercicio anterior lo que hicimos es comparar los promedios de ambos equipos e imprimir mensajes en la consola, utilizando los comparación estricta y operadores logicos. 

/////////////////////////////////////////////////////////
//The switch element: 
/*
const day = 'sunday';

switch (day) {
  case 'monday':   // day === 'monday'
    console.log('Plan course structure');
    console.log('Go to coding meetup');
    break;   // usamos esto para cortar la ejecución del código acá
  case 'tuesday':
    console.log('Prepare theory videos');
    break;
  case 'wednesday':
  case 'thursday':
    console.log('Write code examples');
    break;
  case 'friday':
    console.log('Record videos');
    break;
  case 'saturday':
  case 'sunday':
    console.log('Enjoy the weekend =D');
    break;
  default:     //usamos esto para decir que en caso de que ninguna de las opciones anteriores se cumpla, la consola debe imprimir esto 'Not a valid day!'
    console.log('Not a valid day!');
}
*/ 


//Ahora hacemos el mismo ejercicio de switch pero usando if y else if
/*
const day = 'saturday';

if (day === "monday") {
  console.log ('Plan course structure');
  console.log ('Go to coding meetup');
} else if (day === "tuesday") {
  console.log ('Prepare theory videos');
} else if (day === "wednesday" || day === "thursday") {
  console.log ('Write code examples');
} else if (day === "friday") {
  console.log ('Record videos');
} else if (day === "saturday" || day === "sunday") {
  console.log ('Enjoy the weekend =)');
} else {    //usamos else sin if para decir que en caso de que ninguna de las opciones anteriores sean verdaderas o se cumplan, la consola imprima esto 'Not a valid day!'
  console.log ('Not a valid day!');
}
*/

///////////////////////////////////////////////////////
// DECLARACIONES Y EXPRESIONES

//Declaración (Statements) --> es un fragmento de código más grande que se ejecuta y que no produce un valor por si mismo. Básicamente suele ser todo aquello que termine con un punto y coma al final

//Expresiones (expressions) --> es cualquier fragmento de código que produce un valor. Puede ser una siemple aperación, una llamada a una función, o incluso una combinación de elementos que devuelve un valor.

////////////////////////////////////////////////////
//Operadores condicionales (operadores ternarios)
//permite escribir algo similar a una declaración if/else, pero en una misma línea
//se llaman ternarios porque tienen 3 partes (la condición, la parte if y la parte else)

//const age = 23; 
//age >= 18 ? console.log ('I like to drink wine 🍷') :
//console.log ('I like to drink water 💧');  //solo se puede hacer una cosa si esta condición es verdadera
// NO SE SUELE HACER MUCHO DE ESTA FORMA

//Otro ejemplo
/*
const score = 55;
score >=20 ? console.log ( 'Great number!! ⭐️') :   //la condición y la parte if
console.log ('Bad number');  //la parte else
*/

//OTRO EJEMPLO, QUE SI SE SUELE USAR PARA OPERADORES TERNARIOS (CONDICIONALES)
/*
const age = 13;

// forma 1 de hacerlo
const drink = age >= 18 ? 'Whine 🍷' : 'Water 💧';  //declaramos una constante que guarda el resultado de drink
console.log(drink);

// forma 2 de hacerlo
let drink2;
if (age >=18) {
  drink2 = 'Whine 🍷';
} else {
  drink2 = 'Water 💧';
}
console.log (drink2);

//forma 3 de hacerlo  "PLANTILLAS LITERALES + OPERADORES TERNARIOS"
console.log (`I like to drink ${age >= 18 ? 'Whine 🍷' : 'Water 💧'}`);  //mirar bien la sintaxis y las comillas que se están usando
// en este último ejemplo incluímos en la misma línea (plantilla) el operador que queremos que nos de como resultado
// console.log (`texto a imprimir más ${condición ? 'valorSiTrue' : 'valorSiFalse'}`);
*/


//////////////////////////////////////////////////
//Ejercicio (DE LA FORMA QUE ME SALIO): 
//Punto 1 - calcular la propina, creando una variable 'tip' usando operadores ternarios
/*
const bill = 340;
const tip = (bill >= 50 && bill <= 300) * bill * 0.15 || (bill >= 301) * bill * 0.20;
const total = bill + tip;

console.log (`The bill was $${bill}, the tip was $${tip}, and the total value $${total}.`);
*/
// resutados: 
// 245 : The bill was $275, the tip was $41.25, and the total value $316.25.
// 40 : The bill was $40, the tip was $0, and the total value $40.
// 340 : The bill was $340, the tip was $68, and the total value $408.


//Ejercicio (METODO CHAT GPT)
/* 
const bill = 340;
const tip = (bill >= 50 && bill <= 300) ? bill * 0.15 : (bill > 300 ? bill * 0.20 : 0);
const total = bill + tip;

console.log(`The bill was $${bill}, the tip was $${tip}, and the total value is $${total}.`);
*/ 


//Ejercicio (RESOLUCION UDEMY)

const bill = 275;
const tip = bill <= 300 && bill >= 50 ? bill * 0.15 : bill * 0.20;
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`);