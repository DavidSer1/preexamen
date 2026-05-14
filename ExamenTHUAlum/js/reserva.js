
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

function validarfecha() {
    let element = document.getElementById("fecha");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Has d'introduir una data.");
        }
        if (element.validity.patternMismatch) {
            error(element, "La data ha de ser vàlida.");
        }
        return false;
    }
    return true;
}

function validarconcepto() {
    let element = document.getElementById("concepto");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Has d'introduir un concepto.");
        }
        if (element.validity.patternMismatch) {
            error(element, "El concepto ha de ser vàlid.");
        }
        return false;
    }
    return true;
}


function validardh() {
    let element = document.getElementById("dh");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Has d'introduir un valor.");
        }
        if (element.validity.patternMismatch) {
            error(element, "El valor ha de ser 'D' o 'H'.");
        }
        return false;
    }
    return true;
}

function validarimporte() {
    let element = document.getElementById("importe");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Has d'introduir un importe.");
        }
        if (element.validity.patternMismatch) {
            error(element, "El importe ha de ser un número válido.");
        }
        return false;
    }
    return true;
}


function validar(e) {
    esborrarError();

    if (validarfecha() && validarconcepto() && validardh() && validarimporte()  && confirm("Confirma si vols crear el registre?")) {
        añadirApunte();
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}

function error(element, missatge) {
    const missatgeNode = document.createTextNode(missatge);
    document.getElementById("missatgeError").appendChild(missatgeNode);
    element.classList.add("error");
    element.focus();
}

function esborrarError() {
    document.getElementById("missatgeError").textContent = "";
    const formulari = document.forms[0];
    for (let i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].classList.remove("error");
    }
}

