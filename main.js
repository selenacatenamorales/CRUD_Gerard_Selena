var personatges = [
  {
    id: 1,
    nom: "Selena",
    cognom: "Catena",
    edat: 21,
    imatge: "imagenes/Monigote.jpeg",
  },

  {
    id: 2,
    nom: "Gerard",
    cognom: "Martinez",
    edat: 150,
    imatge: "imagenes/Monigo.png",
  },
];

let id_JSON = Object.keys(personatges[0]); //guardem en un array els id dels objectes JASON

let tamany = personatges.length; //guardem la quantitat d'objectes JSON que conte l'array

function genera_tabla() {

    // Obtener la referencia del elemento body
    var div = document.getElementsByTagName("div")[0];

    // Crea un elemento <table> y un elemento <tbody>
    var tabla   = document.createElement("table");
    var tblBody = document.createElement("tbody");

    // Crea las celdas
    for (var i = 0; i <= tamany; i++) {
        // Crea las hileras de la tabla
        var hilera = document.createElement("tr");

        for (var j = 0; j < id_JSON.length + 2; j++) {
            // Crea un elemento <td> y un nodo de texto, haz que el nodo de
            // texto sea el contenido de <td>, ubica el elemento <td> al final
            // de la hilera de la tabla

            var celda = document.createElement("td");
            if(i == 0){
                if(j<id_JSON.length){
                    var textoCelda = document.createTextNode(id_JSON[j]);

                } else {
                var textoCelda = document.createTextNode("");

                }
            } else {
                switch (j) {
                    case 0:
                        var textoCelda = document.createTextNode(personatges[i-1].id);
                    break;

                    case 1:
                        var textoCelda = document.createTextNode(personatges[i-1].nom);
                    break;

                    case 2:
                        var textoCelda = document.createTextNode(personatges[i-1].cognom);
                    break;

                    case 3:
                        var textoCelda = document.createTextNode(personatges[i-1].edat);
                    break;

                    case 4:
                        var textoCelda = document.createElement("img");
                        textoCelda.setAttribute("src", personatges[i-1].imatge );
                        textoCelda.setAttribute("width", "50");
                        textoCelda.setAttribute("height", "50");
                    break;

                    case 5:
                        var textoCelda = document.createElement("a");
                        textoCelda.appendChild(document.createTextNode("Eliminar"));
                        textoCelda.setAttribute("class", "eliminar")

                    break;

                    case 6:
                        var textoCelda = document.createElement("a");
                            textoCelda.appendChild(document.createTextNode("Modificar"));
                            textoCelda.setAttribute("class", "modificar")

                    break;
                }
            }

            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }

        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
    }

    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    div.appendChild(tabla);
    var boto = document.createElement("button");
    boto.appendChild(document.createTextNode("Nou Personatge"));
    boto.setAttribute("id", "nou_personatge");
    div.appendChild(boto);
    // modifica el atributo "border" de la tabla y lo fija a "2";
}


genera_tabla();

generar_add_event_listener_modifcar();

generar_add_event_listener_eliminar();

var nou_personatge = document.getElementById("nou_personatge");
nou_personatge.addEventListener("click", crear_nou_personatge);

function crear_nou_personatge(){

    buidar_taula();

    var master = document.getElementById("Nou_personatge");

    //text nom personatge
    //etiqueta nom personatge

    //text cognom personatge
    //etiqueta cognom personatge

    //text edat personatge
    //etiqueta edat personatge

    //get file from system (imatge default)

    //boto guardar
    //boto cancel·lar

}

function generar_add_event_listener_modifcar() {
  let b = document.getElementsByClassName("modificar");

  for (i = 0; i < b.length; i++) {
    b[i].addEventListener("click", modificar_personatge);
  }
}

function generar_add_event_listener_eliminar() {
  let a = document.getElementsByClassName("eliminar");

  for (i = 0; i < a.length; i++) {
    a[i].addEventListener("click", eliminar_personatge);
  }
}

function eliminar_personatge(e){
    let personatge = e.target.parentNode.parentNode;
    personatge.parentNode.removeChild(personatge);
}

function modificar_personatge() {
    buidar_taula();
}

function buidar_taula() {

    let tabla = document.getElementsByTagName("div")[0].firstChild;
    let boton = document.getElementById("nou_personatge");
    boton.parentNode.removeChild(boton);
    tabla.parentNode.removeChild(tabla);

}
