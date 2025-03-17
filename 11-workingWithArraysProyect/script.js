'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: 'premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'standard',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  // los valores se ordenan de forma descendente o ascendente dependiendo de si sorte es falso o no.
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements; //creamos una copia usando el método slice.

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `  
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov} €</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

///////////////
// Queremos colocar la sumatoria de movimientos en la etiqueta de Balance:

const calcDisplayBalance = function (acc) {
  // acc es la abreviatura de account
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance} €`;
};

///////////////
// Ahora le colocamos los valores correspondientes en las etiquetas de IN, OUT e INTEREST:

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`; // Math.abs () --> se usa para remover el signo positivo de un valor.

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      //console.log(arr);
      return int >= 1; // NOTA: ahora colocamos una regla nueva, el Banco paga intereses únicamente si el interés a pagar es de al menos 1 euro.
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest} €`;
};

// NOTA: no deberíamos abusar del encadenamiento, por lo que deberíamos intentar ptimizarlo porque encadenar toneladas de métidos uno tras otro puede causar problemas reales de rendimiento, si tenemos arrays muy grandes. Entonces si tenemos una cadena de métodos, encadenados uno tras otro, deberíamos intentar comprimir toda la funcionalidad que hacen en la menor cantidad de métodos posible.
// También es una mala práctica en JS encadenar métodos que mutan la matriz original, un ejemplo de esto es el método splice y el método reverse.

///////////////
//  +++++++ ESTA PARTE SE MODIFICO UN POCO MAS ABAJO +++++++ //

// Ahora suponemos que queremos una función que genere usernames para cada account, tomando como base el nombre de usuario (la idea es hacer el username con las iniciales del nombre completo)
// FORMA CORTA DE HACERLO:
// const createUsernames = function (user) {
//   const username = user
//     .toLowerCase()
//     .split(' ')
//     .map(name => name[0])
//     .join('');
//   return username;
// };
// console.log(createUsernames('Steven Thomas Williams')); // //imprime: stw

// FORMA LARGA DE HACER EL MISMO CÓDIGO DE ARRIBA
// const user = 'Steven Thomas Williams';
// const username = user
//   .toLowerCase()
//   .split(' ')
//   .map(function (name) {
//     return name[0];
//   })
//   .join('');

// console.log(username);

///////////////
//  +++++++ MIRAR LAS MODIFICACIONES EN ESTA SECCION DEL CODIGO +++++++ //

// Ahora queremos modificar cada elemento (objeto) dentro del array 'accounts' y guardar los cambios.
// Para ello, tomamos la función 'createUsernames' que hicimos anteriormente y la ajustamos para que,
// en lugar de recibir un único usuario, reciba el array 'accounts' completo.
// La función recorrerá el array y, en cada iteración, agregará la propiedad 'username' a cada objeto dentro del array.
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner //tomamos el nombre (owner) y lo transformamos en 'username'
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
// console.log(accounts);

///////////////
// Refactorizamos estas tres funciones agregádolas a una (updateUI):

const updateUI = function (acc) {
  // Cada vez que llamemos a esta función va a realizar estas tres tareas:
  // 1 - Mostrarmos los Movimientos:
  displayMovements(acc.movements); //esta función espera un argumento de 'movimients'

  // 2 - Mostramos el Balance:
  calcDisplayBalance(acc);

  // 3 - Mostramos el Summary:
  calcDisplaySummary(acc);
};

