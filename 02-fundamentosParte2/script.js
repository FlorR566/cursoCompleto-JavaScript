//Modo estricto (para escribir código más seguro)
"use strict" //tiene que ser el primer código que escribimos en el script para que funcione

/*
let hasDriversLicense = false;
const passTest = true; 

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log('I can drive :D');

//const interface = 'Audio';   --> esta palabra no se puede usar como variable (interface está reservada para usos futuros dentro del lenguaje)
//const private = 543;   --> palabra reservada (private está reservada para usos futuros dentro del lenguaje)
*/

//FUNCIONES DE DECLARACION
//es una pieza de código que podemos utilizar una y otra vez en nuestro código, puede contener una o más lineas de código
/*
function logger() {
  console.log('My name is Florencia');     //esta función lo único que hace es registrar una función, pero no devuelve ningún valor
}
// calling / running / invoking function
logger();   // invocamos/ corremos/ llamamos a la función logger()
logger(); 
logger(); 

//Las funciones son como máquinas de alimento, por ejemplo, podemos ponerle comida, la máquina hace algo con eso (sería el bloque de código) y luego nos devuelve una salida (por ejemplo el jugo)
function fruitProcessor(apples, oranges) {
  console.log(apples, oranges);
  const juice = `Juice whit ${apples} apples and ${oranges} oranges.`;
  return juice;  //imprime el contenido de la constante juice
}

//Jugo de manzana:
const appleJuice =fruitProcessor(5, 0);   //llamamos a la función "fruitProssesor" con valores específicos que guardamos en la constante "appleJuice"
console.log(appleJuice);  //imprimime la variable con según los parámetros indicados arriba 
//console.log(fruitProcessor(5,0));   // esta es otra forma de llamar a la funcón desde la consola

//Jugo de naranja:
//const orangeJuice= fruitProcessor(0, 7);
//console.log(orangeJuice);

//Jugo de manzana y naranja:
const appleOrangeJuice =fruitProcessor(2, 4);
console.log(appleOrangeJuice);



const num = Number('23');  //no aparece en la consola hasta que escribamos num
*/

/*
//Function declaration:
const age1 = calcAge1(1991);

function calcAge1(birthYear) {
  return 2037 - birthYear;
}


//Function expression:
const calcAge2 = function (birthYear) {    //esta función funciona de la misma forma que la función de declaración 
  return 2037 - birthYear;     // desde "function" hasta el ";" lo que tenemos es una expresión, que produce un valor, y si produce un valor, entonces podemos almacenarlo en una variable
}

const age2 = calcAge2(1991);

console.log(age1, age2);
*/

/* //////////////////////////
//Function expression:
const calcAge2 = function (birthYear) {   
  return 2037 - birthYear;     
}


//Arrow function (Función de Flecha --> más rapido y limpio de escribir)
const calcAge3 = birthYear => 2037 - birthYear;
const age3 = calcAge3(1991);
console.log(age3);


//construimos una función para saber cuantos años quedan para jubilarnos
const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  //return retirement;
  return `${firstName} retires in ${retirement} years`;
}

console.log(yearsUntilRetirement(1991, 'Pedro')); 
console.log(yearsUntilRetirement(1980, 'Macarena'));
*/

/////////////////////
//FUNCIONES QUE LLAMAN A OTRAS FUNCIONES
//Ahora consideramos que el procesador de frutas, necesita interactuar con otra máquina que le corte las frutas en trozos pequeños, antes de comenzar a hacer el jugo
/*
function cutFruitPieces(fruit) {
  return fruit * 4;    //esta función lo único que hace es devolver la fruta cortada en 4 partes
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  console.log(apples, oranges);
  const juice = `Juice whit ${applePieces} piece of apple and ${orangePieces} pieces of orange.`;
  return juice; 
}

console.log(fruitProcessor(2, 3)); 
*/

///////////////////////////////
//REVIEW FUNCTIONS
/*
const calcAge = function(birthYear) {
  return 2037 - birthYear;
}


const yearsUntilRetirement = function (birthYear, firstName) {
  const age = calcAge(birthYear);
  const retirement = 65 - age;

  if(retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years`);
    return retirement;
  } else {
    console.log(`${firstName} has already retired 🎉`);
    return -1;
  } 
}
console.log (yearsUntilRetirement(1991, 'Jonas'));
console.log (yearsUntilRetirement(1950, 'Mike'));


//  Esencialmente una función necesita un nombre, luego unos parámetros que esencialmente marcadores de posición que reciben valores de entrada.
//  Luego sigue el cuerpo de la función, que es un bloque de código que se reusa, y es donde se procesa el dato ingresado en los parámetros y luego se devuelve. 
//  Al final del cuerpo habitualmente tenemos la declaración de return, que usamos para generar un valor de la función. Que termina inmediatamente con la ejecución de la función, (también decimos que la función regresa).
//  Por fuera del cuerpo de la función, tenemos la zona donde llamamos/invocamos/ejecutamos a la función usando (). Dentro de ellos van los argumentos, que son los valores actuales que van en el parámetro cuando ingresamos los datos. Gracias a los parétesis se entiende que invocamos a una función que tiene parámetros que se completan con los datos, que son los valores reales de la función. 
*/

