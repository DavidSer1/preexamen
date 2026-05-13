
let cocheSeleccionadoGlobal = null;

document.addEventListener("DOMContentLoaded", main);

function main() {
    carregarmodelocochesseleccionat();
    
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
        let tituloContainer = document.querySelector(".card-title");
        let textoTitulo = document.createTextNode(cocheSeleccionadoGlobal.marca + " " + cocheSeleccionadoGlobal.modelo);
        tituloContainer.appendChild(textoTitulo);

        let imagen = document.querySelector(".card-img-top");
        imagen.setAttribute("src", "img/" + cocheSeleccionadoGlobal.img);

        let precioContainer = document.querySelector(".font-weight-bold");
        let textoPrecio = document.createTextNode(cocheSeleccionadoGlobal.precio + " €");
        precioContainer.appendChild(textoPrecio);
        

        const detalles = document.querySelectorAll(".card-body .row .col strong");
        if (detalles.length >= 4) {
            detalles[0].appendChild(document.createTextNode(cocheSeleccionadoGlobal.anyo));
            detalles[1].appendChild(document.createTextNode(cocheSeleccionadoGlobal.km));
            detalles[2].appendChild(document.createTextNode(cocheSeleccionadoGlobal.cambio));
            detalles[3].appendChild(document.createTextNode(cocheSeleccionadoGlobal.combustible));
        }
    } else {
        console.log("No se encontró el coche con id:", idUrl);
    }
}