///////////////
// Ahora agregamos el Event handler:

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //Para evitar que el formulario se recargue.

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  // Ahora revisamos si el PIN ingresado es correcto.
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //agregamos el signo de pregunta --> '?' para comprobar de forma elegante si el usuario ingresado existe en la base de cuentas.

    //Mostramos la pantalla UI y el mensaje de bienvenida:
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0] //seteamos el mensaje de bienvenida según el usuario
    }`;
    containerApp.style.opacity = 100; // cambiamos la opacidad para ver lo que está oculto

    //Borrar los campos de entrada: (Clear imput flield)
    inputLoginUsername.value = inputLoginPin.value = ''; // Borra de los botones USER y PIN lo que hayamos escrito
    inputLoginPin.blur(); //esto quita el cursor del boton PIN

    // Actualización del UI (actualiza la vista y todos los movimientos)
    updateUI(currentAccount); // llama a la función refactorizada (que actualiza todos los valores de los movimientos)
  }
});

///////////////
// Implementamos las transferencias de dinero de un usuario a otro:

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); // con esto prevenimos el comportamiento que tiene por default
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  ); // estamos buscando la cuenta que tiene el mismo nombre de usuario que se colocó en el formulario al cual se va a transferir en la sección 'inputTransferTo'

  inputTransferAmount.value = inputTransferTo.value = '';

  //Abajo primero verificamos si el monto a transferir es un numero real mayor a 0, luego si el destinatario de la transferencia es un usuario que realmente exista, y por último si el usuario tiene dinero suficiente para realizar la trasnferencia.
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Ahora descontamos / sumamos los movimientos de transferencia:
    currentAccount.movements.push(-amount); // descontamos lo trasnferido en los movimientos del emisor
    receiverAcc.movements.push(amount); // sumamos lo transferido en los movimientos del receptor
  }

  // Actualización del UI (actualiza la vista y todos los movimientos)
  updateUI(currentAccount); // llama a la función que actualiza todos los valores de los movimientos)
});

///////////////
// Configuramos la sección 'Request Loan':

// Agregamos la siguiente situación: EL banco tiene una regla en la que sólo entrega préstamos si se tiene un depósito con al menos el 10% del monto del prestamo solicitado:
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.1)) {
    // Agregamos el movimiento del préstamo:
    currentAccount.movements.push(amount);

    // Actualizamos el UI:
    updateUI(currentAccount);

    //Borramos el campo de entrada:
    inputLoanAmount.value = '';
  }
});

///////////////
// The FINDINDEX METHOD:

// Ahora lo que queremos hacer es configurar que la zona de 'close account' realmente funcione, es decir que cuando coloquemos un usuario y el PIN se de de baja del array que contiene las cuentas (accounts) se elimina el usuario.
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  // Ahora revisamos si el usuario ingresado es el mismo que está logueado:
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // Abajo guardamos en index, la posición que se enconstró del usuario en el array 'accounts'
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // NOTA A: .indexOf(23) // podemos buscar un valor específico, si la matriz contiene 23 entonces el valor es true.

    // NOTA B: En cambio con .findIndex podemos colocar otro valor, no necesariamente el número en sí, puede ser otra cosa que de como resultado verdadero o falso.

    // Eliminar cuenta
    accounts.splice(index, 1); // eliminamos usuario --> en realidad eliminamos la posición encontrada arriba, por ende se elimina el usuario del array.

    // Esconder UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted); //en la parte final queremos lo opuesto a lo que está guardado en la variable 'sorted'
  sorted = !sorted; // Con esto cada vez que hacemos click, cambiamos a 'sorted' de true a false y así sucesivamente.
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// *** Métodos para usar en Arrays:
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE (método de corte)
// NO muta el array original. En realidad copia el array original y nos devuelve la parte cortada que le pedimos. Podemos extraer parte de cualquier matriz, sin cambiar la matriz original.

console.log(arr.slice(2)); // imprime: (3) ['c', 'd', 'e']
console.log(arr.slice(2, 4)); // imprime: (2) ['c', 'd']
console.log(arr.slice(-2)); // devuelve los últimos 2 elementos del array ['d', 'e']
console.log(arr.slice(-1)); // -1 siempre devuelve el último elemento del array ['e']
console.log(arr.slice(1, -2)); // imprime:(2) ['b', 'c'] corta el primer elemento y los últimos 2.
console.log(arr.slice()); // obtenemos una copia del array (5) ['a', 'b', 'c', 'd', 'e']
console.log([...arr]); // esta es otra forma de obtener una copia del array (5) ['a', 'b', 'c', 'd', 'e']

// SPLICE : (método de empalme)
// Muta el array original. Funciona igual que el método slice, solo que acá si cambia al array original, lo muta. Y el segundo parámetro que especicamos es la cantidad de elementos a eliminar.
//console.log(arr.splice(2)); // imprime: (3) ['c', 'd', 'e']
arr.splice(-1); // elimió el ultimo elemento
console.log(arr); // imprime: (4) ['a', 'b', 'c', 'd']
arr.splice(1, 2); // vamos a la posición 1 -> 'a' y eliminamos 2 posiciones la 'b', 'c'.
console.log(arr); // imprime: (2) ['a','d'] - imprime los elementos que quedaron luego del corte de arriba.

// REVERSE: (método de inversión)
// Muta al array original. Devuelve el array de forma inversa y muta el original.
arr = ['a', 'b', 'c', 'd', 'e'];
let arr2 = ['j', 'i', 'h', 'g', 'f'];

console.log(arr2.reverse()); // (5) ['f', 'g', 'h', 'i', 'j']
console.log(arr2); // (5) ['f', 'g', 'h', 'i', 'j'] quedó como el de arriba, porque el original ya mutó.

// CONCAT : (método de concatenado)
// se usa para concatenar dos matrices.
const letters = arr.concat(arr2);
console.log(letters); // imprime: (10) ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
console.log([...arr, ...arr2]); // es lo mismo de arriba y tampoco muta al array original, solo crea una copia de ambos arrays. (10) ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

// JOIN: (método de union)
// No muta el array original. Une los elementos de por ejemplo un array, separados por lo que le especifiquemos
const cita = letters.join(' - '); // guardo el array copia en la variable 'cita'
console.log(cita); // imprime:  //   a - b - c - d - e - f - g - h - i - j
console.log(letters); // (10) ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
console.log(letters.join('_')); // imprime: a_b_c_d_e_f_g_h_i_j
*/

/////////////////////////////////////////////////
/*
// .AT method:
// podemos reemplazar la notación de corchetes para los index de un array, usando .at() Nos indica la posición de una manera más clara y moderna.
const arr = [23, 11, 64];

console.log(arr[0]); // imprime la posición 0 del array
console.log(arr.at(0)); // hace lo mismo que el codigo de arriba, le indica que tome del array la posición 0 para imprimir.

// OBTENER EL ULTIMO ELEMENTO:
//Digamos que queremos obtener el último elemento del array sin conocer el largo del array:
console.log(arr[arr.length - 1]); // imprime: 64
console.log(arr.slice(-1)); // imprime:[64] --> nos da una copia del array, solo con el último elemento y le quitamos
console.log(arr.slice(-1)[0]); // imprime:64 --> con [0] le quitamos los corchetes al array
console.log(arr.at(-1)); // imprime: 64  --> *** NOS DA EL ULTIMO ELEMENTO DEL ARRAY
// el indice negativo lo que hace es empezar a cortar desde el lado derecho.
console.log(arr.at(-2)); // imprime: 11

// el método .at también funciona con strings...
console.log('jonas'.at(0)); // imprime: j
console.log('jonas'.at(-1)); // imprime: s
*/

/////////////////////////////////////////////////

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`you withdrew ${Math.abs(movement)}`); // .Math.abs() elimina los signos (-) negativos
  }
}

// forEach Method RECORRE CADA LOOP:
// Esta es una forma más facil de recorrer el array 'movements' (en plural), en vez de usar el 'For-of Loop'
// forEach es una función de orden superior que requiere llamar a otra función para que le diga que hacer en cada iteración.
// lo que hace forEach es recorrer el loop y en cada iteración ejecutar la función, además pasará el elemento actual del array como argumento/ parámetro de la función que en este caso llamamos 'movement' (en singular). Lo que hacemos en la función callback es especificar dos opciones de impresión, según el valor del elemento en cada iteración
console.log('---- using: FOREACH method ----');

movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`you withdrew ${Math.abs(movement)}`); //.Math.abs() elimina los signos (-) negativos
  }
});
// iteración 0: (200) --> es > a 0
// iteración 1: (450) --> es > a 0
// iteración 2: (-400) --> es menor a 0
// iteración 3: (3000) --> es > a 0
// ...

// Supongamos que queremos colocar el indice en cada iteración usando "for-of"
console.log('---- * * AGREGAMOS EL INDICE * * ----');
// Recordemos que el primer parámetro siempre es el index y el segundo representa al elemento del array
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited $ ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew $ ${Math.abs(movement)}`); // .Math.abs() elimina los signos (-) negativos
  }
}