/////////////////// CHALLENGE //////////////////////
//EJERCICIO #1:
/* Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.

Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).

A team only wins if it has at least double the average score of the other team. Otherwise, no team wins!

Your tasks:
Create an arrow function calcAverage to calculate the average of 3 scores. This function should have three parameters and return a single number (the average score).

Create two new variables — scoreDolphins and scoreKoalas, and assign the value returned from the calcAverage function to them (you will need to call this function, and pass scores as arguments).

Create a function checkWinner that takes the average score of each team as parameters (avgDolphins and avgKoalas), and then logs the winner to the console, together with the victory points, according to the rule above. Example: Koalas win (30 vs. 13) (use avgDolphins and avgKoalas instead of hard-coded values).

Use the checkWinner function to determine the winner for both DATA 1 and DATA 2.

Ignore draws this time. Instead, log No team wins... to the console if there is no winner.

TEST DATA 1: Dolphins scored 44, 23, and 71. Koalas scored 65, 54, and 49.

TEST DATA 2: Dolphins scored 85, 54, and 41. Koalas scored 23, 34, and 27.
*/

/*
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

const scoreDolphins = calcAverage(44, 23, 71);
const scoreKoalas = calcAverage(65, 54, 49);

const scoreDolphins2 = calcAverage(85, 54, 41);
const scoreKoalas2 = calcAverage(23, 34, 27);

function checkWinner(avgDolphins, avgKoalas) {
    if (avgDolphins >= 2 * avgKoalas) {
        console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
    } else if (avgKoalas >= 2 * avgDolphins) {
        console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
    } else {
        console.log("No team wins...");
    }
}

checkWinner(scoreDolphins, scoreKoalas);
checkWinner(scoreDolphins2, scoreKoalas2);
*/

//Explicación:
//Función calcAverage: calcula el promedio de tres puntajes.
//Variables scoreDolphins y scoreKoalas: contienen el promedio de cada equipo según los datos proporcionados.
//Función checkWinner: verifica las condiciones de victoria y muestra el ganador o "No team wins..." si no se cumple la condición de ganar.
//Llamadas a checkWinner: evalúan el ganador en ambos conjuntos de datos.

///// Resolución Udemy: /////
/*
const calcAverage = (a,b,c) => (a + b + c) / 3;
console.log(calcAverage(3,4,5));

//Test 1
const scoreDolphins = calcAverage(44, 23, 71);
const scoreKoalas = calcAverage(65, 54, 49);

const checkWinner = function (avgDolphins, avgKoalas) {
  if (avgDolphins >= 2 * avgKoalas) {
      console.log(`Dolphins win 🏆 (${avgDolphins} vs. ${avgKoalas})`);
  } else if (avgKoalas >= 2 * avgDolphins) {
      console.log(`Koalas win 🏆 (${avgKoalas} vs. ${avgDolphins})`);
  } else {
      console.log("No team wins...");
  }
}

checkWinner(scoreDolphins, scoreKoalas);
*/

