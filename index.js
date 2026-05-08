//VARIABLES GLOBALES
let dades = JSON.parse(localStorage.getItem("datos")) || [];
let saldoTotal = 0;

document.addEventListener("DOMContentLoaded", main);

function main() {
    document.getElementById("afegir").addEventListener("click", validar, false);
    if (!localStorage.getItem("datos")) {
        carregarjson();
    }
    carregartaula();
    carregarsaldototal();
}


function carregarjson() {
    fetch("./data.json")
        .then(res => res.json())
        .then(data => {
            console.log("Data loaded:", data);

            localStorage.setItem("datos", JSON.stringify(data));
        });
}

function carregartaula() {
    
    dades.forEach(ele => {
        console.log("Element de prova :", ele);
        cargarApunte(ele)    

    });
}

const cargarApunte = (element) => {
      let agafaid = document.getElementById("contingut");
      let tr = document.createElement("tr");
        
        /*let fechaFormateada = element.fecha.replaceAll("-", "/");*/
        let [year, month, day] = element.fecha.split("-");
        const fechaFormateada = `${day}/${month}/${year}`;
        tr.className = "border-bottom border-light";

        let tdborrar = document.createElement("td");
        tdborrar.className = "py-4 ps-5";
        let botoborrar = document.createElement("button");
        botoborrar.appendChild(document.createTextNode("Borrar"));
        botoborrar.className = "btn btn-outline-danger btn-lg rounded-4 px-4 shadow-sm";
        botoborrar.addEventListener("click", () => {
eliminarapunte(tr, element.id)
});
   
        tdborrar.appendChild(botoborrar);
        tr.appendChild(tdborrar);

        let td1 = document.createElement("td");
        td1.className = "py-4 text-muted";
        let td2 = document.createElement("td");
        td2.className = "py-4 fw-bold";
        let td3 = document.createElement("td");
        td3.className = "py-4 text-center";
        let td4 = document.createElement("td");
        td4.className = "py-4 text-end fw-bold";
        let td5 = document.createElement("td");
        let td6 = document.createElement("td");

        td6.className = "py-4 text-end fw-bold";

        let saldoClas = "py-4 text-end pe-5 fw-semibold";
        if (element.saldo < 0) {
            saldoClas += " bg-danger text-white rounded-end-4";
        }
        
        td5.className = saldoClas;
        td1.appendChild(document.createTextNode(fechaFormateada));
        td2.appendChild(document.createTextNode(element.concepto));
        td3.appendChild(document.createTextNode(element.dh));
        td4.appendChild(document.createTextNode(element.importe + " €"));
        td5.appendChild(document.createTextNode(calcularsaldototal(element) + " €"));

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        agafaid.appendChild(tr);
}

function carregarsaldototal() {
    let saldo = document.getElementById("saldo"); 
    let trsaldo = document.createElement("tr");
    let tdsaldo = document.createElement("td");
    tdsaldo.setAttribute("colspan","6");
    tdsaldo.className = "py-1 fw-bold text-end pe-3";
    trsaldo.appendChild(tdsaldo);
    tdsaldo.appendChild(document.createTextNode("Saldo Total: " + saldoTotal.toFixed(2) + " €"));
    saldo.appendChild(trsaldo);
}


function calcularsaldototal(ele) {
        if (ele.dh === "D") {
            saldoTotal -= parseFloat(ele.importe);
        } else {
            saldoTotal += parseFloat(ele.importe);
        }

    return saldoTotal.toFixed(2);
}


function añadirApunte() {

    let id = (dades.at(-1)?.id || 0) + 1;
    let fecha = document.getElementById("fecha").value;
    let concepto = document.getElementById("concepto").value;
    let dh = document.getElementById("dh").value;
    let importe = document.getElementById("importe").value;


    let objApunte = {
        id: id,
        fecha: fecha,
        concepto: concepto,
        dh: dh,
        importe: importe
     
    }

    dades.push(objApunte);
    localStorage.setItem("datos", JSON.stringify(dades));

    // Afegir un nou apunt
    cargarApunte(objApunte); 
    // Actualitzar el saldo total
    carregarsaldototal();
    // Esborrar els camps del formulari
    document.getElementsByTagName("form")[0].reset();
    //carregartaula();
    
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

function eliminarapunte(tr, id) {
if(confirm("Estas seguro de que quieres eliminar este apunte?")){
    let lista =  dades.filter(dades => dades.id !== id);
    localStorage.setItem("datos", JSON.stringify(lista));
tr.remove();

}
    console.log(tr);
    console.log(id);
}
