# Diseño — Web personal de Iván Vera

**Fecha:** 2026-09-29
**Estado:** aprobado por el usuario (pendiente de revisión del documento)
**Repo:** `Ivanvera-web` (`github.com/ivanvera7`)

## 1. Objetivo

Crear una web personal y profesional en español que presente a Iván Vera (27 años, paraguayo, residente en Madrid, estudiante de FP DAM), sus proyectos de Java y web, su perfil profesional, su actividad en Instagram y sus datos de contacto. Debe ser visualmente distintiva, con muchas animaciones y sin dependencias externas salvo el embed oficial de Instagram.

## 2. Fuente de verdad de los datos

Toda la información de la web sale de fuentes verificadas:

| Dato | Valor |
|---|---|
| Nombre | Iván Vera |
| Edad | 27 años |
| Nacionalidad | 🇵🇾 Paraguayo |
| Residencia | Madrid, España |
| Estudios | FP DAM (Desarrollo de Aplicaciones Multiplataforma) |
| Email | `ivan99vera1@gmail.com` |
| WhatsApp | `683224002` → `https://wa.me/34683224002` |
| Instagram | `@ivanvera7_` → `https://www.instagram.com/ivanvera7_/` |
| GitHub | `@ivanvera7` → `https://github.com/ivanvera7` |
| Avatar | `https://avatars.githubusercontent.com/u/250408943?v=4` |

### 2.1 Publicaciones de Instagram (4)

Enlaces limpiados de parámetros `utm_*`/`stkn`:

1. `https://www.instagram.com/p/DZABMcmDMod/`
2. `https://www.instagram.com/p/DYuS2Z0DNT6/`
3. `https://www.instagram.com/p/DYnQLQWjIQT/`
4. `https://www.instagram.com/p/DVzHhs7jGHE/`

Método elegido por el usuario: **embeds oficiales de Instagram** (`blockquote.instagram-media` + `//www.instagram.com/embed.js`). No se hace scraping (Instagram devuelve una página de login sin datos) ni se usa la Graph API.

### 2.2 Proyectos (7)

**5 ejercicios de Java** — repos `Ejercicio1-HolaMundo` … `Ejercicio5-Info-de-usuario`, código real en `IdeaProjects/`:

1. **HolaMundo** — imprime "Hola, me llamo Ivan" y "Estoy aprendiendo Java". Conceptos: `main`, `System.out.println`.
2. **Variables** — `String`, `int`, `double` con nombre, ciudad, edad (27), altura (1.79) y concatenación.
3. **Sumar** — suma de dos enteros (15 + 7) y muestra el resultado.
4. **Calculadora** — suma, resta, multiplicación y división de 20 y 5.
5. **Info de usuario** — `java.util.Scanner` para leer el nombre por teclado, con `scanner.close()`.

**2 proyectos web (TypeScript):**

6. **servitek-web** — sitio corporativo de SERVITEK E.A.S. (electromecánica industrial, Paraguay). Next.js 14 App Router, TypeScript estricto, Tailwind, CI en GitHub Actions, despliegue en Cloudflare Pages. Aún no publicado.
7. **Solca-decoraciones** — web para una empresa de decoraciones en Paraguay. TypeScript, publicada en `https://solca-decoraciones.vercel.app`.

Cada tarjeta enlaza a su repo de GitHub.

## 3. Arquitectura

Estático, sin build, sin framework (opción B elegida por el usuario):

```
Ivanvera-web/
├── index.html      # semantic HTML, lang="es"
├── styles.css      # diseño + keyframes
├── script.js       # JS vanilla
├── assets/         # solo si hace falta un recurso local (opcional)
└── docs/superpowers/specs/…  # este documento
```

- **Despliegue:** GitHub Pages, rama `main`, carpeta raíz.
- **0 dependencias** de terceros salvo `//www.instagram.com/embed.js`.
- El fichero vacío `src/Main.java` y `.idea/` no se incluyen en el commit (el usuario fue informado y no se opuso).

