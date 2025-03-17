'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const combinedMovsDates = acc.movements.map((mov, i) => ({
    movement: mov,
    movementDate: acc.movementsDates.at(i),
  }));

  if (sort) combinedMovsDates.sort((a, b) => a.movement - b.movement);

  combinedMovsDates.forEach(function (obj, i) {
    const { movement, movementDate } = obj;
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(movementDate);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(movement, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>

        <div class="movements__value"> ${formattedMov} </div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = time % 60;

    // in each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    } //Esta parte del código solo se activa si el timer está en 00:00

    // Decrese 1 seg
    //  time = time - 1 -> (es lo mismo de abajo)
    time--;
  };

  // Set time to 5 minutes
  let time = 120;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer; // ambos deben estar en el parent scope de la función de abajo para chequear si aparecen

// FAKE ALWAYS LOGGED IN
// fingimos que estamos logeados siempre con los tres items que colocamos abajo:
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    // // personalizamos como se va a ver la fecha actual en la 'labelDate':
    const now = new Date();

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      //weekday: 'long',
    };
    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // const day = `${now.getDate()}`.padStart(2, 0); //agregamos .padStart para que cuando el dia sea de 1 digito, se coloque el 0 adelante
    // const month = `${now.getMonth() + 1}`.padStart(2, 0); //agregamos .padStart para que cuando el mes sea de 1 digito, se coloque el 0 adelante
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer); // IMPORTANTE: Si ya hay un timer, necesito borrarlo. Si estoy logueado con un usuario y en el medio de la sesión se loguea otro usuario, con esto eliminamos ese timer que quedaba del anterior usuario.
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add trasnfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer(); // se reinicia el timer si estamos por hacer una transferencia
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString()); // .toISOString() hace que el formato de la fecha guardada en 'movementsDates' sea igual que las que ya están ahí (formato internacional)

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer(); // se resetea el timer si vamos a pedir un préstamo y arranca de nuevo.
    }, 2500); // van a pasar 2,5 seg hasta que el préstamos se vea reflejado en los movimientos.
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  // BUG in video:
  //displayMovements(currentAccount.movements, !sorted);

  // FIX:
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
// todos los números en JS siempre son flotantes, no importa si se represetan como

console.log(23 === 23.0); // imrpime: true

// Internamente también se da que los números se representan en un formato 64 base 2.
// Básicamente siempre están compuestos por ceros y unos.

// Bas 10 - 0 to 9. 1/10 = 0.1 3/10 = 3.33333333
// Binary base 2 - 0 1
console.log(0.1 + 0.2); // imprime: 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // imprime: false

// convertir Strings a Números:
console.log(Number('23')); // imprime: 23
console.log(+'23'); // imprime: 23 (JS ve el operador '+' y automáticamente convierte lo que sigue en un número)

// Parsing
// Para obtener números enteros en base a un string.
console.log(Number.parseInt('30px', 10)); // imprime: 30
console.log(Number.parseInt('e23', 10)); // imprime: NaN
// solo funciona cuando el valor que lee comienza con un número, de lo contrario no lo puede leer, y nos tira 'NaN'. También solo se puede usar en lenguaje con base 10, si usamos binario nos tira error.

// Para obtener números enteros y decimales al leer un string, por ejemplo con valores que vienen desde CSS.
console.log(Number.parseInt('2.5rem')); // imprime: 2
console.log(Number.parseFloat('2.5rem')); // imprime: 2.5 (también devuelve la parte decimal)

// Is NaN :
// para ver si el valor es un NaN o no.
console.log(Number.isNaN(20)); //falso
console.log(Number.isNaN('20')); //falso
console.log(Number.isNaN(+'20X')); //true
console.log(Number.isNaN(23 / 0)); //false

// isFinite :
// otra forma de revisar si un valor es un número real.
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20X')); // false
console.log(Number.isFinite(23 / 0)); // false

console.log(Number.isInteger(23)); // false
console.log(Number.isInteger(23.0)); // false
console.log(Number.isInteger(23 / 0)); // false
*/