// Colocamos INDICES en cada iteración usando FOREACH:
console.log('---- using: FOREACH method ----');
// ForEach en cada iteración devuelve el elemento, la posición del elemento y el array completo.
//el orden de cada parámetro si importa, siempre en forEach el primer parámetro representa al elemento, el segundo al index, y el tercero el array completo.
// NOTA: NO IMPORTA QUE NOMBRES USEMOS, PERO SIEMPRE CADA posición en la función EQUIVALE A ESO)
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited $ ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew $ ${Math.abs(mov)}`); // .Math.abs() elimina los signos (-) negativos
  }
});

//  IMPORTANTE: ¿Cuándo usar Loop For-of y cuando forEach? 
// La diferencia principal entre los dos es que no se puede salir de un bucle forEach , por lo tanto las declaraciones "break" y "continue" no funcionan para nada. 
// Siempre va a recorrer todo el array, no hay nada que podamos hacer. Entonces si realmente necesitamos salir de un loop, debemos usar el for-of loop. 


/////////////////////////////////////////////////
console.log('---- using: FOREACH con MAPS y SETS ----');

// forEach con Maps y Sets:

// MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// SET
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);

console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  // colocamos '_' en el segundo parámetro porque esa variable en SET es igual a value, no la podemos sacar, pero le dejamos '_' indicando que es una variable innecesaria (que no se usa para este caso)
  console.log(`${value}: ${value}`);
});

*/

/////////////////////////////////////////////////

// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// es un adulto si al menos tiene 3 años, de lo contrario es un cachorro

/*
const checkDogs = function (dogsJulia, dogsKate) {
  let newDogsJulia = dogsJulia.slice(1, -2);
  console.log(newDogsJulia);
  let arrDogs = [...newDogsJulia, ...dogsKate];
  // let arrDogs = newDogsJulia.concat(dogsKate);
  console.log(arrDogs);

  arrDogs.forEach(function (dog, i) {
    console.log(
      dog < 3
        ? `Dog number ${i + 1} is still a puppy 🐶`
        : `Dog number ${i + 1} is an adult and is ${dog} years old`
    );
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/

/////////////////////////////////////////////////

// MAP
/* es similar al método forEach, pero la diferencia es que MAP crea una nueva matriz basada en la matriz original. 
La metodología de trabajo de MAP es similar al loop, recorre cada elemento del array y le aplica a cada uno el cálculo o función que le hayamos asignado. 
MAP devuelve un nuevo array que contiene los resultados de aplicar una operación en cada elemento del array original. 
*/

// FILTER
/* se usa para filtrar los elementos de un array original, con la finalidad de realizar alguna operación, los resultados del filtro los copia en una matriz nueva.
 */

// REDUCE
/* como su nombre lo indica reduce, se utiliza para reducir todos los elementos de la matriz en un solo valor. 
Un ejemplo de esto puede ser sumar todos los elementos del array y devolver un único elemento (la suma total). Con reduce no se devuelven arrays, ya que devuelve un único elemento.
*/

/////////////////////////////////////////////////

// EJERCICIO con MAP METHOD:
/*
const eurToUsd = 1.1;

// const movementUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });
// console.log(movements);
// console.log(movementUSD);

const movementUSD = movements.map(mov => mov * eurToUsd); // es el mismo código de arriba pero con arrow function.

console.log(movements);
console.log(movementUSD);

// Entonces MAP recorre la matriz ORIGINAL como lo haría un loop y devuelve una NUEVA matriz que en cada elemento contiene la operación (en este caso una función) realizada sobre cada elemento del array ORIGINAL.
// La metodología "map" va más en línea con la programación funcional.

// El mismo ejemplo de arriba pero con Loop For:
const movementsUDSFor = [];
for (const mov of movements) movementsUDSFor.push(mov * eurToUsd);
//console.log(movementsUDSFor);

///// ** /////
//Ahora queremos hacer con una arrow function con map, un array que contenga dentro de cada elemento una desciprion dependiendo de si fue un depósito o una extracción.
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} $${Math.abs(
      mov
    )}`
); // Lo que hicimos es pasar esta call function al map method y es el método 'map' el que llama a cada elemento (mov) del array para aplicarle la operación con la call function y guardarlo en un array nuevo que se guarda en la variable 'movementsDescriptions'.
console.log(movementsDescriptions);
*/

/////////////////////////////////////////////////

// EJERCICIO con FILTER METHOD:
/*
console.log(movements);

// Queremos crear una matriz de depósitos que estén por arriba de cero.
console.log(' Forma 1 de hacerlo usando FILTER:');
const deposits = movements.filter(function (mov, i, arr) {
  // el metodo filter también tiene 3 parámetros (mov, i, arr) como otros métodos, pero en este caso solo usamos el primero (mov)
  return mov > 0;
}); // usamos un booleano para dejar solo los elementos que queremos en el array (si es mayor a 0 'true' formará parte del nuevo array)
console.log(deposits);

// La de abajo, es otra forma de crear un array usando un For Loop y la sentencia if
console.log(' Forma 2 de hacerlo usando LOOP FOR: ');
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

//Ejercicio repaso:
// ahora guardamos en un array los valores negativos.
console.log('-- EJERCICIO REPASO --');
console.log(' Forma 1 de hacerlo usando FILTER con ARROW FUNCTION: ');
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

console.log(' Forma 2 de hacerlo usando LOOP FOR: ');
const withdrawalsFor = [];
for (const mov of movements) if (mov < 0) withdrawalsFor.push(mov);
console.log(withdrawalsFor);
*/

/////////////////////////////////////////////////

// EJERCICIO con REDUCE METHOD:
/*
console.log(movements);

// Accumulator (acc) --> es como una bola de nieve
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`); // imprime el valor acumulado en c/iteración
//   return acc + cur; //agregamos el valor actual (curr = current) al acumulador (acc = accumulator)
// }, 0); //NOTA: este valor que especificamos, es el valor inicial del acumulador

// Escribimos el mismo código de arriba pero de manera más corta:
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(
  'Resultado obtenido con metodo .reduce y arrow function -->',
  balance
);

// Escribimos el mismo código de arriba pero con For Loop:
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(`Resultado obtenido con For Loop -->`, balance2);

// Maximun Value:
// obtenemos el máximo valor del array de movimientos:
const max = movements.reduce((acc, mov) => {
  if (acc > mov)
    return acc; //Acá preguntamos: "Es el acumulado (acc) mayor que el valor actual (mov) ?" - si es true, devuelve el valor acumulado (acc)
  else return mov; // si la pregunta anterior resultó ser falsa, devuelve el valor actual (mov)
}, movements[0]); // empezamos la acumulación con valor = 0.

console.log('El valor máximo es:', max);
*/
//
////////////////////////////////////////////////

// Trabajando con un ejemplo random de Strings:

// console.log('--- EJEMPLO RADOM ---');
// const x = 'Forma larga de hacer el mismo código de arriba';
// const a = x.toUpperCase().split(' ');
// console.log(a); //imprime: (9) ['FORMA', 'LARGA', 'DE', 'HACER', 'EL', 'MISMO', 'CÓDIGO', 'DE', 'ARRIBA']

