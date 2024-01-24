import {generatorHeaderModal} from '../../../../main.js'



const employes = [
    {
        document: "1000111",
        userName: "Lis Sharik",
        password: "12345"
    },
    {
        document: "10101",
        userName: "Alejandro A",
        password: "AAAAAA"
    },
    {
        document: "123000025",
        userName: "Alejandro G",
        password: "12345"
    }
]

const header = document.querySelector("header")
const btnValidate = document.querySelector(".btn_login")
const documentNumber = document.querySelector("#document_number");
const password = document.querySelector("#password");
let form = document.querySelector(".form_content")
let alertError = document.querySelector(".alert")

generatorHeaderModal(header, "Tienda", "Contactos", "#", "#", "Ingresar", "#");

btnValidate.addEventListener("click",(event)=>{
    event.preventDefault();
    console.log(documentNumber.value);
    console.log(password.value);
    employesData()
   
})

async function employesData(){
    try {
        const URL = "../../../data/empleados.json";
        const answer = await fetch(URL);
        const dataEmployee = await answer.json();

        if(answer.status == 200){
            validateUser(documentNumber.value,password.value,dataEmployee)
        }

        
    } catch (error) {
        console.log("Error en los datos");
    }
}



function validateUser(documentNumber,password,data){
   

    const verificacion = data.some(employe => documentNumber == employe.document && password == employe.password)
    console.log(verificacion);

    if(verificacion === true){
        // Redireccionamiento
    }else{
        alertError.textContent = "Número de documento o contraseña son incorrectos"
        setTimeout(()=>{
            alertError.textContent = ""
        },4000)
        return
    }
    
}

