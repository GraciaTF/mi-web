/* =========================================================
MODO OSCURO
========================================================= */

const botonTema = document.getElementById("boton-tema");

if (botonTema) {


/*
* Comprobamos si el usuario tenía guardado anteriormente
* el modo oscuro.
*/
const temaGuardado = localStorage.getItem("tema");

if (temaGuardado === "oscuro") {

    document.body.classList.add("modo-oscuro");

    botonTema.textContent = "☀️ Modo claro";
}

/*
* Esperamos a que el usuario haga clic en el botón.
*/
botonTema.addEventListener("click", function () {

    document.body.classList.toggle("modo-oscuro");

    const modoOscuroActivo =
        document.body.classList.contains("modo-oscuro");

    if (modoOscuroActivo) {

        botonTema.textContent = "☀️ Modo claro";

        localStorage.setItem("tema", "oscuro");

    } else {

        botonTema.textContent = "☾ Modo oscuro";

        localStorage.setItem("tema", "claro");
    }
});


}

/* =========================================================
FONDO DE PARTÍCULAS
========================================================= */

const canvas = document.getElementById("particulas");

if (canvas) {


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

    particulas.forEach(function (particula) {

        ctx.beginPath();

        ctx.arc(
            particula.x,
            particula.y,
            particula.radio,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "rgba(212, 175, 55, 0.45)";

        ctx.fill();

        particula.x += particula.velocidadX;

        particula.y += particula.velocidadY;
    });

    requestAnimationFrame(dibujarParticulas);
}

dibujarParticulas();


}


/* =========================================================
   VISOR DE IMÁGENES DE PROYECTOS
   ========================================================= */

const imagenesProyecto = document.querySelectorAll(".imagen-proyecto");

const visorImagen = document.getElementById("visor-imagen");

const imagenAmpliada = document.getElementById("imagen-ampliada");

const cerrarImagen = document.getElementById("cerrar-imagen");


if (visorImagen && imagenAmpliada && cerrarImagen) {

    imagenesProyecto.forEach(function (imagen) {

        imagen.addEventListener("click", function () {

            imagenAmpliada.src = imagen.src;

            imagenAmpliada.alt = imagen.alt;

            visorImagen.classList.add("activo");

        });

    });


    cerrarImagen.addEventListener("click", function () {

        visorImagen.classList.remove("activo");

    });


    visorImagen.addEventListener("click", function (evento) {

        if (evento.target === visorImagen) {

            visorImagen.classList.remove("activo");

        }

    });

}