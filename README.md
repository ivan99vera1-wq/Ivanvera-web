<div align="center">

# Iván Vera — Web personal

**Portafolio personal con estética terminal / dev oscuro, animaciones propias y cero dependencias.**

[![Web en vivo](https://img.shields.io/badge/web-en%20línea-3fb950?style=flat-square)](https://ivan99vera1-wq.github.io/Ivanvera-web/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=fff)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=fff)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=flat-square&logo=githubpages&logoColor=fff)](https://pages.github.com/)
[![0 dependencias](https://img.shields.io/badge/npm-0%20dependencias-6f42c1?style=flat-square)](#-ejecutar-en-local)

<br>

**[Web en vivo](https://ivan99vera1-wq.github.io/Ivanvera-web/)** · **[Instagram](https://www.instagram.com/ivanvera7_/)** · **[GitHub](https://github.com/ivan99vera1-wq)** · **[Email](mailto:ivan99vera1@gmail.com)**

<img src="docs/preview.jpg" alt="Vista previa de la web personal de Iván Vera" width="900">

</div>

---

## 📄 Sobre el proyecto

Sitio personal **estático** (HTML + CSS + JavaScript) que presenta mi perfil, mi
formación en **FP DAM**, mi stack y mis proyectos, con un feed de Instagram
incrustado y vías de contacto directo.

- **Sin frameworks ni build**: no hay `package.json`, ni `npm install`, ni paso de
  compilación. Lo que ves en los tres archivos es lo que se sirve.
- **Autocontenido**: la única llamada externa son los *embeds* oficiales de Instagram.
- **Publicado en GitHub Pages**: cada `push` a `main` vuelve a desplegarse solo.

## ✨ Características

| Área | Detalle |
| --- | --- |
| **Diseño** | Tema oscuro tipo terminal con fondo aurora animado, rejilla, lluvia de código y tipografía monoespaciada. |
| **Animaciones** | 10 efectos escritos a mano en vanilla JS (ver abajo), sin librerías de animación. |
| **Responsive** | Diseño fluido con puntos de corte en `760px` y `480px`; menú hamburguesa en móvil. |
| **Accesibilidad** | HTML semántico, `aria-*` en la navegación, soporte completo de `prefers-reduced-motion` (desactiva lluvia, reveal, tilt y transiciones). |
| **SEO / Social** | `title`, `meta description`, `theme-color`, Open Graph y Twitter Card, favicon + apple-touch-icon. |
| **Rendimiento** | Imágenes optimizadas y con `loading="lazy"`, sin librerías externas, CSS y JS sin procesar. |

### Animaciones incluidas

1. Lluvia de código tras el hero
2. Máquina de escribir en el nombre
3. Glitch periódico en el nombre
4. Reveal al entrar en pantalla (en cascada con `IntersectionObserver`)
5. Contadores de 0 al valor
6. Barras de *skills* que se rellenan
7. Barra de progreso de scroll
8. Navegación con píldora deslizante + *scrollspy* + hamburguesa
9. *Spotlight* que sigue al cursor
10. Tarjetas 3D con inclinación al pasar el ratón

> Todos los efectos se desactivan automáticamente si el sistema declara
> «movimiento reducido» o si el dispositivo no tiene puntero fino.

## 📁 Estructura

```text
Ivanvera-web/
├── index.html          # Estructura y todos los contenidos
├── styles.css          # Diseño, tema, keyframes y responsive
├── script.js           # Las 10 animaciones (IIFE, vanilla JS)
├── assets/
│   └── avatar.jpg      # Foto de perfil (también usada como og:image)
├── favicon/
│   ├── favicon.png             # Icono de pestaña (512×512)
│   ├── apple-touch-icon.png    # Icono para iOS (180×180)
│   └── logo.png                 # Logo original en alta resolución
├── docs/
│   ├── preview.jpg             # Captura usada en este README
│   └── superpowers/specs/      # Especificación de diseño
└── .gitignore
```

## 🛠 Stack

- **HTML5** semántico
- **CSS3**: variables, grid/flex, `clamp()`, *backdrop-filter*, keyframes
- **JavaScript ES6+** sin dependencias (DOM, `IntersectionObserver`, `requestAnimationFrame`)
- **Embeds oficiales de Instagram** (`instagram.com/embed.js`)

## 🚀 Ejecutar en local

No hay instalación: solo hace falta un servidor estático (los *embeds* de
Instagram **no cargan** si abres el archivo con `file://`).

```bash
git clone https://github.com/ivan99vera1-wq/Ivanvera-web.git
cd Ivanvera-web
python3 -m http.server 8099
```

Abre **http://localhost:8099**

> Cualquier otro servidor sirve: `npx serve`, `php -S localhost:8099`, etc.

## 🌐 Despliegue

La web está publicada en **GitHub Pages** desde la rama `main` (raíz del repo):

**https://ivan99vera1-wq.github.io/Ivanvera-web/**

Para publicar cambios:

```bash
git add .
git commit -m "Descripción del cambio"
git push origin main
```

GitHub Pages reconstruye el sitio automáticamente (1–2 minutos).

## 🗂 Proyectos incluidos

| # | Proyecto | Stack | Repositorio | En vivo |
| - | -------- | ----- | ----------- | ------- |
| 01 | Hola Mundo | Java | [repo](https://github.com/ivan99vera1-wq/Ejercicio1-HolaMundo) | — |
| 02 | Variables | Java | [repo](https://github.com/ivan99vera1-wq/Ejercicio2-Variables) | — |
| 03 | Sumar | Java | [repo](https://github.com/ivan99vera1-wq/Ejercicio3-Sumar) | — |
| 04 | Calculadora | Java | [repo](https://github.com/ivan99vera1-wq/Ejercicio4-Calculadora) | — |
| 05 | Info de usuario | Java | [repo](https://github.com/ivan99vera1-wq/Ejercicio5-Info-de-usuario) | — |
| 06 | Servitek-web | Next.js · TypeScript · Tailwind | [repo](https://github.com/ivan99vera1-wq/servitek-web) | [servitek.pages.dev](https://servitek.pages.dev) |
| 07 | Solca Decoraciones | React · TypeScript | [repo](https://github.com/ivan99vera1-wq/Solca-decoraciones) | [solca-decoraciones.vercel.app](https://solca-decoraciones.vercel.app) |

## ✏️ Personalización

| Qué cambiar | Dónde |
| --- | --- |
| Textos, proyectos, enlaces y embeds | `index.html` |
| Colores, tipografía y animación CSS | `styles.css` → bloque `:root` |
| Comportamiento de las animaciones | `script.js` |
| Foto de perfil | `assets/avatar.jpg` (misma usada en `og:image`) |
| Favicon | `favicon/favicon.png` y `favicon/apple-touch-icon.png` |
| Contacto (email / WhatsApp / Instagram / GitHub) | `index.html` → sección `#contacto` |

## 📬 Contacto

- **Email:** [ivan99vera1@gmail.com](mailto:ivan99vera1@gmail.com)
- **WhatsApp:** [+34 683 224 002](https://wa.me/34683224002)
- **Instagram:** [@ivanvera7_](https://www.instagram.com/ivanvera7_/)
- **GitHub:** [@ivan99vera1-wq](https://github.com/ivan99vera1-wq)

---

<div align="center">
<sub>© 2026 Iván Vera · Madrid · Hecho con HTML, CSS, JS y Claude.</sub>
</div>
