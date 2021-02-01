
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

function genera_tabla() {

    
        // Obtener la referencia del elemento body
    var div = document.getElementsByTagName("div")[0];
  
    // Crea un elemento <table> y un elemento <tbody>
    var tabla   = document.createElement("table");
    var tblBody = document.createElement("tbody");
  
    // Crea las celdas
    
        console.log("aqui estamos")
        for (var i = 0; i <= tamany; i++) {
            // Crea las hileras de la tabla
            var hilera = document.createElement("tr");
        
            for (var j = 0; j < id_JSON.length; j++) {
              // Crea un elemento <td> y un nodo de texto, haz que el nodo de
              // texto sea el contenido de <td>, ubica el elemento <td> al final
              // de la hilera de la tabla
              var celda = document.createElement("td");
              if(i == 0){
                  var textoCelda = document.createTextNode(id_JSON[j]);
              }
              else{
                  console.log(i);
                  var textoCelda = document.createTextNode(personatges[0].id);
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
          // modifica el atributo "border" de la tabla y lo fija a "2";        
  }