/////////////////////////////////////////
// ARRAYS  //
// No son valores primitivos, podemos cambiarlos aunque se hayan declarado con const.
// Lo que si no se puede hacer es cambiar la matriz completa.
/*
// Primera forma de hacerlo: 
const friend1 = 'Michael';
const friend2 = 'Steven';
const friend3 = 'Peter';

// Sintaxis Literal --> FORMA HABITUAL DE HACERLO: solo deberían ser datos de tipo string
const friends = ['Michael', 'Steven' , 'Peter'];
console.log(friends);

// Otra forma de hacerlo: acepta cualquier tipo de dato y es importante colocar "new Array" al inicio
const y = new Array(1991, 1984, 2008, 2020);
console.log (y);

console.log(friends[0]);   //con esto estoy impimiendo el elemento de la posición 0, del array friends
console.log(friends[2]); 

console.log(friends.length)   //length es la cantidad exacta de elementos que hay en el array (en este caso son 3 elementos)
console.log(friends[friends.length - 1]);    //esto sirve para obtener automáticamente el últomo elemento dentro del array
//dentro de los corchetes podemos poner cualquier cosa, no nesesariamente deben ser números

// Para cambiar o mutar el array: 
friends [2] = 'Jay';      //acá reemplazamos el elemento 2 (Peter) por Jay. 
console.log(friends);

// Esto no se puede hacer: 
// friends = ['Bob', 'Alice']    --> no está permitido cambiar toda la matriz. 

// MIX DE ELEMENTOS DENTRO DEL ARRAY : podemos incluir arrays dentro de arrays, operaciones matemáticas y otras variables
const firstName = 'Florencia';
const flor = [firstName, 'Rodriguez', 2024 - 1995, 'Future-Web-Developer', 'Capricornio', 'Naturaleza', 'Animales', friends];     //se puede hacer referencia a otras variables, poner operaciones matemáticas y referir a otro array. 
console.log(flor);
/*

/*
// EXERCISE 
// Tener en cuenta que la función no se puede ejecutar si quiero hacer cálculos entre strings y numbers
const calcAge = function(birthYear){
  return 2037 - birthYear;
}
const years = [1990, 1967, 2002, 2010, 2018];

const age1 = calcAge(years[0]);   //calcula la edad para el año de la posición 0
const age2 = calcAge(years[1]);
const age3 = calcAge(years[2]);
const age4 = calcAge(years[3]);
const age5 = calcAge(years[years.length - 1]);    //calcula la edad para la última posición
console.log(age1, age2, age5);


// Otra forma de escribir qué posiciones del array queremos llamar
const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];
console.log(ages);
*/

///////////////////////////////////
// BASIC ARRAY OPERATIONS (METHODS)
/*
// ADD ELEMENTS TO THE END OF ARRAY: (al fianal de la matriz)
const friends = ['Michael', 'Steven', 'Peter'];
const newLength = friends.push('Jay');     //push es una función que sirve para agregar un elemento al final del array, en realidad lo que hace es capturar la nueva longitud de la matriz 
console.log(friends);
console.log(newLength);


// ADD ELEMENTS TO START OF ARRAY: (al inicio de la matriz)
friends.unshift('John');
console.log(friends);                  
//con esto ahora el array deberia tener 5 elementos y el primero de ellos es John, al igual que push, unshift también puede devolver la nueva longitud de la matriz. 


//METODOS PARA ELIMINAR ELEMENTOS: 

// Eliminamos el último:
friends.pop();       // Last 
const popped = friends.pop();          
console.log(popped);                   //pop es lo opuesto a push, y como opuesto no devulve el largo de la nueva matiz, sinó que devuelve 
console.log(friends);


// Eliminamos el primero: 
friends.shift();    // First
console.log(friends);


*** // DEVUELVE LA POSICIÓN DEL ELEMENTO QUE LE PEDIMOS: 
console.log(friends.indexOf('Steven'));     //en este caso devulve la posición 1, que es donde se encientra Steven. 
console.log(friends.indexOf('Bob'));        // si queremos hacer lo mismo con un elemento que no se encuentra ahí adentro, en la consola aparece -1 


// PROCEDIMIENTO SIMILAR AL "indexOf" PERO MAS MODERNO:
// Devulve TRUE si el elemento buscado está en la matriz, o FALSE si no está
console.log(friends.includes('Steven'));     //es TRUE
console.log(friends.includes('Bob'));        //es FALSE


friends.push(23);             //con esto agregamos el número 23 al array.
console.log(friends.includes(23));   // OJO --> en este caso para que salga TRUE debo colocar el número sin comillas simples, para que lo interprete como number y no como string 

if (friends.includes('Peter')){
  console.log('You have a friend called Peter');    // Solo si el array contiene el nombre Peter, (si se da que es TRUE) se ejecutará este código.
}

if (friends.includes('Steven')){
  console.log('You have a friend called Steven');    // en este caso es TRUE
}
*/

//////////////////////////////////////////////
////////////// CHALLENGE #2 /////////////////
/*
Steven wants you to improve his tip calculator, using the same rules as before — tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.

Your tasks: Write a function calcTip that takes any bill value as an input and returns the corresponding tip, calculated based on the rules above (you can check out the code from the first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100.

And now let's use arrays! So, create an array called bills containing the test data below.

Create an array called tips containing the tip value for each bill, calculated from the function you created before.

BONUS: Create an array totals containing the total values, so the bill + tip.

TEST DATA: 125, 555, and 44.
*/

/*
const bill = 275;
const tip = bill <= 300 && bill >= 50 ? bill * 0.15 : bill * 0.20;
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`);
*/

