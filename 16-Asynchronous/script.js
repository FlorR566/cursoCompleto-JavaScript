'use strict';

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

// ASINCRONISMO:

// SINCRÓNICO: significa que el código se ejecuta linea por línea, código por código, en el orden exacto de ejecución que definimos en nuestro código.

// ASINCRÓNICO: (NO ES BLOQUEANTE DEL CODIGO PRINCIPAL, SE EJECUTA POR ATRAS)es aquel código que solo se ejecutará después de que finalice la ejecuciión de una tarea que se está ejecutando en segundo plano, por ejemplo un temporizador. El código principal no se bloquea y la ejecución no espera a que (en este caso el temporizador asincrónico) termine su trabajo.
// En resúmen la programación asincrónica se trata de coordinar el comportamiento de nuestro programa durante un cierto periodo de tiempo y esto es fundamental de entender. Literalmente significa que no ocurre al mismo tiempo.

// IMPORTANTE: las funciones de devolución de llamada o "callback functions" por si solas no hacen que el código sea asincrónico. Lo mismo ocurre con los "addEventListener", tampoco hacen que el código sea asincrónico.

///////////////////////////////////////

// AJAX

// Asynchronous JavaScript and XML -> (AJAX) : significa JavaScript y XML asíncronos. Básicamente nos permite comunicarnos con servidores web remotos de forma asincrónica, ahora en la práctica hacemos llamadas AJAX en nuestro código para solicitar algunos datos de un servidor web de forma dinámica. Sin recargar la página para que podamos usar esos datos en  nuestra aplicación de forma dinámica.

// Un ejemplo de como se usa AJAX, supongamos que tenemos a un cliente (por ejemplo un buscador como Google) pidiendo algún dato sobre algún país al servidor web. Para esto le hace una petición (un request donde le pregunta sobre algo), entonces el servidor web envía una (response) con los datos que estaba pidiendo el cliente (por ejemplo Google).
// Este ida y vuelta entre cliente y servidor web ocurre de forma asincrónica, en segundo plano.
// Incluso puede hacer varios tipos de requerimientos (request). Existen el "request GET" para obtener un dato del servidor o el "request POST" para subir algo al servidor.
// Cuando le pedimos al servidor que nos envíe algunos datos, este servidor generalmente contiene una web API web. Y es esta API la que tiene los datos que estamos solicitando.

// API : Application Programming Interface -> una pieza de software que puede ser reutilizada por otra pieza de software para permitir que las aplicaciones se comuniquen entre si e intercambien información.
// En JS hay muchos tipos de APIs web, por ejemplo: DOM API, Geolocalización API, Own Class API, Online API

// Online API -> es escensialmente una aplicación que se ejecuta en un servidor que recibe solicitudes de datos, luego recupera estos datos de alguna base de datos y luego los envía de vuelta al cliente. Por una cuestión práctica, generalmente llamamos API a las Online API o Web API.

// FORMATO API: En la acrónimo AJAX, la X es por XML es un estándar que se usaba hace años para transmitir datos en la web. Hoy en día ya no se usa XML. Lo que se usa actualmente es el formato JSON. Y es muy popular hoy en día porque es básicamente un objeto JavaScript, pero convertido a string.

///////////////////////////////////////

// 🚨 The base URL of the API used throughout this section has changed

// It's not a big deal, it's really just one small change. Instead of:

// https://restcountries.eu/rest/v2/

// It's now:

// https://countries-api-836d.onrender.com/countries/

// So whenever we use the Countries API in this section, please just change the URL you see in the videos to this new one.

///////////////////////////////////////

// Our First AJAX Call: XMLHttpRequest

// Obtenemos datos de una API de terceros:
/*

// Forma ANTIGUA de hacer llamadas AJAX: 

const getCountryData = function (country) {
  const request = new XMLHttpRequest(); // forma vieja de hacer llamadas AJAX.
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send(); // acá enviamos la request y esta request obtiene los datos en segundo plano. Una vez hecho esto, se emitirá el 'load event' de abajo.

  request.addEventListener('load', function () {
    //console.log(this.responseText); // tan pronto como lleguen los datos, esta función callback será llamada. La 'this' a la que hacemos referencia es a 'request'.

    const [data] = JSON.parse(this.responseText); // transforma el string de 'this.resoponseText' en un objeto con todos los datos sobre el pais elegido.
    console.log(data);

    const html = ` <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('brasil');
getCountryData('paraguay');
getCountryData('argentina');
getCountryData('germany');

*/

