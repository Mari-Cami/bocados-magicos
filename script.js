let pedido = [];
let total = 0;

function agregarPedido(nombre, precio) {
  pedido.push({ nombre, precio });
  total += precio;
  actualizarPedido();
}

function actualizarPedido() {
  const lista = document.getElementById("listaPedido");
  const totalTexto = document.getElementById("total");

  lista.innerHTML = "";

  pedido.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    lista.appendChild(li);
  });

  totalTexto.textContent = `Total: $${total}`;
}

function enviarWhatsApp() {
  if (pedido.length === 0) {
    alert("Tu pedido está vacío");
    return;
  }

  const direccion = document.getElementById("direccion").value;

  if (direccion.trim() === "") {
    alert("Por favor escribe tu dirección de entrega");
    return;
  }

  let mensaje = "🍪 *Pedido Bocados Mágicos* 🍪%0A%0A";

  pedido.forEach(item => {
    mensaje += `• ${item.nombre} - $${item.precio}%0A`;
  });

  mensaje += `%0A💰 *Total:* $${total}`;
  mensaje += `%0A%0A📍 *Dirección:* %0A${direccion}`;
  mensaje += `%0A%0A✨ ¡Gracias por tu pedido!`;

  const telefono = "57TUNUMEROAQUI"; // ← CAMBIA ESTO
  const url = `https://wa.me/${telefono}?text=${mensaje}`;

  window.open(url, "_blank");
}

  // Abrimos WhatsApp en una nueva pestaña
  window.open(url, "_blank");
}

