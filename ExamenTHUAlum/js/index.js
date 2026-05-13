

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
  
    cardprincipal.class = "card mb-4";
    let image = document.createElement("a");
    let linkcoche = document.createElement("img");
    linkcoche.class = "card-img-top";
    linkcoche.src = "";
    image.appendChild(linkcoche);
    let imfochecard = document.createElement("div");
    imfochecard.class = "card-body";
    let titolcoche = document.createElement("h2");
    titolcoche.class = "card-title ";
    let rowpreu = document.createElement("div");
    rowpreu.class = "row justify-content-end";
    let divenglobapreu = document.createElement("div");
    divenglobapreu.class = "p-2 mb-1  col-md-3 offset-md-3 bg-warning rounded text-center";
    let preucoche = document.createElement("h2");
    preucoche.class = "font-weight-bold";
    divenglobapreu.appendChild(preucoche);
    rowpreu.appendChild(divenglobapreu);
    imfochecard.appendChild(titolcoche);
    imfochecard.appendChild(rowpreu);
    cardprincipal.appendChild(image);
    cardprincipal.appendChild(imfochecard);

    let parametrescoche = document.createElement("div");
    parametrescoche.class = "row";

    let thany = donarthcoche("Año");
    let thkilometros = donarthcoche("Kilometros");
    let thcambio = donarthcoche("Cambio");
    let thcombustible = donarthcoche("Combustible");
    let hueco = document.createElement("div");
    hueco.class = "w-100";
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
    linkreservar.href = "#";
    linkreservar.appendChild(document.createTextNode("Reservar"));

    imfochecard.appendChild(parametrescoche);
    imfochecard.appendChild(linkreservar);

    llistatcoches.appendChild(cardprincipal);
});
}

function donarthcoche(contingut) {
    let th = document.createElement("div");
    th.class = "col p-3 text-center border-bottom border-dark"
    th.appendChild(document.createTextNode(contingut));
    return th;
}

function tornardadescoche(contingut) {
    let td = document.createElement("div");
    td.class = "col p-3";
    td.appendChild(document.createTextNode(contingut));
    return td;
} 

function carregardadadeslocalstorage(){
   if (!localStorage.getItem("cars")) {
    console.log(data.cars);
    localStorage.setItem("cars", JSON.stringify(data.cars));
  }
}
