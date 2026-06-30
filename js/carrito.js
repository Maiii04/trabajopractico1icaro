const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const lista = document.getElementById("listaProductos");

let total = 0;
carrito.forEach(producto => {

    lista.innerHTML += `
    <div class="card mb-3 p-3">

        <h5>${producto.nombre}</h5>

        <p>Precio: $${producto.precio}</p>

        <div class="d-flex align-items-center gap-2">

            <button
                class="btn btn-outline-danger"
                onclick="disminuirCantidad('${producto.nombre}')">
                -
            </button>

            <span>${producto.cantidad}</span>

            <button
                class="btn btn-outline-success"
                onclick="aumentarCantidad('${producto.nombre}')">
                +
            </button>

        </div>

        <p class="mt-3">
            Subtotal: $${producto.precio * producto.cantidad}
        </p>

        <button
            class="btn btn-danger mt-2"
            onclick="eliminarProducto('${producto.nombre}')">
            🗑 Eliminar
        </button>

    </div>
    `;

    total += producto.precio * producto.cantidad;

});

document.getElementById("total").textContent = "$" + total;

function aumentarCantidad(nombre){

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.forEach(producto => {

        if(producto.nombre === nombre){

            producto.cantidad++;

        }

    });

    localStorage.setItem("carrito", JSON.stringify(carrito));

    location.reload();

}
function disminuirCantidad(nombre){

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.forEach(producto => {

        if(producto.nombre === nombre && producto.cantidad > 1){

            producto.cantidad--;

        }

    });

    localStorage.setItem("carrito", JSON.stringify(carrito));

    location.reload();

}
function eliminarProducto(nombre){

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito = carrito.filter(producto => producto.nombre !== nombre);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    location.reload();

}

function calcularCompra() {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let subtotal = 0;

    carrito.forEach(producto => {
        subtotal += producto.precio * producto.cantidad;
    });

    const formaPago = document.querySelector('input[name="formaPago"]:checked').value;

    const cuotas = parseInt(document.getElementById("cuotas").value);

    let totalFinal;
    let detallePago;
    let valorCuota;

    if (formaPago === "efectivo") {

        let descuento = subtotal * 0.20;

        totalFinal = subtotal - descuento;

        detallePago = "- $" + descuento.toLocaleString("es-AR");

        valorCuota = totalFinal;

    } else {

        let recargo = subtotal * 0.15;

        totalFinal = subtotal + recargo;

        detallePago = "+ $" + recargo.toLocaleString("es-AR");

        valorCuota = totalFinal / cuotas;

    }

    document.getElementById("subtotalFinal").textContent =
        "$" + subtotal.toLocaleString("es-AR");

    document.getElementById("detallePago").textContent =
        detallePago;

    document.getElementById("totalFinal").textContent =
        "$" + totalFinal.toLocaleString("es-AR");

    document.getElementById("valorCuota").textContent =
        "$" + valorCuota.toLocaleString("es-AR");
}

function mostrarCuotas() {

    const efectivo = document.getElementById("efectivo").checked;

    const contenedor = document.getElementById("contenedorCuotas");

    if (efectivo) {

        contenedor.style.display = "none";

    } else {

        contenedor.style.display = "block";

    }

}
document.getElementById("efectivo").addEventListener("change", mostrarCuotas);

document.getElementById("tarjeta").addEventListener("change", mostrarCuotas);

mostrarCuotas();