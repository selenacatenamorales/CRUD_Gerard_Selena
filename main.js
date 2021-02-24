//Array JSON amb les dades inicials
var personatges = [
  {
    id: 1,
    nom: "Vanessa",
    cognom: "Enoteca",
    edat: 24,
    magia: "Otros",
    caracteristiques: "Timido-Feroz",
    imatge: "imagenes/vanessa.jpg",
  },

  {
    id: 2,
    nom: "Yami",
    cognom: "Sukehiro",
    edat: 28,
    magia: "Agua",
    caracteristiques: "Valiente",
    imatge: "imagenes/yami.jpg",
  },
];

//Expressió que valida la edat. Permet fins a un maxim de 3 digits
var solo_num = new RegExp("^[0-9]{1,3}$");

//Expressió que valida el nom dels personats. Aquesta expressió t'obliga a posar la primer lletra en majuscules i l'altre en minuscules
var solo_letra = new RegExp("^[A-Z][a-z]*$");

//Array on guardarem les claus dels objectes JSON
var id_personatges = [];

//For per agafar totes les claus dels objectes JSON. Utilitzarem la funció push, on incluim al final de l'array la propietat.
for (propiedad in personatges[0]) {
  id_personatges.push(propiedad);
}

//guardem en una variable l'id del ultim personatge de l'array JSON
var contador = personatges[personatges.length - 1].id;

//variable on guardarem l'id del persontage que hem de modificar
var posicio_global = 0;

//cridem a la funcio per generar la taula
genera_tabla();

