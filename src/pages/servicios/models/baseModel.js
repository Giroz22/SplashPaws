import { URL_DB } from "../config/config.js";

//=====Variables=====
let URL = URL_DB;

//=====Funciones=====
/**
 * Actualiza la ruta que utilizaran las funciones para hacer consultas a la base de datos
 * @param {Nombre de la tabla en la que se hara el crud} nombreTabla
 */
export function actualizarURL(nombreTabla) {
  URL = URL_DB + nombreTabla;
}

/**
 * Obtiene todos los datos
 * @returns Retorna un array de objetos con todos datos
 */
export async function obtenerDatos() {
  return fetch(URL)
    .then((response) => {
      if (!response.ok) {
        return [];
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error al obtener todos los datos: " + error);
    });
}

/**
 *  Trae un dato en base a su ID
 * @param {Dato que se va a buscar} id
 * @returns
 */
export async function obtenerID(id) {
  return fetch(URL.concat(`/${id}`))
    .then((response) => {
      if (!response.ok) {
        return {};
      }

      return response.json();
    })
    .catch((error) => {
      console.error("Error al traer el dato: " + error);
    });
}

/**
 *  Guarda en la DB la info de un nuevo dato
 * @param {Datos que se desea guardar} obj
 * @returns Status de la solicitud (200 OK)
 */
export async function guardar(obj) {
  myInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  return fetch(URL, myInit)
    .then((response) => response.status)
    .catch((error) => {
      console.error("Error al guardar el dato: " + error);
    });
}

/**
 *  Actualiza la informacion de un objeto existente
 * @param {ID objeto a actualizar} id
 * @param {Datos que se van actualizar} obj
 * @returns
 */
export async function modificar(id, obj) {
  myInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  return fetch(`${URL}/${id}`, myInit)
    .then((response) => response.status)
    .catch((error) => {
      console.error("Error al actualizar el dato: " + error);
    });
}

/**
 * Elimina un dato en base a su ID
 * @param {ID del dato a eliminar} id
 * @returns Status de la eliminacion (200 OK)
 */
export async function eliminar(id) {
  myInit = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(`${URL}/${id}`, myInit)
    .then((response) => response.statusText)
    .catch((error) => {
      console.error("Error al eliminar el dato", error);
    });
}
