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
  
  let tamany = personatges.length; //guardem la quantitat d'objectes JSON que conte l'array
  
  genera_tabla();
  
  
  
  function genera_tabla() {
    // Obtener la referencia del elemento body
    var div = document.getElementsByTagName("div")[0];
  
    // Crea un elemento <table> y un elemento <tbody>
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
  
    // Crea las celdas
    for (var i = 0; i <= tamany; i++) {
      // Crea las hileras de la tabla
      var hilera = document.createElement("tr");
  
      if (i == 0) {
        for (let propiedad in personatges[i]) {
          var celda = document.createElement("td");
  
          var textoCelda = document.createTextNode(propiedad);
          celda.appendChild(textoCelda);
          hilera.appendChild(celda);
        }
      } else {
        for (let propiedad in personatges[i - 1]) {
          if(propiedad == "imatge"){
  
              var celda = document.createElement("td");
              var textoCelda = document.createElement("img");
              textoCelda.setAttribute("src", personatges[i-1][propiedad] );
              textoCelda.setAttribute("width", "50");
              textoCelda.setAttribute("height", "50");
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
  
              var celda = document.createElement("td");
              var textoCelda = document.createElement("a");
              textoCelda.appendChild(document.createTextNode("Eliminar"));
              textoCelda.setAttribute("class", "eliminar")
  
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
  
              var celda = document.createElement("td");
              var textoCelda = document.createElement("a");
              textoCelda.appendChild(document.createTextNode("Modificar"));
              textoCelda.setAttribute("class", "modificar")
  
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
          }
          else{
              var celda = document.createElement("td");
  
              var textoCelda = document.createTextNode(personatges[i - 1][propiedad]);
          }
  
  
          celda.appendChild(textoCelda);
          hilera.appendChild(celda);
        }
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
  
    function modificar_personatge(e) {
      buidar_taula();
      let id = parseInt(e.target.parentNode.parentNode.firstChild.innerText);
  
      //for (let propiedad in personatges[]
  
      console.log(e.target.parentNode.parentNode.firstChild.innerText)
      crear_formulari(posicio);
  
  }
  
  function buidar_taula() {
  
      let tabla = document.getElementsByTagName("div")[0].firstChild;
      let boton = document.getElementById("nou_personatge");
      boton.parentNode.removeChild(boton);
      tabla.parentNode.removeChild(tabla);
  
  }
  
  function eliminar_personatge(e){
      let personatge = e.target.parentNode.parentNode.firstChild.innerText;
    
    
      console.log(personatge)
    
      for(i = 0; i< tamany; i++){
          console.log(personatges[i].id == personatge)
          if (personatges[i].id == personatge){
              console.log("venggaaaaaa")
              personatges.splice(i,i)
              console.log(personatges);
              
          }
      }
     // personatge.parentNode.removeChild(personatge);
     buidar_taula();
     genera_tabla();
    }
  
    function crear_formulari(posicio){
  
      let crear_div = document.createElement("div");
  
      let div = document.getElementById("Nou_personatge")
  
      div.appendChild(crear_div);
  
  
      for (let propiedad in personatges[posicio]){
          let p = document.createElement("p");
          p.appendChild(document.createTextNode(propiedad.toUpperCase()));
  
          crear_div.appendChild(p);
  
          let input = document.createElement("input");
          crear_div.appendChild(input);
  
          let text = document.personatges[posicio].propiedad
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
  