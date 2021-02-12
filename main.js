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

genera_tabla();

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

    generar_add_event_listener_modifcar();

    generar_add_event_listener_eliminar();

    var nou_personatge = document.getElementById("nou_personatge");

    nou_personatge.addEventListener("click", crear_nou_personatge);
}


function crear_nou_personatge(){

    buidar_taula();

    crear_formulari();

}

function crear_formulari(){

    let crear_div = document.createElement("div");

    let div = document.getElementById("Nou_personatge")

    div.appendChild(crear_div);

    for(i=1; i<id_JSON.length; i++){

        let p = document.createElement("p");
        p.appendChild(document.createTextNode(id_JSON[i].toUpperCase()));
        crear_div.appendChild(p);

        let input = document.createElement("input");
        crear_div.appendChild(input);
    }
    let br = document.createElement("br");
    let br2 = document.createElement("br");
    crear_div.appendChild(br);
    crear_div.appendChild(br2);
    
    let boto = document.createElement("button");
    boto.appendChild(document.createTextNode("Acceptar"));
    boto.setAttribute("id", "Acceptar");
    crear_div.appendChild(boto);

    boto.addEventListener("click", acceptar_personatge);

    let boto2 = document.createElement("button");
    boto2.appendChild(document.createTextNode("Cancelar"));
    boto2.setAttribute("id", "Cancelar");
    crear_div.appendChild(boto2);

    boto2.addEventListener("click", cancelar_personatge);
}

function acceptar_personatge(){
    let nom = document.getElementsByTagName("input")[0].value;
    let cognom = document.getElementsByTagName("input")[1].value;
    let edat = document.getElementsByTagName("input")[2].value;
    
    buidar_personatge();
    genera_tabla();

    let nou_registre = document.getElementsByTagName("tbody")[0];
    let hilera = document.createElement("tr");
    for(i=0; i<id_JSON.length + 2; i++)
    {
        let celda = document.createElement("td");
        switch (i) {
            case 0:
                var textoCelda = document.createTextNode("3");
            break;

            case 1:
                var textoCelda = document.createTextNode(nom);
            break;

            case 2:
                var textoCelda = document.createTextNode(cognom);
            break;

            case 3:
                var textoCelda = document.createTextNode(edat);
            break;

            case 4:
                var textoCelda = document.createTextNode("imatge");
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
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
    }
    nou_registre.appendChild(hilera);
}


function cancelar_personatge(){

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
  let personatge = e.target.parentNode.parentNode.firstChild.firstChild;

  console.log(personatge)

  for(i = 0; i< tamany; i++){
      console.log(personatges[i].id == personatge)
      if (personatges[i].id == personatge){
          console.log("venggaaaaaa")
          personatges.splice(i,i)
          console.log(personatges);
      }
  }
    //personatge.parentNode.removeChild(personatge);
}

function modificar_personatge() {
    buidar_taula();

    crear_formulari();

}

function buidar_taula() {

    let tabla = document.getElementsByTagName("div")[0].firstChild;
    let boton = document.getElementById("nou_personatge");
    boton.parentNode.removeChild(boton);
    tabla.parentNode.removeChild(tabla);

}

function buidar_personatge() {
    let div = document.getElementById("Nou_personatge").firstChild;
    div.parentNode.removeChild(div);

}