////////////////////////////////////////////////

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/*
//Punto 1.
const calcAverageHumanAge = function (ages) {
  const arrHumanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));

  // Punto 2.
  const oldDogs = arrHumanAges.filter(age => age >= 18);

  // //Otra forma de hacer el punto 2:
  // const oldDogs = [];
  // for (const age of arrHumanAges) if (age >= 18) oldDogs.push(age);

  // Punto 3.
  const average = oldDogs.reduce((acc, age) => acc + age, 0) / oldDogs.length;
  return average;

  // // Otra forma de hacer el punto 3:
  // const average = oldDogs.reduce(
  //   (acc, age, i, arr) => acc + age / arr.length,
  //   0
  // );
  // return average;

  // // Otra forma de hacer el punto 3:
  // Queremos calcular el average entre 2 y 3
  // (2+3)/ 2 = 2.5 === 2/2 + 3/2 = 2.5
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);

*/

////////////////////////////////////////////////

/* Coding Challenge #3
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
*/

// NOTA: El desafío es reescribir la función 'calcAverageHumanAge' usando arrow functions y encadenamiento de métodos (map -> filter -> reduce):
/*
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
*/

////////////////////////////////////////////////

// Ejemplo de uso PIPELINE (|>):
// Un PIPELINE es una función que se convierte en la entrada de la siguiente.

// El ejemplo de abajo hace lo mismo que haría un pipeline, tomando el valor de salida de una función como dato para la siguiente función.
//Queremos tomar todos los depósitos y filtrar solo los movimientos positivos. Y el resultado de esto será un nuevo array.

/*
const eurToUsd = 1.1;

// PIPELINE:
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    //console.log(arr);
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd) //sólo podemos encadenar un filter o un mapa si el valor anterior devuelve un array.
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);
*/

// ENCADENAMIENTO: técnica que permite llamar a un método dentro de otro método del mismo objeto o ejecutar varias operaciones asíncronas.

////////////////////////////////////////////////

/*
// DESAFIO: Escribí una función que reciba un array de números y devuelva el promedio de los números pares elevados al cuadrado. Usá encadenamiento de métodos (map, filter, reduce).

// const calcAverageHumanAge = ages =>
//   ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);

const numbers = [3, 7, 2, 8, 10, 5, 4];

const calcAverageEvenSquared = numbers =>
  numbers
    .filter(num => num % 2 === 0)
    .map(num => num ** 2)
    .reduce((acc, num, _, arr) => acc + num / arr.length, 0); // pongo '_' porque no necesitamos el parámetro i.

console.log(calcAverageEvenSquared(numbers));
*/

////////////////////////////////////////////////

/*
// DESAFIO: Escribí una función que reciba un array de palabras y devuelva el largo promedio de las palabras que tienen más de 3 letras. Usá encadenamiento de métodos (filter, map, reduce).

const words = ['code', 'AI', 'JavaScript', 'go', 'React', 'JS'];

const calcAverageWordLength = words =>
  words
    .filter(word => word.length > 3) // 🔹 Filtramos palabras con más de 3 letras
    .map(word => word.length) // 🔹 Convertimos cada palabra en su longitud
    .reduce((acc, length, _, arr) => acc + length / arr.length, 0); // obtenemos el promedio

console.log(calcAverageWordLength(words));
*/

////////////////////////////////////////////////

/*
// FIND method:

// sirve para encontrar un elemento que cumpla o satisfaga la/ las condiciones que especifiquemos.
// Como otros métodos que ya vimos, también es una función y recorre los arrays en forma de loops.
// Es una función de call back que verifica un booleano.
// A diferencia del método filter por ejemplo, FIND no devuelve otro array, en realidad lo que hace es devolver el primer elemento que cumpla con la condición especificada. Entonces devuelve el primer elemento que encuentra mientras hace el loop, para que la condición (mov < 0) sea 'true'.

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

console.log(accounts);

// Digamos que ahora queremos seleccionar un account en base al name.
// Lo que hacemos es buscar con el método Find el primer elemento que cumpla con la característica que le dimos, en este caso que revise que una de las propiedades 'owner' sea igual a 'Jessica Davis'.
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
*/

////////////////////////////////////////////////
/*
// Los nuevos métodos FINDLAST y FINDLASTINDEX

console.log(movements);
// findLast:
// cuando queremos obtener el ultimo movimiento menor a 0 (en este caso)
const lastWithdrawal = movements.findLast(mov => mov < 0);
console.log(lastWithdrawal); // imprime: - 130

const latestLargeMovementIndex = movements.findLastIndex(
  mov => Math.abs(mov) > 1000
);
console.log(latestLargeMovementIndex);
console.log(
  `You latest large movement was ${
    movements.length - latestLargeMovementIndex // colocamos en qué momento pasó esta transacción
  } movements ago, movement: ${movements[latestLargeMovementIndex]} €` // colocamos el valor de la transacción
);
*/

////////////////////////////////////////////////

/*
console.log(movements);

// .INCLUDES:
// Verifica IGUALDAD cuando busca:
console.log(movements.includes(-130)); // estamos viendo si existe un valor exactamente igual a -130 en el array. Includes es una función boleana, por ende devuelve 'true' o 'false'.

// .SOME:  --> verifica condición
// Verifica CONDICION cuando busca:
// Cuando nos interesa saber si una condición (expresamos con MAS que una palabra o simple número)  pertenece o está en algo, nos conviene usar:
const anyDeposits = movements.some(mov => mov > 1500); // Queremos saber si existe algún movimiento positivo por encima de 0.
console.log(anyDeposits); //devuelve 'true';

// EVERY:
// es similar al método 'some' pero se diferencia de él en que sólo devuelve true,si todos los elementos de la matriz, satisfacen la condición que le pasamos.
// En otras palabras, si cada elemento pasa la prueba en nuestra función de devolución de llamada, solo entonces, el método every devuelve verdadero. Por eso se llama 'every' --> Todos

console.log(movements.every(mov => mov > 0)); // imprime 'false' porque no todos los movimientos son mayores a 0.

console.log(account4.movements.every(mov => mov > 0)); // imprime 'true' porque en este account si sucede que Todos los valores (movimientos) son mayores a 0.

// Separate callBack
const deposit = mov => mov > 0;
console.log(movements.some(deposit)); // imprime: true
console.log(movements.every(deposit)); // imprime: false
console.log(movements.filter(deposit)); // imprime: (5) [200, 450, 3000, 70, 1300]

// NOTA: Separar los callBack va en linea con el DRY principle (no te repitas) haciendo esto, podemos reutilizar la constante “deposit”  una y otra vez, sin necesidad de escribir siempre la declaración → (mov => mov > 0 )
*/

////////////////////////////////////////////////

