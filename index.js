//VARIABLES GLOBALES
let dades = JSON.parse(localStorage.getItem("datos")) || [];


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

            localStorage.setItedadesm("datos", JSON.stringify(data));
        });
}

function carregartaula() {
    let agafaid = document.getElementById("contingut");

    dades.forEach(element => {
        console.log("Element de prova :", element);
        let tr = document.createElement("tr");
        tr.setAttribute("id", element.id);
        /*let fechaFormateada = element.fecha.replaceAll("-", "/");*/
        let [year, month, day] = element.fecha.split("-");
        const fechaFormateada = `${day}/${month}/${year}`;
        tr.className = "border-bottom border-light";

        let tdborrar = document.createElement("td");
        tdborrar.className = "py-4 ps-5";
        let botoborrar = document.createElement("button");
        botoborrar.appendChild(document.createTextNode("Borrar"));
        botoborrar.className = "btn btn-outline-danger btn-lg rounded-4 px-4 shadow-sm";
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
        td5.appendChild(document.createTextNode(element.saldo + " €"));

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        agafaid.appendChild(tr);

    });
}

function carregarsaldototal() {
    let agafaid = document.getElementById("contingut");
    let trsaldo = document.createElement("tr");
    let saldo = calcularsaldototal();
    let tdsaldo1 = document.createElement("td");
    let tdsaldo2 = document.createElement("td");
    let tdsaldo3 = document.createElement("td");
    let tdsaldo4 = document.createElement("td");
    let tdsaldo5 = document.createElement("td");
    let tdsaldo6 = document.createElement("td");
    tdsaldo6.className = "py-1 fw-bold text-end pe-3";

    trsaldo.appendChild(tdsaldo1);
    trsaldo.appendChild(tdsaldo2);
    trsaldo.appendChild(tdsaldo3);
    trsaldo.appendChild(tdsaldo4);
    trsaldo.appendChild(tdsaldo5);
    tdsaldo6.appendChild(document.createTextNode("Saldo Total: " + saldo + " €"));
    trsaldo.appendChild(tdsaldo6);
    agafaid.appendChild(trsaldo);

}

function calcularsaldototal() {
    let saldo = 0;
    dades.forEach(element => {
        if (element.dh === "D") {
            saldo += parseFloat(element.importe);
        } else if (element.dh === "H") {
            saldo += parseFloat(element.importe);
        }
    });

    return saldo.toFixed(2);
}

function calcularultimosaldo() {
    let saldo = 0;
    dades.forEach(element => {
        if (element.dh === "D") {
            saldo += parseFloat(element.importe);
        } else if (element.dh === "H") {
            saldo += parseFloat(element.importe);
        }
    });

    return saldo.toFixed(2);
}


function añadirApunte() {

    //let dadesdatosdavid = JSON.parse(localStorage.getItem("datos")) || [];
    let id = (dades.at(-1)?.id || 0) + 1;
    let fecha = document.getElementById("fecha").value;
    let concepto = document.getElementById("concepto").value;
    let dh = document.getElementById("dh").value;
    let importe = document.getElementById("importe").value;
    let saldo = calcularultimosaldo();


    let objApunte = {
        id: id,
        fecha: fecha,
        concepto: concepto,
        dh: dh,
        importe: importe,
        saldo: saldo
    }

    dades.push(objApunte);
    localStorage.setItem("datos", JSON.stringify(dades));

    // afegir un aounte nou a la taula

    // actualitzar el saldo total
    
    // esborrar els camps del formulari
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
