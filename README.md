# TECH-EDU

**TECH-EDU** es una plataforma web orientada a la educación tecnológica y robótica. Funciona como un catálogo interactivo y tienda (e-commerce) donde los usuarios pueden explorar, agregar al carrito y procesar la compra de diversos componentes electrónicos esenciales para el aprendizaje y desarrollo de proyectos maker.

Enlace al repositorio: [Caasi-dev/TECH-EDU](https://github.com/Caasi-dev/TECH-EDU)

## Características Principales

*   **Carrito de Compras:** Sistema dinámico para agregar y gestionar productos.
*   **Proceso de Checkout:** Formulario de pago y validación de la compra.
*   **Diseño Responsivo:** Interfaz adaptable a múltiples dispositivos móviles y de escritorio.
*   **Catálogo Especializado:** Variedad de productos educativos enfocados a la robótica.

## Tecnologías Utilizadas

Este proyecto está construido con tecnologías web frontend nativas y librerías de estilos:

*   **Frontend:** HTML5, CSS3, JavaScript (Vanilla).
*   **Frameworks y Librerías:** Bootstrap 5 (minificado) para el diseño ágil, estructurado y responsivo.
*   **Recursos Gráficos:** Archivos en formato SVG (vectores) y JPG (fotografías de productos).

## Estructura del Proyecto y Archivos

El proyecto sigue una estructura organizada por directorios. A continuación se detalla la función exacta de cada archivo:

```text
TECH-EDU/
├── css/
│   ├── bootstrap.min.css         # Framework CSS (Bootstrap) base para el sistema de rejillas y componentes responsivos.
│   └── styles.css                # Hoja de estilos personalizados para ajustar el diseño visual de la plataforma.
├── images/
│   ├── arduino-uno.jpg           # Imagen de producto: Placa Arduino Uno.
│   ├── cables.jpg                # Imagen de producto: Cables jumper para conexiones.
│   ├── cautin-estano.jpg         # Imagen de producto: Cautín y rollo de estaño.
│   ├── desatornillador.jpg       # Imagen de producto: Kit de destornilladores de precisión.
│   ├── esp32.jpg                 # Imagen de producto: Placa de desarrollo ESP32 con WiFi/Bluetooth.
│   ├── logo.svg                  # Logotipo vectorial principal de la marca TECH-EDU.
│   ├── Protoboard.jpg            # Imagen de producto: Placa de pruebas (Protoboard).
│   ├── sensor-movimiento.jpg     # Imagen de producto: Sensor PIR de movimiento.
│   └── sensor-optico.jpg         # Imagen de producto: Sensor óptico/infrarrojo.
├── js/
│   ├── app.js                    # Script con la lógica principal de la aplicación y la inicialización de eventos.
│   ├── cart.js                   # Script que gestiona la lógica del carrito de compras (agregar, eliminar, calcular total).
│   └── checkout.js               # Script dedicado a la validación de datos y manejo del formulario en la página de pago.
├── checkout.html                 # Página HTML que muestra el resumen de compra y el formulario de facturación/envío.
└── index.html                    # Página HTML principal que renderiza el catálogo de productos disponibles.
```

## Instalación y Uso

Dado que es un proyecto de frontend estático, no se requiere instalación de entornos de servidor (como Node.js).

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/Caasi-dev/TECH-EDU.git
    ```
2.  **Acceder al directorio:**
    ```bash
    cd TECH-EDU
    ```
3.  **Ejecutar la aplicación:**
    Simplemente abre el archivo `index.html` en tu navegador web de preferencia. Para una mejor experiencia de desarrollo, puedes utilizar una extensión como "Live Server" en tu editor de código.

## Contacto

Desarrollado por Caasi-dev - [Perfil de GitHub](https://github.com/Caasi-dev)