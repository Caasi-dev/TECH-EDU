// ==========================================================
// CHECKOUT Y CONFIRMACIÓN DE COMPRA 
// ==========================================================

var CART_STORAGE_KEY = window.CART_STORAGE_KEY || 'techshop_cart';

// Cargar carrito desde localStorage
var carrito = window.carrito && window.carrito.length > 0 ? window.carrito : (JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || []);

document.addEventListener('DOMContentLoaded', () => {
    actualizarBadge();
    renderizarResumenCheckout();
    configurarMascaras();
    configurarFormularioCheckout();
});

// Actualiza el indicador numérico del carrito en el header
function actualizarBadge() {
    const badgeCarrito = document.getElementById('cart-badge');
    if (!badgeCarrito) return;
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    badgeCarrito.textContent = totalItems;
}

// Renderiza la lista de productos del carrito y recalcular los totales
function renderizarResumenCheckout() {
    const listaContenedor = document.getElementById('checkout-items-list');
    const subtotalEl = document.getElementById('subtotal');
    const envioEl = document.getElementById('envio');
    const impuestosEl = document.getElementById('impuestos');
    const totalEl = document.getElementById('checkout-total');

    if (!listaContenedor) return;

    if (carrito.length === 0) {
        listaContenedor.innerHTML = '<p class="text-muted text-center py-3">Tu carrito está vacío.</p>';
        if (subtotalEl) subtotalEl.textContent = '$0.00 MXN';
        if (envioEl) envioEl.textContent = '$0.00 MXN';
        if (impuestosEl) impuestosEl.textContent = '$0.00 MXN';
        if (totalEl) totalEl.textContent = '$0.00 MXN';
        const btnPagar = document.getElementById('btn-pagar');
        if (btnPagar) {
            btnPagar.disabled = true;
            btnPagar.style.opacity = '0.6';
            btnPagar.style.cursor = 'not-allowed';
        }
        return;
    }

    listaContenedor.innerHTML = carrito.map(item => `
        <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
            <div class="d-flex align-items-center gap-2">
                <img src="${item.imagen}" alt="${item.nombre}" style="width: 45px; height: 45px; object-fit: contain;">
                <div>
                    <h6 class="mb-0 fw-bold" style="font-size: 0.9rem;">${item.nombre}</h6>
                    <small class="text-muted">${item.cantidad} x $${item.precio}.00 MXN</small>
                </div>
            </div>
            <span class="fw-bold">$${(item.precio * item.cantidad).toFixed(2)}</span>
        </div>
    `).join('');

    const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const costoEnvio = subtotal > 0 ? 50.00 : 0.00;
    const impuestos = subtotal * 0.16;
    const total = subtotal + costoEnvio + impuestos;

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)} MXN`;
    if (envioEl) envioEl.textContent = `$${costoEnvio.toFixed(2)} MXN`;
    if (impuestosEl) impuestosEl.textContent = `$${impuestos.toFixed(2)} MXN`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)} MXN`;
}

// Máscaras de escritura dinámica
function configurarMascaras() {
    const tarjetaInput = document.getElementById('tarjeta');
    const expiracionInput = document.getElementById('expiracion');
    const cpInput = document.getElementById('cp');
    const telInput = document.getElementById('telefono');

    if (tarjetaInput) {
        tarjetaInput.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, '');
            valor = valor.replace(/(.{4})/g, '$1 ').trim();
            e.target.value = valor.substring(0, 19);
        });
    }

    if (expiracionInput) {
        expiracionInput.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, '');
            if (valor.length >= 3) {
                valor = valor.substring(0, 2) + '/' + valor.substring(2, 4);
            }
            e.target.value = valor.substring(0, 5);
        });
    }

    if (cpInput) {
        cpInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 5);
        });
    }

    if (telInput) {
        telInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 10);
        });
    }
}

// Envío del formulario y Modal
function configurarFormularioCheckout() {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (carrito.length === 0) {
            alert('El carrito está vacío. Agrega productos antes de realizar la compra.');
            return;
        }

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            form.reportValidity();
            return;
        }

        const btnPagar = document.getElementById('btn-pagar');
        if (btnPagar) {
            btnPagar.disabled = true;
            btnPagar.textContent = 'Procesando...';
            btnPagar.style.pointerEvents = 'none';
            btnPagar.style.opacity = '0.6';
            btnPagar.style.cursor = 'not-allowed';
        }

        // Deshabilitar todos los inputs del formulario para evitar modificaciones o envíos secundarios
        Array.from(form.elements).forEach(el => {
            el.disabled = true;
        });

        const numOrden = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
        const numeroOrdenEl = document.getElementById('numero-orden-modal');
        if (numeroOrdenEl) numeroOrdenEl.textContent = numOrden;

        localStorage.removeItem(CART_STORAGE_KEY);
        carrito = [];

        const modalEl = document.getElementById('modalConfirmacion');
        if (modalEl && typeof bootstrap !== 'undefined') {
            const modal = new bootstrap.Modal(modalEl, {
                backdrop: 'static',
                keyboard: false
            });
            modal.show();

            const btnVolver = document.getElementById('btn-volver-inicio');
            if (btnVolver) {
                btnVolver.addEventListener('click', () => {
                    window.location.href = 'index.html';
                });
            }
        } else {
            alert(`¡Compra confirmada!\nOrden: ${numOrden}`);
            window.location.href = 'index.html';
        }
    });
}
