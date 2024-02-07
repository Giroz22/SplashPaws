import * as baseModel from "../models/baseModel.js";
import * as baseController from "./baseController.js";

//Ingresar
export function ingresarGuarderia(objDtos) {
  objDtos["estado"] = "guarderia";
  baseModel.modificar(objDtos["id"], objDtos);
}

//Entregar
export function entregarGuarderia(objDtos) {
  objDtos["estado"] = "entregado";
  objDtos["hora_salida"] = baseController.obtenerHoraActual();
  baseModel.modificar(objDtos["id"], objDtos);
}

//Cancelar
export function cancelarGuarderia(objDtos) {
  objDtos["estado"] = "cancelado";
  baseModel.modificar(objDtos["id"], objDtos);
}