// La ubicación de cada tarjeta puede variar cada vez que recargamos la página, esto se debe a que los datos pueden tardar un poquito más en viajar y por eso aparecen en otro orden.

// NOTA: Cualquier API pública que utilicemos, siempre debe tener CORS establecido en 'yes'. Significa Cross-Origin Resourse Sharing y significa que sin Cross no podremos acceder a APIs de terceros, desde nuestro propio código.

///////////////////////////////////////

// ¿Cómo funciona la web? Requerimientos y respuestas.

// El modelo en el cual vemos como el cliente (servidor Google) le pide/ envía a la Web Serber algún dato, se llama "Request-responde model" o "Client-server architecture".

// DNS es el estándard para "Domain Name Server" o en español, servidor de nombres de dominio. Los Domain Server son un tipo especial de servidor, basicamente son como las guías telefónicas de internet.

// Pasos que suceden cuando accedemos a cualquier servidor web:
// Primero, el navegador (cliente) realiza una solicitud a un DNS y este servidor especial va a hacer coincidir esa dirección web (URL) brindada con la dirección web real del servidor (IP). Es decir, enl DNS convierte la URL en la dirección IP real.
// Luego cuando el DNS devuelve al navedagor (cliente) la dirección IP real, podemos finalmente llamarla.
// Componentes de una IP:
// Protocolo (HTTP o HTTPS)
// ID adress -> son los números separados por '.' y van desde '//' hasta ':'
// Port number -> por defaul 443 es para HTTPS y 80 para HTTP.

// Una vez que tenemos la dirección real IP, se establece una conexión (TCP/IT socket connection) entre el navegador y la web server, y ahora finalmente están conectadas. Esta conexión generalmente se mantiene todo el tiempo que se necesita para trasferir todos los archivos del sitio web o todos los datos.
// ¿Qué es TCP e IP?
// TCP es el protocolo de control de trasnmisión y el IP es el protocolo de internet. Juntos son protocolos que definen exactamente cómo viajan los datos a través de la web.

// Finalmente es tiempo de que hagamos nuestra request, y se llama HTTP Request, donde HTTP significa protocolo de trasnferencia de hipertexto, es otro protocolo más de comunicación.

// Un protocolo de comunicación es simplemente un sistema de reglas o pasos que permite que dos o más partes se comuniquen.

// Un mensaje de solicitud se verá de la siguiente manera:
// El comienzo del mensaje es la parte más importante, llamada línea de inicio y este contiene el método HTTP que se usa en la solicitud, luego está el destino de la solicitud y la versión HTTP. En cuanto a los métodos HTTP hay muchos disponibles pero los más usados son: GET (solicitar datos), POST (enviar datos), PUT y PATCH (para modificar datos).

// La gran diferencia entre HTTPS y HTTP es que el primero está encriptado usando TLS o SSL, que también son protocolos.

// Una vez que el Servidor Web trabajó con nuestra solicitud y tenga los datos que le pedimos, o la página web lista para enviarnos de vuelta. Una vez que esté lista, nos la envía usando una Response HTTP (respuesta HTTP) y esta se parece bastante a la solicitud de request. El encabezado en este caso está compuesto por la versión HTTP, un código de estado y un mensaje, y esto sirve para que el cliente sepa si la solicitud se ha realizado correctamente o no. Por ejemplo 200 significa "ok", mientras que 404 significa "page not found"

// Esta comunicación entre el cliente y el servidor ocurre múltiples veces, para cada archivo que se incluya en la página web. Pero tiene un límite, ya que la conexion podría relentizarse. Entonces cuando finalmente todos los archivos hayan llegado, la pagina web se puede renderizar en el navegador de acuerdo con las especificaciones HTML, CSS y JavaScript que ya conocemos.

