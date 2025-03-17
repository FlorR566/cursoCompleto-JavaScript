'use strict';

///////////////////////////////////////

/* OOP (Object Oriented Programming) es un paradigma de progamación orientado basado en el concepto de objetos.
Paradigma significa en este caso, el estilo del código. Es decir, la forma en la que escribimos y organizamos el código. 

Los objetos pueden contener datos (propiedades) y código (métodos). Podemos decir que mediante el uso de objetos, empaquetamos todos los datos y el comportamiento correspondiente en un gran bloque. 

Este paradigma existe, para hacer que el código sea más flexible y fácil de entender. 

// ¿Qué es un prototipo? es una propiedad de funciones constructoras o clases. Contiene los métodos que los objetos instanciados heredarán. 

// ¿Qué es un __proto__? es una propiedad de instancias de objetos. Apunta al prototipo desde el cual el objeto está heredando. Es la referencia que una cada objeto con su prototipo.

// Si un objeto no tiene una propiedad, la busca en la cadena de prototipos (Prototype Chain).
// Todos los objetos en JS terminan heredando de Object.prototype. 

// IMPORTANTE: 
Hay 4 principios funcdamentales en la OOP:

- ABSTRACCIÓN: ignorar u ocultar detalles que no importan (solo enfocarnos en lo importante). Abstraer algo significa ocultar los detalles de implementación dentro de algo, a veces un prototipo, a veces una función. De esta manera, cuando llamas a la función no tienes que entender exactamente lo que está haciendo. De eso se trata la abstracción: de encontrar elementos similares en el código y proporcionar una función o un objeto genérico que sirva para varios lugares o con múltiples preocupaciones.

- ENCAPSULAMIENTO: mantener algunas propiedades y métodos privados dentro de la clase para que no sean accesibles desde fuera de la clase, por ejemplo contraseñas, evitando así que sean modificadas por error. Para crear y utilizar variables y métodos privados dentro de las clases en JS, se usa el #. 

- HERENCIA: una clase hija (child class) hereda todos los métodos y propiedades de su clase padre (parent class). La herencia hace que todos los métodos y propiedades de un determinada objeto, estén disponibles para otro objeto. La reutilización es el mayor beneficio de esto. Esto forma una jerarquía entre estas dos clases y el objetivo de esto es reutilizar la lógica que es común a ambas clases. La clase hija además puede tener algunos métodos propios. Para acceder a los poderes que tiene la superclase (clase padre), es necesario utilizar el método super().
El Principio de Substitución de Liskov es uno de los principios SOLID y hace referencia a cómo usamos la herencia de forma adecuada. El principio dice algo como lo siguiente si S es un subtipo de T , T puede ser reemplazado con objetos de tipo S sin alterar el comportamiento esperado en el programa.

- POLIMORFISMO: (muchas formas) significa que una clase hija puede sobreescribir un método que heredó de una clase padre. (cuando un método tiene el mismo nombre pero una implementación diferente en distintas clases) se denomina polimorfismo. Cuando un método de una subclase reemplaza la implementación de la superclase (clase padre), decimos que la subclase reemplaza la versión de la superclase.

INSTANCIAS: 

En JS cada objeto tiene asociado un prototitpo. Este prototipo contiene métodos y propiedades a los que todos los objetos que están vinculados a ese prototipo pueden acceder y usar. Este comportamiento suele denominarse herencia prototípica. Los objetos heredan métodos y propiedades del prototipo, razón por la cual

En términos generales, la programación orientada a objetos es un paradigma de programación o un conjunto de conceptos en los que el código está organizado de tal manera que crea un modelo centrado en el objeto instanciado (normalmente a través de clases) que contiene el estado y el comportamiento, es decir, las cosas que tiene el objeto (características/atributos) y las cosas que hace el objeto (métodos/funciones). Cada instancia de esta clase es un objeto que también instanciará su estado individual y tiene acceso a sus funciones heredadas. Así, podemos crear, por ejemplo, un animal. Ese animal puede tener un nombre y varias características y cosas que hace, como hablar. "Miau".

*/

