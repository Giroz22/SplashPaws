let isEnglish = localStorage.getItem("isEnglish");

//Traduccion
const URLBase = "https://api.mymemory.translated.net/";

/**
 *  Traduce una palabra ingresada en Ingles y la retorna en español
 * @param {Palabra que sera traducida} palabraIngles
 * @returns La palabra ingresada en Español
 */
async function traducirEspañol(palabraIngles) {
  const URL = `${URLBase}?q=${palabraIngles}&langpair=en-GB|es`;
  try {
    const respuesta = await fetch(URL);
    const data = await respuesta.json();

    if (!respuesta.ok) {
      console.error("Error al traducir:", data.responseDetails);
      return false;
    }

    const traduccion = data.responseData.translatedText;
    return traduccion;
  } catch (error) {
    console.log("Error al traducir:", error);
  }
}

/**
 *  Traduce una palabra ingresada en español y la retorna en ingles
 * @param {Palabra que sera traducida} palabraEspañol
 * @returns La palabra ingresada en Ingles
 */
async function traducirIngles(palabraEspañol) {
  const URL = `${URLBase}?q=${palabraEspañol}&langpair=es|en-ES`;
  try {
    const respuesta = await fetch(URL);
    const data = await respuesta.json();

    if (!respuesta.ok) {
      console.error("Error al traducir:", data.responseDetails);
      return false;
    }

    const traduccion = data.responseData.translatedText;
    return traduccion;
  } catch (error) {
    console.log("Error al traducir:", error);
  }
}

export function TraducirPagina() {
  const textoTraducir = document.querySelectorAll("h1,h2,button,td");
  isEnglish = localStorage.getItem("isEnglish");

  if (isEnglish) {
    textoTraducir.forEach((element) => {
      if (traduccionTexto) {
        traducirEspañol(element.textContent).then((texto) => {
          element.textContent = texto;
        });
      }
    });
    localStorage.removeItem("isEnglish");
  } else {
    textoTraducir.forEach((element) => {
      if (traduccionTexto) {
        traducirIngles(element.textContent).then((texto) => {
          element.textContent = texto;
        });
      }
    });
    localStorage.setItem("isEnglish", true);
  }
}

export function UtilizarIdiomaActual() {
  const textoTraducir = document.querySelectorAll("h1,h2,button,td");
  isEnglish = localStorage.getItem("isEnglish");

  if (isEnglish) {
    textoTraducir.forEach((element) => {
      traducirIngles(element.textContent).then((texto) => {
        if (texto) {
          element.textContent = texto;
        }
      });
    });
  }
}

function parsearTexto(texto) {
  return texto.replace(" ", "%20");
}