/////////////////////////////////////////////////
/*
// Raiz cuadrada:

// utilizando el método de JS para hacer raiz cuadrada:
console.log(Math.sqrt(25)); // 5
// forma manual de hacer raiz cuadrada:
console.log(25 ** (1 / 2)); // 5
// raiz cúbica, forma manual:
console.log(8 ** (1 / 3)); // 2

// Buscar Máx:

console.log(Math.max(5, 18, 23, 11, 2)); // 23
console.log(Math.max(5, 18, '23', 11, 2)); // 23
console.log(Math.max(5, 18, '23px', 11, 2)); // NaN  -> no hace parseFloat para conseguir el máx

// Buscar Min:

console.log(Math.min(5, 18, 23, 11, 2)); // 2

// Forma manual de calcular el área de un círculo, usando parsefloat para extraer el valor del string '10px':

console.log(Math.PI * Number.parseFloat('10px') ** 2); // 314.1592653589793

// Obtener valores random desde 0 hasta 6:

console.log(Math.trunc(Math.random() * 6) + 1);

// *** Función generadora de números ramdom:

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

console.log(randomInt(10, 20)); // imprime números randoms entre 10 y 20
console.log(randomInt(0, 3));

// Redondeo de enteros:

console.log(Math.trunc(23.3)); // 23

// Otra forma manual de remover decimales:
console.log(Math.round(23.3)); // 23
console.log(Math.round(23.9)); // 24

// ceil -> redondea hacia arriba:
console.log(Math.ceil(23.3)); // 24
console.log(Math.ceil(23.9)); // 24

// floor -> redondea hacia abajo y también hace corrección de tipo (ES MEJOR QUE OTROS METODOS):

console.log(Math.floor(23.3)); // 23
console.log(Math.floor('23.9')); // 23

// 'floor' y 'trunc' funcionan igual cortando la parte decimal en números positivos, sin embargo para los números decimales no funcionan de la misma manera
// WARNING: 'floor' funciona mejor que trunc, no importa si estamos lidiando con números positivos o negativos, trunc no funciona de la misma manera con numeros negativos.
console.log(Math.trunc(23.3)); // 23

console.log(Math.floor(-23.3)); // -24 -> conviene más usar 'floor' porque incluso con números negativos hace bien el redondeo (siempre redondea para abajo)
console.log(Math.trunc(-23.3)); // -23

// Redondeo de decimales:

// OJO -> Cuando usamos toFixed siempre devuelve un string a no ser que agreguemos el operador '+' adelante del nro.
console.log((2.7).toFixed(0)); // '3'
console.log((2.7).toFixed(3)); // '2.700' -> agrega dos ceros para que queden 3 decimales después del '.'
console.log(+(2.345).toFixed(2)); // 2.35 -> redondea para arriba si le pido cortar decimales
// IMPORTANTE: si agregamos el operdor '+' adelante del número, automáticamente JS convierte el resultado a number.
*/

/////////////////////////////////////////////////
/*
// Remainder operator

// Remainder devuelve el resto de una división.
console.log(5 % 2); // 1
console.log(5 / 2); // 2.5 es decir que 5 => 2 * 2 + 1

console.log(8 % 3); // 2
console.log(8 / 3); // 2.6666666 es decir que 8 => 2 * 3 + 2

console.log(6 % 2); // 0
console.log(6 / 2); // 3

console.log(7 % 2); // 1
console.log(7 / 2); // 3.5

// Podemos crear funciones para saber si un número es par o impar:
const isEven = n => n % 2 === 0;

console.log(isEven(8)); // true
console.log(isEven(23)); // false
console.log(isEven(514)); // true

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    // 0, 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    // 0, 3, 6, 9
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

/////////////////////////////////////////////////

// '_' como separador numérico en reemplazo de la ',':

// Cuando tenemos números muy grandes para leer, podemos usar '_' como separador numérico, SOLO SE DEBE USAR CON NUMEROS.

// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.14_15;
console.log(PI);

console.log(Number('230_000')); // no es un número
console.log(parseInt('230_000')); // imprime 230 (no sirve para extraer números completos si tiene '_')
*/

/////////////////////////////////////////////////

