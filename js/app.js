//variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
  //Cuando agregas un cuerso presionando agregar al carrito
  listaCursos.addEventListener("click", agregarCurso);

  //elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  //vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; //reseteamos arreglo
    limpiarHTML(); //eliminamos html
  });
}

//funciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

//elimina un curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    //elimina del arreglo articlulos carrito por el data-id
    articulosCarrito = articulosCarrito.filter(
      (articulo) => articulo.id !== cursoId
    );
  }

  carritoHTML();
}

//lee el contenido del html y extrae info del curso
function leerDatosCurso(cursoSeleccionado) {
  //crear objeto con el contenido del curso actual
  const infoCurso = {
    imagen: cursoSeleccionado.querySelector("img").src,
    titulo: cursoSeleccionado.querySelector("h4").textContent,
    precio: cursoSeleccionado.querySelector(".precio span").textContent,
    id: cursoSeleccionado.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  //revisa si un elemento existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);

  if (existe) {
    //actualizamos cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //retorna el objeto actualizado
      } else {
        return curso; //retorna no duplicados
      }
    });

    articulosCarrito = [...cursos];
  } else {
    //agregamos articulo al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  //agregar elementos al arreglo Carrito

  carritoHTML();
}

//muestra carrito de compras en html
function carritoHTML() {
  //limpiar html
  limpiarHTML();
  //recorre carrito y crea HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
        <img src="${imagen}" width='100'/>
    </td>
    <td> ${titulo}</td>
    <td> ${precio}</td>
    <td> ${cantidad}</td>
    <td> <a href='#' class="borrar-curso" data-id="${id}"> X </a>  </td>`;

    //agrega el HTML de carrito en el tbody

    contenedorCarrito.appendChild(row);
  });
}

function limpiarHTML() {
  //forma lenta
  //   contenedorCarrito.innerHTML = "";

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
