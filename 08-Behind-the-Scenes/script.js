'use strict';

/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output); //acá se imrpime con Sol, porque se busca a la variable en el parent scope (siempre de adentro hacia afuera, nunca al revés)

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      // Creating NEW variable eith same name as outher scope´s variable
      const firstName = 'Luna';

      // Reasssigning outher scope´s variable
      output = 'NEW OUTPUT!';

      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str); //se imrpime con Luna, porque JS siempre busca la variable primero en el ambito actual (dentro del bloque if), Sol está en el ambito global

      function add(a, b) {
        return a + b;
      }
    }
    //console.log(str);  no se puede imprimir porque Const tiene alcance de bloque
    console.log(millenial); //se imrpime, Var no tiene alcance de bloque, sinó ambito de función, por ende ignora el bloque.
    //console.log(add(2, 3)); si sacamos el "modo estricto", esto si se imprime. Pero como siempre hay que usar el modo estricto, no se imprime.
    console.log(output);
  }
  printAge();
  return age;
}

const firstName = 'Sol';
calcAge(1995);
//console.log(age); no se imprime porque const tiene alcance de bloque (estamos queriendo ir desde el exterior al scope interior, no se puede)
//printAge(); no se imprime porque estamos queriendo ir desde un scope exterior a uno interior y no se puede así. No podemos acceder a las variables de un child scope
*/

// ===== VARIABLES ======
/*
console.log(me);
//console.log(job); --> no se puede acceder a la variable, porque console.log está dentro de la zona muerta temporal, que en este caso es global y va desde la linea 44 hasta la linea 49, justo antes de definirla en la linea 50.
// console.log(year); --> ocurre lo mismo que arriba, no se puede imprimir algo que no está definido aún (estamos en la zona muerta temporal)

var me = 'Jonas'; //la variable se eleva, pero con valor de indefinido
let job = 'teacher'; //
const year = 1991;
*/

// ===== FUNCIONES ======
/*
console.log(addDecl(2, 3));
//console.log(addExpr(2, 3));
console.log(addArrow);
console.log(addArrow(2, 3));

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;
*/

// EXAMPLE
/*
console.log(numProducts);
if (!numProducts) deleteShoppingCart(); //cuando no haya productos queremos que se elemininen las shoppingcarts

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); // TRUE , "x" forma parte del objeto global window, porque es una variable declarada con Var
console.log(y === window.y); // FALSE
console.log(z === window.z); // FALSE
*/

// ===== Window  =====
// Window es el objeto global de JS en el navegador.
// Las variables declaradas con Var crearán una propiedad en el objeto de ventana global y eso puede tener implicaciones en algunos casos.

// CONLCUSIONES
// No usar VAR para declarar variables, mejor usar CONST la mayor parte del tiempo y LET si realmente necesita cambiar la variable luego.

// Además para dejar el código más prolijo, se deben declarar las variables en la parte superior de cada ambito (scope)

//  ====== This Keyword ======
//The This Keyword es una variable especial que se crea para cada contexto de ejecución (por ende para cada función).
// La palabra clave siempre tomará el valor del propietario de la función en la que se usa la palabra clave this. También decimos que apunta al dueño de esa función.
// Importante!! El valor del this keyword no es estático, es decir, no es siempre el mismo. Depende de cómo se llame realmente a la función y su valor solo se asigna cuando se llama a la función.

/* Hay 4 formas distintas de llamar a una función: 
1 - Método (una función adjunta a un objeto) Cuando llamamos a un étodo, la palabra this de ese método siemplemente apuntará al objeto en el que se llama al metodo. O en otras palabras, apuntará al objeto que está llamando al método. 
2 -  Llamándolas como funciones normales, en este caso la palabras this estará "indefinida" - (tener en cuenta que solo es válido para el modo estricto) - (si no se está dentro del modo estricto, la palabra this apuntará al objeto global, que es el objeto window)
3 - Arrow functions (no obtienen su propia this keyword, sinó que la toman de una función circundante, es decir de la función padre, esto se llama: lexical this)
4 - Event listener (la palabra this siempre apuntará al elemento DOM al que está asociada la función del controlador)
*/

