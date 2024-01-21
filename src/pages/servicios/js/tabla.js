//===== Selectores =====
const tabla = document.querySelector("#tbl-dtos");

const rowServicios = tabla.querySelector("#row-servicios");

const rowOpc = tabla.querySelector("#row-opc");

const rowHeadInfo = tabla.querySelector("#row-info");

//===== Eventos =====
rowServicios.addEventListener("click", (e) => {
  let tdServicio = e.target;

  switch (tdServicio.getAttribute("servicio")) {
    case "pendiente":
      cambiarColortd(tdServicio, "#ffa031");

      break;

    case "bannio":
      cambiarColortd(tdServicio, "#77dcff");
      break;

    case "guarderia":
      cambiarColortd(tdServicio, "#83ff7e");
      break;

    default:
      break;
  }
});

function cambiarColortd(td, color) {
  td.parentElement.querySelectorAll("td").forEach((elemenTD) => {
    elemenTD.style.background = "#f2f2f2";
  });
  td.style.background = color;
  rowOpc.style.background = color;
  rowHeadInfo.style.background = color;
}
