// ===============================
// 🧾 VARIABLES PRINCIPALES
// ===============================

// Aquí se guardan todos los productos que el cliente agrega
let pedido = [];

// Aquí se va acumulando el valor total del pedido
let total = 0;


// ===============================
// ➕ FUNCIÓN: AGREGAR AL PEDIDO
// ===============================
// Esta función se ejecuta cuando el usuario da clic en "Agregar"
function agregarPedido(nombre, precio) {

  // Guardamos el producto como un objeto (nombre + precio)
  pedido.push({ nombre: nombre, precio: precio });

  // Sumamos el precio al total
  total += precio;

  // Actualizamos lo que se ve en pantalla
  actualizarPedido();
}


// ===============================
// 🔄 FUNCIÓN: ACTUALIZAR EL PEDIDO EN PANTALLA
// ===============================
function actualizarPedido() {

  // Traemos la lista <ul> del HTML
  const lista = document.getElementById("lista-pedido");

  // Limpiamos la lista para volverla a llenar
  lista.innerHTML = "";

  // Recorremos cada producto del pedido
  pedido.forEach(function(item) {

    // Creamos un <li> por cada producto
    const li = document.createElement("li");

    // Texto que se mostrará
    li.textContent = item.nombre + " - $" + item.precio;

    // Lo agregamos a la lista
    lista.appendChild(li);
  });

  // Mostramos el total
  document.getElementById("total").textContent =
    "Total: $" + total;
}


// ===============================
// 📲 FUNCIÓN: ENVIAR PEDIDO POR WHATSAPP
// ===============================
function enviarWhatsApp() {

  // Si no hay productos, no dejamos enviar
  if (pedido.length === 0) {
    alert("Agrega al menos un producto 🍪");
    return;
  }

  // Mensaje inicial
  let mensaje = "Hola, quiero hacer este pedido:%0A%0A";

  // Agregamos cada producto al mensaje
  pedido.forEach(function(item) {
    mensaje += "- " + item.nombre + " ($" + item.precio + ")%0A";
  });

  // Agregamos el total
  mensaje += "%0A Total: $" + total;

  // 📌 AQUÍ VA TU NÚMERO (con 57)
  const telefono = "573225739177";

  // Creamos el enlace de WhatsApp
  const url = "https://wa.me/" + telefono + "?text=" + mensaje;

  // Abrimos WhatsApp en una nueva pestaña
  window.open(url, "_blank");
}
