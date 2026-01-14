let pedido = [];
let total = 0;

function agregarPedido(nombre, precio) {
  pedido.push({ nombre, precio });
  total += precio;
  actualizarPedido();
}

function quitarPedido(index) {
  total -= pedido[index].precio;
  pedido.splice(index, 1);
  actualizarPedido();
}

function actualizarPedido() {
  const lista = document.getElementById("lista-pedido");
  const totalTexto = document.getElementById("total");

  lista.innerHTML = "";

  pedido.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio.toLocaleString()}
      <button class="quitar" onclick="quitarPedido(${index})">✖</button>
    `;
    lista.appendChild(li);
  });

  totalTexto.textContent = `Total: $${total.toLocaleString()}`;
}

function enviarWhatsApp() {
  if (pedido.length === 0) {
    alert("Aún no has agregado productos");
    return;
  }

  const nombre = document.getElementById("nombre").value.trim();
  const telefonoCliente = document.getElementById("telefono").value.trim();
  const direccion = document.getElementById("direccion").value.trim();

  if (!nombre || !telefonoCliente || !direccion) {
    alert("Por favor completa nombre, teléfono y dirección");
    return;
  }

  let mensaje = `Hola, soy ${nombre}%0A`;
  mensaje += `📞 Teléfono: ${telefonoCliente}%0A%0A`;
  mensaje += `Quiero hacer el siguiente pedido:%0A`;

  pedido.forEach(item => {
    mensaje += `• ${item.nombre} - $${item.precio.toLocaleString()}%0A`;
  });

  mensaje += `%0A📍 Dirección: ${direccion}`;
  mensaje += `%0A💰 Total: $${total.toLocaleString()}`;

  const telefono = "573225739177"; // TU número aquí
  window.open(`https://wa.me/${telefono}?text=${mensaje}`, "_blank");

  document.getElementById("mensaje-gracias").classList.remove("oculto");

  pedido = [];
  total = 0;
  actualizarPedido();
  document.getElementById("nombre").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("direccion").value = "";
}

function vaciarCarrito() {
  if (pedido.length === 0) {
    alert("El carrito ya está vacío");
    return;
  }

  if (confirm("¿Seguro que quieres vaciar todo el carrito?")) {
    pedido = []; // lo dejamos como arreglo
    total = 0;   // reiniciamos el total
    actualizarPedido(); // actualizamos la vista
  }
}