////
//console.log(this); // imprime window porque obtiene la this keyword del alcance de su padre, Window.
/*
const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  //console.log(this); //en esta función "this" es 'undefined'
};

calcAge(1991);

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  //console.log(this); //en esta función "this" es 'window' porque las arrow functions obtienen las this keyword del alcance de su funcion padre, en este caso el alcance global es => window
};
calcAgeArrow(1980);

const sol = {
  year: 1995,
  calcAge: function () {
    console.log(2037 - this.year); // 'this' acá apunta al objeto que llama al método, es decir "sol"
  },
};
sol.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = sol.calcAge;
matilda.calcAge(); //da como resultado 20 (acá estamos llamando al método en matilda).

const f = sol.calcAge;
f();
*/

//////////////////
// Importante --> Esto no es un bloque de código, es una forma literal de definir objetos.
// todo lo que coloquemos dentro del objeto, está todavía en el ámbito global.

// var firstName = 'Matilda'; //NUNCA USAR ARROW FUNCTIONS EN OBJETOS
/*
const sol = {
  firstName: 'Sol',
  year: 1995,
  calcAge: function () {
    //console.log(this);
    console.log(2037 - this.year);

    // Solution 1:
    // const self = this; //Preservamos la palabra this (podemos agregar SELF o THAT como constante)
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    //   console.log(this.year >= 1981 && this.year <= 1996);
    //};

    // Solución 2:
    const isMillenial = () => {
      //esta arrow function funciona porque usa el this keyword de su alcance principal, es decir "sol"
      console.log(this);
      console.log(self.year >= 1981 && self.year <= 1996);
    };

    isMillenial();
  },

  greet: () => console.log(`Hey ${this.firstName}`), //esta arrow function al estar dentro de un objeto, tiene alcance global, porque el objeto no tiene alcance de bloque. Entonces, la palabra this que usa, en realidad está apuntando a la palabra this del entorno global, que sería Window.
};
sol.greet(); //Da como resultado Hey Undefined, porque
sol.calcAge();

// ARGUMENTS KEYWORD
// Esto es útil cuando necesitamos que una función acepte más parámetros de los que realmente específicamos.
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12);

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;

  //cuando tenemos más de una línea, se debe especificar "return"
};

addArrow(2, 5, 8);
*/

// ======= Memory Managment =======
// Memory Managment: es cómo el motor de JS asigna espacio en memoria para crear variables y posteriormente libera ese espacio de memoria, que estaba ocupado por variables que ya no son necesarias para que nuestras aplicaciones funcionen de forma fluida y eficiente sin quedarse sin memoria.

// ===== REFERENCIAS A OBJETOS EN LA PRACTICA (Shallow vs. Deep Copies)

const jessica1 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

function marryPerson(originalPerson, newLastName) {
  originalPerson.lastName = newLastName;
  return originalPerson;
}

const marriedJessica = marryPerson(jessica1, 'Davis');

//const marriedJessica = jessica1;
//marriedJessica.lastName = 'Davis';

console.log('Before:', jessica1);
console.log('After:', marriedJessica);

// =========== ** ===========
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

//===== OPERADOR DE PROPAGACION (Spread) --> para crear un objeto nuevo: =====
// Básicamente los tres puntitos copian todas las propiedades de "jessica" y lo ponen en un objeto nuevo, que estamos especificando con las llaves. La referencia a este nuevo objeto creado se almacenará en "jessicaCopy"

// SHALLOW COPY (copia superficial)
const jessicaCopy = { ...jessica };
jessicaCopy.lastName = 'Davis'; //cambiamos el apellido Williams en jessicaCopy por Davis.