//Ejemplo:

// class Arbol {
//   constructor(name, maxHeigthMts, color) {
//     this.name = name;
//     this.maxHeigthMts = maxHeigthMts;
//     this.color = color;
//   }
// }
// let arbol = new Arbol('PaloBorracho', 25, 'pink');
// console.log(arbol); // Arbol {name: 'PaloBorracho', maxHeigthMts: 25, color: 'pink'}

///////////////////////////////////////

// class Rectangle {
//   constructor(width, height) {
//     this.width = width;
//     this.height = height;
//   }
//   // Instance method
//   getArea() {
//     return this.width * this.height;
//   }
//   // Static method
//   static compareArea(rect1, rect2) {
//     return rect1.getArea() - rect2.getArea();
//   }
// }
// let rect1 = new Rectangle(5, 8);
// let rect2 = new Rectangle(6, 7);
// console.log(Rectangle.compareArea(rect1, rect2)); // -2

///////////////////////////////////////

// class shape {
//   constructor(name, sides, sideLength) {
//     this.name = name;
//     this.sides = sides;
//     this.sideLength = sideLength;
//   }

//   calcPerimeter() {
//     console.log(this.sideLength * this.sides);
//   }
// }

// let square = new shape('square', 4, 5);
// square.calcPerimeter();

// let triangle = new shape('triangle', 3, 3);
// triangle.calcPerimeter();

///////////////////////////////////////

/* OOP in Javascript

Array.prototype -> es el objeto prototipo de todas las matrices que creamos en JS. Este prototipo contiene todos los métodos de la matriz, incluído map(), (ver ejemplo curso).

¿Cómo implementamos la OOP en la práctica?? Hay tres formas diferentes. 
-> Función constructora:
Es la forma de crear objetos automáticamente mediante programación, usando una función que también establecerá el prototipo del nuevo objeto. Así es como se construyen objetos como arrays, maps o sets, y es como se vienen haciendo desde siempre. 

-> ES6 clases:
Es la forma más moderna de hacer OOP en JS, se llaman "syntactic sugar" sobre funciones constructoras. Esto significa que la ES6 clases es solo una capa superficial, que se implementa usando funciones de constructor detrás de escena. Es en realidad es una sintaxis agradable que facilita la lectura de OOP. 

-> Object.create():
Es la forma más facil y sensilla de vincular un objeto a un objeto prototipo. Sin embargo no es tan utilizado, como los otros dos métodos anteriores. 

 */

///////////////////////////////////////

// // Constructor Function:

// // Las funciones constructora son plantillas para crear objetos reutilizables. El nombre de la función siempre debe comenzar con mayúscula (capitalizada). En las funciones de construcción no es posible usar arrow functions, porque no tienen su propia 'this' keyword y en este caso las vamos a necesitar. Entonces solo podemos usar declaraciones de función y expresiones de función.

// const Person = function (firstName, birthYear) {
//   // Instance properties:
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   // // NUNCA CREAR UN METODO DENTRO DE UNA CONSTRUCTOR FUNCTION (hacerlas en los prototipos)
//   // this.calcAge = function () {
//   //   console.log(2037 - this.birthYear);
//   // };
// };

// const jonas = new Person('Jonas', 1991);
// console.log(jonas);

// // IMPORTANTE: Lo que sucede cuando llamamos a la función 'Person' usando 'new' es que detrás de escena ha habido 4 pasos:

// // 1. New {} is created -> Un nuevo objeto es creado.

// // 2. Function is called, this = {} -> Se llama a la función y en la llamada de función la palabra clave 'this' se establecerá en este objeto recién creado (this = {}).

// // 3. {} linked to prototype -> el nuevo objeto creado es vinculado al prototipo.

