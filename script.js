let pedido = {};
let total = 0;

// CARGAR DATOS GUARDADOS
window.onload = function () {
  document.getElementById("nombre").value = localStorage.getItem("nombre") || "";
  document.getElementById("telefono").value = localStorage.getItem("telefono") || "";
  document.getElementById("direccion").value = localStorage.getItem("direccion") || "";
  document.getElementById("metodoPago").value = localStorage.getItem("metodoPago") || "";
};

// AGREGAR PRODUCTO
function agregarPedido(nombre, precio) {
  if (pedido[nombre]) {
    pedido[nombre].cantidad++;
  } else {
    pedido[nombre] = { precio, cantidad: 1 };
  }
  actualizarPedido();
}

// SUMAR
function sumar(nombre) {
  pedido[nombre].cantidad++;
  actualizarPedido();
}

// RESTAR
function restar(nombre) {
  pedido[nombre].cantidad--;
  if (pedido[nombre].cantidad <= 0) delete pedido[nombre];
  actualizarPedido();
}

// VACIAR
function vaciarCarrito() {
  pedido = {};
  actualizarPedido();
}

// ACTUALIZAR UI
function actualizarPedido() {
  const lista = document.getElementById("lista-pedido");
  lista.innerHTML = "";
  total = 0;

  for (let nombre in pedido) {
    let item = pedido[nombre];
    total += item.precio * item.cantidad;

    const li = document.createElement("li");
    li.innerHTML = `
      ${nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toLocaleString()}
      <div>
        <button onclick="restar('${nombre}')">-</button>
        <button onclick="sumar('${nombre}')">+</button>
      </div>
    `;
    lista.appendChild(li);
  }

  document.getElementById("total").textContent = `Total: $${total.toLocaleString()}`;
}

// ENVIAR WHATSAPP
function enviarWhatsApp() {

  if (Object.keys(pedido).length === 0) {
    alert("EL CARRITO SE ENCUENTRA VACÍO");
    return;
  }

  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const metodoPago = document.getElementById("metodoPago").value;

  if (!nombre) return alert("POR FAVOR COMPLETA NOMBRE");

  const telefonoRegex = /^3\d{9}$/;
  if (!telefonoRegex.test(telefono)) {
    return alert("TELÉFONO INVÁLIDO (Debe empezar en 3 y tener 10 dígitos)");
  }

  // VALIDAR DIRECCIÓN FLEXIBLE (COLOMBIA)
const direccionValida =
  direccion.length >= 8 &&
  (
    /(calle|cra|carrera|cl|kr|avenida|av|transversal|trans|tv|diagonal|diag)/i.test(direccion) ||
    /(conjunto|cj|torre|apto|apartamento|bloque|unidad|residencial)/i.test(direccion)
  );

if (!direccionValida) {
  alert("COLOCA UNA DIRECCIÓN VÁLIDA (Ej: Calle 45 #12-30 o Conjunto Sorrento torre 2 apto 301)");
  return;
}

  if (!metodoPago) return alert("SELECCIONA METODO DE PAGO");

  // GUARDAR DATOS
  localStorage.setItem("nombre", nombre);
  localStorage.setItem("telefono", telefono);
  localStorage.setItem("direccion", direccion);
  localStorage.setItem("metodoPago", metodoPago);

  let mensaje = `Hola, soy ${nombre}%0A📞 ${telefono}%0A%0A`;

  for (let item in pedido) {
    mensaje += `• ${item} x${pedido[item].cantidad}%0A`;
  }

  mensaje += `%0A📍 ${direccion}`;
  mensaje += `%0A💳 ${metodoPago}`;
  mensaje += `%0A💰 Total: $${total.toLocaleString()}`;

  window.open(`https://wa.me/573225739177?text=${mensaje}`);

  alert("💜 Gracias por pedir en Bocados Mágicos 💜\nTu pedido está en proceso…\nAdvertencia: nuestras galletas pueden causar felicidad extrema 🤭🍪");
}