// En primer lugar el trabajo del TCP es dividir las solicitudes y respuestas en miles de pequeños fragmentos, llamados paquetes, antes de que se envíen. Luego de que los paquetes pequeños lleguen a su destino, TCP volverá a ensamblar todos los paquetes en la solicitud o respuesta original. Y esto es necesario para que cada paquete pueda tomar una ruta diferente a través de internet porque, de esta manera el mensaje llega al destino lo antes posible. Como segundo punto, el trabajo de IP es enviar y enrutar esos paquetes a través de internet, se asegura de que lleguen al destino que deben ir, utilizando direcciones IP en cada paquete.

///////////////////////////////////////

// Calback Hell

// implementamos secuencias de llamadas AJAX, para que cada dato aparezca según lo necesitemos. En este caso queremos que aparezca la tarjeta del pais que seleccionamos y luego aparezcan el resto de países con los que limita geográficamente.

/*

const renderCountry = function (data, className = '') {
  const html = ` <article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const neighbour = data.borders?.[0];

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

//getCountryAndNeighbour('argentina');
getCountryAndNeighbour('usa');
// getCountryData('paraguay');
// getCountryData('argentina');
// getCountryData('germany');

// CALBACK HELL -> es cuando tenemos muchas devoluciones de llamada anidadas para ejecutar tareas asíncronas en secuencia. Y de hecho esto sucede con todas las tareas asíncronas, que se manejan mediante devoluciones de llamadas.

// El problema con las callback hell es que hace que nuestro código se vea desordenado, podemos identificarlos porque en la parte izquierda en la identación, comienza a formarse un triángulo a medida que vamos poniendo más funciones de llamada una dentro de otra. Otra contra es que hace que el código sea dificil de mantener y entender o razonar.

// REGLA BASICA: "El código que es difícil de entender, es básicamente un código malo, porque tendrá errores, porque cuanto más difícil sea entender y razonar el código, más dificil será agregar nuevas funciones y funcionalidades a la aplicación".

// Por suerte a partir de ES6, hay una forma de escapar de las callback hell, y es usando PROMESAS.

// Ejemplo de Callback Hel ⬇

setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
      setTimeout(() => {
        console.log('4 seconds passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

*/

///////////////////////////////////////

// Promises and Fetch API

// FORMA MODERNA para hacer llamadas AJAX, usando FETCH.

// const request = fetch('https://restcountries.com/v2/name/portugal');
// console.log(request);

//Forma vieja:
// const request = new XMLHttpRequest(); // --> esta es la Forma vieja
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

// PROMISE: es un objeto que se utiliza como un marcador de posición para el futuro resultado de una operacion asincrónica. También podemos decir que es un contenedor para un valor entregado de forma asincrónica. O de una forma menos formal, podemos decir que una Promesa es como un contenedor para un valor futuro. Y un ejemplo perfecto para un valor futuro, es una llamada AJAX.
// Así que cuando iniciamos la llamada AJAX, todavía no hay ningún valor, pero sabemos que habrá algún valor en el futuro y por lo tanto podemos utilizar una promesa para menejar este valor furuto.

//  Hay una buena ANALOGIA que dice que las promesas son como comprar un billete de lotería. El billete me da la promesa de que recibiré dinero si acierto el número ganador. Entonces, compré el tiket(promesa) ahora, la lotería va a pasar en algún momento luego (asincrónicamente), yo sigo con mi vida y mis tareas hasta que suceda el sorteo, si tengo el número ganador, recibo el dinero, porque esa fué la promesa.

// Beneficios de usar promises:
// Ya no necesitamos depender de eventos y funciones de devolución de llamada.
// Con las promesas podemos encadenar promesas para una secuencia de operaciones asíncronas en lugar de anidarlas como hicimos en el ejemplo del callback hell.

// Las promises cambian a lo largo del tiempo, en un momento de inicio, decimos que están pendientes (pending). Esto es antes de que cualquier valor resultante de la tarea asincrónica esté disponible. Ahora durante este tiempo, la tarea asíncrona sigue haciendo su trabajo en segundo plano. Luego cuando por fin termina la tarea en segundo plano, decimos que la promesa está saldada (settled).
// Hay dos tipos de tareas saldadas, las "fulfilled" y las "rejected". La primera es una tarea que ha resultado con éxito en un valor, tal y como lo esperábamos, la segunda significa que ha resultado algún error durante la tarea asincrónica.
// Consume promise: Cuando ya tenemos una promisa y la conusmimos.
// Para tener y consumir una promise, primero hay que crearla con 'fetch'.
// UNA PROMESA SOLO SE RESUELVE UNA VEZ, PERMANECERA CON EL ESTADO RESULTANTE PARA SIEMPRE.