/*
// FLAT Method:

// se usa para unificar arrays.
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // imprime: (8) [1, 2, 3, 4, 5, 6, 7, 8]

// NOTA: el método Flat sólo llega a un nivel de profundidad para aplanar el array.
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat()); // (6) [Array(2), 3, 4, Array(2), 7, 8]

// WARNING!: si le indicamos la profundidad puede seguir aplanando arrays interiores que no se hayan aplanado, por ejemplo: (ver abajo)
console.log(arrDeep.flat(2)); // imprime: (8) [1, 2, 3, 4, 5, 6, 7, 8]
// Le indicamos '2' como nivel de profundidad para que pueda

// Usando como ejemplo el sistema bancario que estamos haciendo.
// Sabemos que tenemos un array con todos los datos de cada usuario (cuenta) incluso una propiedad con todos los movimientos bancarios en cada cuenta.
// Supongamos que queremos hacer un único array que contenga todos los movimientos de las cuatro cuentas, cada cuenta sería un array dentro del array principal, y contendría todos los movimientos.
const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements); // imprime: (4) [Array(8), Array(8), Array(8), Array(5)]
// imprime una array que contiene otras arrays (cada array contiene los movimientos de cada account)

// Ahora queremos una matriz que contenga todos los valores de las cuentas, pero en 1 sola array.
const allMovements = accountMovements.flat();
console.log(allMovements); // imprime: (29) [200, 450, -400, 3000, -650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, -1000, 8500, -30, 200, -200, 340, -300, -20, 50, 400, -460, 430, 1000, 700, 50, 90]

const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance); // imprime: 17840 --> que es el promedio de todos los movimientos bancarios de todas las cuentas.

// FLAT
// -- Forma más clara y legible --
// Acá lo dejamos de forma más prolija con apilamiento de métodos:
const overalBalanceTWO = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalanceTWO); // imprime: 17840 --> promedio de todas los movimientos en todas las cuentas.

// FLAT-MAP:
const overalBalanceTREE = accounts
  .flatMap(acc => acc.movements) // flatmap -> debe recibir la misma forma de callback que como lo recibiría .map
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalanceTREE); // imprime: 17840
// WARNING: el FLATMAP solo llega a 1 nivel de aplanamiento de arrays, si necesitamos aplanar más se tiene que hacer de otra forma, pero no con flatMap.
*/

///////////////////////////////////////
// Coding Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/

/*
const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

//Punto 1.
const huskyWeight = breeds.find(breed => breed.breed === 'Husky').averageWeight;
console.log(huskyWeight);

//Mi fornma de hacerlo:
// const huskyWeight = function (breeds) {
//   const weight = breeds.find(weight => weight.breed === 'Husky').averageWeight;
//   console.log(`Peso: `, weight);
// };
// huskyWeight(breeds);

// Punto 2.
const dogBothActivities = breeds.find(
  breed =>
    breed.activities.includes('fetch') && breed.activities.includes('running')
).breed;
console.log(dogBothActivities);

//Punto 3.
// Usando Arrow Functions dentro de map ():
// const allActivities = breeds.map(breed => breed.activities).flat();
// console.log(allActivities);

// Usando función normal anónima tradicional:
const allActivities = breeds
  .map(function (breed) {
    return breed.activities;
  })
  .flat();
console.log(allActivities);

//Mi fornma de hacerlo:
// let activity = [];
// for (const [i, key] of breeds.entries()) {
//   activity.push(breeds[i].activities);
// }
// let allActivities = activity.flat();

// console.log(allActivities);

// Punto 4.
const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

// Así quedaría SIN usar ARROW function
// const uniqueActivities = function (activities) {
//   return [...new Set(activities)];
// };
// console.log(uniqueActivities(allActivities));

// Punto 5.
const swimmingAdjacent = [
  ...new Set(
    breeds
      .filter(breed => breed.activities.includes('swimming'))
      .flatMap(breed => breed.activities)
      .filter(activity => activity !== 'swimming')
  ),
];
console.log(swimmingAdjacent);

// Así queda SIN usar ARROW functios:
// function swimmingAdjacent(breeds) {
//   let filteredBreeds = breeds.filter(function (breed) {
//     return breed.activities.includes('swimming');
//   });
//   let allActivities = filteredBreeds.flatMap(function (breed) {
//     return breed.activities;
//   });
//   let filteredActivities = allActivities.filter(function (activity) {
//     return activity !== 'swimming';
//   });
//   return [...new Set(filteredActivities)];
// }
// console.log(swimmingAdjacent(breeds));

// Punto 6.
const allAverageWeight = function (breeds) {
  console.log(
    'Todos los perros tienen pesos promedios mayores a 10kg? ',
    breeds.every(breed => breed.averageWeight > 10)
  );
};
allAverageWeight(breeds);

// Arrow
console.log(
  'Punto 6 con arrrow function',
  breeds.every(breed => breed.averageWeight > 10)
);

// Punto 7.
const hyperactiveDog = function (breeds) {
  return breeds.some(breed => breed.activities.length >= 3);
};
console.log(
  'Hay razas que tienen más de tres actividades?',
  hyperactiveDog(breeds)
);

// Arrow
console.log(
  'Punto 7 con arrow function',
  breeds.some(breed => breed.activities.length >= 3)
);

// Punto BONUS:
const fetchWeights = breeds
  .filter(breed => breed.activities.includes('fetch'))
  .map(breed => breed.averageWeight);

const masGrande = Math.max(...fetchWeights);
console.log(masGrande);
*/

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Ejercicios para practicar traspaso de funciones normales a Arrow functions:

// --- Ejercicio 1 ---
// // Función normal
// const sumar = function (num1, num2) {
//   return num1 + num2;
// };

// console.log(sumar(5, 3));
// console.log(sumar(-2, 7));

// // Arrow
// const sumaR = (num1, num2) => num1 + num2;

// console.log(sumaR(5, 3));
// console.log(sumaR(-2, 7));

// --------------------
// --- Ejercicio 2 ---
// const palabras = ['casa', 'automóvil', 'sol', 'computadora', 'mar', 'perro'];

// //Función normal
// const filtrarCortas = function (palabras) {
//   let filtrado = [];
//   for (const elem of palabras) {
//     elem.length <= 5 ? filtrado.push(elem) : '';
//   }
//   return filtrado;
// };
// console.log(filtrarCortas(palabras));

// //----- Arrow (Ojo lo hice sin usar la variable externa) -----
// const filtrarCortaS = palabras => palabras.filter(word => word.length <= 5);
// console.log(filtrarCortaS(palabras));

// --------------------
// --- Ejercicio 3 ---
// const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// //Función normal
// const duplicarImparess = function (numeros) {
//   return numeros.map(num => (num % 2 === 0 ? num : num * 2));
// };
// console.log(duplicarImparess(numeros));

// //Arrow;
// const duplicarImpares = numeros.map(num => (num % 2 === 0 ? num : num * 2));
// console.log(duplicarImpares);

