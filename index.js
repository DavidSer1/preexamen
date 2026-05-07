document.addEventListener("DOMContentLoaded", main);

function main() {
 document.getElementById("afegir").addEventListener("click", validar , false);
 carregarjson();
 carregartaula();
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
    let agafaid = document.getElementById("contingut");

    let agafar = JSON.parse(localStorage.getItem("datos")) || [];
    
    agafar.forEach(element => {
      console.log("Element de prova :", element);
       let tr = document.createElement("tr");
       tr.className = "border-bottom border-light";
       
       let tdborrar= document.createElement("td");
       tdborrar.className = "py-4 ps-5";
       let botoborrar = document.createElement("button");
       botoborrar.appendChild(document.createTextNode("Borrar"));
       botoborrar.className = "btn btn-outline-danger btn-lg rounded-4 px-4 shadow-sm";
       tdborrar.appendChild(botoborrar);
       tr.appendChild(tdborrar);
 
    let td1= document.createElement("td");
    td1.className = "py-4 text-muted";
    let td2= document.createElement("td");
    td2.className = "py-4 fw-bold";
    let td3= document.createElement("td");
    td3.className = "py-4 text-center";
    let td4= document.createElement("td");
    td4.className = "py-4 text-end fw-bold";
    let td5= document.createElement("td");
    
    let saldoClas = "py-4 text-end pe-5 fw-semibold";
    if (element.saldo < 0) {
        saldoClas += " bg-danger text-white rounded-end-4";
    }
    td5.className = saldoClas;

       td1.appendChild(document.createTextNode(element.fecha));
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

function añadirlibro() { 
let agafardatosdavid = JSON.parse(localStorage.getItem("datos")) || [];
let fecha = document.getElementById("fecha").value;
let concepto = document.getElementById("concepto").value;
let dh = document.getElementById("dh").value;
let importe = document.getElementById("importe").value;
let saldo = document.getElementById("saldo").value;

let datos= {
  fecha: fecha,
  concepto: concepto,
  dh: dh,
  importe: importe,
  saldo: saldo
}

agafardatosdavid.push(datos);
localStorage.setItem("datos", JSON.stringify(agafardatosdavid));

carregartaula();
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

function validar(e) {
    esborrarError();

    if (validarfecha() && confirm("Confirma si vols crear el registre?")) {
añadirlibro();
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
  