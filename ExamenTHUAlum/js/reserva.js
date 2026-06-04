document.addEventListener("DOMContentLoaded", main);
    let agafarmodel = JSON.parse(localStorage.getItem("cocheseleccionat"))
function main(){
carregarcocheseleccionat();
document.getElementById("enviar").addEventListener("click", validar, false);
}

function carregarcocheseleccionat() {

    if (agafarmodel) {
   
        const imagen = document.querySelector('#listado .card-img-top');
            imagen.src = "img/" + agafarmodel.img; 
        
        const titulo = document.querySelector('#listado .card-title');
   
            const nuevoTextoTitulo = document.createTextNode(agafarmodel.marca + "   " + agafarmodel.modelo);
            titulo.replaceChildren(nuevoTextoTitulo);
        

        // 3. Precio (h2 con fondo amarillo)
        const precio = document.querySelector('#listado .font-weight-bold');
     
            const nuevoTextoPrecio = document.createTextNode(agafarmodel.precio + " €");
            precio.replaceChildren(nuevoTextoPrecio);
        
        const especificaciones = document.querySelectorAll('#listado strong');

        if (especificaciones.length) {
           especificaciones[0].appendChild(document.createTextNode(agafarmodel.anyo));
            especificaciones[1].appendChild(document.createTextNode(agafarmodel.km));
            especificaciones[2].appendChild(document.createTextNode(agafarmodel.cambio));
            especificaciones[3].appendChild(document.createTextNode(agafarmodel.combustible));
        }
    }
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

function   afegirreserva(){
    
}

function validarnombreApellidos(){
    let element = document.getElementById("nombreApellidos");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Has d'introduir un nombre.");
        }
        if (element.validity.patternMismatch) {
            error(element, "El telefono ha de ser vàlid.");
        }
        return false;
    }
    return true;
}

function validardni(){
    let element = document.getElementById("dniCifNia");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Has d'introduir un dni.");
        }
        if (element.validity.patternMismatch) {
            error(element, "El dni ha de ser vàlid.");
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