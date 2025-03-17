'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to'); // selecciona el botón que activará el desplazamiento
const section1 = document.querySelector('#section--1'); // selecciona la primera sección a la que queremos movernos
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling

btnScrollTo.addEventListener('click', function (e) {
  // METODO MODERNO PARA EL SCROLL SUAVE (RECOMENDADO):
  section1.scrollIntoView({ behavior: 'smooth' });
});
// cuando un usuario haga clic en el botón con la clase .btn--scroll-to, la página se desplaza suavemente hasta la primera sección (#section--1).
// para entender mejor, mirar más abajo ⬇ (está la explicación completa, método nuevo y método viejo con búsqueda de coordenadas)

///////////////////////////////////////
// Page Navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
// // Event delegation -> usamos el hecho de que los eventos supen de padres a hijos y eso se hace poniendo un eventListener en un padre común de todos los elementos a los que queramos afectar.

// 1. Add event Listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //console.log(e.target); // imprime: dónde sucedió el evento.

  // Matching strategy:
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Tabbed component -> componente con pestañas

// usamos events delegations (para mejorar la velocidad de procesamiento del evento)
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active clases
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// La idea principal es agregar y remover clases según nuestras necesidades para manipular el contenido también en base a las necesidades.

///////////////////////////////////////
// Menu fade animation (fade -> efecto desvanecimiento)

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Pasing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
// revierte el cambio de opacidad que aplicamos arriba ⬆
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation (barra de navegación fija)

const initialCoords = section1.getBoundingClientRect();
//console.log(initialCoords);

window.addEventListener('scroll', function (e) {
  //console.log(window.scrollY);

  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

// NOTA: este efecto queda bien en equipos modernos, por ejemplo no se recomienda usarlo para páginas que se vean en celulares viejos, ya que la experiencia no es la misma.

///////////////////////////////////////
// Menu fade animation (versión 1)

// // se implementa la misma funcionalidad que arriba (sticky navigation) pero usando la nueva API de observador de intersecciones.
// const obsCallBack = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);

// Menu fade animation (versión 2)
//¿Cuándo queremos que el encabezado sea visible? Lo queremos visible cuando el encabezado ya no se intersecte con la viewport (ventana gráfica), es cuando queremos agregar la clase: "isIntersecting: true"
const header = document.querySelector('.header');

const navHeight = nav.getBoundingClientRect().height;
//console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  //console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.add('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});
headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // es null porque usamos como root la viewport
  threshold: 0.15, // se revele cuando aparece un 15 % en la viewport
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
});

// revelamos cada sección a medida que nos acercamos, eliminando la clase 'section--hidden' en cada sección

///////////////////////////////////////
// Lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data -src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // -> esto hace que las imágenes se carguen antes de que lleguen a verse en pantalla (se cargan cuando estamos a 200 px antes de que las alcancemos)
});

imgTargets.forEach(img => imgObserver.observe(img));

// carga diferida de imágenes (la idea es reemplazar la imagen cargada por defecto que tiene menos calidad, por la que está guardada en 'data-src' con más calidad)

///////////////////////////////////////
// Slider

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // BUG in v2: This way, we're not keeping track of the current slide when clicking on a slide
      // const { slide } = e.target.dataset;

      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};
slider();

///////////////////////////////////////
///////////////////////////////////////