// --------------------
// --- Ejercicio 4 ---
// const nombres = ['Ana', 'Bruno', 'Carlos', 'Daniela'];

// // //Función normal
// const iniciales = function (nombres) {
//   return nombres.map(elem => elem[0]);
// };
// console.log(iniciales(nombres));

// // Arrow
// const initials = nombres.map(elem => elem[0]);
// console.log(initials);

// console.log(
//   `${iniciales(nombres)}` === `${initials}`
//     ? ' "iniciales" e "initials" son lo mismo!!!'
//     : 'no se parecen'
// ); // jeje acá estoy comparando si ambas funciones son iguales

// --------------------
// --- Ejercicio 5 ---
// const nombres = ['Lucía', 'Martín', 'Ana', 'Carlos', 'Sofía', 'Juan'];

// // Función normal
// const finalizaConA = function (nombres) {
//   return nombres.filter(elem => elem[elem.length - 1] === 'a');
// };
// console.log(finalizaConA(nombres));

// // Arrow
// const finalsA = nombres =>
//   nombres.filter(elem => elem[elem.length - 1] === 'a');
// console.log(finalsA(nombres));

//////////////////////////////

/*
// SORT method in strings:
// Muta el array original
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); // imprime: (4) ['Adam', 'Jonas', 'Martha', 'Zach']

// Sorts in numbers:
// Primero convierte todo en string y después hace el ordenamiento, esto con números no tiene sentido, por ende tenemos que arreglarlo de la siguiente forma:
console.log(movements);
// Debemos pensar a los parámetros a y b como números consecutivos, debemos usar la call function para ordenar los números de forma correcta usando el método 'sort'.

// IMPORTANTE!! para ordenar números:
// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// En orden ascendente:
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
// abajo escribimos de forma más acortada la función de arriba:
movements.sort((a, b) => a - b);
console.log(movements); // imprime: (8) [-650, -400, -130, 70, 200, 450, 1300, 3000]

// En orden descendente:
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });
// acá también escribimos el mismo código de arriba pero de forma más corta:
movements.sort((a, b) => b - a);
console.log(movements); // imprime: (8) [3000, 1300, 450, 200, 70, -130, -400, -650]

// Otro ejemplo random:
let x = [1, 3, -3, -1, -9, 6, 0, -4, -2, 2];
console.log(x.sort());

x.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
console.log(x); // imprime: (10) [-9, -4, -3, -2, -1, 0, 1, 2, 3, 6]
*/

//////////////////////////////

/*
// ARROW GROUPING
// Es una forma práctica de asignar grupos divididos por las categorías que necesitemos.

console.log(movements);

const groupedMovements = Object.groupBy(
  movements,
  movements => (movements > 0 ? 'deposits' : 'withdrawals') //Acá creamos los nombres de los grupos que deberían ser creados en el objeto.
);
console.log(groupedMovements);

const groupedByActivity = Object.groupBy(accounts, account => {
  const movementCount = account.movements.length;

  if (movementCount >= 8) return 'very active';
  if (movementCount >= 4) return 'active';
  if (movementCount >= 1) return 'moderate';
  return 'inactive';
});
console.log(groupedByActivity);

// Este tipo de agrupamiento tiene más sentido cuando se agrupa por objetos simplemente por una de las propiedades del objeto.
// Agrupación de matrices según alguna propiedad interior del objeto:

// const groupedAccounts = Object.groupBy(accounts, account => account.type);
// console.log(groupedAccounts);

// NOTA: Acá obtenemos el mismo resultado, pero con una sintaxis mejor:
const groupedAccounts = Object.groupBy(accounts, ({ type }) => type);
console.log(groupedAccounts);
*/

//////////////////////////////
/*
// FILL method in arrays:

// Habitualmente tenemos dos formas de crear arrays, la forma manual y la forma donde colocamos la palabra 'array':

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty arrays + fill method
const x = new Array(7); // esto crea un array vacío de 7 posiciones.
console.log(x);
//console.log(x.map(() => 5)); // esto creeríamos que llena los espacios vacíos del array con el número 5 en cada uno, pero en realidad NO HACE NADA.

// Hay que tener en cuenta que en algunos casos, no siempre vamos a poder crear arrays siguiendo este esquema, porque lo que creamos en realidad es un array vacío.

// Para rellenar arrays vacíos, lo mejor es usar el método Filling:
x.fill(1);
x.fill(1, 3, 5); // Acá especificamos en el segundo parámetro, dónde queremos comenzar a rellenar el array con 1. Dejamos 3 espacios vacíos. Y con el 3er parámetro indicamos donde queremos dejar de rellenar con el número 1. a partir de la posición 1, deja de rellenar con 1.
x.fill(1);
console.log(x);

// Ahora queremos rellenar el array 'arr' con el valor 23, desde la posición 2, hasta la 6.
arr.fill(23, 2, 6);
console.log(arr); // imprime:  (7) [1, 2, 23, 23, 23, 23, 7]
// IMPORTANTE: Y así es como podemos escribir arrays mediante programación, sin tener que escribirlas manualmente.

// ARRAY.FROM:
// acá estamos usando el array constructor, 'Array' es una función, que llama al método 'from()'
const y = Array.from({ length: 7 }, () => 1);
console.log(y);
//La primera propiedad es la longitud, y la segunda es muy similar al método mapping, es decir, usamos una callback function para indicarle qué queremos que haga en cada posición.

// Acá abajo por ejemplo, obtenemos el acceso a la 'cur' -> posición (elemento) actual, y después al 'i' -> indice actual.
const z = Array.from({ length: 7 }, (cur, i) => i + 1);
console.log(z);

// querySelectorAll() devuelve algo llamado 'NodeList' que es algo parecido a un array que contiene todos los elementos seleccionados. Pero no es un aray real, por lo que no tiene métodos como 'map()' o reduce().
// Entonces, si realmente quisiéramos usar este NodeList array, deberíamos transformarlo en un array normal y para ello 'Array.from()' es perfecto.

// acá lo que hacemos es que cada vez que toquemos el 'labelBalance' nos devuelve un array con todos los movimientos que conforman el valor que dice en 'labelBalance'.
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  ); //seleccionamos todos los elementos que tienen esta clase.
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')]; // esto también crear el array, pero tendríamos que hacer el mapping por separado.
});

// Lo que hicimos arriba es, usar un Array.from() para crear una matriz a partir del resultado de 'querySelectorAll() que es una NodeList, que no es realmente una matriz, sinó una estructura similar a una matriz y esa estructura similar a una matriz se puede convertir facilmente en una matriz usando Array.from().
// Luego como segundo paso, incluímos incluso una función map() que tansforma ese array inicial es una matriz exactamente como la queremos. Entonces, básicamente se convierte el elemento sin procesar a su contenido de texto y se reemplaza el signo de euro con nada. Al final terminamos con el array de números que pretendíamos.
*/

