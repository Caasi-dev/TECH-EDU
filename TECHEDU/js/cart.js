// ==========================================================
// CARRITO Y PERSISTENCIA LOCAL
// ==========================================================

var CART_STORAGE_KEY = window.CART_STORAGE_KEY || 'techshop_cart';

// Estado global del carrito en memoria
var carrito = window.carrito || [];

// Referencias a elementos del DOM
const badgeCarrito = document.getElementById('cart-badge');
const contenidoCarrito = document.getElementById('carrito-contenido');
const totalCarrito = document.getElementById('carrito-total');
const contenedorProductos = document.getElementById('lista-productos');
const btnCheckout = document.getElementById('btn-checkout');

// Inicialización cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoDesdeStorage();
    actualizarUI();
    configurarEventos();
});

// Carga el estado del carrito guardado en localStorage
function cargarCarritoDesdeStorage() {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    if (cartData) {
        try {
            carrito = JSON.parse(cartData);
        } catch (e) {
            console.error('Error al parsear los datos del carrito:', e);
            carrito = [];
        }
    }
}

// Guarda el carrito en localStorage y sincroniza la interfaz
function guardarCarrito() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(carrito));
    actualizarUI();
}

// Sincroniza todos los componentes visuales del carrito
function actualizarUI() {
    actualizarBadge();
    if (contenidoCarrito) renderizarCarrito();
    if (totalCarrito) actualizarTotal();
    actualizarBotonCheckout();
}

// Actualiza el estado visual y funcional del botón Ir a Pagar
function actualizarBotonCheckout() {
    if (!btnCheckout) return;
    const totalArticulos = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    if (totalArticulos === 0) {
        btnCheckout.classList.add('disabled');
        btnCheckout.setAttribute('aria-disabled', 'true');
        btnCheckout.setAttribute('tabindex', '-1');
    } else {
        btnCheckout.classList.remove('disabled');
        btnCheckout.removeAttribute('aria-disabled');
        btnCheckout.removeAttribute('tabindex');
    }
}

// Actualiza el indicador numérico (badge) en la barra superior
function actualizarBadge() {
    if (!badgeCarrito) return;
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    badgeCarrito.textContent = totalItems;
}

// Recalcula el monto total de la compra
function actualizarTotal() {
    if (!totalCarrito) return;
    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    totalCarrito.textContent = `$${total.toFixed(2)} MXN`;
}

// Panel de carrito
function renderizarCarrito() {
    if (carrito.length === 0) {
        contenidoCarrito.innerHTML = `
            <div style="text-align: center; padding: 2rem 1rem; color: #6c757d;">
                <p style="margin: 0; font-weight: 500;">Tu carrito está vacío.</p>
            </div>`;
        return;
    }

    contenidoCarrito.innerHTML = carrito.map(item => `
    <div class="carrito__item" data-id="${item.id}" style="display: flex !important; align-items: center !important; justify-content: space-between !important; padding: 12px 16px !important; margin-bottom: 12px !important; background-color: #ffffff !important; border-radius: 10px !important; border: 1px solid #e9ecef !important; box-shadow: 0 2px 4px rgba(0,0,0,0.04) !important; gap: 12px !important;">
      
      <!-- Imagen y Nombre del producto -->
      <div style="display: flex !important; align-items: center !important; gap: 12px !important; flex: 1 !important; min-width: 0 !important;">
        <img src="${item.imagen}" alt="${item.nombre}" style="width: 52px !important; height: 52px !important; object-fit: contain !important; border-radius: 8px !important; border: 1px solid #dee2e6 !important; background-color: #f8f9fa !important; padding: 4px !important; flex-shrink: 0 !important;">
        <div style="min-width: 0 !important;">
          <h6 style="margin: 0 0 2px 0 !important; font-size: 0.9rem !important; font-weight: 600 !important; color: #212529 !important; line-height: 1.2 !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important;">${item.nombre}</h6>
          <small style="color: #6c757d !important; font-size: 0.8rem !important;">$${item.precio}.00 c/u</small>
        </div>
      </div>

      <!-- Selector de cantidad, Precio subtotal y Botón Eliminar -->
      <div style="display: flex !important; align-items: center !important; gap: 10px !important; flex-shrink: 0 !important;">
        
        <!-- Selector - / + -->
        <div style="display: flex !important; align-items: center !important; border: 1px solid #ced4da !important; border-radius: 6px !important; overflow: hidden !important; background-color: #f8f9fa !important;">
          <button type="button" class="btn-decrementar" data-id="${item.id}" style="border: none !important; background: transparent !important; width: 28px !important; height: 28px !important; display: flex !important; align-items: center !important; justify-content: center !important; font-weight: bold !important; cursor: pointer !important; color: #495057 !important; font-size: 14px !important; line-height: 1 !important; margin: 0 !important; padding: 0 !important;">-</button>
          <span style="width: 28px !important; text-align: center !important; font-size: 0.85rem !important; font-weight: 600 !important; color: #212529 !important; user-select: none !important;">${item.cantidad}</span>
          <button type="button" class="btn-incrementar" data-id="${item.id}" style="border: none !important; background: transparent !important; width: 28px !important; height: 28px !important; display: flex !important; align-items: center !important; justify-content: center !important; font-weight: bold !important; cursor: pointer !important; color: #495057 !important; font-size: 14px !important; line-height: 1 !important; margin: 0 !important; padding: 0 !important;">+</button>
        </div>

        <!-- Subtotal -->
        <span style="font-weight: 700 !important; color: #212529 !important; font-size: 0.9rem !important; min-width: 65px !important; text-align: right !important;">
          $${(item.precio * item.cantidad).toFixed(2)}
        </span>

        <!-- Botón eliminar -->
        <button type="button" class="btn-eliminar" data-id="${item.id}" title="Eliminar producto" style="border: none !important; background-color: #fee2e2 !important; color: #dc2626 !important; width: 26px !important; height: 26px !important; border-radius: 50% !important; display: flex !important; align-items: center !important; justify-content: center !important; cursor: pointer !important; font-size: 16px !important; font-weight: bold !important; line-height: 1 !important; margin: 0 !important; padding: 0 !important;">
          &times;
        </button>
      </div>

    </div>
  `).join('');
}

