# Storyboard de "Cuando el viaje cambia de rumbo"

El mundo es un atlas de Argentina. Cada destino es una región ilustrada ubicada sobre su punto del mapa.
Coordenadas de cámara: `[x, y, ancho visible, rotación]`, en unidades locales de la región. Las paradas reales están en `js/regions/*.js`.

| Parte | Región | Paradas | Movimiento de cámara | Valeria | Interacción |
|---|---|---|---|---|---|
| Prólogo | Atlas | cover, pasaporte, noticia, pregunta, caso-real | Vista general → acercamiento a pasaporte y teléfono | Saluda, señala, mira el teléfono | Encuesta |
| 1 | Iguazú | i-llegada → i-abierto | Zoom al pin, recorrido por la pasarela, flashback 2023 | Camina, se sorprende ante la barrera | Circuitos abiertos, ficha del cierre |
| 1 | Cielo | tema, n-sky, n-dato | Paneo vertical hacia la tormenta | Mira hacia arriba | ENOS, regiones |
| 1 | Pueblo | duda, cadena, lluvia | Paneo a la calle; se apagan las luces | Con el teléfono, preocupada | — |
| 1 | Atlas | conexion | Alejamiento a todo el país | — | RAMCC, jerarquía |
| 2 | Sistema | d-intro → d-eco | Paneo por las piezas y caída en cadena | Empuja la primera | Cada dominó abre su ficha |
| 2 | Entre Ríos | e-llegada → e-hogar | Costa, crecida, anillos en el agua, viñetas | Camina por la playa | Elegir alternativa, anillos de empleo |
| 3 | Atlas → El Chaltén | ruta-sur, c-* | Camina por el mapa, zoom al macizo | Observa el pueblo llenarse | Deslizador de capacidad de carga, TUU |
| 3 | Ushuaia | u-* | Muelle, cuerda, cadena, engranajes | Señala, se preocupa | Escalas de superestructura |
| 3 | Atlas | ruta-usu, dimensiones | Vista general | Piensa | Cuatro dimensiones |
| 4 | Futuros | f-* | Cruce 2030, izquierda tormenta, derecha sol | Elige caminos | Comparador de 5 ejes |
| 5 | Destino | m-* | Teléfono, mochila, tendedero, pilares | Festeja, señala | Dos mensajes, 7 propuestas |
| Cierre | Atlas | final-q, final | Vuelta a la vista general | Saluda | Fuentes y glosario |

## Cómo editar
- Textos y datos de las escenas: cada `js/regions/*.js`.
- Fichas emergentes, glosario y fuentes: `js/data/fichas.js`.
- Velocidad total del scroll: `UNIT_VH` en `js/engine.js`.
- Duración de cada parada: `travel` y `hold` en cada `VJ.beat`.
