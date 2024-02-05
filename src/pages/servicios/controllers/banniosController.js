import * as baseModel from "../models/baseModel.js";

//Iniciar
export function iniciarBannio(objDtos) {
  objDtos["estado"] = "proceso";
  baseModel.modificar(objDtos["id"], objDtos);
}

//Finalizar
export function finalizarBannio(objDtos) {
  objDtos["estado"] = "finalizado";
  objDtos["hora_salida"] = obtenerHoraActual();
  baseModel.modificar(objDtos["id"], objDtos);
}

function obtenerHoraActual() {
  const date = new Date();
  let hora = date.getHours();
  const minutos = date.getMinutes();
  const complemento = hora < 12 ? "A.M" : "P.M";
  const horaActual = `${hora}:${minutos} ${complemento}`;
  return horaActual;
}

//Cancelar
export function cancelarBannio(objDtos) {
  objDtos["estado"] = "cancelado";
  baseModel.modificar(objDtos["id"], objDtos);
}
