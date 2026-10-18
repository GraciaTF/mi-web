Portfolio personal — Gracia Tortajada Ferris
1. Descripción del proyecto

Portfolio web personal desarrollado como parte de mi formación en Desarrollo de Aplicaciones Multiplataforma (DAM).

El objetivo es presentar mi perfil, mis proyectos y mis habilidades, ofreciendo una forma de contacto funcional y mostrando algunas de las tecnologías y funcionalidades que estoy aprendiendo.

Web publicada: https://graciatf.github.io/mi-web/

2. Tecnologías utilizadas
HTML5: estructura y contenido de las páginas.
CSS3: diseño visual, adaptación a diferentes tamaños de pantalla, animaciones y modo oscuro.
JavaScript: interactividad, persistencia de preferencias y consumo de una API externa.
Git y GitHub: control de versiones y alojamiento del repositorio.
GitHub Pages: publicación de la web.
Formspree: gestión de los envíos del formulario de contacto.
Open-Meteo: API meteorológica utilizada para consultar el tiempo actual por ciudad.
3. Estructura del proyecto
index.html: página principal del portfolio.
proyectos.html: presentación de mis proyectos.
contacto.html: formulario de contacto y otros canales para encontrarme.
style.css: estilos compartidos y diseño visual.
script.js: funcionalidades e interacciones de JavaScript.
images/: imágenes, iconos y recursos gráficos del proyecto.
4. Decisiones técnicas
Decisión 1. Separar la estructura, los estilos y la funcionalidad

He organizado el proyecto utilizando archivos HTML, CSS y JavaScript separados. De esta forma, el contenido, la presentación visual y el comportamiento de la web se pueden modificar de manera independiente.

Esta organización facilita el mantenimiento y permite localizar mejor los errores sin tener que modificar toda la web a la vez.

Decisión 2. Consumir una API meteorológica externa

He incorporado Open-Meteo para consultar información meteorológica real sin necesidad de desarrollar un sistema propio de recogida de datos.

El funcionamiento consta de dos peticiones: primero se busca la ciudad y se obtienen sus coordenadas; después se consulta la API meteorológica utilizando esas coordenadas. La respuesta se recibe en formato JSON y JavaScript utiliza sus datos para actualizar la interfaz.

Esta decisión permite demostrar el consumo de servicios externos, el uso de fetch, las funciones asíncronas con async/await y el tratamiento de errores.

Decisión 3. Guardar la preferencia del modo oscuro

El modo oscuro utiliza JavaScript para alternar una clase en el documento y localStorage para recordar la preferencia del usuario entre visitas.

Así, la elección visual no se pierde al recargar la página.

5. Contacto y validación

El formulario de contacto utiliza Formspree para gestionar los envíos sin necesidad de implementar un servidor propio.

Los campos obligatorios y la validación del correo ayudan a evitar envíos incorrectos.

6. Publicación y pruebas

La web está publicada mediante GitHub Pages.

Antes de la entrega se comprobarán los enlaces de navegación, el funcionamiento del formulario, la consulta meteorológica, el modo claro y oscuro y la adaptación a dispositivos móviles.

7. Control de versiones

He utilizado Git para registrar la evolución del proyecto mediante commits descriptivos. El historial permite consultar los cambios realizados y recuperar versiones anteriores cuando una modificación provoca errores.

8. Mejoras futuras

Como posibles mejoras futuras, planteo ampliar la documentación técnica, profundizar en las pruebas de accesibilidad y rendimiento y estudiar nuevas formas de automatizar la comunicación con los visitantes (Formspree requiere de una opción de pago para poder activar la respuesta automática, por tanto, valoraría otras opciones).