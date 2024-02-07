import {generatorHeaderModal} from '../../../../main.js';
import {alertaCorrecto} from '../../../../main.js';
import {alertaError} from '../../../../main.js';
import {generatorFooter} from '../../../../main.js';

const header = document.querySelector("header")
const footer = document.querySelector("footer")
const btnValidate = document.querySelector(".btn_login")
const documentNumber = document.querySelector("#document_number");
const password = document.querySelector("#password");

generatorHeaderModal(header, "Ingresar", "#");
generatorFooter(footer)

let verificacion;    
verificaionEstado()

btnValidate.addEventListener("click",(event)=>{
    event.preventDefault();
    console.log(documentNumber.value);
    console.log(password.value);
    employesData()
   
})

async function employesData(){
    try {
        const URL = "http://localhost:3000/empleados";
        const answer = await fetch(URL);
        const dataEmployee = await answer.json();

        if(answer.status == 200){
            console.log(dataEmployee);
            validateUser(documentNumber.value,password.value,dataEmployee)
        }

        
    } catch (error) {
        console.log("Error en los datos");
    }
}



function validateUser(documentNumber,password,data){
    verificacion = data.some(employe => documentNumber == employe.documento && password == employe.contraseña)
    console.log(verificacion);
    sessionStorage.setItem("verificacion", verificacion)    

    if(verificacion === true){
        window.location.href ="../../servicios/html/servicios.html"
    }else{
        alertaError("Número de documento o contraseña no son validos")
        return
    }
    
}


function verificaionEstado(){
 if(sessionStorage.getItem("verificacion")== true){
    window.location.href ="../../servicios/html/servicios.html"
 }
}