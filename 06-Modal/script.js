'use strict';

//Cuando usamos "querySelector" estamos seleccionando todos los elementos que contienen la clase a la cual hacemos referencia después, como se puede ver en los ejemplos de abajo.
const modal = document.querySelector('.modal'); // Guardamos en la variable "modal" la selección de todos los elementos que contienen la clase 'modal' en html
const overlay = document.querySelector('.overlay'); // Guardamos en la variable "overlay" la selección de todos los elementos que contienen la clase 'overlay' en html
const btnCloseModal = document.querySelector('.close-modal'); // Guardamos en la variable "btnCloseModal" la selección de todos los elementos que contienen la clase 'close-modal' en html (en este caso seleccionamos un botón)
const btnsOpenModal = document.querySelectorAll('.show-modal'); // Cuando usamos "querySelectorAll" seleccionamos todos los elementos que contienen la clase que nombramos, en este caso ".show-modal" a su vez, en la consola nos imprime un NodeList. Si lo abrimos y posamos el cursor sobre alguno, podemos ver qué elementos está tomando.
// El NodeList es algo así como una matríz (array) pero a la vez no lo es.

const openModal = function () {
  console.log('Buton cliked');
  modal.classList.remove('hidden'); //removemos la clase hiden del elemento "modal"
  overlay.classList.remove('hidden'); //removemos la clase hiden del elemento "overlay"
};

// Generamos la constante "closeModal" que tiene asociada una función que se encarga de esconder el modal.
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// ADD or REMOVE classes whit JS
//Cuando agregamos o removemos una clase a un elemento, podemos activar o desactivar ciertos estilos css, todos al mismo tiempo, por eso este método es muy importnte.
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal); // Cada vez que haga click, se llama automáticamente a la función "openModal" que remueve la característica 'hidden' del modal o el overlay. Es decir, lo abre cada vez que damos click sobre los botones que contienen el class 'show-modal'. Esto impacta en los tres botones (desde el 1ro hasta el 3ro).
// Este loop for recorre todas las notas, es decir es básicamente un array que contiene todos los botones

// =========== * ===========
// Abajo agregamos la funcionalidad de ocultar el "modal" utilizando un event listener para cuando apretamos la X o cualquier parte blurreada.
btnCloseModal.addEventListener('click', closeModal); // (Apretando en la X escondemos el modal window). Esta función entra en juego exactamente cuando el evento clik ocurre sobre la X que está en el div modal. La función "closeModal" se encarga de agregar la clase 'hidden' (escondido) a los elementos modal y overlay.
overlay.addEventListener('click', closeModal); //(Apretando en cualquier parte blurreada escondemos el modal window). Cuando se hace click sobre cualquier parte blurreada (overlay) se ejecuta la función "closeModal" es decir agrega la propiedad "hidden" a los elementos modal y overlay. Haciendo que el div Modal se cierre o deje de ser visible -> (lo que hace es cerrar o esconder el Modal)

///////////////////
// Cada vez que ocurre un evento de pulsación de tecla, JS pasa el objeto de evento como argumento.
// Ahora queremos especificar con este manipulador de eventos, que cuando tengamos visible el modal, lo podamos cerrar apretando la tecla Escape. Sabemos que el modal está visible, cuando la propiedad 'hidden' está desactivada.
document.addEventListener('keyup', function (e) {
  //console.log(e.key); //Imprime en la cosola qué tecla que se presionó

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  } // Si la tecla presionada es 'Escape' y si el 'modal' NO (!) contiene la clase 'hidden', entonces ejecute la función 'closeModal' para cerrar el modelo.
  //Si el elemento modal NO (!) contiene la clase 'hidden' entre sus atributos activos, entonces cerrar el modal (y para eso utilizamos la función 'closeModal).

  /* Estos dos IF son una forma más larga de escribir el código de arriba:
  if (e.key === 'Escape') {
    if (!modal.classList.contains('hidden')) {
      closeModal();
    } 
  }*/
});
// Existe eventos que suceden apenas toquemos cualquier tecla en el teclado. La función se ejecuta como respuesta a cualquier pulsación de tecla.
// No importa donde sucedan en la página, siempre activarán el manipulador de eventos que vamos a especificar acá.
/* En sí hay tres eventos para el teclado: 
- La tecla abajo (keydown) -por lo general es la más usada-: se activa apenas presionamos la tecla. 
- La tecla presionada (keypress): cando continuamente mantenemos el dedo en una tecla determinada. 
- La tecla arriba (keyup): solo sucede cuando levantamos el dedo del teclado o la tecla básicamente. 
*/