///////////////////////////////////////

// CONSUMMING PROMISES:
/*

const request = fetch('https://restcountries.com/v2/name/portugal');
console.log(request);

const renderCountry = function (data, className = '') {
  const html = ` <article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (resoponse) {
//       console.log(resoponse);
//       return resoponse.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// Versión simplificada del código de arriba:
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(resoponse => resoponse.json())
    .then(data => renderCountry(data[0]));
}; // Fetch busca algo y entonces then(), obtiene una respuesta (response) que se transformará en json() y luego con then() de nuevo, tomamos ese dato (data) y renderizamos el país en el DOM (lo mostramos).

getCountryData('portugal');

// Fetch devuelve una promesa, y en todas las promesas podemos llamar al método 'then'. En este caso en el then method queremos pasar una callback function que necesitamos se ejecute tan pronto como se cumpla la promesa. Es decir, tan pronto como el resultado esté disponible.

// La función que se ejecutará tan pronto como esté disponible el resultado de la promise, lleva como parámetro (response) que es el resultado que nos da el método fetch (promise).

// json() -> es un método que está disponible en todos los objetos de respuesta que provienen de un fetch function (función de recuperación). También es una función asíncrona, por lo que también devolverá una promesa.
*/

///////////////////////////////////////

// ENCADENAMIENTO (CHAINING) DE PROMESAS:
/*
// Acá como ejercicio primero vamos a querer los datos del primer país, y luego en base a eso vamos a necesitar los datos del país vecino.

// const request = fetch('https://restcountries.com/v2/name/portugal');
// console.log(request);

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = ` <article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// const getCountryData = function (country) {
//   // Call country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders?.[0];
//       const neighbour = 'dsdsjdfhs';

//       if (!neighbour) return;

//       // Call country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour')) // se produce solo si la promesa se cumple
//     .catch(err => {
//       // se produce solo si la promesa se rechaza
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     }); // no importa si promesa se produce o no, esta llamada "finally" se produce siempre.
// };

// VERSION SIMPLIFICADA DEL CODIGO DE ARRIBA: hacemos refactorización de funciones.
const getCountryData = function (country) {
  // Call country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, `Country not found`)
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      if (!neighbour) throw new Error('No neighbour found!');

      // Call country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        `Country not found`
      );
    })
    .then(data => renderCountry(data, 'neighbour')) // se produce solo si la promesa se cumple
    .catch(err => {
      // se produce solo si la promesa se rechaza
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    });
  // .finally(() => {
  //   countriesContainer.style.opacity = 1;
  // }); // no importa si promesa se produce o no, esta llamada "finally" se produce siempre.
};

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

// getCountryData('australia');

// getCountryData('france');

*/

///////////////////////////////////////

// ¿Cómo manejamos solicitudes rechazadas (rejected fetch)?

// Una fech rechazada sucede cuando el usuario pierde su conexión a internet, por ahora ese va a ser el único error que manejemos acá.

// Para solucionar el problema, podemos usar "catch al final de la cadena, y con esto capturamos cualquier error que se produzca en cualquier lugar en toda la cadena de promesas, no importan dónde esté.

// Con "renderError" imprimimos en la pantalla un mensaje con el error para el usuario, y atenuamos la opacidad de la pantalla.

// "err" es un objeto de javascript, y como cualquier objeto, contiene la propiedad mensaje dentro de el. Y en este caso vamos a usarla, para mostrar solo el mensaje de ese error y no todo el objeto en sí.

// El método "finally" no es muy utilizado, pero a veces sirve para cuestiones especiales. No importa si el llamado a la API funcionó o no, (si se realizó con éxito o si tuvo algún error) este método "finally" siempre se produce, no importa el resultado de la promesa.

///////////////////////////////////////

// ¿Cómo realmente funciona JS detrás de escena?
/*

el = document.querySelector('img');
el.src = 'dog.jpg';
el.addEventListener('load', () => {
  el.classList.add('fadeIn');
});

fetch('https://someurl.com/api').then(res => console.log(res));

*/

