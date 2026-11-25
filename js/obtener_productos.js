document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("productos-container");

  if (!container) return;

  function createProductosCard({ name, price, image, category }) {
    return `
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="card h-100 border-0 custom-card">
          <img src="./img/${image}" class="card-img-top" alt="${name}" loading="lazy">
          <div class="card-body d-flex flex-column">
            <h2 class="card-title h5">${name}</h2>
            <p class="card-text">Categoría: <strong>${category}</strong></p>
            <p class="card-text">Precio: <strong class="price">$${Number(price).toFixed(2)}</strong></p>
            <button class="btn btn-cart w-100 mt-auto" type="button">
              Agregar al carrito &nbsp; <i class="bi bi-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  async function loadProductos() {
    try {
      const response = await fetch("./data/data_Productos.json");
      if (!response.ok) {
        throw new Error(`No se pudo cargar data/data_Productos.json (${response.status})`);
      }

      const productos = await response.json();
      container.innerHTML = productos.map(createProductosCard).join("");

      // Mostrar un mensaje si alguna ruta de imagen no coincide con un archivo existente.
      container.querySelectorAll("img").forEach((img) => {
        img.addEventListener("error", () => {
          console.error(`No se pudo cargar la imagen: ${img.getAttribute("src")}`);
          img.alt = `Imagen no disponible: ${img.alt}`;
        }, { once: true });
      });
    } catch (error) {
      console.error("Error al cargar los productos:", error);
      container.innerHTML = '<p class="text-danger text-center">No se pudieron cargar los productos. Revisa la consola del navegador.</p>';
    }
  }

  loadProductos();
});