/*
// Punto 1:
const calcTip = function (bill) {
  return bill <= 300 && bill >= 50 ? bill * 0.15 : bill * 0.20;
  
}
const tip = calcTip(100);
console.log(tip);

//función de flecha (arrow function) forma más corta de hacer el punto 1
//const calcTip = bill => bill <= 300 && bill >= 50 ? bill * 0.15 : bill * 0.20;

// Punto 2: 
const bills = [125, 555, 44];

// Punto 3: 
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];

// Bonus: 
const totals = [bills[0]+tips[0], bills[1]+tips[1], bills[2]+tips[2]];

console.log(bills, tips, totals);    //imprimimos todas las variables.
*/

/////////////////////////////////////////////////////
// ====== Introduccón a OBJETOS: ====== //

//Un objeto es una estructura de datos, datos claves sobre algo y para definir un nuevo objeto es importante utilizar llaves.
//Key value pairs --> (firstName ; lastName ; age ; job ; friends) cada key tiene un valor dentro. Así es como podemos asignarle un nombre a cada valor que tengamos

//Sintaxis Literal del objeto
/*
const sol = {
  firstName: 'Florencia',    //el valor puede ser del tipo que queramos
  lastName: 'Rodriguez',
  age: 2024 - 1995,
  job: 'student',
  friends: ['Lu', 'Mel', 'Yami', 'Aye', 'Flor']
};
console.log(sol);
//usamos objetos para escencialmente agrupar valores o variables que se relacionan a algo o pertenecen a algo. 

//la principal diferencia entre los objetos y los arrays, es que el orden de los valores en los objetos, no es de importancia cuando queremos recuperarlos. Esto quiere decir que debemos utilizar los arrays para agrupar datos estructurados y los objetos para aquellos datos que no son estructurados. 

//COMO LLAMAMOS A UN PARAMETRO DEL OBJETO (cómo lo obtenemos?) 
// Método 1:
console.log(sol.lastName);       //el punto funciona como un operador que irá a "sol" y recuperará lo que le pedimos, en este caso "lastName"

// Método 2:
console.log(sol['lastName']);   //esta es otra forma de imprimir el valor de 'lastName' en la consola
//Lo bueno de esta segunda opción es que podemos colocar cualquier tipo de dato dentro de los corchetes, incluso operaciones. 

// Método 3: 
const nameKey = 'Name';   
console.log(sol['first' + nameKey]);
console.log(sol['last' + nameKey]);
//lo que logramos con este método es llamar a las propiedades, a través de un nombre clave que compartan, en este caso comparten la palabra “Name”. 
//Almacenamos dentro de una variable const unicamente "Name" porque es lo que se repite en ambos parámetros y nos ayuda a buscar más facil. 

// console.log(sol.'last' + nameKey);   --> ESTO NO FUNCIONA, NECESITA SI O SI EL CORCHETE 

//NOTA: El método 1 es más limpio y fácil de usar, pero por ejemplo para buscar dato de todo tipo como nombre y apellido, nos vendrían mejor el método 2 y 3 con corchetes.

//PROMPT es una función incorporada en js que podemos usar en cualquier script. Crea una ventana emergente con un campo de entrada para completar.

//Primero almacenamos el prompt en la variable const interestedIn
//Después lo que queremos es que cuando un usuario ingrese cuál es l opción que quiere ver sobre "sol" (de las opciones que se le presentan), en la consola aparezca el valor de ese parámetro.Si por ejemplo en el popup especifica "job", en la consola debe decir "student"
const interestedIn = prompt('What do you want to know about Sol? Choose between firstName, lastName, age, job, and friends');
if(sol[interestedIn]) {                 
  console.log(sol[interestedIn]);    //imprime el valor del parámetro que ingresa el usuario.
} else {
  console.log('wrong request! What do you want to know about Sol? Choose between firstName, lastName, age, job, and friends');
}     //imprime una nueva alerta cuando se ingresa una palabra que no es un parámetro definido en el objeto

// Cuando el usuario quiera ingresar en el popup un parámetro que no existe, y en la consola se imprima "undefined", lo que significa es que se acaba de ingresar un parámetro que no está especificado en el objeto. En JavaScript sucede que undefined es igual a FALSE.

// IMPORTANTE!! Entonces colocamos código boolean (if/else) que evalúa si el valor ingresado es un parámetro que existe en el objeto, es decir TRUE (if), e imprime en la consola el valor que tiene el parámetro especificado por el usuario. En cambio si la palabra ingresada no está, es FALSE (else), esto lo que hace imprimir una leyenda indicando al usuario que la palabra no está y debe elegir otra. 
//agregamos el if /else para casos donde el usuario ingrese parámetros que no existen o no están definidos en el objeto.  

// NOTA: 
//console.log(sol.interestedIn);   
//¿Qué pasa cuando buscamos un parámetro que no definimos aún?
//Por ejemplo, si quisiéramos entrar al parámetro "interestedIn" de "sol" nos saldría "undefined" en la consola. Porque interestedIn no está definido como propiedad dentro del objeto sol. 


/// COMO MODIFICAR o AGREGAR UN PARAMETRO AL OBJETO  /// 
sol.location = 'Muñiz';   //agrego el parámetro locación con valor Muñiz
sol['twitter'] = '@florodriguez566';    //cuando usamos corchetes podemos agregar cualquier tipo de dato adentro 
//agregoué el parámetro twitter con valor @florodriguez566
console.log(sol);  //imprimo el objeto con su lista de parámetros


/////////// CHALLENGE //////////////////
//escribir en la consola --> "Florencia has 3 friends, and she's best friend is called Lu"

console.log(`${sol.firstName} has ${sol.friends.length} friends, and she's best friend is called ${sol.friends[0]}`);

*/

