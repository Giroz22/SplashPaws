//===== Importaciones =====
import * as baseModel from "../models/baseModel.js";
import * as pendientes from "./pendienteView.js";
import * as bannios from "./banniosView.js";
import * as guarderia from "./guarderiaView.js";
import * as traductor from "../../../js/traductor.js";
import * as modalGeneral from "./functionModal.js";

//=====Variables=====
let servicioActual = "";

//===== Selectores =====
//Barra herramientas
const containerServices = document.querySelector(".servicios-container");
const btnPendientes = document.querySelector("#btnPendientes");
const btnGuarderia = document.querySelector("#btnGuarderia");
const btnBannios = document.querySelector("#btnBannios");
export const titulo = document.querySelector(".titulo-container .titulo");
export const divOpcServicio = document.querySelector(
  ".opcs-servicio-container"
);
export const ulPendientes = divOpcServicio.querySelector("ul");
export const tabla = document.querySelector("#tbl-dtos");
//Contenedor modal
const modalBody = document.querySelector(".modal-body");

//===== Eventos =====
document.addEventListener("DOMContentLoaded", () => {
  btnPendientes.click();
});

containerServices.querySelectorAll("button").forEach((boton) => {
  boton.addEventListener("click", (evento) => {
    traductor.UtilizarIdiomaActual();
  });
});

//===== Funciones =====
export function llenarUlServicio(listaOpc) {
  //Se limpia la lista de opciones
  ulPendientes.innerHTML = "";

  //Se recorren las opciones enviadas como parametro
  listaOpc.forEach((opc) => {
    //Se crea, se agrega funcionalidad y se envia la opcion al contenedor
    const li = document.createElement("li");
    li.style.cursor = "pointer";
    li.textContent = opc.descripcion;
    li.addEventListener("click", opc.handler);
    ulPendientes.appendChild(li);
  });
}

/**
 *  Muestra en la tabla de datos de servicio los datos enviados como parametro
 * @param {Array de Datos que se a mostrar en el tbody de la tabla} listaDatos
 */
export function mostrarDatosTbl(listaDatos) {
  // mostrarDatosThead(listaDatos);
  mostrarDatosTbody(listaDatos);
}

export function mostrarDatosThead(datosThead) {
  const thead = tabla.querySelector("#row-info");
  thead.innerText = "";
  datosThead.forEach((elemento) => {
    let celda = document.createElement("td");
    celda.textContent = elemento.toUpperCase();
    thead.appendChild(celda);
  });
}

//Muestra las llaves de un objeto como cabezera
//Borrar
function mostrarDatosTheadObj(listaDatos) {
  const thead = tabla.querySelector("#row-info");
  thead.innerText = "";
  const elemento = listaDatos[0];

  for (let key in elemento) {
    /*Si el key es diferente a un object se imprime normal
       Sino se recorre nuevamente ya que es un objeto que contiene otros elementos*/
    if (typeof elemento[key] != "object") {
      const tdTitulo = document.createElement("td");
      tdTitulo.innerText = key.replace("_", " ").toUpperCase();
      thead.appendChild(tdTitulo);
    } else {
      for (let keyObj in elemento[key]) {
        const tdTitulo = document.createElement("td");
        tdTitulo.innerText = keyObj.replace("_", " ").toUpperCase();
        thead.appendChild(tdTitulo);
      }
    }
  }
  //Agregamos el titulo al boton detalle
  const tdTitulo = document.createElement("td");
  tdTitulo.innerText = "DETALLE";
  thead.appendChild(tdTitulo);
}

export function mostrarDatosTbody(listaDatos) {
  const tbody = tabla.querySelector("tbody");

  //Limpiar tbody
  tbody.innerHTML = "";

  //Se recorre la lista de datos
  listaDatos.forEach((elemento) => {
    const tr = document.createElement("tr");

    for (let dato in elemento) {
      /*Si el dato es diferente a un object se imprime normal
       Sino se recorre nuevamente ya que es un objeto que contiene otros elementos*/
      if (typeof elemento[dato] != "object") {
        const td = document.createElement("td");
        td.textContent = elemento[dato].toUpperCase();
        tr.appendChild(td);
      } else {
        for (let datoObj in elemento[dato]) {
          const td = document.createElement("td");

          td.textContent = elemento[dato][datoObj].toUpperCase();

          tr.appendChild(td);
        }
      }
    }

    //Creamos un boton detalle para cada uno de los datos
    const td = document.createElement("td");
    const btnDetalle = document.createElement("button");

    btnDetalle.classList.add("btn-masInfo");
    btnDetalle.textContent = "Detalles";
    btnDetalle.setAttribute("data-id", elemento["id"]);
    btnDetalle.setAttribute("data-bs-toggle", "modal");
    btnDetalle.setAttribute("data-bs-target", "#staticBackdrop");
    btnDetalle.addEventListener("click", handleBtnsDetalle);

    td.appendChild(btnDetalle);
    tr.appendChild(td);

    //Agregamos la informacion a la tabla
    tbody.appendChild(tr);
  });
}

async function handleBtnsDetalle(evento) {
  const id = evento.target.dataset.id;
  const obj = await baseModel.obtenerID(id);

  //==Lo que quiera hacer con los btons detalles
  console.log(obj);
  console.log(obj.servicio);

  const header = document.querySelector("header");

  switch (obj.servicio.toLowerCase()) {
    case "baño":
      bannios.generarFormBannios(modalBody, obj);

      break;

    case "guarderia":
      guarderia.generarFormGuarderia(modalBody, obj);
      break;
  }
}

export async function mostrarPorEstado(vrEstado) {
  const dato = await baseModel.obtenerDatosAtributo(
    "estado",
    vrEstado.toLowerCase()
  );

  mostrarDatosTbody(dato);
}

export function actualizarServicioActual(servicio) {
  servicioActual = servicio;
  console.log(servicioActual);
}

//Lis
const btnInfo = document.querySelector(".btn-masInfo");
btnInfo.setAttribute("data-bs-toggle", "modal");
btnInfo.setAttribute("data-bs-target", "#staticBackdrop");
btnInfo.addEventListener("click", () => {
  clean(modalBody);
  modalGeneral.modalGeneral(modalBody);
});

export function valorSelects(obj, options) {
  options.forEach((option) => {
    if (
      obj.servicio.toLowerCase() == option.value ||
      obj.mascota.especie.toLowerCase() == option.value ||
      obj.hora_llegada.toLowerCase() == option.value
    ) {
      option.setAttribute("selected", true);
    }
  });
}

export function clean(modalBody) {
  while (modalBody.firstChild) {
    modalBody.removeChild(modalBody.firstChild);
  }
}
