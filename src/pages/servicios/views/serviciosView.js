//Selectores
export const tabla = document.querySelector("#tbl-dtos");

/**
 *  Muestra en la tabla de datos de servicio los datos enviados como parametro
 * @param {Array de Datos que se a mostrar en el tbody de la tabla} listaDatos
 */
export function mostrarDatosTbl(listaDatos, eventoBtn) {
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
