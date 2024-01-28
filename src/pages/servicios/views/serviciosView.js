//===== Importaciones =====
import * as pendientes from "./pendienteView.js";
import * as bannios from "./banniosView.js";
import * as guarderia from "./guarderiaView.js";

//===== Selectores =====
//Barra herramientas
const btnPendientes = document.querySelector("#btnPendientes");
export const titulo = document.querySelector(".titulo-container .titulo");
export const divOpcServicio = document.querySelector(
  ".opcs-servicio-container"
);
export const ulPendientes = divOpcServicio.querySelector("ul");
export const tabla = document.querySelector("#tbl-dtos");

//===== Eventos =====
document.addEventListener("DOMContentLoaded", () => {
  btnPendientes.click();
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
    li.addEventListener("click", () => {
      opc.handler();
    });
    ulPendientes.appendChild(li);
  });
}

/**
 *  Muestra en la tabla de datos de servicio los datos enviados como parametro
 * @param {Array de Datos que se a mostrar en el tbody de la tabla} listaDatos
 */
export function mostrarDatosTbl(listaDatos, eventoBtn) {
  mostrarDatosThead(listaDatos);
  mostrarDatosTbody(listaDatos, eventoBtn);
}

function mostrarDatosThead(listaDatos) {
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

function mostrarDatosTbody(listaDatos, eventoBtn) {
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
        td.textContent = elemento[dato];
        tr.appendChild(td);
      } else {
        for (let datoObj in elemento[dato]) {
          const td = document.createElement("td");

          td.textContent = elemento[dato][datoObj];

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
    btnDetalle.addEventListener("click", eventoBtn);

    td.appendChild(btnDetalle);
    tr.appendChild(td);

    //Agregamos la informacion a la tabla
    tbody.appendChild(tr);
  });
}
