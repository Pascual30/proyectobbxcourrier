// Elementos principales
const contenedor = document.getElementById("contenido");
const links = document.querySelectorAll(".nav-links a");

// Precio por libra (constante)
const PRECIO_LIBRA = 198;

// Mapa de secciones (uso de Map)
const secciones = new Map();

// Datos base (uso de Array)
const servicios = [
  { titulo: "Envíos internacionales", texto: "Traemos tus compras desde el extranjero de forma segura." },
  { titulo: "Logística local", texto: "Movemos tus paquetes dentro del país con rapidez." },
  { titulo: "Atención personalizada", texto: "Nos adaptamos a tus necesidades de envío." }
];

// CONTENIDO DE CADA SECCION

// Inicio
secciones.set("inicio", `
  <section class="hero">
    <h1>Tu paquete, seguro y rápido</h1>
    <p>Servicio de mensajería y logística eficiente en toda República Dominicana.</p>
  </section>
  <div class="about">
    <img src="negocio1.jpeg" alt="Local de BBX Courrier">
    <img src="negocio2.jpeg" alt="Atención en BBX Courrier">
    <p>En <strong>BBX Courrier</strong> ofrecemos un servicio rápido y seguro para la recepción, envío y entrega de tus paquetes. Nos especializamos en logística eficiente y atención personalizada.</p>
  </div>
`);

// Servicios (generados dinamicamente con bucle for)
let htmlServicios = "<h2>Nuestros Servicios</h2><div class='servicios'>";
for (let i = 0; i < servicios.length; i++) {
  htmlServicios += `
    <div class="servicio">
      <h3>${servicios[i].titulo}</h3>
      <p>${servicios[i].texto}</p>
    </div>
  `;
}
htmlServicios += "</div>";
secciones.set("servicios", htmlServicios);

// Calculadora de precios (interactiva)
secciones.set("calculadora", `
  <h2>Calculadora de Envíos</h2>
  <p>Calcula el precio estimado de tu paquete.</p>
  <label for="libras">Peso del paquete (en libras):</label>
  <input type="number" id="libras" min="1" placeholder="Ejemplo: 5">
  <button id="calcular">Calcular Precio</button>
  <p id="resultado"></p>
`);

// Contacto
secciones.set("contacto", `
  <h2>Contáctanos</h2>
  <p>📱 <a href="https://wa.me/8095667700" target="_blank">Envíanos un WhatsApp</a></p>
  <p>🌐 <a href="https://www.instagram.com/bbxcargord" target="_blank">Síguenos en Instagram</a></p>
  <form class="formulario">
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" required>
    <label for="email">Email:</label>
    <input type="email" id="email" required>
    <label for="mensaje">Mensaje:</label>
    <textarea id="mensaje" rows="4" required></textarea>
    <input type="submit" value="Enviar" class="btn-enviar">
  </form>
`);

// FUNCION PARA MOSTRAR SECCIONES
function mostrarSeccion(nombre) {
  if (!secciones.has(nombre)) {
    contenedor.innerHTML = "<p>Sección no encontrada.</p>";
    return;
  }

  contenedor.innerHTML = secciones.get(nombre);

  if (nombre === "calculadora") {
    activarCalculadora();
  }
}

// FUNCION DE CALCULADORA
function activarCalculadora() {
  const boton = document.getElementById("calcular");
  const resultado = document.getElementById("resultado");

  boton.addEventListener("click", () => {
    const libras = parseFloat(document.getElementById("libras").value);

    if (isNaN(libras) || libras <= 0) {
      resultado.textContent = "Por favor, introduce un numero valido.";
      return;
    }

    let contador = 0;
    let precioFinal = 0;
    while (contador < libras) {
      precioFinal += PRECIO_LIBRA;
      contador++;
    }

    resultado.textContent = `El precio estimado es RD$${precioFinal.toLocaleString("es-DO")}`;
  });
}

// ==========================================
// EVENTOS DE NAVEGACION Y MENÚ MÓVIL
// ==========================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

// Abrir/Cerrar menú en móviles
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
  });
}

// Navegación principal
links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const seccion = link.getAttribute("data-section");
    mostrarSeccion(seccion);
    
    // Cerrar menú al seleccionar en móvil
    if (navLinksContainer.classList.contains('active')) {
      navLinksContainer.classList.remove('active');
    }
  });
});

// Click en el logo lleva a inicio
const logoLink = document.querySelector('.logo a');
if (logoLink) {
  logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    mostrarSeccion('inicio');
    if (navLinksContainer.classList.contains('active')) {
      navLinksContainer.classList.remove('active');
    }
  });
}

// Mostrar por defecto la seccion "Inicio"
mostrarSeccion("inicio");
