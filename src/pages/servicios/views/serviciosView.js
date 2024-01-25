//Selectores
const tabla = document.querySelector("#tbl-dtos");

/**
 *  Muestra en la tabla de datos de servicio los datos enviados como parametro
 * @param {Array de Datos que se a mostrar en el tbody de la tabla} listaDatos
 */
export function mostrarDatosTbl(listaDatos) {
  const tbody = tabla.querySelector("tbody");
  //Limpiar tbody
  tbody.innerHTML = "";

  listaDatos.forEach((elemento) => {
    const tr = document.createElement("tr");

    for (let dato in elemento) {
      console.log();
      if (typeof elemento[dato] == "string") {
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

    const td = document.createElement("td");
    const btnDetalle = document.createElement("button");
    btnDetalle.classList.add("btn-masInfo");
    btnDetalle.textContent = "Detalles";
    btnDetalle.setAttribute("data-id", elemento["id"]);
    td.appendChild(btnDetalle);
    tr.appendChild(td);
    tbody.appendChild(tr);
  });
}
