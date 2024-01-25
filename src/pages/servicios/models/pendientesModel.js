import { URL_DB } from "../config/config.js";

const URL = URL_DB.concat("serviciosPendientes");

/**
 * Trae todos los servicios pendientes
 * @returns Retorna un array de objetos con todos los servicios pendientes
 */
export async function traerTodosServiciosPendientes() {
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) =>
      console.error("Error al buscar todos los servicios pendientes" + error)
    );
}

/**
 *  Trae un servicio pendiente por su ID
 * @param {Servicio pendiente que se va a buscar} id
 * @returns
 */
export async function traerIdServicioPendiente(id) {
  return fetch(URL.concat(`/${id}`))
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) =>
      console.error("Error al traer la cita pendiente: " + error)
    );
}

/**
 * Elimina un servicio pendiente en base a su ID
 * @param {ID del servicio pendiente a eliminar} id
 * @returns Status de la eliminacion (200 OK)
 */
export async function eliminarServicioPendiente(id) {
  myInit = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(URL.concat(`/${id}`), myInit)
    .then((response) => response.statusText)
    .catch((error) =>
      console.error("Error al eliminar el servicio pendiente", error)
    );
}