//////////////////////////////
/*

// METODOS NO DESTRUCTIVOS DE ARRAYS:
// Non-Destructive Alternatives : toReversed, toSorted, toSpliced, whit

console.log(movements);
//const reversedMov = movements.slice().reverse();

// toReserver:
// Integra los métodos 'slice' y 'reversed' y sirve para hacer una copia, y no tener que modificar el array original.
const reversedMov = movements.toReversed();
console.log(reversedMov);

//console.log(movements); // Si no usáramos 'slice()' o 'toReversed()', la estructura de datos subyacente original en realidad habría mutado. Pero muchas veces, esto no es lo que queremos, por lo general se quiere preservar el array original.

// Entonces, para evitar este tipo de cambios inesperados en el array original subyacente, deberíamos usar el método 'slice()' para duplicar el array o el método 'toReversed() que integra ambos métodos (slice() y reverse()), en 1 solo y sirve muy bien para trabajar los cambios directamente en la copia y no en el original.

//ToSorted (sort), toSpliced (splice):
// toSorted es una versión que copia el array a ordenar. El resultado, es un arr nueco con los elementos ordenados de forma ascendente. 
//movements[1] = 2000;
const newMovements = movements.with(1, 2000);
console.log(newMovements); // imprime: (8) [200, 2000, -400, 3000, -650, -130, 70, 1300] -> colocó 2000 en la posición 2.

console.log(movements);
*/

////////////////////////////// ----- //////////////////////////////

/* 
¿QUE METODO DE ARRAY ES MEJOR? 

Lo mejor que se puede hacer, para entender qué metodo debería usar por sobre otro, es preguntarme ¿Qué quiero realmente de este método? 

-> *** Quiero MUTAR el array original?
* Agregar algo: 
.push (al final)
.unshift (al inicio)

* Quitar algo: 
.pop (al final)
.shift (al inicio)
.splice(cualquier lugar)

* Otros: 
.reverse
.sort
.fill 

-> *** Quiero un array NUEVO (copia) basado en el original ? 
* Igual longitud que el original: 
.map (loop)  

* Filtrar usando una condición: 
.filter 

* Tomar una porción del original: 
.slice 

* Uno de los elementos se sustituye: 
.with 

* Aplanamos el aray (dejamos dos o más anidados en 1 solo): 
.flat
.flatMap

* Revertir la posición del array (sin modificar el original):
.toReversed

* Ordenar, clasificar: 
.toSorted

* Concatenar, unir dos arrays:
.concat

-> *** Quiero el INDICE de un array? 
* Basa la búsqueda en un valor: 
.indexOf

* Basa la búsqueda en una condición: 
.findIndex
.findLastIndex

-> *** Quiero RECUPERAR un elemento de matriz entero ? 
* Recupera en base a una prueba de condición: 
.find
.findLast

* Para recuperar una posición específica, en vez de usar notación de corchetes: 
.at

-> *** Quiero saber si un array INCLUYE un determinado elemento ? 
* Basado en un valor:
.includes

* Basado en una condición: 
.some (true -> si 1 elemento del array satisface la condición)
.every (true -> si todos los elementos del array satisfacen la condición)

-> *** Quiero un nuevo string. 
* basado en un separador: 
.join

-> *** Quiero TRASNFORMAR el array en un nuevo valor. 
* Basado en un acumulador: 
.reduce (una bola de nieve que acumula todos los valores en un único valor de cualquier tipo - number - string - boolean - new array - object)

-> *** Quiero hacer un LOOP sobre el array.
* Si NO queremos producir ningún nuevo valor:
.forEach (no crea un nuevo array, solo lo recorre en loop)

---- + + + + + -----
---- + + + + + -----

Las siguientes, no son técnicamente métodos, por eso están separadas... 

* También podemos agrupar arrays por categorías: 
Object.groupBy 

* Crear un nuevo array programándolo completamente desde cero: 
Array.from

* Crear un nuevo array desde cero con posiciones vacías (usándolo junto con el método .fill podemos llenarlo)
new Array(n)

* Unir dos o más arrays: 
[...arr1, ...arr2]

* Crear un array que contenga valores únicos sin repetir tomando como base otro arr: 
[...new Set(arr)]

* Crear una nueva matriz con elementos únicos presentes en dos arrays, usando ¡intersection':
[...new Set(arr1).intersection(new Set(arr2))]

*/

////////////////////////////// ----- //////////////////////////////

/*
// PRACTICA DE ARRAY METHODS:

// 1.
const banckDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(banckDepositSum);

// 2. Queremos contar cuantos depósitos han habido en el banco con al menos $1000
// Primera forma de hacerlo:
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;
// console.log(numDeposits1000);

// Segunda forma de hacerlo:
const NumDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  //.reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0); // OJO porque en algunas situaciones es necesario cambiar la ubicación del operador '++' para que nos muestre realmente la sumatoria.
console.log(NumDeposits1000);

// Prefixed ++ operator
let a = 10;
console.log(a++); // imprime: 10
console.log(a); // imprime: 11

// 3. Queremos calcular la suma de los depósitos y los retiros, creando dos objetos para agrupar ambos grupos.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      //cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur; // reemplazamos la linea de arriba con esta.
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

// 4. Creamos una función simple que convierte cualquier string en un caso de título, esto significa: que todas las palabras están capitalizadas, excepto algunas.
// ejemplo: this is a nice title -> This Is a Nice Title

const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1); // Convierte la primera letra de la palabra en mayúscula y le pega el resto de la palabra, desde la posición 1.

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' '); //la palabra mapeada está en la variable 'exceptions' ? true: escribí la palabra y false: usa la función 'capitalize' con word. Con join unimos todas las palabras del array en 1 string.
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/

/////////////////////////////////////// ---- ///////////////////////////////////////

/*
// Ejercicios de práctica:

//1. categorizar movimientos en positivos, negativos y neutros.
const transactions = [200, -50, 0, 400, -300, 100, 0, -20];

const summary = transactions.reduce(
  (acc, cur) => {
    acc[cur > 0 ? 'positives' : cur < 0 ? 'negatives' : 'neutrals'] += cur;
    return acc;
  },
  { positives: 0, negatives: 0, neutrals: 0 }
);

//console.log(summary);
*/

