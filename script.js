let pedido = {};
let total = 0;

function agregarPedido(nombre, precio) {
  if (pedido[nombre]) {
    pedido[nombre].cantidad++;
  } else {
    pedido[nombre] = {
      precio: precio,
      cantidad: 1
    };
  }

  total += precio;
  actualizarPedido();
}

function quitarPedido(nombre) {
  if (!pedido[nombre]) return;

  pedido[nombre].cantidad--;
  total -= pedido[nombre].precio;

  if (pedido[nombre].cantidad === 0) {
    delete pedido[nombre];
  }

  actualizarPedido();
}

function actualizarPedido() {
  const lista = document.getElementById("lista-pedido");
  const totalTexto = document.getElementById("total");

  lista.innerHTML = "";

  for (let nombre in pedido) {
    const item = pedido[nombre];

    const li = document.createElement("li");
    li.innerHTML = `
      ${nombre} (${item.cantidad}x)
      <button class="quitar" onclick="quitarPedido('${nombre}')">✖</button>
    `;
    lista.appendChild(li);
  }

  totalTexto.textContent = `Total: $${total.toLocaleString()}`;
}

function enviarWhatsApp() {
  if (Object.keys(pedido).length === 0) {
    alert("Aún no has agregado productos");
    return;
  }

  const nombreCliente = document.getElementById("nombre").value.trim();
  const telefonoCliente = document.getElementById("telefono").value.trim();
  const direccion = document.getElementById("direccion").value.trim();

  if (!nombreCliente || !telefonoCliente || !direccion) {
    alert("Por favor completa todos los datos");
    return;
  }

  let mensaje = `Hola, soy ${nombreCliente}%0A`;
  mensaje += `📞 Teléfono: ${telefonoCliente}%0A%0A`;
  mensaje += `Quiero hacer el siguiente pedido:%0A`;

  for (let nombre in pedido) {
    const item = pedido[nombre];
    mensaje += `• ${nombre} (${item.cantidad}x) - $${(item.precio * item.cantidad).toLocaleString()}%0A`;
  }