///////////////////////////////////////

// console.log('Test Start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 100000000; i++) {}
//   console.log(res);
// });

// console.log('Test end');

// // Output:
// Test Start
// Test End
// Resolved promise 1
// Resolved promise 2
// 0 sec Timer

// El código fuera de cualquier devolución de llamada de ejecutará primero.
// Las microtareas tienen prioridad sobre las devoluciones de llamada regulares, es que si una de las micro-tareas tarda mucho en ejecutarse, entonces el temporizador se retrasará y no se ejecutará. En cambio se ejecutará un poco más tarde, justo después de que la microtarea haya terminado con su trabajo.

///////////////////////////////////////
/*
// ENCAPSULAMIENTO DE COMPORTAMIENTOS ASINCRÓNICOS EN UNA PROMESA:

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening 🔮');

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💶');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
// Para establecer la promesa como cumplida, utilizamos la resolve() function. Así que basicamente llamar a la función de resolución

// Vemos como funciona una promesa con setTimeout para crear una "función de espera":

// Promisifiying setTimeout:
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));
// En estas funciones de espera no se especifican las reject parámeter.

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// MANERA FACIL DE CREAR UNA RESOLVE/ REJECT PROMISE:
Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));

*/

///////////////////////////////////////
///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}.
The AJAX call will be done to a URL with this format: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=52.508&longitude=13.381. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
/*
const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  )
    .then(res => {
      if (!res.ok) {
        throw new Error(`Problem with geocoding ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.countryName}`);
      return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Country not found (${res.status})`);
      }
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`💥 ❌ ${err.message} ❌ 💥`));
};

// Ejemplo de uso
whereAmI(52.508, 13.381); // You are in Berlin, Germany
// whereAmI(19.037, 72.873); // You are in Mumbai, India
// whereAmI(-33.933, 18.474); // You are in Cape Town, South Africa
*/

///////////////////////////////////////

/* 

// Promisifying the geolocation API:

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}` // obtenemos la ubicación del país.
      );
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Problem with geocoding ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.countryName}`);

      return fetch(`https://restcountries.com/v2/name/${data.countryName}`); // obtenemos todos los datos para mostrar del país
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Country not found (${res.status})`);

        return res.json();
      }
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};

btn.addEventListener('click', whereAmI);

*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

/*
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    // esperamos al evento de carga de la imagen
    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img); // marcamos como resultado exitoso la imagen (img)
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2); // esperamos 2 segundos
  })
  .then(() => {
    currentImg.style.display = 'none'; // ocultamos la imagen actual
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 3 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));

  */

///////////////////////////////////////

// Consuming Promises with Async/Await
// Error Handling With try...catch

// Una función asíncrona, es básicamente aquella que se mantendrá en ejecución en segundo plano mientras se realiza el código que está dentro de ella, luego cuando esa función termina, devuelve una promesa.

// "await" va a detener la ejecución del código en este punto de la función hasta que se cumpla la promesa.

// Lo espercial de sync/await, es el hecho de que hace que el código parezca código síncrono regular. Mientras que detrás de escena, todo es de hecho síncrono.

const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// fetch(`https://restcountries.com/v2/name/${country}`).then(res => console.log(res))

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    );
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // Country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.countryCode}`
    );

    // BUG in video:
    // if (!resGeo.ok) throw new Error('Problem getting country');

    // FIX:
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);
  }
};
whereAmI();
whereAmI();
whereAmI();
console.log('FIRST');

// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }

// OJO PORQUE EL CODIGO DE ARRIBA ESTÁ RARO, NO ESTÁ DEL TODO CLARO NI PROLIJO.

///////////////////////////////////////
///////////////////////////////////////

// Running Promises in Parallel
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://restcountries.com/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.com/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.com/v2/name/${c3}`
    // );
    // console.log([data1.capital, data2.capital, data3.capital]);

    // ABAJO VEMOS COMO SE DEBE ESCRIBIR ACTUALMENTE EL CODIGO DE ARRIBA:
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};
get3Countries('portugal', 'canada', 'tanzania');

///////////////////////////////////////

// Other Promise Combinators: race, allSettled and any
// Promise.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};
Promise.race([
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any [ES2021]
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
