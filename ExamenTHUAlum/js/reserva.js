// 1. Declaramos la variable fuera para que sea accesible desde cualquier función
let cocheSeleccionadoGlobal = null;

document.addEventListener("DOMContentLoaded", main);

function main() {
    carregarmodelocochesseleccionat();
    
    // Aquí podrías añadir el evento del botón enviar, que ya podrá usar la variable global
    document.getElementById("enviar").addEventListener("click", function(e) {
        e.preventDefault();
     
    });
}

function carregarmodelocochesseleccionat() {
    const urlParams = new URLSearchParams(window.location.search);
    const idUrl = urlParams.get('id');

    let datoscoche = JSON.parse(localStorage.getItem("cars")) || [];
    
    cocheSeleccionadoGlobal = datoscoche.find(coche => coche.modelo === idUrl);
localStorage.setItem("cocheSeleccionado", JSON.stringify(cocheSeleccionadoGlobal));
    if (cocheSeleccionadoGlobal) {
        document.querySelector(".card-title").textContent = cocheSeleccionadoGlobal.marca + " " + cocheSeleccionadoGlobal.modelo;
        document.querySelector(".card-img-top").src = "img/" + cocheSeleccionadoGlobal.img;
        document.querySelector(".font-weight-bold").textContent = cocheSeleccionadoGlobal.precio + " €";
        
        const detalles = document.querySelectorAll(".card-body .row .col strong");
        if (detalles.length >= 4) {
            detalles[0].textContent = cocheSeleccionadoGlobal.anyo;
            detalles[1].textContent = cocheSeleccionadoGlobal.km;
            detalles[2].textContent = cocheSeleccionadoGlobal.cambio;
            detalles[3].textContent = cocheSeleccionadoGlobal.combustible;
        }
    } else {
        console.log("No se encontró el coche con id:", idUrl);
    }
}
