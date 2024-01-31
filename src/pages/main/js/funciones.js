
export async function consumirAPI(mensaje) {
    const URL = "http://localhost:3000/productos"
    const respuesta = await fetch(URL)
    const datos = await respuesta.json()
    imprimirDatos(datos)
}


function imprimirDatos(datos) {
    const products = document.querySelector('.products')
    datos.forEach(element => {
        console.log(datos)
        products.innerHTML += `
        <div class="products">
            <div class="card" style="width: 18rem; height: 25rem;">
            <img src="${element.urlImagen}" class="card-img-top" alt="..." style="width: 18rem; height: 15rem;">
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

const mensaje = "Hola"
export default mensaje;

