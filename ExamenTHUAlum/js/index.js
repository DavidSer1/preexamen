document.addEventListener("DOMContentLoaded", main);

function main() {
  if (!localStorage.getItem("coches")) {
    localStorage.setItem("coches", JSON.stringify(data.cars));
  }
  carregarcoches();
}

function carregarcoches() {
  let dadescoche = JSON.parse(localStorage.getItem("coches"));

  dadescoche.forEach((dadescoches) => {
    let idllistat = document.getElementById("listado");
    let cardmostrar = document.createElement("div");
    cardmostrar.className = "card mb-4";
    let linkimatge = document.createElement("a");
    let imatge = document.createElement("img");
    imatge.className = "card-img-top";
    imatge.src = "img/" + dadescoches.img;
    linkimatge.appendChild(imatge);

    cardmostrar.appendChild(linkimatge);
    let divcontingut = document.createElement("div");
    divcontingut.className = "card-body";
    let titol = document.createElement("h2");
    titol.className = "card-title";

    titol.appendChild(document.createTextNode(dadescoches.marca));
    divcontingut.appendChild(titol);

    let divpreu = document.createElement("div");
    divpreu.className = "row justify-content-end";
    let divclasepreu = document.createElement("div");
    divclasepreu.className =
      "p-2 mb-1  col-md-3 offset-md-3 bg-warning rounded text-center";
    let preu = document.createElement("h2");
    preu.className = "font-weight-bold";
    preu.appendChild(document.createTextNode(dadescoches.precio));
    divclasepreu.appendChild(preu);
    divpreu.appendChild(divclasepreu);
    divcontingut.appendChild(divpreu);

    let restacontingut = document.createElement("div");
    restacontingut.className = "row";

    restacontingut.appendChild(titols("Año"));
    restacontingut.appendChild(titols("Kilometros"));
    restacontingut.appendChild(titols("Cambio"));
    restacontingut.appendChild(titols("Combustible"));

    let divsepparador = document.createElement("div");
    divsepparador.className = "w-100";
    restacontingut.appendChild(divsepparador);

    restacontingut.appendChild(resta(dadescoches.anyo));
    restacontingut.appendChild(resta(dadescoches.km));
    restacontingut.appendChild(resta(dadescoches.cambio));
    restacontingut.appendChild(resta(dadescoches.combustible));
    divcontingut.appendChild(restacontingut);
    let botoreservar = document.createElement("a");
    botoreservar.className = "btn btn-primary m-3";
  
    botoreservar.appendChild(document.createTextNode("Reservar"));

botoreservar.href = "./reserva.html";

botoreservar.onclick = function() {
    localStorage.setItem("cocheseleccionat", JSON.stringify(dadescoches));
};
    divcontingut.appendChild(botoreservar);
    cardmostrar.appendChild(divcontingut);
    idllistat.appendChild(cardmostrar);
  });
}

function titols(element) {
  let divs = document.createElement("div");
  divs.className = "col p-3 text-center border-bottom border-dark";
  divs.appendChild(document.createTextNode(element));
  return divs;
}

function resta(element) {
  let divs = document.createElement("div");
  let strongers = document.createElement("strong");
  divs.className = "col p-3 text-center";
  strongers.appendChild(document.createTextNode(element));
  divs.appendChild(strongers);
  return divs;
}
