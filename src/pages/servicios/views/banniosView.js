// =====Importaciones =====
import * as baseModel from "../models/baseModel.js";
import * as banniosModel from "../models/banniosModel.js";
import * as serviciosView from "./serviciosView.js";

//===== Selectores =====

//===== Eventos =====
btnBannios.addEventListener("click", () => {
  baseModel.actualizarURL("serviciosBannios");
  serviciosView.actualizarServicioActual("bannios");

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
  serviciosView.mostrarDatosThead([
    "ID",
    "Nombre de la Mascota",
    "Especie",
    "Tamaño",
    "Pelaje",
    "Propietario",
    "Telefono",
    "Fecha",
    "Hora llegada",
    "Hora salida",
    "Servicio",
    "Estado",
    "Detalle",
  ]);
  const datos = await baseModel.obtenerDatos();
  serviciosView.mostrarDatosTbody(datos);
}

export function generarFormBannios() {
  return "<h1>Hola Lis</h1>";
}