//console.log(jessica, jessicaCopy); //imprime los dos arrays especificando que "jessica" tiene como apellido Williams, y "jessicaCopy" tiene como apellido 'Davis'

// jessicaCopy.family.push('Mary');
// jessicaCopy.family.push('John');

// console.log('Before:', jessica);
// console.log('After:', jessicaCopy);

// DEEP COPY/ CLONE (copia profunda)
const jessicaClone = structuredClone(jessica); //con esta función "structuredClone" podemos crear clones profundos
jessicaClone.family.push('Mary');
jessicaClone.family.push('John');

console.log('Original:', jessica);
console.log('Clone:', jessicaClone);

// ¿Cómo se libera la memoria ?

// Ejercicio ejemplo:
const sol = {
  firstName: 'Pepa',
  sodiacSigne: 'Capricorn',
  age: '24',
  family: ['Nicolas', 'Maria', 'Roque'],
};

const solClone = structuredClone(sol);
solClone.family.push('Luna', 'Lima', 'Nico', 'Juana');

console.log('Original:', sol);
console.log('Clone:', solClone);

/*
=========== ** ============
¿cómo la memoria se libera cuando y no necesitamos un determinado valor ?

Call Stack --> donde se almacenan las primitivas, simplemente se borran cuando el contexto de ejecución correspondinte sale de la pila. 
Las variabls globales nuna serán eliminadas.

Heap --> para eliminar los objetos antiguos no utiizados y liberar memoria, los motores de JS emplean un proceso denominado "Garbage Collection". Este proceso es la herramienta central para la gestión de momeria en cualquier motor JS. 
Este este proceso el cual se ocupa cuando vaciar la memoria, los desarrolladores no podemos hacer que se libere la memoria mediante la recolección de basura. Esto es un gran paso, porque la gestión automática nos libera de ese trabajo. 
Algoritmo "mark-and-sweep" (marcado y barrido): 
Fase de marcado: en la que se marcan como vivos todos los objetos accesibles desde una denominada raíz.  Las raíces son basicamente puntos de partida, de los cuales el algoritmo empieza a buscar objetos vivos o alcanzables. Diferentes cosas pueden ser raíces, pero las mas obvias son el contexto de ejecución global, que siempre está presente y cualquier otro contexto de ejecución de funciones en ejecución. Volviendo a la explicación, el algoritmo comienza a buscar en todos los lugares llamados raíces, los objetos también pueden ser alcanzados por events listener, temporizadores o algo que llamamos cierres. 
La segunda fase es la de barrido: donde simplemente se eliminan todos los objetos no marcados o dicho de otra forma, todos los objetos inalcanzables. 
El algoritmo decidió en el primer paso (fase de marcado) que estos objetos ya no son necesarios y que la memoria ocupada por ellos puede ser recuperada y utilizada para futuras asignaciones de memoria para futuros objetos. 

NOTA: cualquier objeto definido globalmente, nunca será recolectado, incluso si ya no lo necesitamos en nuestro código. 

================= ** ===============
FUGAS DE MEMORIA 
Estas fugas se producen cuando un objeto que en realidad ya no es necesario para nuestra aplicación es incorrectamente todavía alcanzable por el recolector de basura desde una de las raíces. 
Como resultado, el objeto se marca como vivo (rastreable) y no se elimina, por más que ya no lo necesitemos en nuestro código. Debería eliminarse, pero no se puede.   
Esto sucede cuando un objeto sigue siendo referenciado incorrectamente desde algún lugar. Una fuente importante de estas erróneas e innecesarias referencias, son los event listener y temporizadores antiguos o innecesarios. Por eso para evitar que suceda esto, es necesario eliminarlos cuando ya no sean necesarios, especialmente si hacen referencia a objetos grandes. 
Hay que evitar también declarar objetos grandes como objetos globales. Porque estos tampoco serán nunca recolectados porque los objetos declarados en el contexto global nunca se eliminan. 

*/
