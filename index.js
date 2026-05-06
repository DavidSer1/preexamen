document.addEventListener("DOMContentLoaded", main);

function main() {
 //loadData();
 carregartaula();
}

function loadData() {
fetch("./data.json")
  .then(res => res.json())
  .then(data => {
    console.log("Data loaded:", data);
    localStorage.setItem("datos", JSON.stringify(data));
  });
}

function carregartaula() {  
    let agafaid = document.getElementById("contingut");

    let agafar = JSON.parse(localStorage.getItem("datos"));
    
    agafar.forEach(element => {
      console.log("Element de prova :", element);
       let tr = document.createElement("tr");
       let tdborrar= document.createElement("td");
       let botoborrar = document.createElement("button");
       botoborrar.appendChild(document.createTextNode("Borrar"));
       botoborrar.className = "bg-danger py-2 px-1 rounded border-4 border-primary text-white";
       tdborrar.appendChild(botoborrar);
       tr.appendChild(tdborrar);
 
    let td1= document.createElement("td");
    let td2= document.createElement("td");
    let td3= document.createElement("td");
    let td4= document.createElement("td");
    let td5= document.createElement("td");

       td1.appendChild(document.createTextNode(element.fecha));
      
        td2.appendChild(document.createTextNode(element.concepto));
     
        td3.appendChild(document.createTextNode(element.dh));

        td4.appendChild(document.createTextNode(element.importe));

        td5.appendChild(document.createTextNode(element.saldo));
       tr.appendChild(td1);
       tr.appendChild(td2);
       tr.appendChild(td3);
       tr.appendChild(td4);
       tr.appendChild(td5);
     agafaid.appendChild(tr);
    }); 
      
}  