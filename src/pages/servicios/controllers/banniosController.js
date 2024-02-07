import * as baseModel from "../models/baseModel.js";
import * as baseController from "./baseController.js";

//Iniciar
export function iniciarBannio(objDtos) {
  objDtos["estado"] = "proceso";
  baseModel.modificar(objDtos["id"], objDtos);
}

//Finalizar
export function finalizarBannio(objDtos) {
  objDtos["estado"] = "finalizado";
  objDtos["hora_salida"] = baseController.obtenerHoraActual();
  baseModel.modificar(objDtos["id"], objDtos);
}

//Cancelar
export function cancelarBannio(objDtos) {
  objDtos["estado"] = "cancelado";
  baseModel.modificar(objDtos["id"], objDtos);
}
