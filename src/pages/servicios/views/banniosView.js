// =====Importaciones =====
import * as baseModel from "../models/baseModel.js";
import * as banniosModel from "../models/banniosModel.js";
import * as serviciosView from "./serviciosView.js";

//===== Selectores =====

//===== Eventos =====
btnBannios.addEventListener("click", () => {
  baseModel.actualizarURL("serviciosBannios");
  mostrarDtosBannios();

  serviciosView.titulo.textContent = "Baños";

  const listaOpc = [
    { descripcion: "Todo", handler: mostrarDtosBannios },
    {
      descripcion: "Pendiente",
      handler: () => {
        serviciosView.mostrarPorEstado("pendiente");
      },
    },
    {
      descripcion: "Proceso",
      handler: () => {
        serviciosView.mostrarPorEstado("proceso");
      },
    },
    {
      descripcion: "Finalizado",
      handler: () => {
        serviciosView.mostrarPorEstado("finalizado");
      },
    },
    {
      descripcion: "Cancelado",
      handler: () => {
        serviciosView.mostrarPorEstado("cancelado");
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
