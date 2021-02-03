
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
                  }
                  else{
                    var textoCelda = document.createTextNode("");
                  }
              }
              else{
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
                    textoCelda.innerTe = "hola"
                    textoCelda.setAttribute("href", "#");
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
          // modifica el atributo "border" de la tabla y lo fija a "2";        
  }





