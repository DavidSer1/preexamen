document.addEventListener("DOMContentLoaded", main);

function main() {
loadData();
}

function loadData() {
fetch("./data.json")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    localStorage.setItem("datos", JSON.stringify(data));
  });
}

function carregartaula() {  
    let agafaid = document.getElementById("contingut");
    let tr = document.createElement("tr");
    let td= document.createElement("td");
    let agafar = JSON.parse(localStorage.getItem("datos"));
    for (const element of agafar) {
       let info1 = element["data"];
       td.appendChild(document.createTextNode(info1));
       let info2 = element["descripcio"];
        td.appendChild(document.createTextNode(info2));
       let info3 = element["import"];
        td.appendChild(document.createTextNode(info3));
 let info4= element["import"];
        td.appendChild(document.createTextNode(info4));
  let info5= element["import"];
        td.appendChild(document.createTextNode(info5));
       tr.appendChild(td);
     agafaid.appendChild(tr);
    }
      
}  