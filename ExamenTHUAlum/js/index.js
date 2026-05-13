

document.addEventListener("DOMContentLoaded", main);

function main() {
    if(!localStorage.getItem("cars")){
     carregardadadeslocalstorage();
    }
        carregarCoches();
}

function carregarCoches() {
 let datoscoche = JSON.parse(localStorage.getItem("cars")) || [];

datoscoche.forEach(coche => {
    let llistatcoches = document.getElementById("listado");
    let cardprincipal = document.createElement("div");
  
    cardprincipal.className = "card mb-4";
    let image = document.createElement("a");
    let linkcoche = document.createElement("img");
    linkcoche.className = "card-img-top";
    linkcoche.src = "img/"+coche.img;
    image.appendChild(linkcoche);
    let imfochecard = document.createElement("div");
    imfochecard.className = "card-body";
    let titolcoche = document.createElement("h2");
    titolcoche.className = "card-title ";
    let texttitolcoche = document.createTextNode(coche.marca + " " + coche.modelo);
    titolcoche.appendChild(texttitolcoche);
    let rowpreu = document.createElement("div");
    rowpreu.className = "row justify-content-end";
    let divenglobapreu = document.createElement("div");
    divenglobapreu.className = "p-2 mb-1  col-md-3 offset-md-3 bg-warning rounded text-center";
    let preucoche = document.createElement("h2");
    let preucochetext = document.createTextNode(coche.precio + " €");
    preucoche.appendChild(preucochetext);
    preucoche.className = "font-weight-bold";
    divenglobapreu.appendChild(preucoche);
    rowpreu.appendChild(divenglobapreu);
    imfochecard.appendChild(titolcoche);
    imfochecard.appendChild(rowpreu);
    cardprincipal.appendChild(image);
    cardprincipal.appendChild(imfochecard);

    let parametrescoche = document.createElement("div");
    parametrescoche.className = "row";

    let thany = donarthcoche("Año");
    let thkilometros = donarthcoche("Kilometros");
    let thcambio = donarthcoche("Cambio");
    let thcombustible = donarthcoche("Combustible");
    let hueco = document.createElement("div");
    hueco.className = "w-100";
    parametrescoche.appendChild(thany);
    parametrescoche.appendChild(thkilometros);
    parametrescoche.appendChild(thcambio);
    parametrescoche.appendChild(thcombustible);
    parametrescoche.appendChild(hueco);
    let tdany = tornardadescoche(coche.anyo);
    let tdkilometros = tornardadescoche(coche.km);
    let tdcambio = tornardadescoche(coche.cambio);
    let tdcombustible = tornardadescoche(coche.combustible);
    parametrescoche.appendChild(tdany);
    parametrescoche.appendChild(tdkilometros);
    parametrescoche.appendChild(tdcambio);
    parametrescoche.appendChild(tdcombustible);
    let linkreservar = document.createElement("a");
    linkreservar.classList.add("btn", "btn-primary", "m-3");
    linkreservar.href = "./reserva.html?id="+coche.modelo;
    linkreservar.appendChild(document.createTextNode("Reservar"));

    imfochecard.appendChild(parametrescoche);
    imfochecard.appendChild(linkreservar);

    llistatcoches.appendChild(cardprincipal);
});
}

function donarthcoche(contingut) {
    let th = document.createElement("div");
    th.className = "col p-3 text-center border-bottom border-dark"
    th.appendChild(document.createTextNode(contingut));
    return th;
}

function tornardadescoche(contingut) {
    let td = document.createElement("div");
    td.className = "col p-3 text-center";
    td.appendChild(document.createTextNode(contingut));
    return td;
} 

function carregardadadeslocalstorage(){
   if (!localStorage.getItem("cars")) {
    console.log(data.cars);
    localStorage.setItem("cars", JSON.stringify(data.cars));
  }
}
