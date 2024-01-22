//===== Selectores =====
//Barra herramientas
//1. Servicios
const btnPendientes = document.querySelector("#btnPendientes");
const btnBannios = document.querySelector("#btnBannios");
const btnGuarderia = document.querySelector("#btnGuarderia");

//2. Opciones servicio
const titulo = document.querySelector(".titulo-container .titulo");
const divOpcServicio = document.querySelector(".opcs-servicio-container");
const ulPendientes = divOpcServicio.querySelector("ul");

//3. Acciones servicio

//===== Eventos =====
document.addEventListener("DOMContentLoaded", () => {
  btnPendientes.click();
});

btnPendientes.addEventListener("click", (event) => {
  ulPendientes.innerHTML = "";

  titulo.textContent = "Pendientes";
});

btnBannios.addEventListener("click", () => {
  titulo.textContent = "Baños";

  const listaOpc = [
    { descripcion: "Todos", handler: listarPorEstado },
    { descripcion: "Pendientes", handler: listarPorEstado },
    { descripcion: "Proceso", handler: listarPorEstado },
    { descripcion: "Cancelados", handler: listarPorEstado },
  ];
  llenarUlServicio(listaOpc);
});

btnGuarderia.addEventListener("click", () => {
  titulo.textContent = "Guarderia";

  const listaOpc = [
    { descripcion: "Todos", handler: listarPorEstado },
    { descripcion: "En Guarderia", handler: listarPorEstado },
    { descripcion: "Cancelados", handler: listarPorEstado },
  ];
  llenarUlServicio(listaOpc);
});

//===== Funciones =====
function llenarUlServicio(listaOpc) {
  //Se limpia la lista de opciones
  ulPendientes.innerHTML = "";

  //Se recorren las opciones enviadas como parametro
  listaOpc.forEach((opc) => {
    //Se crea, se agrega funcionalidad y se envia la opcion al contenedor
    const li = document.createElement("li");
    li.style.cursor = "pointer";
    li.textContent = opc.descripcion;
    li.addEventListener("click", () => {
      opc.handler(opc.descripcion);
    });
    ulPendientes.appendChild(li);
  });
}

/**
 *  Lista los datos de los clientes por estado
 * @param estado (Filtro que define que datos traer)
 */
function listarPorEstado(estado) {
  estado = estado.toLowerCase();

  //Filtrar
  console.log("Filtrar por", estado);
}
