# SplashPaws

Catálogo virtual de productos y sistema de gestión de servicios para la tienda de mascotas SplashPaws.

## Objetos

**Obj productos**
producto = {
    id:,
    urlImagen: "",
    nombre:"",
    descripcion:"",
    precio:"",
    stock:"",
    categoria:"",
    especie:""
}

**Obj citas pendientes**
citaPendiente = {
    id: "",
    propietario: {
        nombre: "Lis Sharik Agudelo", 
        teléfono:"3023678714"
    },
    mascota: {
        nombre: "Athala",
        especie: "gato"
    }
    servicio:{
        fecha:"13/01/2024",
        hora_llegada:"10:19",
        servicio: "baño",
        estado: "pendiente",
    }
}

**Obj servicio**
servicio = {
    id: "1",
    id_propietario: "1",
    id_mascota: "1",
    fecha: "13/01/2024",
    hora_llegada: "10:19",
    hora_salida: "11:19",
    servicio: "baño",
    estado: "pendiente",
}

**Obj Mascota**
mascota = {
    id: "1",
    id_propietario: "1",
    nombre: "Athala",
    especie: "gato",
    tamanio: "grande",
    pelaje: "corto"
}

**Obj Propietario**
propietario = {
    id: "1",
    nombre: "Lis Sharik Agudelo",
    teléfono: "3023678714",
}






