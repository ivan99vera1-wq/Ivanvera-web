---
name: Ivan Vera — web personal
description: Portfolio de un estudiante de FP DAM con la gramática de una documentación de referencia.
colors:
  ink-black: "#0b0d10"
  ink-black-alt: "#0e1114"
  panel: "#111419"
  panel-bar: "#151920"
  panel-raised: "#1b2028"
  console: "#0c0f12"
  hairline: "#1e232a"
  hairline-strong: "#2b313a"
  text: "#eceef1"
  text-muted: "#a4acb6"
  text-subtle: "#838c97"
  line-number: "#5b636d"
  jade-green: "#4cc38a"
  jade-green-hover: "#6dd4a2"
  jade-ink: "#04150b"
  available-green: "#4cc38a"
  syntax-type: "#8cc0f0"
  syntax-string: "#e8c07d"
  syntax-number: "#f2a08f"
  syntax-comment: "#76808b"
typography:
  display:
    fontFamily: "Hubot Sans, -apple-system, sans-serif"
    fontSize: "clamp(3.1rem, 8.4vw, 6rem)"
    fontWeight: 660
    lineHeight: 0.94
    letterSpacing: "-0.045em"
    fontVariation: "'wdth' 114"
  headline:
    fontFamily: "Hubot Sans, -apple-system, sans-serif"
    fontSize: "clamp(2.1rem, 4.4vw, 3.3rem)"
    fontWeight: 620
    lineHeight: 1.04
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 110"
  title:
    fontFamily: "Hubot Sans, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 620
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Hubot Sans, -apple-system, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Hubot Sans, -apple-system, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.75
rounded:
  control: "7px"
  button: "9px"
  panel: "12px"
spacing:
  gutter: "clamp(1.25rem, 4vw, 2.5rem)"
  section: "clamp(5.5rem, 11vw, 9rem)"
  split-gap: "clamp(2.5rem, 5.5vw, 5.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.jade-green}"
    textColor: "{colors.jade-ink}"
    rounded: "{rounded.button}"
    height: "46px"
    padding: "0 1.35rem"
  button-primary-hover:
    backgroundColor: "{colors.jade-green-hover}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.button}"
    height: "46px"
  panel:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.panel}"
  panel-bar:
    backgroundColor: "{colors.panel-bar}"
    typography: "{typography.code}"
    height: "44px"
  panel-button:
    textColor: "{colors.text-muted}"
    rounded: "{rounded.control}"
    height: "30px"
---

# Design System: Ivan Vera — web personal

## Overview

**Creative North Star: "La documentación de un producto bien hecho".** La web se lee como la referencia de una API: a la izquierda, prosa clara en español para cualquier visitante (reclutadores y pequeños negocios); a la derecha, paneles con código y capturas reales para quien quiera comprobarlo. Sobria, precisa y oscura. La personalidad está en el contenido verdadero (su programa de Variables que imprime quién es), no en efectos.

Anti-referencias explícitas: los brillos neón de la versión anterior, los contadores de métricas en el hero y las rejillas de tarjetas iguales. Del diseño anterior se recuperaron, a petición de Iván y en versión sobria, el fondo de código, la aurora, la máquina de escribir, la barra de progreso y el tilt.

## Colors