/*
// Selecting, creating and deleting elements.

// SELECTING ELEMENTS:

// document
// Abajo seleccionamos todo el documento html:
console.log(document.documentElement); // Si queremos seleccionar algo del DOM debemos llamar a 'document'.
console.log(document.head);
console.log(document.body);

// .querySelector
// Seleccionamos un elemento:
const header = document.querySelector('.header'); // retorna el primer elemento que matchea con el selector '.header'.

// .querySelectorAll
// Si queremos seleccionar múltiples elementos:
const allSections = document.querySelectorAll('.section'); // devuelve una 'NodeList' con todos los elementos que contengan ese selector. Es importante saber que no se actualiza automáticamente si se modificó algo en el DOM.
console.log(allSections);

// .getElementById
document.getElementById('section--1'); // para obtener los elementos en base a sus id, no es necesario poner el '#'.

// .getElementsByTagName
const allButtons = document.getElementsByTagName('button'); // podemos ver todos los botones de la página.
// Este método en realidad devuelve una coleción HTML, eso es diferente de una lista. Esta colección está viva, es dinámica, si algo se actualiza en el DOM, la colección también se actualiza automáticamente.
console.log(allButtons);

// .getElementsByClassName
console.log(document.getElementsByClassName('btn')); // simplemente colocamos el nombre de la clase, sin el '.' adelante.

// CREATING, INSERTING AND MOVE ELEMENTS:

// .insertAdjacentHTML -> permite crear elementos
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'; // ambas, textContent e innerHTML pueden usarse para leer y configurar contenido.

//header.prepend(message); // prepend -> (anteponer) permite visualizar el mensaje en el header de la página web (antes de todo)
header.append(message);
// Nota: no se puede repetir el mismo elemento en múltiples lugares. Por ejemplo 'message' solo puede estar en 1 lugar activo a la vez. Acá se mantiene activo abajo (append) porque el código está escrito después de prepend, entonces lo pisa (en la página web el mensaje se movió hasta abajo de todo).

// CLONAR ELEMENTOS para tenerlos en varios lugares al mismo tiempo:

//header.append(message.cloneNode(true));   // -> esto si permite tener activo el mensaje tanto en el prepend como en el append al mismo tiempo.

//header.before(message); // inserta el mensaje antes del header element (encabezado)
header.after(message); // inserta el mensaje después del header element.

// DELETE ELEMENTS:
// Ahora lo que hacemos es configurar que el button close-cookie se elimine cuando hacemos click en Got it!
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove(); // esta forma de eliminación es reciente
    message.parentElement.removeChild(message); // esta es la forma antigüa en la que se eliminaban elementos (haciendo DOM traversing)
  });

// STYLES, ATTRIBUTES AND CLASSES:

// STYLES
message.style.backgroundColor = '#37383d';

message.style.width = '120%';

console.log(message.style.color); // esto no imprime nada
console.log(message.style.backgroundColor); // imrpime: rgb(55, 56, 61) -> esto solo funciona para los inline styles.

// getComputedStyle:
console.log(getComputedStyle(message)); // devuelve un objeto que contiene todas las propiedades y todos los valores.
console.log(getComputedStyle(message).color); // rgb(187, 187, 187) -> para que no devuelva el objeto gigante con todas las propiedades y los valores, lo que hacemos es especificar al final con (.color) cuál es la propiedad que queremos.
console.log(getComputedStyle(message).height); // 48.3333px

// modificamos la altura del banner con getComputedStyle:
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';
// arriba usamos parseFloat porque el valor que aparece en el DOM es un string y está pegado a los px. Necesitamos extraer solo el número cuando lo llamemos para hacer el cambio de altura. Con Number nos aseguramos que se convierta en número.

document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes:
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className); // imprime: nav__logo

// Al igual que se pueden leer los atributos desde el DOM, tambén se pueden establecer:

// Set Attibutes:
logo.alt = 'Beautiful minimalist logo'; // establecemos la descripción (alt) de la imagen

// Non-standard
console.log(logo.designer); // no se lee, porque no suele ser un standar que se espera que esté en las imágenes.
// otra forma de leer el 'designer' desde el DOM:
console.log(logo.getAttribute('designer')); // imprime: Jonas
// Lo opuesto a getAttribute, es setAttribute:
logo.setAttribute('company', 'Bankist'); // establecemos el atributo 'company = Bankist'.

console.log(logo.src); // imprime: http://127.0.0.1:8080/img/logo.png  -> (versión absoluta)
console.log(logo.getAttribute('src')); // imprime:  img/logo.png -> (versión relativa)

// En este caso ambos se imprimen igual, de la forma abreviada y con getAttribute:
const link = document.querySelector('.twitter-link');
console.log(link.href); // imprime: https://twitter.com/jonasschmedtman
console.log(link.getAttribute('href')); // imprime: https://twitter.com/jonasschmedtman

// Pero no sucede lo mismo cuando queremos imprimir los links que están arriba de todo.

const link2 = document.querySelector('.nav__link--btn');
console.log(link.href); // imprime: https://twitter.com/jonasschmedtman
console.log(link2.getAttribute('href')); // imprime: #

// Data Attributes:
// son un tipo especial de atributos que empiezan por la palabra 'dato' seguido de '-' y luego podemos especificar lo que queramos.
// Cuando los llamamos desde JS, usamos camenCase, en lugar del guión medio que tienen, lo transformamos.
// Estos atributos especiales, siempre se almacenan en el objeto 'dataset'.
// Usamos bastantes atributos de datos cuando trabajamos cuando trabajamos con UI, especialmente cuando necesitamos almacenar datos en la interfaz de usuario, básicamente en el código HTML
// abajo transformamos -> 'data-version-number' en 'dataset.versionNumber':
console.log(logo.dataset.versionNumber);

// Classes:
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // trabaja de la misma forma que ('includes' en los arrays)

// No usar ⬇ :
logo.className = 'Jonas';
*/

///////////////////////////////////////