function genera_tabla() {
  // Obtener la referencia del elemento body
  var div = document.getElementsByTagName("div")[0];

  // Crea un elemento <table> y un elemento <tbody>
  var tabla = document.createElement("table");
  var tblBody = document.createElement("tbody");

  // Crea les files
  for (var i = 0; i <= personatges.length; i++) {
    // Crea les celes de la fila
    var hilera = document.createElement("tr");

      if (i != 0){
          hilera.setAttribute("class", "defTr");
      }

    //comprovem si estem en la primera
    if (i == 0) {
      //si es aixi, el que fem es indicar les claus dels objectes JSON
      for (let propiedad in personatges[i]) {
        var celda = document.createElement("th");

        var textoCelda = document.createTextNode(propiedad.toUpperCase());
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
      }
    } else {
      //si no estem en la primera fila, comencem a intruidir les dades de cada paersoantge
      for (let propiedad in personatges[i - 1]) {
        if (propiedad == "imatge") {
          //si la propietat correspon a la imatge, el que fem es crear un camp de imatge i li assignem
          //el src, el qual esta guardat en un string
          var celda = document.createElement("td");
          var textoCelda = document.createElement("img");
          textoCelda.setAttribute("src", personatges[i - 1][propiedad]);
            textoCelda.setAttribute("class", "classImg");
          textoCelda.setAttribute("width", "75");
          textoCelda.setAttribute("height", "75");
          celda.appendChild(textoCelda);
          hilera.appendChild(celda);

          //creem tambe els enllaços de eliminar
          var celda = document.createElement("td");
          var textoCelda = document.createElement("a");
          textoCelda.appendChild(document.createTextNode("Eliminar"));
          textoCelda.setAttribute("class", "eliminar");

          celda.appendChild(textoCelda);
          hilera.appendChild(celda);

          //creem tambe els enllaços de modificar
          var celda = document.createElement("td");
          var textoCelda = document.createElement("a");
          textoCelda.appendChild(document.createTextNode("Modificar"));
          textoCelda.setAttribute("class", "modificar");

          celda.appendChild(textoCelda);
          hilera.appendChild(celda);
        } else {
          //la resta de celes son nomes td amb la informació que esta guardad en l'objecte JSON
          var celda = document.createElement("td");

          var textoCelda = document.createTextNode(
            personatges[i - 1][propiedad]
          );
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

  //creem el boto a sota de la taula que ens servirà per crear un nou personatge
  var boto = document.createElement("button");
  boto.appendChild(document.createTextNode("Nou Personatge"));
  boto.setAttribute("id", "nou_personatge");
    boto.setAttribute("class", "lc");
  div.appendChild(boto);

  //funcio que serveix per afegir a cada boto de modificar el seu event de click
  generar_add_event_listener_modifcar();

  //funcio que serveix per afegir a cada boto de modificar el seu event de click
  generar_add_event_listener_eliminar();

  var nou_personatge = document.getElementById("nou_personatge");

  //afegim un event de click al boto de crear nou personatge
  nou_personatge.addEventListener("click", crear_nou_personatge);

    set_eliminar_imatge();
    document.getElementById("Taula").classList.add("Taula");
    document.getElementById("Nou_personatge").classList.remove("nou_personatge");
    document.getElementById("Actualitza").classList.remove("actualitza");

}

function generar_add_event_listener_modifcar() {
  //guardem en un array tots els elements que son de classe modificar
  let b = document.getElementsByClassName("modificar");

  for (i = 0; i < b.length; i++) { //per cada element de l'array li assignem un event de click
    b[i].addEventListener("click", modificar_personatge);
  }
}

function generar_add_event_listener_eliminar() {
  //guardem en un array tots els elements que son de classe eliminar
  let a = document.getElementsByClassName("eliminar");

  for (i = 0; i < a.length; i++) { //per cada element de l'array li assignem un event de click
    a[i].addEventListener("click", eliminar_personatge);
  }
}

function modificar_personatge(e) {

  buidar_taula(); //primer de tot buidem el primer div on tenem situada la taula
  posicio_global = aconseguir_posicio(e); //assignem a la variable global la posicio en la que ens trobem 
  
  crear_formulari_modificar(posicio_global); //cridem a la funcio que ens cree el formulari per modificar, on li passem la posicio en la que ens trobem
}


//a partir del event i de la id, busquem la poscio del personatge que hem de modifcar. Primerament busquem el id 
  //del personatge que anem a modificar i seguidament l'anem comparant amb tots els persontages de l'array per saber la seva posicio
function aconseguir_posicio(e){
  let posicio = 0;
  for(let i =0; i<personatges.length; i++){
    if(parseInt(e.target.parentNode.parentNode.firstChild.innerText) == personatges[i].id){
      posicio = i;
    }
  }
  return posicio;
}


function buidar_taula() { //funcio que ens serveix per buidar el primer div on tenim emmagatzemada la taula
  let tabla = document.getElementsByTagName("div")[0].firstChild;
  let boton = document.getElementById("nou_personatge");
  boton.parentNode.removeChild(boton);
  tabla.parentNode.removeChild(tabla);
    document.getElementById("Taula").classList.remove("Taula");
    document.getElementById("Taula").classList.remove("actualitza");
    document.getElementById("Nou_personatge").classList.add("nou_personatge");

    document.addEventListener("keydown", function(event){
        if (event.key == "Escape"){
            cancelar_personatge();
        }
    });

}

function sin_registros(div){ //funcion que nos muestra por pantalla unt exto cuando no tenemos personajes en el array
    var p = document.createElement("p");
    var texto = document.createTextNode(
      "Ens hem quedat sense cap registre per mostrar, perque no proves a crear un nou personatge"
    );
    p.appendChild(texto);
    div.appendChild(p);
}

function eliminar_personatge(e) { //funcio per eliminar un personatge de la taula

    let pregunta = confirm("Estas segur que vols eliminar aquest personatge?");

    if (pregunta){

        let posicio = 0;
        posicio = aconseguir_posicio(e); //en aquets part del codi aconseguim la posicio en la que estem

        personatges.splice(posicio, 1); //eliminem el personatge de la posicio seleccionada

        buidar_taula();
        if (personatges.length==0) { //comprovem si no tenim cap persontage a l'array
        let div = document.getElementsByTagName("div")[0]; //
        sin_registros(div);

        var boto = document.createElement("button");
        boto.appendChild(document.createTextNode("Nou Personatge"));
        boto.setAttribute("id", "nou_personatge");
        div.appendChild(boto);

        var nou_personatge = document.getElementById("nou_personatge");

        nou_personatge.addEventListener("click", crear_nou_personatge);
        } else {
        genera_tabla();
        }

    }
}
function crear_imagen(crear_div){
  let br = document.createElement("br");
      crear_div.appendChild(br);

      let p = document.createElement("p");
      p.appendChild(document.createTextNode(id_personatges[i].toUpperCase()));

      crear_div.appendChild(p);

      let input = document.createElement("input");
      input.setAttribute("type", "file");
      crear_div.appendChild(input);

      let br3 = document.createElement("br");
      crear_div.appendChild(br3);
      let br4 = document.createElement("br");
      crear_div.appendChild(br4);

      let img = document.createElement("img");
      img.setAttribute("id", "myImg");
      img.setAttribute("src", "../imagenes/Monigote.jpeg");
      crear_div.appendChild(img);
}

function crear_formulari() {
  let caracteristica = "";
  let crear_div = document.createElement("div");

  let div = document.getElementById("Nou_personatge");

  console.log(div);
  div.appendChild(crear_div);

  for (let i = 0; i < id_personatges.length; i++) {
    if (i == id_personatges.length - 1) {
      crear_imagen(crear_div);
      
    } else if (i == id_personatges.length - 2) {
      let p = document.createElement("p");
      p.appendChild(document.createTextNode(id_personatges[i].toUpperCase()));

      crear_div.appendChild(p);

      for (let i = 0; i < 4; i++) {
        switch (i) {
          case 0:
            caracteristica = "Valiente";
            break;
          case 1:
            caracteristica = "Timido";
            break;
          case 2:
            caracteristica = "Feroz";
            break;
          case 3:
            caracteristica = "Liderazgo";
            break;
        }
        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", caracteristica);
        input.setAttribute("class", "checkbox");

        let label = document.createElement("label");
        label.setAttribute("for", caracteristica);
        label.innerText = caracteristica;
        crear_div.appendChild(input);
        crear_div.appendChild(label);
      }
    } else if (i == 0) {
      let p = document.createElement("p");
      p.appendChild(document.createTextNode(id_personatges[i].toUpperCase()));
      crear_div.appendChild(p);

      let input = document.createElement("input");
      input.setAttribute("id", "formId");
      input.setAttribute("disabled", true);
      crear_div.appendChild(input);
      input.value = contador + 1;
    } else if (i == id_personatges.length - 3) {
      let p = document.createElement("p");
      p.appendChild(document.createTextNode(id_personatges[i].toUpperCase()));
      crear_div.appendChild(p);

      let select = document.createElement("select");
      crear_div.appendChild(select);

      for (let i = 0; i < 5; i++) {
        switch (i) {
          case 0:
            magia = "Agua";
            break;
          case 1:
            magia = "Tierra";
            break;
          case 2:
            magia = "Fuego";
            break;
          case 3:
            magia = "Aire";
            break;
          case 4:
            magia = "Otros";
            break;
        }

        let option = document.createElement("option");
        option.appendChild(document.createTextNode(magia));
        select.appendChild(option);
      }
    } else {
      let p = document.createElement("p");
      p.appendChild(document.createTextNode(id_personatges[i].toUpperCase()));

      crear_div.appendChild(p);

      let input = document.createElement("input");
      crear_div.appendChild(input);
    }
  }

  let br = document.createElement("br");
  let br2 = document.createElement("br");
  crear_div.appendChild(br);
  crear_div.appendChild(br2);

  let boto = document.createElement("button");
  boto.appendChild(document.createTextNode("Acceptar"));
  boto.setAttribute("id", "Acceptar");
  crear_div.appendChild(boto);

  boto.addEventListener("click", function () {
    let caracteristicas = document.getElementsByClassName("checkbox");
    let marcats = true;
    let contador = 0;

    for (let i = 0; i < caracteristicas.length; i++) {
      if (caracteristicas[i].checked == false) {
        contador++;
      }
    }
    if (contador == 4) {
      marcats = false;
      alert("HAS DE MARCAR ALGUNA OPCIO EN EL CHECKBOX");
    }

    if (document.getElementsByTagName("input")[1].value == "") {
      document.getElementsByTagName("input")[1].style.borderColor = "red";
      marcats = false;
    }
    if (document.getElementsByTagName("input")[2].value == "") {
      document.getElementsByTagName("input")[2].style.borderColor = "red";
      marcats = false;
    }
    if (marcats == true) {
      acceptar_personatge();
    }
  });

  let boto2 = document.createElement("button");
  boto2.appendChild(document.createTextNode("Cancelar"));
  boto2.setAttribute("id", "Cancelar");
  crear_div.appendChild(boto2);

  boto2.addEventListener("click", cancelar_personatge);
  let imgSrc = document.getElementById("myImg").src;

  generarImg();
  guardarImg();

  document
    .querySelector("input[type='file']")
    .addEventListener("change", function () {
      imgSrc = localStorage.getItem("novaImatge");
    });
}

function crear_formulari_modificar(posicio) {
  let crear_div = document.createElement("div");

  let div = document.getElementById("Actualitza");

  div.appendChild(crear_div);

    document.getElementById("Actualitza").classList.add("actualitza");
    document.getElementById("Nou_personatge").classList.remove("nou_personatge");

  for (let propiedad in personatges[0]) {
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(propiedad.toUpperCase()));

    crear_div.appendChild(p);

    if (propiedad == "caracteristiques") {
      let caractersitcas_marcadas = personatges[posicio][propiedad].split("-");

      for (let i = 0; i < 4; i++) {
        switch (i) {
          case 0:
            caracteristica = "Valiente";
            break;
          case 1:
            caracteristica = "Timido";
            break;
          case 2:
            caracteristica = "Feroz";
            break;
          case 3:
            caracteristica = "Liderazgo";
            break;
        }
        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", caracteristica);
        input.setAttribute("class", "checkbox");

        let label = document.createElement("label");
        label.setAttribute("for", caracteristica);
        label.innerText = caracteristica;
        crear_div.appendChild(input);
        crear_div.appendChild(label);
      }
      for (let i = 0; i < caractersitcas_marcadas.length; i++) {
        let input = document.getElementById(caractersitcas_marcadas[i]);
        input.setAttribute("checked", true);
      }
    } else if (propiedad == "imatge") {
      let img = document.createElement("img");
      img.setAttribute("id", "myImg");
      img.setAttribute("class", "classImg");
      img.setAttribute("src", personatges[posicio][propiedad]);
      img.setAttribute("width", "100");
      img.setAttribute("height", "100");
      crear_div.appendChild(img);

      let br = document.createElement("br");
      crear_div.appendChild(br);

      let br2 = document.createElement("br");
      crear_div.appendChild(br2);

      let input = document.createElement("input");
      input.setAttribute("type", "file");
      crear_div.appendChild(input);

      let br3 = document.createElement("br");
      crear_div.appendChild(br3);
      let br4 = document.createElement("br");
      crear_div.appendChild(br4);
    } else if (propiedad == "id") {
      let input = document.createElement("input");
      input.setAttribute("id", "formID");
      input.setAttribute("disabled", true);
      crear_div.appendChild(input);

      input.value = personatges[posicio][propiedad];
    } else if (propiedad == "magia") {
      let magia_seleccionada = personatges[posicio][propiedad];
      let p = document.createElement("p");
      crear_div.appendChild(p);

      let select = document.createElement("select");
      crear_div.appendChild(select);

      for (i = 0; i < 5; i++) {
        switch (i) {
          case 0:
            magia = "Agua";
            break;
          case 1:
            magia = "Tierra";
            break;
          case 2:
            magia = "Fuego";
            break;
          case 3:
            magia = "Aire";
            break;
          case 4:
            magia = "Otros";
            break;
        }

        let option = document.createElement("option");
        option.appendChild(document.createTextNode(magia));
        if ((magia_seleccionada = magia)) {
          option.setAttribute("selected", "true");
        }
        select.appendChild(option);
      }
    } else {
      let input = document.createElement("input");
      crear_div.appendChild(input);

      input.value = personatges[posicio][propiedad];
    }
  }

  let br = document.createElement("br");
  let br2 = document.createElement("br");
  crear_div.appendChild(br);
  crear_div.appendChild(br2);

  let boto = document.createElement("button");
  boto.appendChild(document.createTextNode("Acceptar"));
  boto.setAttribute("id", "Acceptar");
  crear_div.appendChild(boto);

  boto.addEventListener("click", function () {
    let caracteristicas = document.getElementsByClassName("checkbox");
    let marcats = true;
    let contador = 0;

    for (let i = 0; i < caracteristicas.length; i++) {
      if (caracteristicas[i].checked == false) {
        contador++;
      }
    }
    if (contador == 4) {
      marcats = false;
      alert("HAS DE MARCAR ALGUNA OPCIO EN EL CHECKBOX");
    }

    if (document.getElementsByTagName("input")[1].value == "") {
      document.getElementsByTagName("input")[1].style.borderColor = "red";
      marcats = false;
    }
    if (document.getElementsByTagName("input")[2].value == "") {
      document.getElementsByTagName("input")[2].style.borderColor = "red";
      marcats = false;
    }
    if (marcats == true) {
      acceptar_modificacio();
    }
  });

  let boto2 = document.createElement("button");

  boto2.appendChild(document.createTextNode("Cancelar"));
  boto2.setAttribute("id", "Cancelar");
  crear_div.appendChild(boto2);

  boto2.addEventListener("click", cancelar_modificacio);

  generarImg();
  guardarImg();

    document.addEventListener("keydown", function(event){
        if (event.key == "Escape"){
            cancelar_modificacio();
        }
    });

}

function crear_nou_personatge() {
  buidar_taula();
  crear_formulari();

  let id = (document.getElementsByTagName("input")[0].value = contador + 1);
}

function cancelar_modificacio() {
  buidar_modficacio();

  genera_tabla();
}

function cancelar_personatge() {
  buidar_personatge();
  if (personatges.length == 0) {
    let div = document.getElementsByTagName("div")[0];
    sin_registros(div)
  }

  genera_tabla();
}

function buidar_personatge() {
  let div = document.getElementById("Nou_personatge").firstChild;
  div.parentNode.removeChild(div);
}

function buidar_modficacio() {
  let div = document.getElementById("Actualitza").firstChild;
  div.parentNode.removeChild(div);
}

function acceptar_modificacio() {
  let nom = document.getElementsByTagName("input")[1].value;
  let cognom = document.getElementsByTagName("input")[2].value;
  let edat = parseInt(document.getElementsByTagName("input")[3].value);
  let caracteristicas = document.getElementsByClassName("checkbox");
  let caractersitcas_marcadas = "";

  for (let i = 0; i < caracteristicas.length; i++) {
    if (caracteristicas[i].checked == true) {
      caractersitcas_marcadas += caracteristicas[i].id + "-";
    }
  }

  if (
    caractersitcas_marcadas.charAt(caractersitcas_marcadas.length - 1) == "-"
  ) {
    caractersitcas_marcadas = caractersitcas_marcadas.slice(0, -1);
  }

  let imatge = document.getElementById("myImg").src;

  if (localStorage.getItem("novaImatge")) {
    imatge = localStorage.getItem("novaImatge");
  }

  if (solo_num.test(edat) == false) {
    alert("Indica un numero amb el format correcte");
  } else if (solo_letra.test(nom) == false) {
    alert(
      "Indica un nom amb el format correcte. Enrecorda't que la priemra lletra ha der ser majuscula"
    );
  } else {
    console.log(posicio_global);

    personatges[posicio_global].nom = nom;
    personatges[posicio_global].cognom = cognom;
    personatges[posicio_global].edat = edat;
    personatges[posicio_global].caracteristiques = caractersitcas_marcadas;
    personatges[posicio_global].imatge = imatge;

    console.log(personatges);

    buidar_modficacio();
    genera_tabla();
  }

  localStorage.removeItem("novaImatge");
}

function acceptar_personatge() {
  
  let id = document.getElementsByTagName("input")[0].value;
  let nom = document.getElementsByTagName("input")[1].value;
  let cognom = document.getElementsByTagName("input")[2].value;
  let edat = parseInt(document.getElementsByTagName("input")[3].value);
  let magia = document.getElementsByTagName("select")[0].value;

  let caracteristicas = document.getElementsByClassName("checkbox");
  let caractersitcas_marcadas = "";
  for (let i = 0; i < caracteristicas.length; i++) {
    if (caracteristicas[i].checked == true) {
      caractersitcas_marcadas += caracteristicas[i].id + "-";
    }
  }
  if (
    caractersitcas_marcadas.charAt(caractersitcas_marcadas.length - 1) == "-"
  ) {
    caractersitcas_marcadas = caractersitcas_marcadas.slice(0, -1);
  }

  if (solo_num.test(edat) == false) {
    alert("Indica un numero amb el format correcte");
  } else if (solo_letra.test(nom) == false) {
    alert(
      "Indica un nom amb el format correcte. Enrecorda't que la priemra lletra ha der ser majuscula"
    );
  } else {
    let imgNova = "";

    //Si en el localStorage hi ha imatge, mostrem la imatge donada
    if (localStorage.getItem("novaImatge")) {
      imgNova = localStorage.getItem("novaImatge");
      //Si no hi ha res en el localStorage, donem una imatge default
    } else {
      imgNova = "../imagenes/Monigote.jpeg";
    }
    contador++;
    personatges.push({
      id: id,
      nom: nom,
      cognom: cognom,
      edat: edat,
      magia: magia,
      caracteristiques: caractersitcas_marcadas,
      //uploaded imatge
      imatge: imgNova,
    });

    console.log(personatges);

    buidar_personatge();
    genera_tabla();
    //Borrem la imatge dins del LocalStorage, per a que si creem un altre personatge no agafi la mateixi imatge
    localStorage.removeItem("novaImatge");
  }
}

//Aqui agafem una imatge des dels fitxers propis de l'usuari, i ensenyem per pantalla la imatge seleccionada
function generarImg() {
  //Busquem un element HTML amb les característiques de pujada de fitxers
  document
    .querySelector('input[type="file"]')
    .addEventListener("change", function () {
      //Si hem hi ha una imatge pujada, ensenyarà per l'element img el fitxer seleccionat
      if (this.files && this.files[0]) {
        var img = document.querySelector("img");

        img.onload = () => {
          URL.revokeObjectURL(img.src);
        };

        img.src = URL.createObjectURL(this.files[0]);
      }
    });
}

//Guardem la imatge dins del Local Storage
function guardarImg() {
  //Busquem l'input de pujada d'elements, i quan es puji un fitxer, cridem una funció
  document
    .querySelector('input[type="file"]')
    .addEventListener("change", function () {
      let reader = new FileReader();

      //Quan es carregui la imatge, creem un element en localStorage amb la URL de la imatge
      reader.addEventListener("load", () => {
        localStorage.setItem("novaImatge", reader.result);
      });

      reader.readAsDataURL(this.files[0]);
    });
}

function set_eliminar_imatge(){

    let event_imatge = document.getElementsByClassName("classImg");

    for (let i = 0; i < event_imatge.length; i++){
        event_imatge[i].addEventListener("dblclick", eliminar_imatge);
    }

}

function eliminar_imatge(e){

    console.log("Es vol eliminar la imatge");

    let posicio = 0;
    posicio = aconseguir_posicio(e);
    let img = document.getElementsByClassName("classImg")[posicio];
    img.src = "";

    personatges[posicio].imatge = "";

}
