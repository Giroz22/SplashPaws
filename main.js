/**
 *
 * @param {Valor minimo a generar} min
 * @param {Valor maximo a generar} max
 * @returns Número aleatorio entre el rango de parametros ingrezados
 */
export function generarNumRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 *
 * @returns Número de identificacion unico en formato de texto
 */
export function generarID() {
  return String(Date.now() + generarNumRandom(1, 100));
}
