export async function consumirAPI(mensaje) {
    try {
    const URL = "http://localhost:3000/productos";
    const respuesta = await fetch(URL);
    const datos = await respuesta.json();
    imprimirDatos(datos);
    } catch (error) {
        console.error('Hubo un error al obtener los productos:', error);
    }
}

const products = document.querySelector(".products");

function imprimirDatos(datos) {
    cleanHTML(products)

    datos.forEach((element) => {
        console.log(datos);
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
}

const mensaje = "Hola";
export default mensaje;

// filters
// buscador
const inputSearch = document.querySelector("#search");
let timer;


inputSearch.addEventListener("input", (event) => {
    const nombre = event.target.value.trim();
    if (nombre === "") {
        consumirAPI();
    } else {
        getproducts(nombre);
    }

    // clearTimeout(timer)
    // timer = setTimeout(() => {
    //     getproducts(event.target.value)
    // }, 500);
})

async function getproducts(nombre) {
    try {
        const URL = `http://localhost:3000/productos?nombre=${encodeURIComponent(nombre)}`;
        const response = await fetch(URL);
        const products = await response.json();

        console.log(products); 
        printProducts(products)
        if (products.length === 0) {
            const container = document.querySelector(".products");
            container.innerHTML = "<p>No se encontraron productos</p>";
        }
        } catch (error) {
        console.error('Hubo un error al buscar el producto:', error);
    }
}

function printProducts(products) {
    const container = document.querySelector(".products")
    cleanHTML(container);

    products.forEach(product => {
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
        container.removeChild(container.firstChild)
    }
}

// demas filtros
const precioMin = document.querySelector('.precio')
const precioMax = document.querySelector('.precio')

function filtroPrecioEspecieCategoria(){
    
}















//     /** PASOS:
//     inputSearch.innerHTML += `
//     `
//    * 1. definir de que va a ser los filtros:
//    *        R//= buscador por el nombre y precio, categoria, especie
//    * 2. que va a hacer cada filtro:
//    *        R//= -buscador va a mostrar solo lo que coincida con lo que se ingrese en base al nombre
//    *             -precio va a mostrar productos entre rangos de precio
//    *             -categoria va a mostrar solo los productos de la(s) categoria(s) seleccionada(s)
//    *             -especie solo mostrara la especie seleccionada
//    * 3. como va a desarrollarse:
//    *        R//= -el buscador solo se ejecutara dentro del catalogo, solo buscara por nombres mediante un input y cuando 
//    *              vaya copiando se este actualizando el catalogo con las coincidencias y si no hay que muestre en pantalla
//    *             -el del precio se hara con dos selectores para definir precio minimo y maximo y mostrara todos los 
//    *              productos que coincidan con el rango de precios
//    *             -la categoria sera un tipo check para que pueda escoger una o mas opciones y mostrar solo las que 
//    *              coincidan, o esta la posibilidad de hacerlo con un select y que solo escoja una
//    *             -la especie solo mostrara una especie puede ser selector 
//    *            * debe tener un boton para que se pueda buscar por los filtros que se han agregado y mostrar esos productos, ademas de que los filtros deben ser acumulativos y mostrar cuando no se encuentre nada
//    * SE HARA EN EL APARTADO PARA LOS FILTROS O SEA QUE SE DEBE SELECCIONAR EL DIV PARA AGREGAR LO ANTERIOR Y TAMBIEN UN BOTON FLOTANTE PARA QUE LLEVE DIRECTO A LOS FILTRO EN CASO DE QUE HAYA TIEMPO PARA SER LA PAGINA MAS AMIGABLE WITH OF USERS
//    *
//    */