// // 4. Function automatically return {} -> La función constructora devuelve automáticamente el objeto vacío creado al principio. Pero en este punto, ya no necesita estar vacío, sinó que va a tener las propiedades que le asignemos.

// const matilda = new Person('Matilda', 2017);
// const jack = new Person('Jack', 1975);
// console.log(matilda, jack);

// /* INSTANCIAS: Un objeto creado a partir de una clase, es llamado "instancia". Aquí realmente no creamos una clase, porque JS no tiene clases en el sentido tradicional de OOP. Sin embargo creamos un objeto a partir de una función constructora y en realidad tres objetos (jonas, matilda, jack).
// Las funciones constructoras se usaron desde el comienzo de JS para simular clases, y por lo tanto podemos decir que 'jonas' es una instancia de 'Person', lo mismo ocurre con 'matilda' y 'jack'.
// Hay un operador que podemos usar para probar esto, 'instanceof' devuelve 'true' o 'false'.
// */

// // instanceof:

// console.log(jonas instanceof Person); // true

// /* NO USAR METODOS DENTRO DE FUNCIONES CONSTRUCTORAS: No se recomienda usar métodos dentro de funciones constructoras, porque se copiarían dentro de cada instancia, y eso haría que las funciones se ejecuten una a una dentro de cada instancia siendo terrible para el rendimiento del código.
// EN SU LUGAR USAMOS PROTOTIPOS Y HERENCIA DE PROTOTIPOS.

// Las 'instance properties' van a estar disponibles en todas las instancias que se creen a través de esta función constructora

// Tener en cuenta que las funciones constructoras no son realmente una característica del lenguaje JS, son simplemente un patrón desarrollado por otros desarrolladores y ahora todo el mundo usa esto, la verdadera magia es el operador 'new' y los 4 pasos que suceden dentro de la función constructora (mirar más arriba).
// */

///////////////////////////////////////

// // Prototypes:

// /* Todas y cada una de las funciones en JS tienen una propiedad llamada 'prototype' y eso incluye a las funciones constructoras.
// Cada objeto creado por una determinada función constructora tendrá acceso a todos los métodos y propiedades que definimos en la propiedad del prototipo del constructor.
// */

// console.log(Person.prototype);

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// /* La propiedad 'prototipo' de la función constructora Person. Ahora tiene una nueva función 'calcAge' y cada una de sus instancias (jonas, matilda y jack) puede acceder a ella.
// Esto resuelve el problema anterior, en el que no se podían agregar métodos directamente en las funciones constructoras, en este caso dentro de Person.

// Cada objeto creado por la función constructora 'Person' tendrá acceso a todos los métodos que tiene la propiedad prototipo de Person. Y en este caso por supuesto también a calcAge. Esto se conoce como: "herencia de prototipos".

// Es más eficiente porque tenemos una sola copia a la que pueden acceder todas las instancias (es reutilizada). En cambio si colocamos el método directamente dentro de Person (cosa que no se puede hacer), cada instancia va a tener una copia del método, esto haría que baje la performance y el rendimiento del código a la hora del procesamiento.

// Cuando usemos 'calcAge' en cada instancia, la palabra 'this' se referirá al objeto instanciado desde el cual estamos llamando a la función, ejemplo 'jonas'.
// */

// jonas.calcAge(); // 46 -> podemos usar el método 'calcAge()' en la instancia 'jonas' por más que no esté en el, en sí. Porque se lo agregamos al prototipo de la función constructora (clase) Person. (jonas puede acceder a él por la HERENCIA DE PROTOTIPOS).
// matilda.calcAge(); // 20

// /* Cualquier objeto puede acceder a propiedades, funciones y métodos alojados en su propiedad prototipo.*/

