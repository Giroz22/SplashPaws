import { URL_DB } from "../config/config.js";

const URL = URL_DB.concat("serviciosPendientes");

export async function traerPendientes() {
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => data);
}

function traerId(id) {}

function eliminar(id) {}
