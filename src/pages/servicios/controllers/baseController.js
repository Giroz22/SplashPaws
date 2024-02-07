export function obtenerHoraActual() {
  const date = new Date();
  let hora = date.getHours();
  const minutos = date.getMinutes();
  const complemento = hora < 12 ? "A.M" : "P.M";
  const horaActual = `${hora}:${minutos} ${complemento}`;
  return horaActual;
}