/*
// BIGINT:

// Los números se representan internacionalmente como 64 bits, eso significa que hay exactamente 64 unos y ceros para representar cualquier número.
// De estos 64 bits, solo 53 se utilizan para almacenar los dígitos. El resto sirven para almacenar la posición del punto decimal y el signo.
// Ahora bien, solo hay 53 bits para almacenar el número, eso significa que hay un límite de lo grandes que pueden ser los números, y podemos calcular ese número de la siguiente manera:

console.log(2 ** 53 - 1); // 9007199254740991 -> este es el número más grande que JS puede representar con seguridad. Al principio se pone 2, porque se trabajan con base dos, ceros y unos.

// Este número es tan importante, que incluso se almacena en:
console.log(Number.MAX_SAFE_INTEGER);

// IMPORTANTE: si queremos hacer que JS trabaje o calcule números que sean más grandes que este (9007199254740991) puede perder presición, lo mejor es mantenernos como máximo en este valor.

// Esto era un problema para por ejemplo interactuar con otros lenguajes que si manejan números más altos, o extraer datos de una API, por ejemplo un ID, que puede contener más números. Por suerte en IES 2020 se añadió una nueva primitiva, que se llama: BigInt , que significa 'gran entero'. Y puede utilizarse para almacenar números tan grandes como queramos.

console.log(4395436730250974304845758730942075945693543n);
// si le agregamos una 'n' al final, ahora podemos mostrar el número completo con presición.
console.log(BigInt(4395436730250974));

// Operations:
console.log(10000n + 10000n);
console.log(38493573423057946523759236597403275928656258925n * 1000000000n);
// console.log(Math.sqrt(16n)); -> ESTO NO FUNCIONA

// no se pueden mezclar números que tengan 'n' al final con 'bigInt'.
const huge = 24940305804275302057207453972047507502375n;
const num = 23;

// si queremos multiplicar dos números así, donde uno de ellos no es bigInt, si o si, vamos a tener que convertirlo a bigInt para que se pueda realizar la operación.
console.log(huge * BigInt(num));

// comparando igualdades estrictas (===):
console.log(20n > 15); //true
console.log(20n === 20); // false -> '===' hace comparación de número y de tipo, (20n) tiene un tipo primitivo diferente al que tiene (20), por ende no son iguales. El primero es un bigInt, mientras que el segundo es un número normal.
console.log(typeof 20n); // bigint
console.log(typeof 20); // number

// Excepciones:
// comparando igualdades regulares (==):
console.log(20n == 20); // true -> da verdadero, porque cuando la igualdad no es estricta (solo usamos ==) JS convierte automáticamente ambos números a números normales. Incluso funciona con el ejemplo de abajo:
console.log(20n == '20'); // true

// Se pueden concatenar bigInt + string:
console.log(huge + ' is REALLI big!!!'); // 24940305804275302057207453972047507502375 is REALLI big!!!

// Divisiones:
console.log(11n / 3n); // 3n
console.log(10 / 3); // 3.3333333333333335
*/

/////////////////////////////////////////////////

/*
// FECHAS Y HORAS:

// Crear una fecha:
// Hay 4 formas de crear una fecha.

//Forma 1:
const now = new Date();
console.log(now); // Thu Feb 13 2025 10:57:35 GMT-0300 (Argentina Standard Time)

//Forma 2:
console.log(new Date('Feb 13 2025 10:55:41')); // Thu Feb 13 2025 10:57:35 GMT-0300 (Argentina Standard Time)

//Forma 3: es la menos confiable.
console.log('December 24, 2015'); // December 24, 2015

console.log(new Date(account1.movementsDates[0])); // Mon Nov 18 2019 18:31:17 GMT-0300 (Argentina Standard Time)

console.log(new Date(2037, 10, 19, 15, 23, 5)); // Thu Nov 19 2037 15:23:05 GMT-0300 (Argentina Standard Time)
// IMPORTANTE: JS cuenta los meses desde 0, entonces noviembre es para JS el mes nº 10.

console.log(new Date(2037, 10, 31)); // Tue Dec 01 2037 00:00:00 GMT-0300 (Argentina Standard Time)
// IMPORTANTE: si el día no existe en el mes que indicamos, automáticamente imprime el día siguiente, por más que ya cambie el mes.

// ---- UNIX TIME: 01 de enero de 1970 ---- //

// creamos una fecha que sea 0 segundos después del Unix Time:

console.log(new Date(0)); // Wed Dec 31 1969 21:00:00 GMT-0300 (Argentina Standard Time)
console.log(3 * 24 * 60 * 60 * 1000); // 259200000

//
const date = new Date();

console.log(
  'Hoy es día ' + date.toLocaleDateString('es-en', { weekday: 'long' })
); // 'Hoy es día jueves'
*/