//////////// OBJECT METHODS //////////////
// Cualquier función que se adjunta/ asocia a un objeto es llamada "método",
// Entonces podemos decir que los métodos en los objetos son un tipo de propiedad que tienen como valor una función.
// Podemos agregarles propiedades a los objetos, donde el valor se consiga con funciones.

/*
const sol = {
  firstName: 'Florencia',    //el valor puede ser del tipo que queramos
  lastName: 'Rodriguez',
  birthYear: 1995,
  job: 'student',
  friends: ['Lu', 'Mel', 'Yami', 'Aye', 'Flor'],
  hasDriversLicense: false,

  //calcAge: function (birthYear) {       //lo único que cambia con la sintaxis de la función anterior es que en este caso no es una constante regular, sinó un valor del objeto (por eso usamos los :) el resto es exactamente igual 
  //  return 2024 - birthYear;
  //}

  //OTRA FORMA PERO USANDO ESTA VEZ --> "THIS":
  //calcAge: function () {  
  //  console.log(this);        //imprimimos el objeto "sol" completo
  //  return 2024 - this.birthYear;
  //}
  //cuando incluímos la palabra "this" lo que hacemos es que this sea igual al objeto al cual está llamado el objeto

  //NUEVA FORMA DE GUARDAR UN DATO COMO PROPIEDAD DEL OBJETO Y REUTILIZARLO MAS ADELANTE: 
  calcAge: function () {   
    this.age = 2024 - this.birthYear;   //podemos usar this para almacenar una nueva propiedad en el objeto
    return this.age;
  },
  
  // Esto es parte del challenge de más abajo:
  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-year old ${sol.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`
  }
};


console.log(sol.calcAge());  //imprimimos el resultado de la función en la consola (que es el método del objeto, con valor función)
//Lo que aparece antes del punto (.) en este caso es "sol" entonces esto es a lo que llama el método del objeto cuando vamos a usar this en la función. 

//NOTA: es una buena práctica no codificar muchas veces el nombre del objeto, en su lugar debemos usar "this" para referenciarlo. 

//console.log(sol['calcAge'](1995));    //otra forma de imprimir el resultado del método (la propiedad del objeto que tiene como valor función)


// CON ESTO IMPRIMIMOS LA NUEVA FORMA PARA GUARDAR UN DATO COMO PROPIEDAD DEL OBJETO Y REUTILIZARLO MAS ADELANTE: 
//Otro ejemplo, digamos que necesitamos acceder a la edad en tres lugares diferentes dentro del código: 
//console.log(sol.age); 
//console.log(sol.age); 
//console.log(sol.age); 
// Sería una mala práctica repetir que se calcule una función muchas veces, porque en este caso el cálculo que realiza la función no es muy grande, pero en otras situaciones, si deberá hacer cuentas más complejas y relentiza todo. 

//Lo que se puede hacer para este caso particular, es calcular la edad 1 y luego guardar el cálculo en una variable dentro del objeto y luego cuando la necesitemos en un momento posterior utilizarla (llamarla/recuperarla) como una propiedad del objeto.



///////////// CHALLENGE ///////////////
// "Florencia is a 29-year old student, and she has a/no driver´s license"

//Se debe escribir la frase anterior y adecuarla en caso de que por ejemplo la persona tenga o no licencia de conducir. 

console.log(sol.getSummary());
*/

// ===== Nota: ===== //
//Los arrays también son métodos, pero distintos, tienen sus propias palabras para usar dentro de ellos.

////////////////// Challenge #3 ///////////////////////
// BMI = mass / (height * height) (mass in kg and height in meters)
// Properties : fullName, mass, height, bmi,
// Objects: mark, john
// Console.log example: "John Smith's BMI (28.3) is heigher than Mark Miller's (23.9)!"
// Test Data:
// Marks weighs 78 kg and is 1.69 m tall.
// John weighs 92 kg and is 1.95 m tall.