/* 
Tenemos que agrupar los valores del array transactions en tres categorías: positivos, negativos y neutros. Para lograrlo, aplicamos el método .reduce(), que nos devuelve un objeto con tres propiedades: positives, negatives y neutrals, almacenado en la constante summary.

Dentro de .reduce(), la función de callback recorre el array y clasifica cada valor (cur) en uno de estos tres grupos. Para ello, usamos un operador ternario que decide en qué propiedad del objeto acumulador (acc) se sumará cur:

Si cur > 0, se suma a acc.positives.
Si cur < 0, se suma a acc.negatives.
Si cur === 0, se suma a acc.neutrals.
El objeto acumulador (acc) se modifica en cada iteración porque, en lugar de solo almacenar los valores en los grupos correspondientes, los suma progresivamente.

De esta manera, al finalizar el recorrido del array, obtenemos un objeto con la suma total de los valores positivos, negativos y neutros.
*/

// Ejercicio 2:
/*
const products = [
  { name: 'Laptop', price: 1200 },
  { name: 'Smartphone', price: 800 },
  { name: 'Teclado', price: 50 },
  { name: 'Auriculares', price: 20 },
  { name: 'Mochila', price: 30 },
  { name: 'Taza', price: 15 },
  { name: 'Gorra', price: 12 },
  { name: 'Camiseta', price: 25 },
  { name: 'Zapatos', price: 60 },
  { name: 'Pantalón', price: 45 },
];

const getCategories = products.reduce(
  (acc, cur) => {
    acc[
      cur.price >= 60 ? `expensive` : cur.price < 20 ? `cheap` : 'neutrals'
    ].push(cur.name);

    return acc;
  },
  { cheap: [], neutrals: [], expensive: [] }
);
console.log('Objeto con las 3 categorías de gastos:', getCategories);
*/

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// Coding Challenge #5

/* 
Julia and Kate are still studying dogs. This time they are want to figure out if the dogs in their are eating too much or too little food.

- Formula for calculating recommended food portion: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
- Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
- Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint).

YOUR TASKS:
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
9. Group the dogs by the number of owners they have
10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA: */

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// Punto 1 usar forEach loop para crear la propiedad recFood en cada perro.
const getRecommendedFood = dogs.forEach(function (currentDog) {
  currentDog['recFood'] = Math.floor(currentDog.weight ** 0.75 * 28);
});
// resolución Udemy:
dogs.forEach(dog => (dog.recFood = Math.floor(dog.weight ** 0.75 * 28)));

// Punto 2 encontrar a Sarah.
const getDogSarah = dogs.forEach(function (currentDog) {
  if (currentDog.owners.includes('Sarah')) {
    console.log(
      currentDog.curFood > currentDog.recFood
        ? 'El perro está GORDO'
        : 'El perro está FLACO =('
    );
  }
});
// resolución Udemy:
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));

console.log(
  `Sarah's dog eats too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  }`
);

// Punto 3 crear dos arrays con propietarios para:
// ownersTooMuch -> propietarios de perros que comen mucho.
// ownersTooLittle -> propietarios de perros que comen poco.
const fatOwners = [];
const littleOwners = [];
const getArraysOwnersDogs = dogs.map(function (cur) {
  cur.curFood > cur.recFood
    ? fatOwners.push(cur.owners)
    : littleOwners.push(cur.owners);
});
const ownersTooMuch = fatOwners.flat();
const ownersTooLittle = littleOwners.flat();

console.log(ownersTooMuch); // Matilda, Sarah, John, Leo
console.log(ownersTooLittle); // Alice, Bob, Joe, Michael

// resolución Udemy:
const ownersTooMuch1 = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
const ownersTooLittle1 = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);

console.log(ownersTooMuch1); //  Matilda, Sarah, John, Leo
console.log(ownersTooLittle1); // Alice, Bob, Michael

// Punto 4 crear un string para cada array
console.log(`Los perros de ${ownersTooMuch.join(', ')} comen demasiado!`);
console.log(`Los perros de ${ownersTooLittle.join(', ')} comen muy poco!`);

// Punto 5 imprimir true si algún (some) perro come exactamente lo recomendado.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// Punto 6 imprimir true si todos (every) los perros están en un rango aceptable de comida.
console.log(
  dogs.every(
    acc => acc.curFood > acc.recFood * 0.9 && acc.curFood < acc.recFood * 1.1
  )
);

// resolución Udemy:
const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.every(checkEatingOkay));

// Punto 7 array con los perros que comen una cantidad aceptable
const aceptableLevelFood = [];
dogs.forEach(function (acc) {
  const answer =
    acc.curFood > acc.recFood * 0.9 && acc.curFood < acc.recFood * 1.1;

  if (answer === true) aceptableLevelFood.push(acc);
});

console.log(aceptableLevelFood);

// resolución Udemy:
const dogsEatingOkay = dogs.filter(checkEatingOkay);

console.log(dogsEatingOkay);

// Punto 8 agrupar los perros en 'exact', 'too-much' y 'too-little'.
const groupedByFoodAmount = Object.groupBy(dogs, dog =>
  dog.curFood > dog.recFood
    ? `too-much`
    : dog.curFood < dog.recFood
    ? `too-little`
    : `exact`
);

console.log(groupedByFoodAmount);

// resolución Udemy:
const dogsGroupedByPortion = Object.groupBy(dogs, dog => {
  if (dog.curFood > dog.recFood) {
    return 'too-much';
  } else if (dog.curFood < dog.recFood) {
    return 'too-little';
  } else {
    return 'exact';
  }
});

console.log(dogsGroupedByPortion);

// Punto 9 agrupar los perros según cantidad de owners.
const groupedByOwners = Object.groupBy(dogs, dog => dog.owners.length);

console.log(groupedByOwners);

// resolución Udemy:
const groupedByOwners2 = Object.groupBy(
  dogs,
  dog => `${dog.owners.length} - owners`
);

console.log(groupedByOwners2);

// Punto 10 hacer una copia de 'dogs' array y ordenar recFood de forma ascendente.
const getRecFoodSorted = dogs.slice().sort((a, b) => {
  if (a.recFood > b.recFood) return 1;
  if (a.recFood < b.recFood) return -1;
});

console.log(getRecFoodSorted);

// resolución Udemy:
const dogsSorted = dogs.toSorted((a, b) => a.recFood - b.recFood); // IMPORTANTE!!!! usa 'toSorted' para no mutar el array 'dogs' original y hacer los cambios en una copia 'dogSorted'.

console.log(dogsSorted);

// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------

// Queremos formar otro array con los valores duplicados del arr 'numeros', usando REDUCE.
const numeros = [71, 41, 19, 88, 3, 65];

const acumularDobles = (acumulador, numero) => [...acumulador, numero * 2];

const dobles = numeros.reduce(acumularDobles, []);

console.log(dobles);
