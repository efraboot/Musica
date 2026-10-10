# Afina Bird + Dictado musical — profe.efra

Versión 0.2. Dos minijuegos musicales en una web estática, sin cuentas ni dependencias externas. La pantalla de inicio permite elegir afinación o transcripción de melodías.

## Archivos y publicación

Sube todos los archivos de esta carpeta a la raíz del repositorio: `index.html`, `dictado.js`, `dictado.css`, `LICENSE-musica.txt` y `README.md`. Si actualizas la versión anterior, reemplaza `index.html` y añade los dos archivos `dictado.*` juntos. No necesitas compilar.

Para GitHub Pages, configura el repositorio para publicar la rama principal desde su carpeta raíz. Si Pages ya está activo, basta con actualizar los archivos y esperar a que termine la publicación. Abre la dirección HTTPS del juego.

Para probar localmente, en esta carpeta ejecuta `python3 -m http.server 8000` (o `py -m http.server 8000` en Windows). Abre `http://localhost:8000`. El micrófono exige HTTPS o localhost; el dictado no usa micrófono.

## Afinación

La voz controla la altura del pajarito, con notas Do–Si, tres dificultades y tres registros. Elige escala ascendente o notas mezcladas. Mantén la nota objetivo afinada durante 0,3 segundos antes de cruzar y mientras atraviesas el obstáculo. Si callas, se detiene el avance. Tienes tres vidas y 14 obstáculos.

Puedes escuchar la nota de referencia, pausar o apagar el micrófono. Mientras suena la referencia se detiene la detección. Al cambiar de minijuego se libera el micrófono.

## Dictado musical

Escucha una melodía de dos compases en clave de sol y reconstruye sus notas, duraciones y silencios. Cada melodía empieza en Do4 para ofrecer una referencia tonal, y puedes escuchar el Do4 por separado. La afinación de referencia es La4 = 440 Hz.

| Nivel | Notas | Figuras y silencios | Compases |
| --- | --- | --- | --- |
| 1 | Do4, Mi4, Sol4 | Negras, blancas y redondas; sin silencios | 4/4 |
| 2 | Do4, Mi4, Sol4 | Figuras básicas que caben en el compás | 4/4, 2/4, 3/4 |
| 3 | Do4, Mi4, Sol4 | Añade corcheas y silencios | 4/4, 2/4, 3/4 |
| 4 | Do4, Mi4, Sol4 | Añade semicorcheas y sus silencios | 4/4, 2/4, 3/4 |
| 5 | Do4–Do5, escala de Do mayor | Negras, blancas, redondas y silencios | 4/4, 2/4, 3/4 |
| 6 | Do4–Do5 | Todas las figuras anteriores y silencios | 4/4, 2/4, 3/4 |
| 7 | Do4–Do5 | Figuras básicas, figuras con puntillo y silencios | 6/8 |

Las redondas y sus silencios solo están disponibles en 4/4: no caben en los otros compases sin ligaduras. En 6/8 se añaden blanca, negra y corchea con puntillo; el pulso es una negra con puntillo y se cuentan dos grupos de tres corcheas. No hay ligaduras, notas que crucen compases, alteraciones ni tresillos.

### Escribir

1. Escucha la cuenta previa de un compás y la melodía de dos compases. Puedes repetirla sin límite y cambiar la velocidad.
2. Elige una figura en la paleta y haz clic o toca el pentagrama, o arrástrala al lugar deseado. La altura indica la nota; la posición horizontal indica su inicio. La cuadrícula se ajusta al nivel.
3. Activa **Colocar silencio** para escribir silencios. No se permiten figuras que se superpongan o excedan la duración del compás.
4. Arrastra una figura colocada para cambiar su nota o inicio. Si la seleccionas, usa las flechas arriba/abajo para cambiar nota, izquierda/derecha para moverla, y Supr para borrarla. La lista inferior también permite cambiar nota, silencio y duración.
5. Usa **Deshacer**, **Vaciar pentagrama** y **Escuchar lo escrito** para revisar. En teléfonos desplaza el pentagrama horizontalmente; también puedes seleccionar una figura y tocar el lugar deseado.
6. Pulsa **Comprobar**. Se comparan altura o silencio, duración e inicio dentro de cada compás. Puedes corregir y volver a comprobar. Los espacios sin escribir cuentan como figuras faltantes; escribe los silencios de manera explícita.
7. **Ver solución** muestra la partitura correcta y permite avanzar. Si la revelas antes de acertar, ese ejercicio no suma acierto. Los ejercicios corregidos quedan bloqueados para evitar modificar su resultado.

Una sesión tiene cinco ejercicios. Tras completarlos puedes empezar otra sesión o subir de nivel. **Otro ejercicio** genera una nueva melodía dentro del mismo número de ejercicio. Todos los niveles se pueden seleccionar libremente: no hay bloqueos.

## Progreso y privacidad

No se utiliza localStorage, cookies, cuentas ni servidor. Al volver a Inicio, cambiar de minijuego, cambiar de nivel/compás, recargar o cerrar, se reinicia el progreso de la sesión. La selección de nivel permanece al volver al dictado dentro de la misma página; al recargar vuelve al nivel 1. Cambiar de pestaña detiene el audio y pausa la afinación, sin borrar el dictado.

El micrófono se analiza localmente con un detector YIN; no se graba ni envía audio. En dictado, las melodías y el metrónomo se sintetizan con Web Audio. No se descargan pistas ni se envían respuestas. La detección vocal puede confundir octavas o fallar con ruido; usa una sola voz y un registro cómodo.

## Validación

Se validaron 1.700 ejercicios generados: compases completos, notas y figuras permitidas, silencios e introducción de corcheas/semicorcheas. En Chromium se verificaron arrastre, colocación táctil simulada, teclado, corrección, reproducción programada, una sesión completa de cinco aciertos, cambio de nivel, reinicio de sesión y cancelación de una solicitud pendiente de micrófono al cambiar de juego. Se inspeccionó la presentación en escritorio y pantalla de teléfono. Se conserva la verificación del detector de afinación con 126 señales sintéticas. La escucha humana, el micrófono real y los gestos en un dispositivo físico requieren una prueba de uso.

Referencias técnicas: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API y https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia

Los contornos de clave y silencios proceden de Bravura (Steinberg), bajo licencia SIL OFL. Conserva `LICENSE-musica.txt` al distribuir el juego.
