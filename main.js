var personatges = [
    {
        id: 1,
        nom: "Selena",
        cognom: "Catena",
        edat: 21,
        imatge: "imagenes/Monigote.jpeg"
    }, 

    {
        id: 2,
        nom: "Gerard",
        cognom: "Martinez",
        edat: 150,
        imatge: "imagenes/Monigo.png" 
    }
    
]

let id_JSON = Object.keys(personatges[0]); //guardem en un array els id dels objectes JASON

let tamany = personatges.length; //guardem la quantitat d'objectes JSON que conte l'array


genera_tabla();

generar_add_event_listener_modifcar();

generar_add_event_listener_eliminar();

var nou_personatge = document.getElementById("nou_personatge");
nou_personatge.addEventListener("click", crear_nou_personatge);












function generar_add_event_listener_modifcar(){
    let b = document.getElementsByClassName("modificar");

for(i=0; i<b.length; i++){

    b[i].addEventListener("click", function(){
        alert("Modificar");
    })
}
}

function generar_add_event_listener_eliminar(){
    let a = document.getElementsByClassName("eliminar");

for(i=0; i<a.length; i++){

    a[i].addEventListener("click", function(){
        alert("Eliminar");
    })
}
}




