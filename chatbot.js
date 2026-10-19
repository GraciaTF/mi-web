
(() => {
    "use strict";

    // =========================================================
    // EDITA SOLO ESTE TEXTO (viene de notas.txt)
    // =========================================================

    const INSTRUCCIONES = `
Eres BitXi, el asistente de la web personal de Gracia.
Responde SIEMPRE en español de España.
Habla en nombre de Gracia con tono formal y amable.
Responde con dos o tres frases como máximo.
Gracia estudia Desarrollo de Aplicaciones Multiplataforma (DAM)
en modalidad semipresencial en el IES Lluís Simarro de Xàtiva.
Está aprendiendo Odoo, C++, Qt y Programación con IA.
Ha estudiado Java, HTML, CSS y SQL.
Sabe HTML, CSS y JS, utiliza Git, ha creado esta web con IA
y ha desarrollado un widget del tiempo.
También le gusta leer y jugar a juegos de rol.
Las consultas sobre presupuestos, horarios o contacto se
remiten siempre al formulario de contacto de la web.
Nunca inventes datos ni reveles información personal.
Si no sabes algo, remite al formulario de contacto.
Las respuestas están definidas por un árbol de decisiones.
No se utiliza inteligencia artificial ni se generan respuestas.
    `.trim();

    // =========================================================
    // RAMAS: RESPUESTAS LITERALES ESCRITAS POR GRACIA
    // No es necesario modificar el resto del código.
    // =========================================================

    const RAMAS = {
        "Quien soy": "Gracia es estudiante de DAM en modalidad semipresencial",
        "Qué estudio": "Desarrollo de aplicaciones multiplataforma",
        "Contacto": "Usa el formulario de contacto de la web",
        "Aficiones": "Le gusta leer",
        "Gustos": "Le gusta leer",
        "Sabe": "Gracia ha aprendido a utilizar HTML, CSS y Java entre otros",
        "Aprendiendo": "Odoo, C++, Qt y programación con IA",
        "Horario": "Usa el formulario de contacto de la web",
        "Presupuesto": "Usa el formulario de contacto de la web",
        "Ayuda": "Usa el formulario de contacto de la web"
    };

    // =========================================================
    // PALABRAS CLAVE DE CADA TEMA
    // Se pueden ampliar sin modificar las respuestas de RAMAS.
    // =========================================================

    const PALABRAS_CLAVE = {
        "Quien soy": [
            "quien", "gracia", "estudiante", "dam",
            "semipresencial", "presentacion", "presentarte"
        ],
        "Qué estudio": [
            "estudio", "estudiar", "estudios", "formacion",
            "desarrollo", "aplicaciones", "multiplataforma",
            "ciclo", "modulo", "grado"
        ],
        "Contacto": [
            "contacto", "contactar", "correo", "email",
            "escribir", "mensaje", "formulario"
        ],
        "Aficiones": [
            "aficion", "aficiones", "leer", "lectura",
            "libros", "pasatiempo", "pasatiempos"
        ],
        "Gustos": [
            "gusta", "gustos", "preferencias", "tiempo libre",
            "rol", "roles", "juegos", "hobby", "hobbies"
        ],
        "Sabe": [
            "sabe", "sabes", "conocimientos", "aprendido",
            "experiencia", "html", "css", "java", "javascript",
            "js", "sql", "git", "programacion", "tecnologias"
        ],
        "Aprendiendo": [
            "aprendiendo", "aprende", "aprender", "odoo",
            "cplusplus", "c++", "qt", "inteligencia",
            "artificial", "ia", "actualmente"
        ],
        "Horario": [
            "horario", "horarios", "disponibilidad",
            "cuando", "hora", "horas"
        ],
        "Presupuesto": [
            "presupuesto", "precio", "precios", "coste",
            "costo", "tarifa", "tarifas", "cuanto", "cuesta"
        ],
        "Ayuda": [
            "ayuda", "ayudar", "consulta", "consultar",
            "informacion", "información"
        ]
    };

    // =========================================================
    // CONFIGURACIÓN VISUAL
    // Colores tomados de style.css de la web de Gracia.
    // =========================================================

    const COLORES = {
        fucsia: "#FF4FC3",
        rosa: "#FFD6E8",
        blanco: "#FFFFFF",
        gris: "#9AA0A2",
        negroLila: "#171827"
    };

    const MENSAJE_DEFECTO =
        "Disculpa, no tengo esa información. Usa el formulario de contacto de la web";

    const MENSAJE_ERROR =
        "El bot está saturado ahora mismo, inténtalo en un rato o usa el formulario de contacto de la web.";

    const TIEMPO_MAXIMO = 20000;
    const TIEMPO_ESCRITURA = 400;

    // Evita duplicar el chatbot si se carga el archivo dos veces.
    if (document.getElementById("bitxi-chatbot")) {
        return;
    }

    // =========================================================
    // INYECCIÓN DEL CSS: NO HACE FALTA TOCAR style.css
    // =========================================================

    const estilo = document.createElement("style");

    estilo.textContent = `
        #bitxi-chatbot {
            --bitxi-fucsia: ${COLORES.fucsia};
            --bitxi-rosa: ${COLORES.rosa};
            --bitxi-blanco: ${COLORES.blanco};
            --bitxi-gris: ${COLORES.gris};
            --bitxi-negro-lila: ${COLORES.negroLila};

            font-family: Arial, Helvetica, sans-serif;
            color: var(--bitxi-negro-lila);
            line-height: 1.5;
            box-sizing: border-box;
        }

        #bitxi-chatbot *,
        #bitxi-chatbot *::before,
        #bitxi-chatbot *::after {
            box-sizing: border-box;
        }

        #bitxi-chatbot button,
        #bitxi-chatbot input {
            font-family: inherit;
        }

        #bitxi-chatbot button:focus-visible,
        #bitxi-chatbot input:focus-visible {
            outline: 3px solid var(--bitxi-negro-lila);
            outline-offset: 3px;
        }

        /* Botón flotante redondo. */
        #bitxi-boton {
            position: fixed;
            right: 28px;
            bottom: 92px;
            z-index: 9998;
            width: 60px;
            height: 60px;
            border: 2px solid var(--bitxi-blanco);
            border-radius: 50%;
            background: var(--bitxi-fucsia);
            color: var(--bitxi-negro-lila);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 18px rgba(23, 24, 39, 0.25);
            transition: transform 0.2s ease;
        }

        #bitxi-boton:hover {
            transform: scale(1.06);
        }

        #bitxi-boton svg {
            width: 29px;
            height: 29px;
        }

        /* Panel del chat. */
        #bitxi-panel {
            position: fixed;
                top: auto;
            margin-top: 0 !important;
            right: 24px;
            bottom: 96px;
            z-index: 9999;
            width: 370px;
            max-width: calc(100vw - 32px);
            height: 510px;
            max-height: calc(100dvh - 120px);
            min-height: 250px;
            background: var(--bitxi-blanco);
            color: var(--bitxi-negro-lila);
            border: 1px solid var(--bitxi-rosa);
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(23, 24, 39, 0.22);
            display: flex;
            flex-direction: column;
            padding: 0 !important;
        }

        #bitxi-panel[hidden] {
            display: none;
        }

       
/* Cabecera de BitXi, con altura controlada. */
#bitxi-chatbot #bitxi-panel > .bitxi-cabecera {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;
    background: var(--bitxi-fucsia);
    gap: 10px;
        min-height: 0 !important;
    height: auto !important;
    margin-block: 0 !important;
    padding-block: 8px !important;
}


        .bitxi-titulo {
            font-size: 18px;
            font-weight: bold;
        }

        .bitxi-subtitulo {
            font-size: 12px;
        }

        #bitxi-cerrar {
            width: 36px;
            height: 36px;
            flex-shrink: 0;
            border: 0;
            border-radius: 50%;
            background: transparent;
            color: var(--bitxi-negro-lila);
            font-size: 27px;
            cursor: pointer;
        }

        #bitxi-cerrar:hover {
            background: rgba(255, 255, 255, 0.35);
        }

        /* Zona desplazable del historial. */
        #bitxi-mensajes {
            flex: 1;
            min-height: 0;
            overflow-y: auto;
            overscroll-behavior: contain;
            padding: 14px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            scroll-behavior: smooth;
        }

        .bitxi-mensaje {
            max-width: 90%;
            padding: 10px 12px;
            border-radius: 14px;
            font-size: 14px;
            line-height: 1.55;
            overflow-wrap: anywhere;
            white-space: pre-wrap;
        }

        .bitxi-bot {
            align-self: flex-start;
            background: var(--bitxi-rosa);
            border-bottom-left-radius: 4px;
        }

        .bitxi-usuario {
            align-self: flex-end;
            background: var(--bitxi-negro-lila);
            color: var(--bitxi-blanco);
            border-bottom-right-radius: 4px;
        }

        /* Preguntas rápidas. */
        .bitxi-atajos {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
            padding: 0 12px 12px;
            flex-shrink: 0;
        }

        .bitxi-atajo {
            padding: 7px 10px;
            border: 1px solid var(--bitxi-fucsia);
            border-radius: 18px;
            background: var(--bitxi-blanco);
            color: var(--bitxi-negro-lila);
            font-size: 12px;
            cursor: pointer;
        }

        .bitxi-atajo:hover {
            background: var(--bitxi-rosa);
        }

        /* Animación de los tres puntos. */
        .bitxi-escribiendo {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            min-width: 65px;
        }

        .bitxi-punto {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: var(--bitxi-negro-lila);
            animation: bitxi-puntos 1s infinite ease-in-out;
        }

        .bitxi-punto:nth-child(2) {
            animation-delay: 0.15s;
        }

        .bitxi-punto:nth-child(3) {
            animation-delay: 0.3s;
        }

        @keyframes bitxi-puntos {
            0%, 60%, 100% {
                transform: translateY(0);
                opacity: 0.4;
            }
            30% {
                transform: translateY(-5px);
                opacity: 1;
            }
        }

        /* Formulario inferior. */
        #bitxi-formulario {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px;
            border-top: 1px solid var(--bitxi-rosa);
            background: var(--bitxi-blanco);
        }

        #bitxi-pregunta {
            flex: 1;
            min-width: 0;
            height: 42px;
            padding: 0 12px;
            border: 1px solid var(--bitxi-gris);
            border-radius: 22px;
            background: var(--bitxi-blanco);
            color: var(--bitxi-negro-lila);
            font-size: 14px;
        }

        #bitxi-pregunta::placeholder {
            color: #626570;
        }

        #bitxi-enviar {
            flex-shrink: 0;
            min-height: 42px;
            padding: 0 15px;
            border: 0;
            border-radius: 22px;
            background: var(--bitxi-fucsia);
            color: var(--bitxi-negro-lila);
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
        }

        #bitxi-enviar:hover:not(:disabled) {
            background: var(--bitxi-rosa);
        }

        #bitxi-enviar:disabled {
            opacity: 0.65;
            cursor: wait;
        }

        /* Adaptación a móviles. */
        @media (max-width: 480px) {
            #bitxi-boton {
                right: 28px;
                bottom: 85px; 
                width: 56px;
                height: 56px;
            }

            #bitxi-panel {
                left: 10px;
                right: 10px;
                bottom: 82px;
                width: auto;
                max-width: none;
                height: min(540px, calc(100dvh - 100px));
                max-height: calc(100dvh - 100px);
                border-radius: 16px;
                padding: 0 !important;
            }

            .bitxi-atajos {
                gap: 5px;
                padding-left: 10px;
                padding-right: 10px;
            }

            .bitxi-atajo {
                padding: 7px 9px;
            }

            #bitxi-formulario {
                gap: 6px;
                padding: 10px;
            }

            #bitxi-enviar {
                padding: 0 12px;
            }
        }

        /* Respeta las preferencias de movimiento del visitante. */
        @media (prefers-reduced-motion: reduce) {
            #bitxi-chatbot *,
            #bitxi-chatbot *::before,
            #bitxi-chatbot *::after {
                animation: none !important;
                transition: none !important;
                scroll-behavior: auto !important;
            }
        }
    `;

    document.head.appendChild(estilo);

    // =========================================================
    // CREACIÓN DE LA ESTRUCTURA DEL CHAT
    // =========================================================

    const contenedor = document.createElement("div");
    contenedor.id = "bitxi-chatbot";

    contenedor.innerHTML = `
        <button
            type="button"
            id="bitxi-boton"
            aria-label="Abrir el chat de BitXi"
            aria-expanded="false"
            aria-controls="bitxi-panel"
            title="Hablar con BitXi"
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <path d="M21 11.5a8 8 0 0 1-8.5 8
                    8.5 8.5 0 0 1-4-.9L3 21l1.4-5.2
                    A8 8 0 0 1 3 11.5a8.5 8.5 0 0 1
                    8.5-8.5 8 8 0 0 1 8 8.5z"/>
            </svg>
        </button>

        <section
            id="bitxi-panel"
            role="dialog"
            aria-label="Chat con BitXi"
            aria-modal="false"
            hidden
        >
           <div class="bitxi-cabecera">
                <div>
                    <div class="bitxi-titulo">BitXi</div>
                    <div class="bitxi-subtitulo">
                        Asistente virtual de Gracia
                    </div>
                </div>

                <button
                    type="button"
                    id="bitxi-cerrar"
                    aria-label="Cerrar el chat"
                    title="Cerrar el chat"
                >×</button>
            </div>

            <div
                id="bitxi-mensajes"
                role="log"
                aria-label="Conversación con BitXi"
                aria-live="polite"
                aria-relevant="additions"
            ></div>

            <div class="bitxi-atajos" aria-label="Preguntas rápidas">
                <button type="button" class="bitxi-atajo"
                    data-pregunta="¿Cuál es tu horario?">
                    Horario
                </button>
                <button type="button" class="bitxi-atajo"
                    data-pregunta="¿Qué estudia Gracia?">
                    Qué estudio
                </button>
                <button type="button" class="bitxi-atajo"
                    data-pregunta="¿Cómo puedo contactar?">
                    Contacto
                </button>
            </div>

            <form id="bitxi-formulario">
                <input
                    type="text"
                    id="bitxi-pregunta"
                    aria-label="Escribe tu pregunta"
                    placeholder="Escribe tu pregunta..."
                    autocomplete="off"
                    maxlength="500"
                    required
                />
                <button type="submit" id="bitxi-enviar">
                    Enviar
                </button>
            </form>
        </section>
    `;

    document.body.appendChild(contenedor);

    // =========================================================
    // REFERENCIAS Y ESTADO DEL CHAT
    // =========================================================

    const botonAbrir = document.getElementById("bitxi-boton");
    const panel = document.getElementById("bitxi-panel");
    const botonCerrar = document.getElementById("bitxi-cerrar");
    const mensajes = document.getElementById("bitxi-mensajes");
    const formulario = document.getElementById("bitxi-formulario");
    const campoPregunta = document.getElementById("bitxi-pregunta");
    const botonEnviar = document.getElementById("bitxi-enviar");
    const botonesRapidos = contenedor.querySelectorAll(".bitxi-atajo");

    let procesando = false;
    let temporizadorRespuesta = null;
    let temporizadorLimite = null;
    let identificadorRespuesta = 0;

    // =========================================================
    // FUNCIONES AUXILIARES
    // =========================================================

    // Normaliza el texto: minúsculas, sin tildes y sin signos.
    function normalizar(texto) {
        return texto
            .toLocaleLowerCase("es-ES")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9+#]+/g, " ")
            .trim();
    }

    // Añade un mensaje usando texto plano para evitar interpretar
    // preguntas o respuestas como código HTML.
    function agregarMensaje(texto, tipo) {
        const burbuja = document.createElement("div");

        burbuja.classList.add("bitxi-mensaje");
        burbuja.classList.add(
            tipo === "usuario" ? "bitxi-usuario" : "bitxi-bot"
        );

        burbuja.textContent = texto;
        mensajes.appendChild(burbuja);

        mensajes.scrollTop = mensajes.scrollHeight;

        return burbuja;
    }

    // Muestra los puntos animados durante la selección local.
    function mostrarEscribiendo() {
        const burbuja = document.createElement("div");

        burbuja.className =
            "bitxi-mensaje bitxi-bot bitxi-escribiendo";
        burbuja.setAttribute("aria-label", "BitXi está escribiendo");

        for (let i = 0; i < 3; i++) {
            const punto = document.createElement("span");
            punto.className = "bitxi-punto";
            punto.setAttribute("aria-hidden", "true");
            burbuja.appendChild(punto);
        }

        mensajes.appendChild(burbuja);
        mensajes.scrollTop = mensajes.scrollHeight;

        return burbuja;
    }

    // Activa o desactiva los controles durante una respuesta.
    function establecerProcesando(valor) {
        procesando = valor;
        campoPregunta.disabled = valor;
        botonEnviar.disabled = valor;
        botonEnviar.textContent = valor ? "Esperando…" : "Enviar";
    }

    // =========================================================
    // ÁRBOL DE DECISIONES
    // Selecciona el tema con más palabras clave coincidentes.
    // Si la puntuación máxima no supera 1, usa el mensaje por defecto.
    // =========================================================

    function buscarRespuesta(pregunta) {
        const texto = normalizar(pregunta);
        const palabrasPregunta = new Set(texto.split(/\s+/));

        let mejorTema = null;
        let mejorPuntuacion = 0;

        for (const tema of Object.keys(RAMAS)) {
            const palabrasClave = PALABRAS_CLAVE[tema] || [];
            let puntuacion = 0;

            for (const palabraClave of palabrasClave) {
                const claveNormalizada = normalizar(palabraClave);

                // Las expresiones de varias palabras se buscan dentro
                // del texto completo; las demás se comparan por palabra.
                if (claveNormalizada.includes(" ")) {
                    if ((" " + texto + " ").includes(
                        " " + claveNormalizada + " "
                    )) {
                        puntuacion++;
                    }
                } else if (palabrasPregunta.has(claveNormalizada)) {
                    puntuacion++;
                }
            }

            // Solo cambiamos de tema si tiene una puntuación superior.
            if (puntuacion > mejorPuntuacion) {
                mejorPuntuacion = puntuacion;
                mejorTema = tema;
            }
        }

        // Una sola coincidencia no basta para dar una respuesta temática.
        if (mejorPuntuacion <= 0 || mejorTema === null) {
            return MENSAJE_DEFECTO;
        }

        // Devuelve literalmente la respuesta definida por Gracia.
        return RAMAS[mejorTema];
    }

    // =========================================================
    // PROCESAMIENTO LOCAL DE UNA PREGUNTA
    // No usa fetch, XMLHttpRequest, IA ni servicios externos.
    // =========================================================

    function enviarPregunta(textoOriginal) {
        if (procesando) {
            return;
        }

        const pregunta = textoOriginal.trim();

        if (!pregunta) {
            campoPregunta.focus();
            return;
        }

        establecerProcesando(true);
        identificadorRespuesta++;

        const miIdentificador = identificadorRespuesta;

        agregarMensaje(pregunta, "usuario");
        campoPregunta.value = "";

        const indicador = mostrarEscribiendo();

        // Límite de seguridad: si el procesamiento no termina,
        // mostramos un mensaje y reactivamos el campo.
        temporizadorLimite = setTimeout(() => {
            if (
                !procesando ||
                miIdentificador !== identificadorRespuesta
            ) {
                return;
            }

            clearTimeout(temporizadorRespuesta);
            indicador.remove();

            agregarMensaje(MENSAJE_ERROR, "bot");
            establecerProcesando(false);

            campoPregunta.focus();
        }, TIEMPO_MAXIMO);

        // Damos tiempo a que se vea el indicador antes de responder.
        temporizadorRespuesta = setTimeout(() => {
            if (
                !procesando ||
                miIdentificador !== identificadorRespuesta
            ) {
                return;
            }

            try {
                const respuesta = buscarRespuesta(pregunta);

                indicador.remove();
                agregarMensaje(respuesta, "bot");
            } catch (error) {
                indicador.remove();
                agregarMensaje(MENSAJE_ERROR, "bot");
            } finally {
                clearTimeout(temporizadorLimite);
                establecerProcesando(false);
                campoPregunta.focus();
            }
        }, TIEMPO_ESCRITURA);
    }

    // =========================================================
    // ABRIR Y CERRAR EL PANEL
    // =========================================================

    function abrirChat() {
        panel.hidden = false;
        botonAbrir.setAttribute("aria-expanded", "true");
        botonAbrir.setAttribute("aria-label", "Cerrar el chat de BitXi");

        campoPregunta.focus();
    }

    function cerrarChat() {
        panel.hidden = true;
        botonAbrir.setAttribute("aria-expanded", "false");
        botonAbrir.setAttribute("aria-label", "Abrir el chat de BitXi");

        botonAbrir.focus();
    }

    botonAbrir.addEventListener("click", () => {
        if (panel.hidden) {
            abrirChat();
        } else {
            cerrarChat();
        }
    });

    botonCerrar.addEventListener("click", cerrarChat);

    // Permite cerrar el panel con Escape.
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && !panel.hidden) {
            cerrarChat();
        }
    });

    // =========================================================
    // FORMULARIO Y PREGUNTAS RÁPIDAS
    // =========================================================

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        if (procesando) {
            return;
        }

        enviarPregunta(campoPregunta.value);
    });

    botonesRapidos.forEach((boton) => {
        boton.addEventListener("click", () => {
            if (procesando) {
                return;
            }

            enviarPregunta(boton.dataset.pregunta);
        });
    });

    // =========================================================
    // MENSAJE INICIAL
    // =========================================================

    agregarMensaje(
        "¡Hola! Soy BitXi, el asistente virtual de Gracia. " +
        "Puedes preguntarme qué estudia, qué sabe hacer o cómo contactar.",
        "bot"
    );

})();