## 4. Estructura de la página

Seis secciones en orden, navegación fija arriba con píldora deslizante:

1. **Hero** — fondo aurora animado + lluvia de código; kicker "● DISPONIBLE PARA PROYECTOS — MADRID, ES"; nombre **Ivan Vera** con efecto máquina de escribir y cursor parpadeante (sin `$ whoami`, decisión explícita del usuario); subtítulo con sus datos; contadores animados (27 años / 7 proyectos / 4 publicaciones / 3 lenguajes: Java, SQL y TypeScript); CTA `./ver_proyectos` (glow) y `Contactar ↗`.
2. **Sobre mí** — avatar de GitHub, bio, tarjetas de datos (edad, nacionalidad, ciudad, estudios).
3. **Stack y IA** — tarjetas de lenguajes (Java, SQL, TypeScript) con barras que se rellenan al entrar en pantalla, más un bloque destacado **"Uso de IA — Claude para proyectos"**.
4. **Proyectos** — 7 tarjetas enlazando a GitHub; las 5 de Java muestran concepto y fragmento de código real.
5. **Instagram** — cuadrícula de los 4 embeds oficiales.
6. **Contacto / footer** — email, WhatsApp, Instagram, GitHub.

## 5. Dirección visual (elegida: A + aurora)

- Base `#0d1117`, superficie `#161b22`, borde `#30363d`.
- Tipografía: `ui-monospace, SFMono-Regular, Menlo` para etiquetas/código; `system-ui` para párrafos largos.
- Acentos: verde `#3fb950` (disponible/CTA), azul `#58a6ff` (cifras/enlaces), violeta `#a855f7` y cian `#4de0d0` en el aurora.
- **Aurora:** 3 blobs posicionados `absolute` con `filter: blur(60px)`, animados en bucle con `transform: translate3d/rotate/scale` sobre el hero.
- Tarjetas con `border-radius` 10-14 px, hover con elevación y glow verde.

## 6. Animaciones (8, todas activas)

1. Lluvia de código sutil tras el hero (trechos `System.out.println`, `SELECT * FROM`… con `translateY` infinito).
2. Contadores de 0 → valor al entrar en pantalla (`IntersectionObserver`).
3. Tarjetas 3D con inclinación según posición del ratón (`rotateX/rotateY`) y brillo que sigue al cursor.
4. Barra de progreso de scroll en el borde superior.
5. Parallax del aurora al hacer scroll.
6. Spotlight que sigue al cursor sobre la página.
7. Glitch leve periódico en "Ivan Vera".
8. Nav con píldora deslizante + `scroll-behavior: smooth`.

Complementos ya incluidos: máquina de escribir en el nombre, cursor parpadeante, reveal al entrar en pantalla, transiciones de hover.

**Restricción obligatoria:** todo lo anterior se anula bajo `@media (prefers-reduced-motion: reduce)`.

## 7. Robustez y calidad

- **Responsive:** móvil-first; nav pasa a menú hamburguesa; los embeds se apilan en una columna.
- **Embeds:** si un post no carga (borrado o privado), se muestra su miniatura con enlace directo en lugar de un hueco rojo; `loading="lazy"`.
- **SEO:** `lang="es"`, `<title>` "Ivan Vera — FP DAM · Java · IA", meta description, Open Graph con el avatar.
- **Accesibilidad:** contraste AA, foco visible, `alt` en todas las imágenes, enlaces/botones semánticos.
- **Manejo de errores:** la cuenta de proyectos/publicaciones se genera desde los propios arrays de datos (no números fijos), para que no se desincronicen al añadir proyectos.

## 8. Fuera de alcance

- Framework, bundler o paso de build.
- API de Instagram / base de datos / backend.
- Modo oscuro/claro dual (la web es oscura por diseño).
- Blog o páginas múltiples: es una one-page.
