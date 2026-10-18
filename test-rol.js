
/* =========================================
   TEST: ¿QUÉ PERSONAJE DE ROL SERÍAS?
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // 1. Recogemos los elementos del HTML

    const formulario = document.getElementById("formulario-test-rol");
    const resultado = document.getElementById("resultado-test-rol");
    const aviso = document.getElementById("aviso-test-rol");
    const botonRepetir = document.getElementById("repetir-test-rol");


    // Comprobamos que estamos en la página del test

    if (!formulario || !resultado) {
        return;
    }


    // 2. Definimos los siete roles posibles

    const roles = {

        sabia: {
            nombre: "La Sabia",
            

            descripcion:
                "Tu mayor poder es comprender. Observas, conectas pistas " +
                "y buscas el conocimiento que otras personas pasan por alto. " +
                "En una aventura, eres quien descifra los misterios y recuerda " +
                "que entender el problema suele ser el primer paso para resolverlo.",

            frase:
                "«Toda respuesta abre la puerta a una nueva pregunta»."
        },


        guerrera: {
            nombre: "La Guerrera",
           

            descripcion:
                "Valiente, decidida y leal, eres quien da un paso al frente " +
                "cuando las cosas se complican. Tu fuerza no consiste solo en " +
                "luchar: también está en proteger al grupo, mantenerte firme " +
                "y no abandonar a quienes cuentan contigo.",

            frase:
                "«El valor no es no tener miedo; es avanzar a pesar de él»."
        },


        sanadora: {
            nombre: "La Sanadora",
        

            descripcion:
                "Sabes que ningún grupo llega lejos si deja atrás a quienes " +
                "lo forman. Tu empatía y tu capacidad para escuchar son un " +
                "poder en sí mismos. Encuentras maneras de aliviar heridas, " +
                "devolver la esperanza y ayudar a que cada persona recupere su fuerza.",

            frase:
                "«A veces, el hechizo más poderoso es cuidar»."
        },


        exploradora: {
            nombre: "La Exploradora",
           

            descripcion:
                "Lo desconocido no te detiene: te invita. Te orientas entre " +
                "caminos inciertos, detectas oportunidades y disfrutas " +
                "descubriendo lo que hay más allá del mapa. Cuando el sendero " +
                "termina, tú empiezas a buscar otro.",

            frase:
                "«Si no hay camino, quizá sea hora de dibujarlo»."
        },


        inventora: {
            nombre: "La Inventora",
        icono: "⚙️",

            descripcion:
                "Donde otras personas ven un obstáculo, tú ves piezas que " +
                "todavía no encajan. Experimentas, construyes, pruebas y " +
                "vuelves a intentarlo. Tus ideas pueden cambiar el rumbo " +
                "de una aventura, especialmente cuando nadie sabe cómo salir del apuro.",

            frase:
                "«Si no existe la herramienta adecuada, créala»."
        },


        hechicera: {
            nombre: "La Hechicera",
      

            descripcion:
                "Intuitiva, creativa y un poco imprevisible, encuentras " +
                "posibilidades donde parece que solo hay límites. Te atreves " +
                "a probar soluciones poco convencionales y sabes que un " +
                "toque de imaginación puede alterar el destino de todo un reino.",

            frase:
                "«Lo imposible solo es magia que aún no comprendemos»."
        },


        estratega: {
            nombre: "La Estratega",
         

            descripcion:
                "Lees la situación, anticipas consecuencias y sabes que " +
                "actuar en el momento adecuado puede cambiarlo todo. No " +
                "necesitas ser quien más ruido hace: tu visión de conjunto " +
                "y tu capacidad para organizar al equipo son decisivas.",

            frase:
                "«La mejor jugada empieza mucho antes del primer movimiento»."
        }

    };


    // 3. Cuando se envía el formulario, calculamos el resultado

    formulario.addEventListener("submit", (evento) => {

        // Evitamos que la página se recargue

        evento.preventDefault();

        aviso.textContent = "";


        // Comprobamos que se hayan respondido las siete preguntas

        if (!formulario.reportValidity()) {

            aviso.textContent =
                "Responde a las siete preguntas antes de descubrir tu rol.";

            return;
        }


        // 4. Inicializamos todas las puntuaciones a cero

        const puntuaciones = {};

        for (const rol in roles) {
            puntuaciones[rol] = 0;
        }


        // 5. Recogemos las respuestas seleccionadas

        const respuestas = new FormData(formulario);


        // Sumamos un punto al rol asociado a cada respuesta

        for (let numero = 1; numero <= 7; numero++) {

            const respuesta = respuestas.get("p" + numero);

            // Comprobamos que el valor corresponde a un rol válido

            if (
                Object.prototype.hasOwnProperty.call(
                    puntuaciones,
                    respuesta
                )
            ) {
                puntuaciones[respuesta]++;
            }

        }


        // 6. Buscamos la puntuación más alta

        const puntuacionMaxima = Math.max(
            ...Object.values(puntuaciones)
        );


        // Puede haber empate entre varios roles

        const rolesEmpatados = Object.keys(puntuaciones).filter(
            (rol) => puntuaciones[rol] === puntuacionMaxima
        );


        // Si hay empate, elegimos al azar entre los roles empatados

        const rolGanador = rolesEmpatados[
            Math.floor(Math.random() * rolesEmpatados.length)
        ];


        // Obtenemos la información del rol ganador

        const perfil = roles[rolGanador];


        // 7. Mostramos el resultado en el HTML

        document.getElementById("icono-resultado-rol").textContent =
            perfil.icono;

        document.getElementById("nombre-resultado-rol").textContent =
            perfil.nombre;

        document.getElementById("descripcion-resultado-rol").textContent =
            perfil.descripcion;

        document.getElementById("frase-resultado-rol").textContent =
            perfil.frase;


        // Hacemos visible la sección del resultado

        resultado.hidden = false;


        // Desplazamos la pantalla hasta el resultado

        resultado.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });


    // 8. Si se pulsa "Empezar de nuevo"

    formulario.addEventListener("reset", () => {

        aviso.textContent = "";
        resultado.hidden = true;

    });


    // 9. Si se pulsa "Volver a jugar"

    botonRepetir.addEventListener("click", () => {

        formulario.reset();

        resultado.hidden = true;
        aviso.textContent = "";

        formulario.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});