// Añade un producto al carrito verificando el stock disponible
function agregarAlCarrito(idProducto, botonElemento = null) {
    const productoBase = (typeof productosData !== 'undefined')
        ? productosData.find(p => p.id === idProducto)
        : null;

    if (!productoBase) {
        console.error(`Producto con ID ${idProducto} no fue encontrado.`);
        return;
    }

    const itemExistente = carrito.find(item => item.id === idProducto);

    if (itemExistente) {
        if (itemExistente.cantidad < productoBase.stock) {
            itemExistente.cantidad += 1;
        } else {
            alert(`Has alcanzado el límite de stock disponible (${productoBase.stock} unidades).`);
            return;
        }
    } else {
        if (productoBase.stock < 1) {
            alert('Este producto no tiene stock disponible.');
            return;
        }
        carrito.push({
            id: productoBase.id,
            nombre: productoBase.nombre,
            precio: productoBase.precio,
            imagen: productoBase.imagen,
            stock: productoBase.stock,
            cantidad: 1
        });
    }

    // Animación del botón al agregar al carrito
    if (botonElemento) {
        const textoOriginal = botonElemento.textContent;
        botonElemento.textContent = '✓ ¡Agregado!';
        botonElemento.classList.add('is-agregado');
        setTimeout(() => {
            botonElemento.textContent = textoOriginal;
            botonElemento.classList.remove('is-agregado');
        }, 1200);
    }

    // Efecto pop en el badge del carrito
    if (badgeCarrito) {
        badgeCarrito.classList.remove('badge--bump');
        // Forzar reflow para reiniciar la animación
        void badgeCarrito.offsetWidth;
        badgeCarrito.classList.add('badge--bump');
    }

    guardarCarrito();
}

// Modifica la cantidad de un ítem (+1 / -1) validando el stock
function cambiarCantidad(idProducto, delta) {
    const item = carrito.find(i => i.id === idProducto);
    if (!item) return;

    const nuevaCantidad = item.cantidad + delta;

    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(idProducto);
    } else if (nuevaCantidad <= item.stock) {
        item.cantidad = nuevaCantidad;
        guardarCarrito();
    } else {
        alert(`Solo hay ${item.stock} unidades disponibles de este producto.`);
    }
}

// Remueve un producto del carrito
function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    guardarCarrito();
}

// Asigna los escuchadores de eventos mediante delegación en el DOM
function configurarEventos() {
    if (contenedorProductos) {
        contenedorProductos.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('btn--agregar')) {
                const tarjetaProducto = e.target.closest('.producto');
                if (tarjetaProducto) {
                    const id = tarjetaProducto.dataset.id;
                    agregarAlCarrito(id, e.target);
                }
            }
        });
    }

    if (contenidoCarrito) {
        contenidoCarrito.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;

            const id = btn.dataset.id;

            if (btn.classList.contains('btn-incrementar')) {
                cambiarCantidad(id, 1);
            } else if (btn.classList.contains('btn-decrementar')) {
                cambiarCantidad(id, -1);
            } else if (btn.classList.contains('btn-eliminar')) {
                eliminarDelCarrito(id);
            }
        });
    }

    if (btnCheckout) {
        btnCheckout.addEventListener('click', (e) => {
            if (carrito.length === 0 || btnCheckout.classList.contains('disabled')) {
                e.preventDefault();
            }
        });
    }
}