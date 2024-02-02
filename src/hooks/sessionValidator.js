(()=>{
    const verificacion = sessionStorage.getItem("verificacion");
    console.log("->",verificacion);
    const path = window.location.pathname;
    console.log(path);

    const routeActu = path.substring(path.lastIndexOf("/") + 1);
    console.log(routeActu);

    const privateRoutes = ["servicios.html"];
    if(privateRoutes.includes(routeActu) && !verificacion){
        console.log("no tienes permisos");
        window.location.href = "http://127.0.0.1:5502/src/pages/main/html/main.html"
    }
  })();