/*
// Construimos el objeto #1 "mark"
const mark = {
  fullName: 'Mark Miller',
  mass: 78, 
  height: 1.69,

  calcBMI: function () {
    // Calcular y almacenar el BMI directamente en la propiedad "bmi" del objeto
    this.bmi = this.mass / (this.height * this.height);
    return this.bmi;   // Devuelve el valor calculado
  }
};

mark.calcBMI();  // Llamada para calcular y almacenar el BMI (sin esto no se almacena como propiedad en el objeto)
console.log(mark.bmi);  // Mostrará el BMI en la consola
console.log(mark); // Muestra todas las propiedades del objeto


// Construimos el objeto #2 "john"
const john = {
  fullName: 'John Smith',
  mass: 92, 
  height: 1.95,
  
  calcBMI: function () {
    // Calcular y almacenar el BMI directamente en la propiedad "bmi" del objeto
    this.bmi = this.mass /(this.height * this.height);
    return this.bmi;   // Devuelve el valor calculado
  }
};

john.calcBMI(); // Llamada para calcular y almacenar el BMI (sin esto no se almacena como propiedad en el objeto)
console.log(john.bmi); // Mostrará el BMI en la consola
console.log(john);  // Muestra todas las propiedades del objeto


// Comprobamos si el objeto #1 tiene el bmi > que el objeto #2
// E imprimimos en consola la frase indicando el resultado
const checkBmi = function ( markBmi, johnBmi) {
  if ( markBmi > johnBmi) {
      console.log(`${mark.fullName}'s BMI (${mark.bmi}) is heigher than ${john.fullName}´s (${john.bmi})!`);
  } else {
      console.log(`${john.fullName}'s BMI (${john.bmi}) is heigher than ${mark.fullName}´s (${mark.bmi})!`);
  }
  console.log(markBmi, johnBmi);  //esto es solo para saber qué valores está comparando el boleano
};
checkBmi (mark.calcBMI(), john.calcBMI());
*/

///////////////////////////////////////
// ======= Resolución Udemy ======= //
/*
const mark = {
  fullName: 'Mark Miller',
  mass: 78, 
  height: 1.69,
  calcBMI: function() {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  }
};

const john = {
  fullName: 'John Smith',
  mass: 92, 
  height: 1.95,
  calcBMI: function() {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  }
};

mark.calcBMI();
john.calcBMI();

console.log(mark.bmi, john.bmi);

if (mark.bmi > john.bmi) {
  console.log(`${mark.fullName}'s BMI (${mark.bmi}) is heigher than ${john.fullName}´s BMI (${john.bmi})!`)
} else if (mark.bmi < john.bmi) {
  console.log(`${john.fullName}'s BMI (${john.bmi}) is heigher than ${mark.fullName}´s (${mark.bmi})!`)
}
*/

// // // // // // // // // // // // // // // //
*** // ======= ITERATION FOR THE LOOP ======= //
// Los loops nos permiten automatizar tareas repetitivas, para esto se podría usar el loop "For"
// Loop For se ejecuta una y otra vez hasta que le indiquemos que se detenga

//Los Loops tiene 3 partes: la #1 parte se llama "valor inicial de un contador"
//La #2 parte es la condición lógica que se evalúa antes de cada iteración del ciclo.
// En la #3 parte lo que hacemos es aumentar el contador, para seguir evaluando y pueda convertirse en falso en algún momento.

/*
//La idea es lograr construir un bucle que imprima las siguientes filas desde el 1 hasta el 10: 
console.log('Lifting weights repetition 1 🏋🏼');
console.log('Lifting weights repetition 2 🏋🏼');
console.log('Lifting weights repetition 3 🏋🏼');
console.log('Lifting weights repetition 4 🏋🏼');
console.log('Lifting weights repetition 5 🏋🏼');
console.log('Lifting weights repetition 6 🏋🏼');
console.log('Lifting weights repetition 7 🏋🏼');
console.log('Lifting weights repetition 8 🏋🏼');
console.log('Lifting weights repetition 9 🏋🏼');
console.log('Lifting weights repetition 10 🏋🏼');
*/

/*
// EL LOOP FOR SE MANTIENE FUNCIONANDO MIENTRAS LA CONDICIÓN SEA VERDADERA, en este caso "rep <=10"
for (let rep = 1; rep <= 10; rep ++) {
  console.log(`Lifting weights repetition ${rep} 🏋🏼`);
}  
//la condición que escribimos se va a evaluar en cada iteración del ciclo. Si la condición es "true" se ejecutará la siguiente iteración del ciclo. Pero apenas la condición sea "false", el ciclo se detiene. 
*/

