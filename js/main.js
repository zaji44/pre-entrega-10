const contenedorProductos = document.getElementById("contenedor-productos");
const loader = document.getElementById("loader");


async function obtenerProductos() {
    try {
        
        const respuesta = await fetch("./data.json");

        
        if (!respuesta.ok) {
            throw new Error(`Error en la petición: Estado ${respuesta.status}`);
        }

        const productos = await respuesta.json();

        
        renderizarProductos(productos);

        
        Toastify({
            text: "✅ Productos cargados con éxito",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();

    } catch (error) {
        console.error("Detalle técnico del error:", error);

        
        Swal.fire({
            icon: "error",
            title: "Error al cargar productos",
            text: "No se pudo obtener la información del servidor. Por favor, intentá más tarde.",
            confirmButtonText: "Entendido",
            confirmButtonColor: "#d33"
        });

    } finally {
        
        loader.style.display = "none";
    }
}


function renderizarProductos(productos) {
    contenedorProductos.innerHTML = ""; 

    productos.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card");

        tarjeta.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p class="precio">$${producto.precio.toLocaleString("es-AR")}</p>
            <p>Stock disponible: <strong>${producto.stock}</strong></p>
            <button class="btn-comprar" onclick="seleccionarProducto('${producto.nombre}')">Seleccionar</button>
        `;

        contenedorProductos.appendChild(tarjeta);
    });
}


function seleccionarProducto(nombreProducto) {
    Toastify({
        text: `Seleccionaste: ${nombreProducto}`,
        duration: 2000,
        gravity: "bottom",
        position: "center",
        style: {
            background: "#2196f3",
        }
    }).showToast();
}


obtenerProductos();