/*
// APLICACIÓN DE DESPLAZAMIENTO SUAVE HASTA SECCIÓN 1.

// Queremos que, cuando un usuario haga clic en el botón con la clase .btn--scroll-to, la página se desplace suavemente hasta la primera sección (#section--1).

const btnScrollTo = document.querySelector('.btn--scroll-to'); // selecciona el botón que activará el desplazamiento
const section1 = document.querySelector('#section--1'); // selecciona la primera sección a la que queremos movernos

btnScrollTo.addEventListener('click', function (e) {
  // toda esta fila le dice al navegador: "Cuando alguien haga clic en el botón, ejecuta esta función". 'e' es el evento del click. Nos da información sobre la interacción (como qué elemento fue clickeado).

  // OBTENEMOS LAS COORDENADAS DE LA SECCIÓN 1:
  const s1coords = section1.getBoundingClientRect(); // section1.getBoundingClientRect() obtiene un objeto con las coordenadas de la sección en relación con la ventana del navegador (no con toda la página).
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  // OBTENEMOS INFORMACIÓN DEL SCROLL ACTUAL:
  // IMPORTANTE: DEPRECATED -> usar 'scrollX' y 'scrollY' en lugar de 'pageXOffset' y 'pageYOffset', porque estas dos últimas están obsoletas.
  // Esto de abajo sirve para saber cuanta distancia nos desplazamos (en px) desde la parte TOP de la webpage para abajo.
  console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);
  //window.scrollX → Cuántos píxeles nos desplazamos horizontalmente desde el borde izquierdo.
  // window.scrollY → Cuántos píxeles nos desplazamos verticalmente desde el borde superior.

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // SCROLLING:
  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // ); // esto hace que cuando apretemos el button 'Learn more' realmente nos lleve a la 1ra sección de manera correcta.
  // current position + current scroll

  // METODO ANTIGUO PARA IMPLEMENTAR SCROLL SUAVE (NO recomendado):
  // Hacemos que la animación de este movimiento se vea de manera más suave:
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // }); // implementamos un desplazamiento suave (smooth).
  // un objeto con las propieddes 'left', 'top' y 'behavior'

  // METODO MODERNO PARA SCROLL SUAVE (RECOMENDADO):
  section1.scrollIntoView({ behavior: 'smooth' });
});

// ESTO ES UN EJEMPLO DE LO QUE DEVUELVE -> 'section1.getBoundingClientRect();'
// {
//   x: 50,       // Distancia desde el borde izquierdo de la ventana
//   y: 500,      // Distancia desde el borde superior de la ventana
//   width: 800,  // Ancho del elemento
//   height: 600, // Alto del elemento
//   top: 500,    // Igual que "y", distancia desde el borde superior
//   left: 50,    // Igual que "x", distancia desde el borde izquierdo
//   bottom: 1100 // Distancia desde la parte superior hasta el final del elemento
// }
// 'top' e 'y' siempre tienen el mismo resultado. Lo mismo sucede con 'left' y 'x'.
*/

///////////////////////////////////////
///////////////////////////////////////

/*
// TYPES OF EVENTS AND EVENT HANDLERS:

// vamos a ver dos formas más de escuchar eventos:

// Primera forma:
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D ');
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(
  () =>
    // Eliminamos el EventListenner luego de que pasan 3 segundos:
    h1.removeEventListener('mouseenter', alertH1),
  3000
);

// Segunda forma: OJO !! ya no se usa mucho, adjuntar un EVENTLISTENER a un elemento usando 'onevent':
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D ');
// };

// Tercera forma:
// Hacerlo directamente desde el archivo HTML .
*/

///////////////////////////////////////
///////////////////////////////////////

/*
// BUBLING AND CAPTURING:

// cuando un evento burbujea, es como si el eventListener estuviera sucediendo en cada elemento padre del elemento que tiene adjunto el 'addEventListener'.
// Podemos decir que los eventos se propagan, es decir capturan y burbujean, son eventos que se propagan de un lugar a otro.

// Luego de hacer click en el elemento 'Features' vamos a darle color de fondo aleatorio a todos los elementos y esto nos permitirá saber como está sucediendo el burbujeo.

// rgb(255, 255, 255);
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1));
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)} )`;
console.log(randomColor(0, 255));

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propagation (detenemos la propagación de burbujeo)
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});

// e.target es donde se originó el evento.
// e.currentTarget === this   -> son lo mismo
*/

///////////////////////////////////////
///////////////////////////////////////