////////////////////////////////////////
// LOOPING ARRAYS, BREAKING AND CONTINUING
/*

const sol = [
  'Florencia',
  'Rodriguez',
  2024-1995,
  'student',
  ['Lu', 'Mel', 'Yami', 'Aye', 'Flor'],
];

const types = [];

// console.log(sol[0])
// console.log(sol[1])
// ...
// console.log(sol[4])
// sol[5] does NOT exist 

for (let i = 0; i < sol.length ; i++) {
  // Reading from sol array
  console.log(sol[i], typeof sol[i]);   // imprime las propiedades del objeto e indica con typeof que tipo de dato es c/uno

  // Filling types array
  //types [i] = typeof sol[i];  //contruimos el array "types" que contiene el tipo de dato de cada propiedad del array "sol"
  types.push(typeof sol[i]);  //es otra forma de crear un array con los datos de otro array
}

console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];
// Guardar las edades calculadas en una nueva array: 

for (let i = 0; i < years.length; i++) {
  ages.push (2037 - years[i]);  //guardamos el valor calculado en cada iteración, uno por uno, en la variable "ages"
}
console.log(ages);

*/

// CONTINUE AND BREAK
// "Continuar" es salir de la iteración actual del ciclo y continuar con la siguiente.
// "Break" se usa para terminar completamente todo el ciclo.
/*
console.log('--- ONLY STRINGS ---')
for (let i = 0; i < sol.length ; i++) {
  if(typeof sol[i] !== 'string') continue; // Lo que decimos con esto es que si el tipo del elemento actual (sol[i]) no es un string, entonces continúe. Esto significa que se sale de la iteración actual del ciclo y luego la siguiente comienza inmediatamente. 

  console.log(sol[i], typeof sol[i]);   
}
// Con el código anterior, solo se imprimen los strings.


console.log('--- BREAK WITH NUMBER ---')
for (let i = 0; i < sol.length ; i++) {
  if(typeof sol[i] !== 'number') break; 

  console.log(sol[i], typeof sol[i]);   
}
*/

////////////////////////////////////////////////
// RECORRER ARRAYS DE ATRÁS PARA ADELANTE Y BUCLE DENTRO DE OTRO BUCLE
/*
const sol = [
  'Florencia',
  'Rodriguez',
  2024-1995,
  'student',
  ['Lu', 'Mel', 'Yami', 'Aye', 'Flor'],
];

// 0, 1, ..., 4
// 4, 3, ..., 0   ---> Queremos crear un código que recorra el array de esta manera 
// Por ejemplo: 
for (let i = sol.length -1; i >= 0; i-- ) {   // (i --) con esto lo que hacemos es decrecer el valor en 1 
  console.log(i, sol[i]);
}

// CREAMOS UN BUCLE DENTRO DE OTRO BUCLE: 
// Ahora vamos a crear un bucle (loop) dentro de otro bucle (loop)

for (let exercise = 1; exercise < 4; exercise++) {
  console.log(`------- Starting exercise ${exercise}
  `);

  for (let rep = 1; rep < 6; rep++) {
    console.log(`Exercise ${exercise}: Lifting weight repetition ${rep} 🏋`);  //este bucle está dentro del bucle de arriba además imprime dentro de cada bucle el número de ejercicio
  }
}
*/

//////////////////////////////////////////////////
// THE WHILE LOOP (buble mientras)

// La diferencia entre el "while loop" y el "for loop" es que el while loop es más versátil que el for loop. Se puede utilizar en una variedad mayor de situaciones. Y esto es porque no se necesita un contador. Lo que si necesita el bocle while, es que la condición se mantenga verdadera, para seguir funcionando.

/*
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weight repetition ${rep} 🏋`);
}
*/