// /* WARNING! Hoy en día es una mala práctica usar '__proto__' porque permite acceder y modificar [[Prototype]] de manera dinámica. [[Prototipe]] es una propiedad interna de los objetos y no se accede directamente en el código. Por su parte, __proto__ es una propiedad heredada de Object.prototype.
// Para acceder y trabajar con prototipos es necesario usar los métodos oficiales del estándar ES6+:
// Object.getPrototypeOf(jonas) -> Para obtener el prototipo de un objeto.
// Object.setPrototypeOf(jonas, newProto) ->  Para cambiar el prototipo de un objeto (aunque esto también tiene impacto en el rendimiento y no se recomienda para código de alto rendimiento))
// */

// console.log(jonas.__proto__); // {calcAge: ƒ}

// // El prototipo de jonas es escensialmente la propiedad prototipo de la función constructora.

// console.log(jonas.__proto__ === Person.prototype); // true -> confirma que el prototipo de 'jonas' es igual al prototipo de 'Person.prototype'.

// /* 'Person.prototype' no es el prototipo de Person. Pero es lo que usará como prototipo de todos los objetos que se creen con la función constructora de Person. En realidad 'prototype' debería llamarse algo así como: .prototypeOfLinkedObjects, pero es un nombre muy largo y por eso le habrán puesto solo prototype */

// console.log(Person.prototype.isPrototypeOf(jonas)); // true  -> confirma que 'Person.prototype' es el prototipo de 'jonas'.

// console.log(Person.prototype.isPrototypeOf(matilda)); // true

// console.log(Person.prototype.isPrototypeOf(Person)); // false

// /* Person.prototype es el prototipo de los objetos vinvulados (las copias realizadas "instancias" de la función constructora) no de Person.

// Básicamente el paso nº3 creará la propiedad .__proto__ en el objeto instanciado y establece su valor en la propiedad prototipo de la función que se llama.
// */

// // Establecer propiedades en el prototipo:

// // También es posible establecer propiedades en el prototipo, no solo métodos.
// Person.prototype.species = 'Homo Sapiens';
// console.log(jonas.species, matilda.species); // Homo Sapiens Homo Sapiens

// // Las propiedades propias son solo las que se declaran directamente en el objeto mismo. Sin incluir las propiedades heredadas. En JS hay una forma de comprobar esto:

// console.log(jonas.hasOwnProperty('firstName')); // true

// console.log(jonas.hasOwnProperty('species')); // false -> esto se debe a que esta propiedad 'species' no está realmente dentro del objeto 'jonas' simplemente tiene acceso a él, debido a su prototipo. Es decir, porque está en el prototipo de Person.

///////////////////////////////////////

// Herencia prototípica o delegación prototípica.

/* El objeto 'jonas' heredó el método calcAge de su prototipo. O en otras palabras delegó la funcionalidad calcAge a su prototipo. Esto es esencial para el rendimiento del código */

// Cadena de prototipos: es una serie de vinculaciones entre objetos y sus prototipos. El prototipo de Person.prototype es Object.prototype, dado que para construir el objeto Person se tuvo que utilizar object. Entonces {} es un atajo para construir person. Todos estos prototipos desde las instancias hasta el primer objeto desde donde se crea Person conforman una cadena de prototipos. El prototipo del primer objeto que crea Person es 'null' y esto marca el final de la cadena de prototipo.

// La cadena de prototipos es similar al scope chain, pero con prototipos. En este caso siempre que JS pueda encontrar una determinada propiedad o método en un objeto, buscará el siguiente prototipo en la cadena de prototipos y verá si puede encontrarlo allí.

///////////////////////////////////////

// // Herencia y cadena de prototipos en objetos integrados como matrices.

// console.log(jonas.__proto__);

// // Object.prototype (top of prototype chain):
// console.log(__proto__.__proto__);
// console.log(__proto__.__proto__.__proto__);

// console.log(Person.prototype.constructor);

// const arr = [3, 9, 9, 2, 4, 2, 3, 2, 9, 4];
// console.log(arr.__proto__); // podemos ver todos los métodos que se le pueden aplicar a los arrays.

