// =====Importaciones =====
import * as baseModel from "../models/baseModel.js";
import * as serviciosView from "./serviciosView.js";

//===== Selectores =====

const btnPendientes = document.querySelector("#btnPendientes");

//===== Eventos =====
btnGuarderia.addEventListener("click", () => {
  baseModel.actualizarURL("serviciosGuarderia");
  mostrarDtosGuarderia();
  serviciosView.titulo.textContent = "Guarderia";

  const listaOpc = [
    {
      descripcion: "Todos",
      handler: mostrarDtosGuarderia,
    },
    {
      descripcion: "En Guarderia",
      handler: () => {
        console.log("guarderia");
      },
    },
    {
      descripcion: "Cancelados",
      handler: () => {
        console.log("cancelados");
      },
    },
  ];
  serviciosView.llenarUlServicio(listaOpc);
});

//===== Funciones =====
async function mostrarDtosGuarderia() {
  const datos = await baseModel.obtenerDatos();
  serviciosView.mostrarDatosTbl(datos);
}
