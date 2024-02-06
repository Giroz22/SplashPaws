export async function consumirAPI(mensaje, especie, categoria) {
    try {
        const URL = "http://localhost:3000/productos";
        const respuesta = await fetch(URL);
        const datos = await respuesta.json();
        imprimirDatos(datos);
    } catch (error) {
        console.error("Hubo un error al obtener los productos:", error);
    }
}

//selectores

const products = document.querySelector(".products");
const preciominimo = document.querySelector("#minimo");
const preciomaximo = document.querySelector(" #maximo");
const especieHTML = document.querySelector("#especiecatalogo");
const categoriaHTML = document.querySelector("#categoria");

//listeners
especieHTML.addEventListener("change", () => {
    const nombre = inputSearch.value.trim();
    getproducts(nombre);
});
categoriaHTML.addEventListener("change", () => {
    const nombre = inputSearch.value.trim();
    getproducts(nombre);
});
preciominimo.addEventListener("change", handlePriceRangeChange);
preciomaximo.addEventListener("change", handlePriceRangeChange);

function imprimirDatos(datos) {
    cleanHTML(products);

    datos.forEach((element) => {
        
        products.innerHTML += `
        <div class="products">
            <div class="card" style="width: 18rem; height: 28rem;">
                <img src="${element.urlImagen}" class="card-img-top" alt="..." style="width: 18rem; height: 16rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.nombre}</h5>
                    <p class="card-text">${element.descripcion}</p>
                    <p class="card-text">Categoria: ${element.categoria}</p>
                    <p class="card-text">Especie: ${element.especie}</p> 
                    <span>${element.precio}</span>
                    <p class="card-text">Cantidad:<span>${element.stock}</span> </p>
                </div>
            </div>
        </div>
        `;
    });
    printPrecioEspecieCategoria(datos);
}

const mensaje = "Hola";
export default mensaje;

// filters

// buscador
const inputSearch = document.querySelector("#search");

inputSearch.addEventListener("input", (event) => {
    const nombre = event.target.value.trim();
    if (nombre === "") {
        consumirAPI();
    } else {
        getproducts(nombre);
    }
});
function handlePriceRangeChange() {
    const nombre = inputSearch.value.trim();
    getproducts(nombre);
}

async function getproducts(nombre) {
    try {
        let URL = `http://localhost:3000/productos?nombre=${encodeURIComponent(
            nombre
        )}`;

        const especieSelecionada = especieHTML.value;
        const categoriaSelecionada = categoriaHTML.value;
        const precioMinimoSeleccionado = parseFloat(
            preciominimo.value.replace("$", "").replace(".", "").replace(",", ".")
        );
        const precioMaximoSeleccionado = parseFloat(
            preciomaximo.value.replace("$", "").replace(".", "").replace(",", ".")
        );

        if (especieSelecionada) {
            URL += `&especie=${encodeURIComponent(especieSelecionada)}`;
        }
        if (categoriaSelecionada) {
            URL += `&categoria=${encodeURIComponent(categoriaSelecionada)}`;
        }

        const response = await fetch(URL);
        let products = await response.json();

        if (!isNaN(precioMinimoSeleccionado) && !isNaN(precioMaximoSeleccionado)) {
            products = products.filter((producto) => {
                const precioProducto = parseFloat(
                    producto.precio.replace("$", "").replace(".", "").replace(",", ".")
                );
                return (
                    precioProducto >= precioMinimoSeleccionado &&
                    precioProducto <= precioMaximoSeleccionado
                );
            });
        } else if (!isNaN(precioMinimoSeleccionado)) {
            products = products.filter((producto) => {
                const precioProducto = parseFloat(
                    producto.precio.replace("$", "").replace(".", "").replace(",", ".")
                );
                return precioProducto >= precioMinimoSeleccionado;
            });
        } else if (!isNaN(precioMaximoSeleccionado)) {
            products = products.filter((producto) => {
                const precioProducto = parseFloat(
                    producto.precio.replace("$", "").replace(".", "").replace(",", ".")
                );
                return precioProducto <= precioMaximoSeleccionado;
            });
        }

        console.log(products);
        printProducts(products);
        if (products.length === 0) {
            const container = document.querySelector(".products");
            container.innerHTML = "<p>No se encontraron productos</p>";
        }
    } catch (error) {
        console.error("Hubo un error al buscar el producto:", error);
    }
}

function printProducts(products) {
    const container = document.querySelector(".products");
    cleanHTML(container);

    products.forEach((product) => {
        container.innerHTML += `
        <div class="card" style="width: 18rem; height: 25rem;">
            <img src="${product.urlImagen}" class="card-img-top" alt="..." style="width: 18rem; height: 15rem;">
            <div class="card-body">
                <h5 class="card-title">${product.nombre}</h5>
                <p class="card-text">${product.descripcion}</p>
                <p class="card-text">Categoria: ${product.categoria}</p>
                <p class="card-text">Especie: ${product.especie}</p> 
                <span>${product.precio}</span>
                <p class="card-text">Cantidad:<span>${product.stock}</span> </p>
            </div>
        </div>
        `;
    });
}

function cleanHTML(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

// demas filtros

function printPrecioEspecieCategoria(datos) {
    const precioNumeros = datos.map((producto) => {
        const precionSinSimblolo = producto.precio
            .replace("$", "")
            .replace(".", "");
        return parseFloat(precionSinSimblolo);
    });
    const preciosUnicos = new Set(precioNumeros);
    const precioOrdenados = Array.from(preciosUnicos).sort((a, b) => a - b);
    console.log(precioOrdenados);
    preciominimo.innerHTML += ``;
    preciomaximo.innerHTML += ``;
    precioOrdenados.forEach((precio) => {
        const precioElemento = document.createElement(`option`);
        precioElemento.textContent = `$${precio.toLocaleString("es-CO", {
            minimumFractiosDigits: 2,
        })}`;
        preciominimo.appendChild(precioElemento.cloneNode(true));
        preciomaximo.appendChild(precioElemento);
       
    });
    const categoriaUnica = new Set();

    datos.forEach((element) => {
        categoriaUnica.add(element.categoria);
    });

    categoriaHTML.innerHTML = `
        <option value="">Categoria</option>
    `;
    categoriaUnica.forEach((categoria) => {
        const optionSelect = document.createElement("option");
        optionSelect.textContent = categoria;
        categoriaHTML.appendChild(optionSelect);
        
    });
    const especieUnica = new Set();

    datos.forEach((element) => {
        especieUnica.add(element.especie);
    });

    especieHTML.innerHTML = `
        <option value="">Especie</option>
    `;
    especieUnica.forEach((especie) => {
        const optionSelect = document.createElement("option");
        optionSelect.textContent = especie;
        especieHTML.appendChild(optionSelect);
        
    });
}