/* 
// DOM traversing:

const h1 = document.querySelector('h1');

// Going downwards : child ("ir hacia abajo")
console.log(h1.querySelectorAll('.highlight')); // seleccionamos a todos los elementos con la clase .highlight que son hijos del elemento h1.

console.log(h1.childNodes); // imprime: NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]

console.log(h1.children); // imprime: HTMLCollection(3) [span.highlight, br, span.highlight]

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parent ("ir hacia arriba")
console.log(h1.parentNode);
console.log(h1.parentElement);

// closest:
// Lo de abajo ⬇ se usa mucho para delegación de eventos:
h1.closest('.header').style.background = 'var(--gradient-secondary)'; // en algunas ocaciones, necesitamos encontrar un elemento padre, sin importar qué tan lejos esté en el arbol DOM.

h1.closest('h1').style.background = 'var(--gradient-primary)';

// podemos pensar en el más cercano, básicamente como lo opusto a querySelector, ambos reciben una consulta string como entrada, pero querySelector, encuentra a los children sin importar qué tan profundo en el árbol DOM estén. Mientras que el método 'closest' encuentra a los padres.

// Going sideways: siblings
// Por alguna razón en JS, sólo podemos acceder a los hernamos directos, básicamente sólo al anterior, y al siguiente.
console.log(h1.previousElementSibling); // nul -> no tiene elemento hermano anterior
console.log(h1.nextElementSibling); // imprime: <h4> A simpler ... -> ( Si tiene elemento hermano posterior)

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// si queremos leer a todos los hijos, (no solo al anterior y el siguiente) entonces podemos usar un truco de pasar al elemento padre y luego leer todos los hijos desde allí.

console.log(h1.parentElement.children); //imprime: HTMLCollection(4) [h1, h4, button.btn--text.btn--scroll-to, img.header__img]
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
// Así es como podemos trabajar con todos los hermanos de un elemento.
// En el caso de arriba lo que hicimos fué iterar sobre el array que obtubimos haciendo [...] sobre el listado 'HTMLCollection', usando forEach comparamos si el elemento es distinto a h1, entonces se le modifica la escala 0.5 %
*/

///////////////////////////////////////
///////////////////////////////////////

// Eventos importantes que podrían usarse en algunas situaciones:

// DOM content loaded
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

// cuando la página completa ha terminado de cargarse es cuando se activa este evento.
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// Popup:
// Before unload: este evento es creado antes de que el usuario quiera abandonar la página
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// }); // con esto creamos una ventana emergente cuando queremos cerrar la página

///////////////////////////////////////
///////////////////////////////////////

// Las diferentes formas de cargar archivos JS a archivos HTML:

// hay tres maneras, la forma regular, la asincrónica y la defer.
// Podemos escribirlo en el encabezado del documento o generalmente al final del cuerpo.

// Forma 1: NOTA: nunca incluir la etiqueta de script en el encabezado, debemos colocarla al final del cuerpo, para que todo el HTML ya esté analizado.
// Lo ideal es que suceda el parsing del HTML primero, el fetch (analiza) script y se ejecute. (sin embargo este método no es perfecto). El script es obtiene y ejecuta luego de que el HTML es completamente analizado.

// Forma 2: Con el atributo asincrónico, se carga el archivo JS al mismo tiempo que se analiza el HTML. Esto hace que el tiempo de carga sea aún más corto que en el caso anterior. (No tiene sentido colocarlo en el body, el análisis del script siempre ocurre luego del análisis del HTML).
// El evento de carga del contenido DOM no esperará a que se descargue y ejecute el script. Por lo general el contenido DOM cargado espera a que se ejecuten todos los scripts, pero los scripts cargados con async son una excepción.
// Los scripts asincrónicos no garantizan qu se ejecuten en el orden exacto en el que se declaran en el código. Ahora para los terceros donde el orden no importa mucho, como por ejemplo un software de análisis como Google Analytics, o un script de anuncios, en este caso se deberáía usar async. Para cualquier código, donde mi código no necesita interactuar con el código de un tercero, esta opción asincrónica está bien.

// Forma 3: Con el atributo defer (atrazar/ diferir) lo que sucede es que el archivo script todavía se carga de forma asincrónica, pero la ejecución del script se aplaza hasta el final del análisis de HTML. En la práctica la carga de la página web es similar a cuando se usa el atributo "async" pero la diferencia clave es que ahí se difería el análisis HTML, acá el anaisis HTML nunca se interrumpe, porque el script solo se ejecuta al final. (No tiene sentido colocarlo en el body, el análisis del script siempre ocurre luego del análisis del HTML). Los scripts se ejecutan en el orden exacto en el que fueron escritos, declarados (esto es lo que normalmente queremos que suceda)
// Por ejemplo, cuando usamos bibliotecas, queremos incluirla antes de nuestra propia secuencia de comandos, de modo que los comandos puedan usar el código de la biblioteca. En este caso debemos usar defer y no async.

// IMPORTANTE: podemos utilizar diferentes estrategias para diferentes scripts dentro de nuestro código.
// Siempre colocar la etiqueta al final, en el body. Pero por una cuestuón de buena práctica introducida en HTML5. Para que todos los navegadores puedan leer el script JS asincónico o diferido, sea cual sea el que esté utilizando.

// Colores:
// #eee8fe
// #8f83b2
