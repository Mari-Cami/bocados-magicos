let pedido = {};
let total = 0;

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
  if (pedido[nombre].cantidad <= 0) {
    delete pedido[nombre];
  }
  actualizarPedido();
}

// VACIAR CARRITO
function vaciarCarrito() {
  pedido = {};
  actualizarPedido();
}

// ACTUALIZAR CARRITO
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
      <div class="controles">
        <button onclick="restar('${nombre}')">-</button>
        <button onclick="sumar('${nombre}')">+</button>
      </div>
    `;

    lista.appendChild(li);
  }

  document.getElementById("total").textContent = `Total: $${total.toLocaleString()}`;
}

// WHATSAPP
function enviarWhatsApp() {

  // VALIDAR CARRITO VACÍO
  if (Object.keys(pedido).length === 0) {
    alert("EL CARRITO SE ENCUENTRA VACÍO");
    return;
  }

  const nombre = document.getElementById("nombre").value.trim();
  const telefonoCliente = document.getElementById("telefono").value.trim();
  const direccion = document.getElementById("direccion").value.trim();

  // VALIDAR NOMBRE
  if (!nombre) {
    alert("POR FAVOR COMPLETA NOMBRE");
    return;
  }

  // VALIDAR TELÉFONO VACÍO
  if (!telefonoCliente) {
    alert("POR FAVOR COMPLETA TELEFONO");
    return;
  }

  // VALIDAR TELÉFONO COLOMBIA (10 dígitos que empiezan en 3)
  const telefonoLimpio = telefonoCliente.replace(/\s/g, ""); // quita espacios
  const telefonoRegex = /^3\d{9}$/;

  if (!telefonoRegex.test(telefonoLimpio)) {
    alert("COLOCA INFORMACION VALIDA EN TELEFONO, RECUERDA: DEBE EMPEZAR EN 3 Y TENER 10 DIGITOS");
    return;
  }

  // VALIDAR DIRECCIÓN VACÍA
  if (!direccion) {
    alert("POR FAVOR COMPLETA DIRECCION");
    return;
  }

  // VALIDACIÓN BÁSICA DE DIRECCIÓN
  if (direccion.length < 5) {
    alert("COLOCA UNA DIRECCION VALIDA");
    return;
  }

  // CREAR MENSAJE
  let mensaje = `Hola, soy ${nombre}%0A`;
  mensaje += `☎️ Teléfono: ${telefonoCliente}%0A%0A`;
  mensaje += `Quiero hacer el siguiente pedido:%0A`;

  for (let nombre in pedido) {
    mensaje += `• ${nombre} x${pedido[nombre].cantidad}%0A`;
  }

  mensaje += `%0A📍 Dirección: ${direccion}`;
  mensaje += `%0A💰 Total: $${total.toLocaleString()}`;

  const telefono = "573225739177";
  window.open(`https://wa.me/${telefono}?text=${mensaje}`, "_blank");
}