// /* Por supuesto estos métodos no están en todos los arrays, sin embargo cada array (matriz) puede acceder al método que quiera porque hereda estos métodos de su prototipo */

// console.log(arr.__proto__ === Array.prototype); // true

// // La propiedad prototipo del constructor será el prototipo de todos los objetos creados por ese constructor.

// // Por ejemplo si miramos en el MDN web docs, el método filter(), vemos que aparece como 'Array.prototype.filter() esto es porque este método vive en la propiedad prototipo del constructor de la matriz.

// // ESTO ES UNA MALA PRACTICA ⬇ hacerlo únicamente si es un proyecto pequeño.
// // Por ejemplo podemos agregar cualquier método nuevo al prototipo del array y podrán heredarlo todas las demás matrices.
// // POR EJEMPLO: Digamos que queremos crear un método que retorne solo los valores únicos de la matriz. Entonces creamos el método 'unique':
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };
// console.log(arr.unique()); // (4) [3, 9, 2, 4]
// // Ahora podemos llamar al método 'unique' en cualquier Array que queramos.

// // Seguimos probando algunas cosas... (hacerlo con cuidado)

// const h1 = document.querySelector('h1');

// console.dir(x => x + 1);

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   console.log(`${this.make} is going at ${(this.speed += 10)} km/h`);
// };

// Car.prototype.brake = function () {
//   console.log(`${this.make} is going at ${(this.speed -= 5)} km/h`);
// };

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);

// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// bmw.accelerate();
// bmw.brake();
// bmw.brake();

// mercedes.accelerate();
// mercedes.brake();
// mercedes.brake();
// mercedes.brake();

///////////////////////////////////////

// // ES6 classes:

// /* Acá si podemos agregar métodos internos. */

// /* Las clases de JS no funcionan como las clases tradicionales en otros lenguajes, como Java o C++, por lo que las clases en JS son solo azúcar sintético (mejoran la legibilidad, apariencia y usabilidad del código, pero sin modificar cómo funciona internamente.) */

// // Class expression
// //const PersonCl = class { aquí iría la función };