/*
let rep = 1;
while (rep <= 10) {
  //console.log(`WHILE: Lifting weight repetition ${rep} 🏋`);
  rep++;  //el segundo grupo de bucle es el que proviene del while loop 
}

// EJEMPLO: 
// queremos crear un código que simule ser un dado, que se tire  se siga tirando hasta que salga el número 6. Y cuando esto suceda, el código se detenga y deje de ejecutarse.  
// Basicamente queremos que el ciclo siga funcionando mientras los números sean diferentes al 6. 

let dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice);

while (dice !== 6) {
  console.log(`You rolled a ${dice}`);   // imprime el valor que salió en la tirada, cuando es diferente de 6. 
  dice = Math.trunc(Math.random() * 6) + 1;  //en esta linea, ejecutamos nuevamente el loop si el número que salió antes era diferente de 6.
  if (dice === 6) console.log('Loop is about to end...'); // cuando el valor = 6. Imprime "Loop is about to end..."
}  // al final cuando el loop se detiene, y se imprime el "if" es porque la condición de arriba (dice !==6) ya no se cumple, el valor que salió ya no es diferente de 6, y por eso se detiene. El valor que sale = 6, por lo tanto la condición "if" es verdadera y se ejecuta esa parte del código. 

// primero creamos un número random entre 0 y 1, luego lo multiplicamos por 6, pero será un número decimal y para desacernos de los números que vienen luego de la coma, usamos "math.trun()". Esto nos dará un número entre 1 y 5, y luego le sumamos 1 para obtener un 6. 

// NOTA 1: cuando por ejemplo sucede que el loop apenas comienza, tira el valor 6, quiere decir que las iteraciones nunca comenzaron, es decir el ciclo es igual a 0 iteraciones. Nunca comenzó el ciclo. 

// NOTA 2: ¿CUANDO ES NECESARIO USAR WHILE? el ciclo While no tiene que depender de ninguna variable de contador. Entonces cuando sea necesario otilizar un loop que no dependa de ningún contador, podemos usar el loop while. 
// Basicamente esto sucede cuando no sabe de antemano cuántas iteraciones tendrá el bucle, en esos momentos el while loop es la opción correcta. 

// NOTA 3: ¿CUANDO ES NECESARIO USAR UN CONTADOR? por otro lado, cuando sepamos cuantas veces vamos a lanzar el dado para lograr sacar el número 6, o sea, cuando sepamos cuantas veces se va a ejecutar el ciclo, eso significa que vamos a necesitar un CONTADOR. Por ejemplo cuando queremos recorrer una matriz, y ya sabemos cuantos elementos tiene y por lo tanto sabemos cuantas iteraciones necesitaremos. 
*/

///////////////////////////////////////////
// ====== EXERCISE #4 ====== //
// PUNTO 1:

const calcTip = function (bills) {
	return bills >= 50 && bills <= 300 ? bills * 0.15 : bills * 0.2
}

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52]

const tips = [] // es un array vacío donde se guardarán las propinas calculadas.

const totals = [] // otro array vacío donde se guardarán los totales (cuenta + pripina)

// BUCLE FOR : acá se procesan las cuentas y se calculan tanto las propinas, como os totales.
for (let i = 0; i < bills.length; i++) {
	// recorremos cada elemento del array `bills`, `i` es el indice actual.
	const tip = calcTip(bills[i]) // se llama a la función "calcTip" para calcular la prpina de cada elemento.
	tips.push(tip) // agrea la propina al array `tips`.
	totals.push(tip + bills[i]) // agrega el total (cuenta+propina) al array `total`.
}
console.log(bills, tips, totals)

// BONUS : la función de abajo va a calcular el promedio o media de todos los números que contiene, en este caso, un array. [promedio = (suma de todos los números/ cantidad de números)]
const calcAverage = function (arr) {
	let sum = 0 // paso 1: inicializamos la suma en 0.

	for (let i = 0; i < arr.length; i++) {
		sum += arr[i] // paso 2: lo que hacemos acá es sumar cada elemento del array al total. Sería lo mismo si escribimos --> (sum = sum + arr[i];)
	}
	return sum / arr.length // paso 3: dividimos la suma entre la cantidad de elementos.
}
console.log(calcAverage([2, 3, 7])) // resultado: 4 --> (suma: 2+3+7 = 12) (promedio: 12/3 = 4).
console.log(calcAverage(totals)) // promedio de los totals.
console.log(calcAverage(tips)) // promedio de las propinas.

// PASO A PASO
// iniciaización:
// let sum = 0 --> declaramos una variable 'sum' y le asignaos el valor inicial de '0'. Esta variable almacenará la SUMA ACUMULADA de los números del array.
// Bucle para sumar:
/* for (let i = 0; i < arr.length; i++) {
   sum += arr[i];
   } */
// usamos un bucle 'for' para recorrer cada elemento del array 'arr'
// 'i' es el índice, que empieza en 0 y va incrementándose hasta llegar al último índice del array (arr.length -1)
// ¿ Que pasa en cada iteración?:
// en cada paso, tomamos el valor actual del array (arr[i]) y lo sumamos a la variable 'sum'
//esto se logra con la linea --> sum += arr[i] que es una forma corta de escribir (sum = sum + arr[i])
// Calcular el promedio:
// después de salir del bucle (cuando hemos recorrido todos los elementos del array). 'sum' tendrá la suma total de todos los números.
// entonces, calculamos el promedio dividiendo esa suma entre la cantidad de elementos en el array (arr.length) -->
// return sum / arr.length;

//////////////////////////////////////////////////////////////
