document.addEventListener("DOMContentLoaded", main);
    let agafarmodel = JSON.parse(localStorage.getItem("cocheseleccionat"))
function main(){
carregarcocheseleccionat();
}

function carregarcocheseleccionat() {
    let agafarmodel = JSON.parse(localStorage.getItem("cocheseleccionat"));

    if (agafarmodel) {
   
        const imagen = document.querySelector('#listado .card-img-top');
            imagen.src = "img/" + agafarmodel.img; 
            imagen.alt = agafarmodel.modelo;
        
        const titulo = document.querySelector('#listado .card-title');
   
            const nuevoTextoTitulo = document.createTextNode(agafarmodel.modelo);
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