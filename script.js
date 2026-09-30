/* =========================================================
MODO OSCURO
========================================================= */

/*

* Buscamos el botón del HTML utilizando su id.
  */
  const botonTema = document.getElementById("boton-tema");

/*

* Comprobamos si el usuario tenía guardado anteriormente
* el modo oscuro.
*
* localStorage.getItem("tema") busca un dato llamado "tema".
  */
  const temaGuardado = localStorage.getItem("tema");

/*

* Si el tema guardado es "oscuro", añadimos la clase
* "modo-oscuro" al body.
  */
  if (temaGuardado === "oscuro") {
  document.body.classList.add("modo-oscuro");

  botonTema.textContent = "☀️ Modo claro";
  }

/*

* Esperamos a que el usuario haga clic en el botón.
  */
  botonTema.addEventListener("click", function () {

  /*

  * Añadimos o quitamos la clase "modo-oscuro".
  *
  * classList.toggle() hace:
  * * Si no existe la clase → la añade.
  * * Si ya existe → la elimina.
      */
      document.body.classList.toggle("modo-oscuro");

  /*

  * Comprobamos si el body tiene actualmente
  * la clase "modo-oscuro".
    */
    const modoOscuroActivo =
    document.body.classList.contains("modo-oscuro");

  /*

  * Cambiamos el texto del botón dependiendo
  * del modo en el que estemos.
    */
    if (modoOscuroActivo) {

    botonTema.textContent = "☀️ Modo claro";

    /*

    * Guardamos la preferencia del usuario.
      */
      localStorage.setItem("tema", "oscuro");

  } else {


   botonTema.textContent = "☾ Modo oscuro";

   /*
    * Guardamos que el usuario quiere
    * utilizar el modo claro.
    */
   localStorage.setItem("tema", "claro");
  
  }
  });

/* =========================================================

FONDO DE PARTÍCULAS

========================================================= */

const canvas = document.getElementById("particulas");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;

const particulas = [];

for (let i = 0; i < 60; i++) {

particulas.push({

x: Math.random() * canvas.width,

y: Math.random() * canvas.height,

radio: Math.random() * 1.8 + 0.6,

velocidadX: (Math.random() - 0.5) * 0.3,

velocidadY: (Math.random() - 0.5) * 0.3

});

}

function dibujarParticulas() {

ctx.clearRect(0, 0, canvas.width, canvas.height);

particulas.forEach(function(particula) {

ctx.beginPath();

ctx.arc(particula.x, particula.y, particula.radio, 0, Math.PI * 2);

ctx.fillStyle = "rgba(212, 175, 55, 0.45)";

ctx.fill();

particula.x += particula.velocidadX;

particula.y += particula.velocidadY;

});

requestAnimationFrame(dibujarParticulas);

}

dibujarParticulas();




