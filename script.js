let pedido = [];
let total = 0;

function agregarPedido(nombre, precio) {
  const productoExistente = pedido.find(item => item.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    pedido.push({ nombre, precio, cantidad: 1 });
  }

  // Recalcular total
  total = pedido.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  actualizarPedido();
}

function quitarPedido(index) {
  if (pedido[index].cantidad > 1) {
    pedido[index].cantidad -= 1;
  } else {
    pedido.splice(index, 1);
  }

  total = pedido.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  actualizarPedido();
}

function actualizarPedido() {
  const lista = document.getElementById("lista-pedido");
  const totalTexto = document.getElementById("total");

  lista.innerHTML = "";

  pedido.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} ${item.cantidad > 1 ? `x${item.cantidad}` : ''} - $${(item.precio * item.cantidad).toLocaleString()}
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
    mensaje += `• ${item.nombre} ${item.cantidad > 1 ? `x${item.cantidad}` : ''} - $${(item.precio * item.cantidad).toLocaleString()}%0A`;
  });

  mensaje += `%0A📍 Dirección: ${direccion}`;
  mensaje += `%0A💰 Total: $${total.toLocaleString()}`;

  const telefono = "573225739177"; // TU número aquí
  window.open(`https://wa.me/${telefono}?text=${mensaje}`, "_blank");

  document.getElementById("mensaje-gracias").classList.remove("oculto");

  // Reiniciar carrito y formulario
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
    pedido = [];
    total = 0;
    actualizarPedido();
  }
}