/////////////////////////////////////////////
/*
// TRABAJANDO CON FECHAS:
// Las fechas y las horas también tienen su batería de métodos como los strings.

// GET METHOD:
// para obtener ciertos valores que especifiamos abajo:

const future = new Date(2037, 10, 19, 15, 23);
console.log(future); // Thu Nov 19 2037 15:23:00 GMT-0300 (Argentina Standard Time)
console.log(future.getFullYear()); // 2037
console.log(future.getMonth()); // 10
console.log(future.getDate()); // 19
console.log(future.getDay()); //4  --> (jueves) porque domingo = 0, Lunes = 1, Martes = 2, Miércoles = 3, Jueves = 4, Viernes = 5, Sábado = 6. 
console.log(future.getHours()); // 15
console.log(future.getSeconds()); // 0
console.log(future.toISOString()); // 2037-11-19T18:23:00.000Z
console.log(future.getTime()); // 2142267780000 -> este es el tiempo que transcurrió desde Unix (01/01/1970) hasta la fecha que le pasamos en la const 'future' (19/11/2037)

console.log(new Date(2142267780000)); // Thu Nov 19 2037 15:23:00 GMT-0300 (Argentina Standard Time) -> devuelve la misma fecha que guardamos en 'future', porque (2142267780000) es el tiempo que trasncurrió en milisegundos desde unix (1 de enero de 1970) hasta la fecha de 'future' (19 de noviembre de 2037).

console.log(Date.now()); // 1739459829487 el tiempo transcurrido hasta hoy (13/02/2025) ojo que mañana puede variar el valor...

// SET METHOD:
// para modificar ciertos valores, como especificamos abajo:

future.setFullYear(2040);
console.log(future); // Mon Nov 19 2040 15:23:00 GMT-0300 (Argentina Standard Time)
*/

/////////////////////////////////////////////
/*
// Calculadora de días que pasaron: 

const future = new Date(2037, 10, 19, 15, 23);
console.log(Number(+future));

//creamos una función que devuelve la cantidad de días que pasaron entre ambas fechas:
const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24); // la última parte (1000 * 60 * 60 * 24) convierte el dato recibido de la resta en días y 'math.abs' evita que la resta se haga mal, por ejemplo, si el primer número es 4 y el segundo 14, de como resultado 4 y no -10.

const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1);
*/

/////////////////////////////////////////////

/*
// Internacionalización de números: 

const num = 287498375.23;

const options = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  //useGrouping: false,
};

console.log(
  'US:            ',
  new Intl.NumberFormat('en-US', options).format(num)
);
console.log(
  'Germany:       ',
  new Intl.NumberFormat('de-DE', options).format(num)
);
console.log(
  'Syria:         ',
  new Intl.NumberFormat('ar-SY', options).format(num)
);
console.log(
  'Mi navegador:  ',
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
); // usando el lenguaje local de esta computadora
*/

/////////////////////////////////////////////

// TIMERS :

// Hay dos tipos de timers, primero el temporizador de "Tiempo de Espera Establecido" se ejecuta solo una vez, después de un tiempo definido. Mientras que el temporizador de "Intervalo Establecido" sigue funcionando básicamente para siempre, hasta que lo detenga.

// Tipos de timers:
// Tiempo de espera establecido -> funciona por tiempo definido.
// Intervalo establecido -> funciona para siempre, hasta que lo detenga.

// Timers que se ejecutan una vez:

// setTimeout:
const ingredients = ['olives', ''];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is you pizza with ${ing1} and ${ing2} 🍕`),
  3000,
  ...ingredients
);
console.log('Waiting...'); // primero se imprime esto, y después de 3 seg debería imprimirse 'pizzaTimer', ojo que el if de abajo actúa sobre el timer.

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

//NOTA: En este caso si eliminamos la spinach del array, entonces si va a imprimirse la constante pizzaTimers a los 3 seg. Pero si el arr incluye las espinacas, no se imprime, porque entra en acción el 'if'.

// Timers que se ejeutan una y otra vez:

// setInterval:
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 3000);
// Creamos un reloj que se muestra en la consola:
