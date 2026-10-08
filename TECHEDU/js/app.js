// ==========================================================
// CATÁLOGO: buscador en tiempo real + filtros por categoría
// ==========================================================


// Arreglo de productos
const productosData = [
  {
    id: "arduino-uno",
    nombre: "Arduino UNO R3",
    categoria: "microcontroladores",
    etiqueta: "Microcontroladores",
    descripcion: "Placa con ATmega328P, 14 pines digitales y 6 entradas analógicas. Ideal para aprender programación física.",
    precio: 289,
    stock: 14,
    imagen: "images/arduino-uno.jpg",
    alt: "Placa Arduino UNO R3"
  },
  {
    id: "esp32",
    nombre: "Placa ESP32 WROOM",
    categoria: "microcontroladores",
    etiqueta: "Microcontroladores",
    descripcion: "Microcontrolador de doble núcleo con Wi-Fi y Bluetooth integrados para proyectos de internet de las cosas.",
    precio: 199,
    stock: 22,
    imagen: "images/esp32.jpg",
    alt: "Placa ESP32 WROOM con Wi-Fi y Bluetooth"
  },
  {
    id: "sensor-movimiento",
    nombre: "Sensor de movimiento PIR",
    categoria: "sensores",
    etiqueta: "Sensores",
    descripcion: "Detecta movimiento por infrarrojos pasivos. Alcance ajustable, perfecto para alarmas y luces automáticas.",
    precio: 89,
    stock: 30,
    imagen: "images/sensor-movimiento.jpg",
    alt: "Sensor de movimiento PIR con pantalla de segmentos"
  },
  {
    id: "sensor-optico",
    nombre: "Sensor óptico reflectivo",
    categoria: "sensores",
    etiqueta: "Sensores",
    descripcion: "Mide presencia y distancia corta con luz infrarroja. Útil para robots seguidores de línea y contadores.",
    precio: 119,
    stock: 18,
    imagen: "images/sensor-optico.jpg",
    alt: "Sensor óptico reflectivo con cables"
  },
  {
    id: "protoboard",
    nombre: "Protoboard 830 puntos",
    categoria: "prototipado",
    etiqueta: "Prototipado",
    descripcion: "Arma y prueba circuitos sin soldar. Incluye rieles de alimentación positivo y negativo.",
    precio: 79,
    stock: 40,
    imagen: "images/Protoboard.jpg",
    alt: "Protoboard blanca con rieles de alimentación"
  },
  {
    id: "cables",
    nombre: "Kit de cables y conectores",
    categoria: "prototipado",
    etiqueta: "Prototipado",
    descripcion: "Cable plano multicolor, arneses y conectores para conectar placas, sensores y módulos.",
    precio: 59,
    stock: 35,
    imagen: "images/cables.jpg",
    alt: "Cable plano de colores y conectores"
  },
  {
    id: "cautin",
    nombre: "Cautín con soporte y estaño",
    categoria: "herramientas",
    etiqueta: "Herramientas",
    descripcion: "Cautín de punta fina con base, esponja de limpieza y estaño con núcleo de resina de 0.8 mm.",
    precio: 249,
    stock: 9,
    imagen: "images/cautin-estano.jpg",
    alt: "Cautín con soporte, esponja metálica y rollo de estaño"
  },
  {
    id: "desatornillador",
    nombre: "Desatornillador de precisión",
    categoria: "herramientas",
    etiqueta: "Herramientas",
    descripcion: "Punta plana de 1.5 x 50 mm con mango ergonómico antideslizante, para tornillos pequeños de electrónica.",
    precio: 65,
    stock: 25,
    imagen: "images/desatornillador.jpg",
    alt: "Desatornillador de precisión con mango azul",
    claseImg: "producto__img--contener"
  }
];

// Variables para elementos del DOM
const listaProductos = document.getElementById("lista-productos");
const buscador = document.getElementById("buscador");
const botonesFiltro = document.querySelectorAll(".filtro");
const mensajeVacio = document.getElementById("sin-resultados");

let categoriaActiva = "todos";

// Renderiza dinámicamente las tarjetas de productos en el catálogo
function renderizarProductos(productos) {
  listaProductos.innerHTML = productos
    .map((prod) => {
      const claseImg = prod.claseImg ? ` class="${prod.claseImg}"` : "";
      const claseStock = prod.stock <= 10 ? "stock stock--bajo" : "stock";

      return `
        <article class="producto" data-id="${prod.id}" data-categoria="${prod.categoria}" data-nombre="${prod.nombre}" data-precio="${prod.precio}" data-stock="${prod.stock}" data-img="${prod.imagen}">
          <img${claseImg} src="${prod.imagen}" alt="${prod.alt}" loading="lazy">
          <div class="producto__cuerpo">
            <span class="etiqueta">${prod.etiqueta}</span>
            <h3>${prod.nombre}</h3>
            <p>${prod.descripcion}</p>
            <div class="producto__pie">
              <strong class="precio">$${prod.precio}.00 <small>MXN</small></strong>
              <span class="${claseStock}">${prod.stock} en stock</span>
            </div>
            <button class="btn btn--agregar" type="button">Agregar al carrito</button>
          </div>
        </article>
      `;
    })
    .join("");
}

// Renderizado inicial al cargar
renderizarProductos(productosData);

// Normalizacion de texto
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Filtra los productos según la categoría activa y el término de búsqueda
function aplicarFiltros() {
  const termino = normalizar(buscador.value);
  const productosFiltrados = productosData.filter((prod) => {
    const coincideCategoria =
      categoriaActiva === "todos" || prod.categoria === categoriaActiva;

    const textoProducto = normalizar(`${prod.nombre} ${prod.descripcion}`);
    const coincideBusqueda = textoProducto.includes(termino);
    return coincideCategoria && coincideBusqueda;
  });

  renderizarProductos(productosFiltrados);
  mensajeVacio.hidden = productosFiltrados.length !== 0;
}

// Búsqueda mientras se escribe
buscador.addEventListener("input", aplicarFiltros);
buscador.addEventListener("search", aplicarFiltros);

// Clic en una categoría
botonesFiltro.forEach((boton) => {
  boton.addEventListener("click", () => {
    categoriaActiva = boton.dataset.categoria;

    botonesFiltro.forEach((b) => {
      const activo = b === boton;
      b.classList.toggle("is-activo", activo);
      b.setAttribute("aria-pressed", activo);
    });

    aplicarFiltros();
  });
});
