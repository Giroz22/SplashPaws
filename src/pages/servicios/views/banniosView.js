// =====Importaciones =====
import * as baseModel from "../models/baseModel.js";
import * as serviciosView from "./serviciosView.js";

//===== Selectores =====

//===== Eventos =====
btnBannios.addEventListener("click", () => {
  baseModel.actualizarURL("serviciosBannios");
  mostrarDtosBannios();

  serviciosView.titulo.textContent = "Baños";

  const listaOpc = [
    { descripcion: "Todos", handler: mostrarDtosBannios },
    {
      descripcion: "Pendientes",
      handler: () => {
        console.log("Pendientes");
      },
    },
    {
      descripcion: "Proceso",
      handler: () => {
        console.log("Proceso");
      },
    },
    {
      descripcion: "Cancelados",
      handler: () => {
        console.log("Cancelados");
      },
    },
  ];
  serviciosView.llenarUlServicio(listaOpc);
});
//===== Funciones =====
async function mostrarDtosBannios() {
  const datos = await baseModel.obtenerDatos();
  serviciosView.mostrarDatosTbl(datos);
}
