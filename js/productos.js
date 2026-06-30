function comprarProducto(nombre, precio) {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Buscar si el producto ya existe
    let productoExistente = carrito.find(producto => producto.nombre === nombre);

    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });

    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

}