// // Class declaration
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // Instance methods
//   // Métodos, se escriben dentro de la clase, pero fuera del constructor.
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey ${this.firstName}`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   } // este es otro método con el que podemos obtener la edad que va a tener en 2037.

//   // Set a property that already exist
//   set fullName(name) {
//     console.log(name);
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // Static methods
//   static hey() {
//     console.log(this);
//     return 'Hey there 👋🏻';
//   }
// }

// const jessica = new PersonCl('Jessica Davis', 1996);
// console.log(jessica);
// jessica.calcAge();

// console.log(jessica.age); // 41 (este es el otro método para calcular la edad mirar más arriba)

// console.log(jessica.__proto__ === PersonCl.prototype); // true

// // Los métodos se escriben dentro de la clase, pero fuera del constructor y se agregarán automáticamente a la propiedad .prototype de la clase, en este caso PersonCl.

// // PersonCl.prototype.greet = function () {
// //   console.log(`Hey ${this.firstName}`);
// // };  -> es lo mismo que escribirlo dentro de la clase (ver más arriba ⬆)

// jessica.greet();

// // 1. Classes are NOT hoisted.
// /* Las clases NO se hoisting (mueven automáticamente al inicio de su contexto global o de contexto durante la fase de compilación) */

// // 2. Classes are first-class cotizes.
// /* Podemos pasar las clases a funciones y también devolverlas desde funciones*/

// // 3. Classes are executed in strict mode.
// /* El cuerpo de una clase siempre se ejecuta en strict mode, incluso si no lo activamos para todo nuestro script */

///////////////////////////////////////

// // Setters and getters:

// // Captadores y definidores

// const walter = new PersonCl('Walter White', 1965);

// const account = {
//   owner: 'Jonas',
//   movements: [200, 530, 120, 300],

//   get latest() {
//     return this.movements.slice(-1).pop();
//   },

//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };

// console.log(account.latest); // 300

// account.latest = 50;
// console.log(account.movements); // (5) [200, 530, 120, 300, 50]

// // Actualmente no es muy necesario usar Get y Set.

///////////////////////////////////////

// Static Methods

/* Un método estático es un método que pertenece a la clase en sí y no a sus instancias, es decir no que no podemos llamarlo desde un objeto creado con la clase, sinó directamente desde la clase. 
Se crean usando la palabra clave static, antes del método dentro de una clase, sin necesidad de instanciarla. 
*/

// No se puede acceder a this de la instancia, porque no operan sobre una instancia en particular (no operan sobr ejessica, jonas, por ejemplo)

// son útiles para funciones auxiliares, contadores de clase o métodos que generen instancias.

//console.log(PersonCl.hey()); // Hey there

//console.log(jessica.hey()); // Error  -> jessica.hey no es una función.

/*  ¿Cuándo usar métodos estáticos ? 
son útiles cuando una función no depende de los datos de una instancia, sino que opera sobre la propia clase. Algunos casos comunes son:

-> Utilidades o funciones auxiliares. Por ejemplo, convertir texto a mayúsculas:
// class Utilidades {
//   static convertirMayusculas(texto) {
//     return texto.toUpperCase();
//   }
// }

// console.log(Utilidades.convertirMayusculas('hola')); // "HOLA"

-> Contadores o estadísticas de clase:
// class Persona {
//   static contador = 0; // Variable de clase

//   constructor(nombre) {
//     this.nombre = nombre;
//     Persona.contador++; // Se incrementa cada vez que se crea una instancia
//   }

//   static totalPersonas() {
//     return `Se han creado ${Persona.contador} personas.`;
//   }
// }

// const p1 = new Persona("Flor");
// const p2 = new Persona("Juan");

// console.log(Persona.totalPersonas()); // "Se han creado 2 personas."

-> Métodos que crean instancias de la misma clase: 
// Ejemplo: un método que cree una persona con un nombre por defecto. 
// class Persona {
//   constructor(nombre) {
//     this.nombre = nombre;
//   }

//   static crearAnonimo() {
//     return new Persona("Anónimo");
//   }
// }

// const anonimo = Persona.crearAnonimo();
// console.log(anonimo.nombre); // "Anónimo"

*/
///////////////////////////////////////

// // Object.create

// // El objeto creado con 'object.create' es literalmente el objeto prototipo.
// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);
// console.log(steven);
// steven.name = 'Steven';
// steven.birthYear = 2002;
// steven.calcAge();
// // devuelve un nuevo objeto que está vinvulado al prototipo que pasamos acá. Steven es ahora un objeto vacío y estará vinvulado a este objeto PersonProto.

// // configuramo el prototipo de objetos manualmente a cualquier objeto que queramos.

// // En el mundo real, esta es la forma menos usada de implementar la herencia prototípica.

// console.log(steven.__proto__ === PersonProto);

// const sarah = Object.create(PersonProto);
// sarah.init('Sarah', 1979); //  Pasamos los valores para que el objeto de sarah tenga datos para funcionar correctamente.
// sarah.calcAge(); //58

// // Object.create crea un nuevo objeto y el prototipo de ese objeto será el objeto que le pasamos.

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

/*
// 1. recrear Challenge #1 usando ES6 class.
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford.speedUS);
ford.accelerate();
ford.accelerate();
ford.brake();
ford.speedUS = 50;
console.log(ford);
*/

///////////////////////////////////////
/* Herencia entre "clases"

 Todos las técnicas (Constructor Functions - ES6 Classes - object.create), báscicamente permiten a los objetos, heredar métodos de sus prototipos. 

Como ejemplo para estudiar la real herencia entre clases, vamos a usar un ejemplo donde creemos una clase 1 "Student" y una clase 2 "Person", donde este último sea la clase padre y student la clase hijo. 

Para que podamos decir que entonces un estudiante también es una persona y puede usar todos los métodos que tiene persona. 
*/

///////////////////////////////////////

// Herencia entre clases (Linking Prototypes con Funciones Constructoras):

/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
}; // Para no repetir las mismas propiedades que tiene Person, se usa método 'call' que llamará a esta función, pero podremos especificar las palabras clave 'this' aquí, como el primer argumento de esta función. Es más facil para aplicar las dos variables firstName, birthYear en una sola línea.

// Linking prototypes (Mirar más abajo NOTAA**)
Student.prototype = Object.create(Person.prototype); // enlazamos a Student.prototype a Person.prototype para que herede sus métodos.
// ¿Qué hace esto?
// Object.create(Person.prototype) crea un nuevo objeto vacío que hereda de Person.prototype.
// Luego le asignamos ese objeto a Student.prototype, estableciendo la herencia. 
// Pero hay un problema, esto rompe el constructor de Student (ver como arreglarlo más abajo en NOTA**) 

// Agregamos métodos específicos a Student.prototype
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

// Creamos instancias y probamos
const mike = new Student('Mike', 2020, 'Computen Science');
mike.introduce();
mike.calcAge(); // 17 -> el objeto 'mike' puede heredar cualquier método que esté en su clase padr.

// Básicamente ahora podemos llamar a un método que está en la propiedad del prototipo de Person, en un objeto Student , y aún funciona.

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true
console.log(mike instanceof Object); // true

//  NOTAA** Arreglamos adonde apunta el constructor
Student.prototype.constructor = Student; // el constructor antes seguía apuntando a Person, lo arreglamos con esto y ahora apunta a Student.

console.dir(Student.prototype.constructor);
*/

///////////////////////////////////////

// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  console.log(`${this.make} is going at ${(this.speed += 10)} km/h`);
};

Car.prototype.brake = function () {
  console.log(`${this.make} is going at ${(this.speed -= 5)} km/h`);
};

// 1.
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// Linkeamos los prototipos
EV.prototype = Object.create(Car.prototype);
// Arreglamos adonde apunta el construtor
EV.prototype.constructor = EV;

// 2. método chargeBattery
EV.prototype.chargeBattery = function (chargeTo) {
  return (this.charge = chargeTo);
};

// 3. método accelerate
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

// 4. Creamos instancias y probamos
const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();
tesla.accelerate(); // el método del child class anuló al método del parent class (esta es a definición de Polimorfismo)
*/

///////////////////////////////////////

// Herencia entre clases con ES6 classes:

// Cuando usamos la 'extends' keyword, JS hace automáticamente Student.prototype = Object.create(Person.prototype) igual que antes, pero sin la necesidad de escribirlo.
// Por otro lado 'super' function ejecuta el constructor de Person. No necesitamos reasignar 'constructor' porque JS lo maneja.
// Esto hace que Student herede de Person, sin que tengamos que manipular prototype nanualmente.

/*
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exist
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static methods
  static hey() {
    console.log(this);
    return 'Hey there 👋🏻';
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Esto siempre debe pasar primero!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  // Anulamos el método calcAge anterior, con este nuevo:
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

// super() es básicamente la constructor function del parent class.
// Debemos escribir/ llamar a 'super' -> el constructor de la parent class), luego a partir de esto podremos acceder a la this keyword

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();
martha.greet();
*/

///////////////////////////////////////

// Herencia entre clases con Object.create

/*
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

// Queremos agregar otro prototypo en medio de la cadena, entre 'PersonProto' y el objeto. Entonces, vamos a hacer que Student herede directamente de PersonProto
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto); // El 'StudentProto' que creamos antes ahora es el prototipo de 'jay'.
jay.init('Jay', 2010, 'Computer Science');

jay.introduce();
jay.calcAge();

// StudentProto es el prototipo de jay, y el objeto PersonProto es a su vez el prototipo de StudentProto. Por lo tanto PersonProto es un prototipo padre de jay, lo que a su vez significa que está en su cadena de prototipos.
*/

///////////////////////////////////////

// Class Fields

// Otros ejemplos de clases:
// Encapsulamiento - Campos privados en clases y en métodos:

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// STATIC version of these 4 steps

class Account {
  // Publics fields
  locale = navigator.language;
  bank = 'Bankist';

  // Private field
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    //this.movements = []; -> lo pasamos a private field
    // this.locale = navigator.language; -> dejamos este campo por fuera, para que sea public field

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Public interface (API)
  getMovements() {
    return this.#movements;
    // Not chainable
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  #approveLoan(val) {
    // Fake method
    return true;
  }
  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
    return this;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
// acc1.deposit(300);
// acc1.withdraw(100);
const movements = acc1
  .deposit(300)
  .withdraw(100)
  .withdraw(50)
  .requestLoan(25000)
  .withdraw(4000) // Todos los métodos de arriba funcionan bien, porque necesitan ser llamados en una instancia de la clase (en este caso acc1) y para que funcionen necesitan ser llamados también en un objeto de cuenta, y qué es ese objeto de cuenta? Bueno, dentro de cada método es el 'this' que está al lado de cada return.
  .getMovements();

console.log(acc1);

console.log(movements); // (5) [300, -100, -50, 25000, -4000]

// console.log(acc1.#movements); -> esto ya no se puede hacer
// acc1.requestLoan(1000);
// acc1.movements.push(250);
// acc1.movements.push(-140); -> estas formas no son muy recomendadas de usar

// IMPORTANTE: En este ejemplo, (la aplicación bancaria) los 'movements' solo deberían ser manipulados por 'deposit' o 'withdraw' y tal vez algún otro método que especifiquemos para chequear los movimientos, pero nada más. No queremos que nadie pueda manipular los datos desde el exterior.

// Necesitamos encapsular ciertos datos, y tener privacidad para evitar que el código de fuera de una determinada clase para manipular accidentalmente nuestros datos que viven dentro de la clase y esto puede ocurrir cuando alguien interactúa con las propiedades de un objeto que se supone que nadie debe leer o establecer manualmente.

// La segunda razón por la que necesitamos privacidad de datos es que cuando exponemos solo una pequeña interfaz, por lo que esa pequeña API que acabo de mencionar, solo consta de unos pocos métodos públicos, entonces podemos cambiar todos los demás métodos internos dentro de la clase con mucha confianza. Porque así podemos estar seguros de que el código externo no depende de otros métodos y por lo tanto el código no se romperá cuando hagamos estos cambios internos.

// ¿Qué es un field? es una propiedad que estará en todas las instancias de la clase, por eso también lo llamamos campo de instancia pública. Esto significa que podemos declarar todo como un campo que quiere estar presente en todas las instancias, pero no en el prototipo. Estos campos (fields) no serán heredados, por lo que a diferencia de los métodos que se añadirán al prototipo para que las instancias los hereden.

///////////////////////////////////////

// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// Parent Class
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
    return this; // unto 3. recordar poner esta linea para lograr unir las llamadas a los métodos
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

// Child Class
// Punto 1. creamos el class child EVCl del parent class CarCl
class EVCl extends CarCl {
  #charge; // Punto 2.

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this; //  Punto 3. recordar poner esta linea para lograr unir las llamadas a los métodos
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this; //  unto 3. recordar poner esta linea para lograr unir las llamadas a los métodos
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);
//console.log(rivian.#charge); -> no podemos acceder a la clase porque efectivamente está encapsulada y quedó privada, no hay forma de modificarlo, excepto por accelerate() o brake().
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();

console.log('velocidad en millas:', rivian.speedUS);

// NOTA: para lograr hacer chain con los métodos, debemos escribir 'return this' en cada método.
