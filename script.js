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


/* =========================================================
   MENSAJE EMAIL NO VÁLIDO
   ========================================================= */

const formularioContacto = document.getElementById("formulario-contacto");
const campoEmail = document.getElementById("email");
const errorEmail = document.getElementById("error-email");

if (formularioContacto && campoEmail && errorEmail) {

    function validarEmail() {
        const email = campoEmail.value.trim();

        // Exige texto antes y después de la arroba,
        // un punto y una extensión de al menos dos letras.
        const emailValido =
            /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);

        if (email === "") {
            errorEmail.textContent = "";
            campoEmail.removeAttribute("aria-invalid");
            return false;
        }

        if (!emailValido) {
            errorEmail.textContent =
                "Introduce un correo válido, por ejemplo nombre@gmail.com";
            campoEmail.setAttribute("aria-invalid", "true");
            return false;
        }

        errorEmail.textContent = "";
        campoEmail.removeAttribute("aria-invalid");
        return true;
    }

    campoEmail.addEventListener("input", validarEmail);
    campoEmail.addEventListener("blur", validarEmail);

    formularioContacto.addEventListener("submit", function (evento) {
        if (!validarEmail()) {
            evento.preventDefault();
            errorEmail.textContent =
                "No se puede enviar el formulario: revisa tu correo electrónico.";
            campoEmail.focus();
        }
    });
}

/* =========================================================
   WIDGET METEOROLÓGICO - API OPEN-METEO
   ========================================================= */

const formularioMeteo = document.getElementById("formulario-meteo");

if (formularioMeteo) {

    const campoCiudad = document.getElementById("ciudad-meteo");
    const botonMeteo = document.getElementById("boton-meteo");
    const estadoMeteo = document.getElementById("estado-meteo");
    const resultadoMeteo = document.getElementById("resultado-meteo");

    // Traducción de los códigos meteorológicos.
    const textosClima = {
        0: "Despejado",
        1: "Mayormente despejado",
        2: "Parcialmente nublado",
        3: "Nublado",
        45: "Niebla",
        48: "Niebla con escarcha",
        51: "Llovizna ligera",
        53: "Llovizna moderada",
        55: "Llovizna intensa",
        61: "Lluvia ligera",
        63: "Lluvia moderada",
        65: "Lluvia intensa",
        71: "Nevada ligera",
        73: "Nevada moderada",
        75: "Nevada intensa",
        80: "Chubascos ligeros",
        81: "Chubascos moderados",
        82: "Chubascos intensos",
        95: "Tormenta",
        96: "Tormenta con granizo",
        99: "Tormenta intensa con granizo"
    };

    async function consultarTiempo(ciudad) {

        botonMeteo.disabled = true;
        estadoMeteo.textContent = "Consultando el tiempo...";
        resultadoMeteo.hidden = true;

        try {

            // PASO 1. Buscamos la ciudad y sus coordenadas.
            const urlBusqueda = new URL(
                "https://geocoding-api.open-meteo.com/v1/search"
            );

            urlBusqueda.search = new URLSearchParams({
                name: ciudad,
                count: "1",
                language: "es",
                format: "json"
            });

            const respuestaCiudad = await fetch(urlBusqueda);

            if (!respuestaCiudad.ok) {
                throw new Error("No se ha podido buscar la ciudad.");
            }

            const datosCiudad = await respuestaCiudad.json();
            const lugar = datosCiudad.results?.[0];

            if (!lugar) {
                throw new Error(
                    "No se ha encontrado esa ciudad. Comprueba el nombre."
                );
            }

            // PASO 2. Consultamos el tiempo de esas coordenadas.
            const urlTiempo = new URL(
                "https://api.open-meteo.com/v1/forecast"
            );

            urlTiempo.search = new URLSearchParams({
                latitude: lugar.latitude,
                longitude: lugar.longitude,
                current: [
                    "temperature_2m",
                    "relative_humidity_2m",
                    "apparent_temperature",
                    "weather_code",
                    "wind_speed_10m",
                    "is_day"
                ].join(","),
                timezone: "auto"
            });

            const respuestaTiempo = await fetch(urlTiempo);

            if (!respuestaTiempo.ok) {
                throw new Error(
                    "No se han podido obtener los datos meteorológicos."
                );
            }

            const datosTiempo = await respuestaTiempo.json();
            const actual = datosTiempo.current;

            if (!actual) {
                throw new Error("No hay datos meteorológicos disponibles.");
            }

            // PASO 3. Mostramos los datos en el HTML.
            document.getElementById("nombre-ciudad-meteo").textContent =
                `${lugar.name}, ${lugar.country}`;

            document.getElementById("temperatura-meteo").textContent =
                `${Math.round(actual.temperature_2m)} °C`;

            document.getElementById("sensacion-meteo").textContent =
                `${Math.round(actual.apparent_temperature)} °C`;

            document.getElementById("humedad-meteo").textContent =
                `${actual.relative_humidity_2m} %`;

            document.getElementById("viento-meteo").textContent =
                `${actual.wind_speed_10m} km/h`;

            const codigo = actual.weather_code;

            document.getElementById("descripcion-meteo").textContent =
                textosClima[codigo] ??
                "Condiciones meteorológicas variables";

            // PASO 4. Elegimos un icono según el tiempo.
            let icono = "🌤️";

            if (codigo === 0) {
                icono = actual.is_day === 0 ? "🌙" : "☀️";
            } else if ([1, 2].includes(codigo)) {
                icono = "⛅";
            } else if (codigo === 3) {
                icono = "☁️";
            } else if ([45, 48].includes(codigo)) {
                icono = "🌫️";
            } else if (
                (codigo >= 51 && codigo <= 67) ||
                (codigo >= 80 && codigo <= 82)
            ) {
                icono = "🌧️";
            } else if (codigo >= 71 && codigo <= 77) {
                icono = "❄️";
            } else if (codigo >= 95) {
                icono = "⛈️";
            }

            document.getElementById("icono-meteo").textContent = icono;

            // Mostramos el resultado.
            resultadoMeteo.hidden = false;
            estadoMeteo.textContent =
                `Tiempo actual en ${lugar.name}.`;

        } catch (error) {

            console.error("Error del widget meteorológico:", error);

            estadoMeteo.textContent =
                error.message ||
                "Ha ocurrido un error al consultar el tiempo.";

        } finally {

            botonMeteo.disabled = false;

        }
    }

    // Evitamos que el formulario recargue la página.
    formularioMeteo.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const ciudad = campoCiudad.value.trim();

        if (ciudad) {
            consultarTiempo(ciudad);
        }
    });

    // Consulta inicial al abrir la página.
    consultarTiempo("Valencia");
}