### Primary
- **Jade Green** (#4cc38a): el único acento (8,8:1 sobre el fondo; texto Jade Ink #04150b encima a 8,5:1). Botón principal, pestaña activa de cada panel, subrayado del menú, prompt `$`, palabras clave del código, marca del logo. Nunca como relleno de grandes superficies.

### Neutral
- **Ink Black** (#0b0d10): fondo de página. **Ink Black Alt** (#0e1114): secciones alternas.
- **Panel** (#111419), **Panel Bar** (#151920), **Panel Raised** (#1b2028), **Console** (#0c0f12): capas tonales de los paneles.
- **Hairline** (#1e232a) y **Hairline Strong** (#2b313a): toda separación es una línea de 1px.
- **Text** (#eceef1), **Text Muted** (#a4acb6), **Text Subtle** (#838c97): todos ≥4.6:1 sobre cualquier superficie. **Line Number** (#5b636d) es solo decorativo.

### Semantic
- **Available Green** (#4cc38a): coincide con el acento; se usa para el punto de "Disponible" y el estado "Copiado".

### Named Rules
**The One Accent Rule.** Un único acento verde sobre neutros fríos. La sintaxis del código tiene su propia paleta (verde palabras clave, azul tipos, arena cadenas, salmón números) y solo vive dentro de los paneles.

## Typography

**Display/Body:** Hubot Sans (GitHub, OFL), variable en peso y anchura, autoalojada.
**Code:** JetBrains Mono (la tipografía de IntelliJ, OFL), autoalojada.

Ambas caras vienen del mundo real de Iván: GitHub, donde vive su código, e IntelliJ, su IDE.

### Hierarchy
- **Display** (660, clamp(3.1rem, 8.4vw, 6rem), 0.94, anchura 114%): solo el nombre del hero.
- **Headline** (620, clamp(2.1rem, 4.4vw, 3.3rem), 1.04, anchura 110%): títulos de sección. `¿Hablamos?` usa una variante mayor.
- **Title** (620, 1.25rem): subtítulos dentro de una sección y nombres de proyecto (más grandes).
- **Body** (400, 1.0625rem, 1.65, máx. 60ch): prosa en Text Muted, énfasis en Text.
- **Label** (500, 0.8125rem, sin mayúsculas forzadas): metadatos, etiquetas de contacto.
- **Code** (JetBrains Mono 400, 0.8125rem, 1.75): solo código real, rutas de archivo, URLs y comandos.

### Named Rules
**The No-Costume Rule.** La monoespaciada solo aparece donde hay código, archivos, URLs o comandos. Nunca para dar aspecto "técnico" a texto normal.

## Layout

Contenedor de 1200px con gutter `clamp(1.25rem, 4vw, 2.5rem)`. Un único módulo se repite en todas las secciones: `.split`, rejilla `1fr | 1.12fr` con prosa a la izquierda y panel a la derecha, separación `clamp(2.5rem, 5.5vw, 5.5rem)`. En escritorio los paneles de datos son sticky bajo la barra (64px + 2rem). Secciones con padding vertical `clamp(5.5rem, 11vw, 9rem)`.

Por debajo de 900px el módulo pasa a una columna (prosa y luego panel; en proyectos, la captura primero). Por debajo de 760px la navegación se convierte en menú desplegable. Por debajo de 560px los botones del hero ocupan el ancho y el código baja a 0.75rem con scroll horizontal dentro del panel, nunca en la página.

## Elevation & Depth

Plano por defecto. Detrás de todo hay una capa fija de fondo: rejilla de puntos (28px, blanco al 7%), fragmentos de código real que caen en tres profundidades (canvas, opacidad 8–17%, 30 fps en táctil) y, con ratón, la rejilla se ilumina en verde en un radio de 240px alrededor del cursor. El hero añade dos focos de luz muy suaves (verde y azul) que derivan despacio y se pausan fuera de pantalla. La profundidad del contenido se expresa con capas tonales (panel sobre fondo, barra del panel sobre panel, consola más oscura) y líneas de 1px, más un brillo interior de 1px en el borde superior de los paneles (`inset 0 1px 0 rgba(255,255,255,.035)`). No hay sombras proyectadas ni halos de color. Un grano estático al 3,5% evita el plano digital.

## Shapes

Radios escalonados: 7px en controles pequeños, 9px en botones, 12px en paneles, fotos y embeds. La marca del logo es un bloque verde de 10×14px con 2px de radio, un cursor de terminal en reposo. El favicon (`favicon/favicon.svg`) la reutiliza: un `>` en Text sobre una pieza Ink Black de 14/64 de radio con borde Hairline Strong, seguido del mismo bloque verde.

## Components

### Buttons
- **Primary:** fondo Jade Green, texto Jade Ink, 46px de alto (40px en proyectos). Hover: Jade Green Hover, sube 2px, sombra verde desplazada hacia abajo y un destello que cruza el botón (750ms). Active: `scale(.97)` en 120ms.
- **Ghost:** borde Hairline Strong, texto Text. Hover: sube 2px, borde verde y un relleno verde al 10% que sube desde abajo (280ms).
- **Magnético:** con ratón, cada botón se acerca al cursor hasta 6px (horizontal) y 4px (vertical); todo el movimiento es un único `transform` compuesto con transición interrumpible.
- **Panel buttons:** «Ejecutar» empuja su icono al hacer hover y lo hace latir mientras el programa corre; «Copiar» confirma con un pequeño golpe de escala y desenfoque.
- **External icon:** flecha SVG de 1.6px de trazo que se desplaza 2px en diagonal al hacer hover.

### Code Panel (signature)
Barra de 44px con la pestaña de archivo activa subrayada 2px en verde, la ruta del repo en Text Subtle y un botón de acción a la derecha (Ejecutar, Copiar, Ver repo). El cuerpo lleva números de línea y resaltado de sintaxis propio. Variantes: con consola (hero), con captura de web (proyectos) y con pestañas de ejercicios (ARIA tabs, flechas/Home/End, cambio con fundido y desenfoque de 3px en 260ms).

### Contact rows
Filas separadas por líneas de 1px, icono en un cuadrado de 42px, etiqueta en Label y valor en Title. Al hacer hover, el icono se tiñe de verde y la flecha se desplaza. El email tiene botón Copiar con confirmación en verde y anuncio para lectores de pantalla.

### Navigation
Barra fija de 64px con desenfoque; gana línea inferior al hacer scroll. El subrayado verde de 2px se desliza hasta la sección activa (transform, 350ms, ease-out). En móvil, panel desplegable accesible (Esc, clic fuera, fuera del tab order cuando está cerrado).

## Do's and Don'ts

### Do:
- **Do** mostrar código y capturas reales; cada línea de los paneles sale de los repos de Iván.
- **Do** que los programas sean el protagonista del movimiento: el hero y los 5 ejercicios se ejecutan con su salida real (el de Scanner pide un nombre de verdad). Curva única `cubic-bezier(.23, 1, .32, 1)`.
- **Do** mantener el fondo por debajo del contenido: los paneles son opacos y los fragmentos nunca superan el 17% de opacidad.
- **Do** gatear los hover con `(hover:hover) and (pointer:fine)` y respetar `prefers-reduced-motion` (sin desplazamientos, solo fundidos).
- **Do** hacer que todo el contenido sea legible sin JavaScript.

### Don't:
- **Don't** volver a brillos neón en bordes y botones, carruseles infinitos ni puntos pulsantes.
- **Don't** mostrar en el fondo código inventado: los fragmentos salen de los repos de Iván.
- **Don't** usar etiquetas tipo "eyebrow" sobre los títulos ni números de sección decorativos.
- **Don't** usar glifos Unicode o emoji como iconos; los iconos son SVG de trazo uniforme.
- **Don't** inventar experiencia, clientes, métricas ni tecnologías.

## Provenance

- `assets/projects/servitek.jpg` y `assets/projects/solca.jpg`: capturas de las webs publicadas (servitek.pages.dev y solca-decoraciones.vercel.app) hechas con Playwright a 1440×900 el 30-09-2026 y reducidas a 1200px.
- `assets/fonts/`: Hubot Sans y JetBrains Mono de Fontsource (SIL OFL 1.1, licencias incluidas).
