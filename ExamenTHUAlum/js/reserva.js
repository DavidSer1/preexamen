
let cocheSeleccionadoGlobal = null;    
const urlParams = new URLSearchParams(window.location.search);
const idUrl = urlParams.get('id');
let datoscoche = JSON.parse(localStorage.getItem("cars")) || [];
document.addEventListener("DOMContentLoaded", main);

function main() {
    carregarmodelocochesseleccionat();
    document.getElementById("enviar").addEventListener("click", validar, false);
}

function carregarmodelocochesseleccionat() {


    cocheSeleccionadoGlobal = datoscoche.find(coche => coche.modelo === idUrl);

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

function cocheseleccionat(){
       
    
    cocheSeleccionadoGlobal = datoscoche.find(coche => coche.modelo === idUrl);
    console.log(cocheSeleccionadoGlobal);
    localStorage.setItem("coche", JSON.stringify(cocheSeleccionadoGlobal));
}

function validarnombreApellidos() {
    let element = document.getElementById("nombreApellidos");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Has d'introduir un nombre i cognoms.");
        }
        if (element.validity.patternMismatch) {
            error(element, "El nombre i cognoms ha de ser vàlid.");
        }
        return false;
    }
    return true;
}

function validardni() {
    let element = document.getElementById("dniCifNia");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Has d'introduir un DNI, CIF o NIE.");
        }
        if (element.validity.patternMismatch) {
            error(element, "El DNI, CIF o NIE ha de ser vàlid.");
        }
        return false;
    }
    return true;
}

function validaremail(){
    let element = document.getElementById("email");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Has d'introduir un email.");
        }
        if (element.validity.patternMismatch) {
            error(element, "El email ha de ser vàlid.");
        }
        return false;
    }
    return true;
}

function validartelefono(){
    let element = document.getElementById("telefono");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Has d'introduir un telefono.");
        }
        if (element.validity.patternMismatch) {
            error(element, "El telefono ha de ser vàlid.");
        }
        return false;
    }
    return true;
}

function validarcondicions(){
    let element = document.getElementById("aceptar");
    if (!element.checked) {
        error(element, "Has d'acceptar les condicions.");
        return false;
    }
    return true;
}


function validar(e) {
    esborrarError();

    if (validarnombreApellidos() && validardni() && validaremail() && validartelefono() && validarcondicions() && confirm("Confirma si vols crear el registre?")) {
     afegirreserva();
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}

function afegirreserva(){
    let reserva = {
        nombreApellidos: document.getElementById("nombreApellidos").value,
        dniCifNia: document.getElementById("dniCifNia").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        nota: document.getElementById("nota").value,
   
    };
    let reservas = JSON.parse(localStorage.getItem("cliente")) || [];
    reservas.push(reserva);
    localStorage.setItem("cliente", JSON.stringify(reservas));
    cocheseleccionat()
}
    

function error(element, missatge) {
    const missatgeNode = document.createTextNode(missatge);
    document.getElementById("errorMensaje").appendChild(missatgeNode);
    element.focus();
}

function esborrarError() {
    document.getElementById("errorMensaje").textContent = "";
    const formulari = document.forms[0];
    for (let i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].classList.remove("error");
    }
}

