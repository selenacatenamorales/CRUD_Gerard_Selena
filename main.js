//Fitxer JSON amb les dades inicials
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

//Expressió
var solo_num = new RegExp("^{1-3}d$");

var id_personatges = [];

for (propiedad in personatges[0]) {
    id_personatges.push(propiedad);
}

//guardem la quantitat d'objectes JSON que conte l'array
var contador = personatges[personatges.length - 1].id;
var id_global = 0;

genera_tabla();

function genera_tabla() {

    // Obtener la referencia del elemento body
    var div = document.getElementsByTagName("div")[0];

    // Crea un elemento <table> y un elemento <tbody>
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    // Crea las celdas
    for (var i = 0; i <= personatges.length; i++) {
        // Crea las hileras de la tabla
        var hilera = document.createElement("tr");

        if (i == 0) {
            for (let propiedad in personatges[i]) {
                var celda = document.createElement("td");

                var textoCelda = document.createTextNode(propiedad.toUpperCase());
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);
            }
        } else {
            for (let propiedad in personatges[i - 1]) {
                if (propiedad == "imatge") {
                    var celda = document.createElement("td");
                    var textoCelda = document.createElement("img");
                    textoCelda.setAttribute("src", personatges[i - 1][propiedad]);
                    textoCelda.setAttribute("width", "50");
                    textoCelda.setAttribute("height", "50");
                    celda.appendChild(textoCelda);
                    hilera.appendChild(celda);

                    var celda = document.createElement("td");
                    var textoCelda = document.createElement("a");
                    textoCelda.appendChild(document.createTextNode("Eliminar"));
                    textoCelda.setAttribute("class", "eliminar");

                    celda.appendChild(textoCelda);
                    hilera.appendChild(celda);

                    var celda = document.createElement("td");
                    var textoCelda = document.createElement("a");
                    textoCelda.appendChild(document.createTextNode("Modificar"));
                    textoCelda.setAttribute("class", "modificar");

                    celda.appendChild(textoCelda);
                    hilera.appendChild(celda);
                } else {
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
    var id = parseInt(e.target.parentNode.parentNode.firstChild.innerText) - 1;

    id_global = id;
    console.log(e.target.parentNode.parentNode.firstChild.innerText);
    crear_formulari_modificar(id);
}

function buidar_taula() {
    let tabla = document.getElementsByTagName("div")[0].firstChild;
    let boton = document.getElementById("nou_personatge");
    boton.parentNode.removeChild(boton);
    tabla.parentNode.removeChild(tabla);
}

function eliminar_personatge(e) {
    let idpersonatge = parseInt(
        e.target.parentNode.parentNode.firstChild.innerText
    );

    for (i = 0; i < personatges.length; i++) {
        if (personatges[i].id == idpersonatge) {
            personatges.splice(i, i + 1);
        }
    }
    console.log(document.getElementsByTagName("tr").length);

    if (document.getElementsByTagName("tr").length == 2) {
        buidar_taula();

        console.log("Hola");
        let div = document.getElementsByTagName("div")[0];
        var p = document.createElement("p");
        var texto = document.createTextNode(
        "Ens hem quedat sense cap registre per mostrar, perque no proves a crear un nou personatge"
        );
        p.appendChild(texto);
        div.appendChild(p);

        var boto = document.createElement("button");
        boto.appendChild(document.createTextNode("Nou Personatge"));
        boto.setAttribute("id", "nou_personatge");
        div.appendChild(boto);

        var nou_personatge = document.getElementById("nou_personatge");

        nou_personatge.addEventListener("click", crear_nou_personatge);
    } else {
        buidar_taula();
        genera_tabla();
    }
}


function crear_formulari() {
    let caracteristica = "";
    let crear_div = document.createElement("div");

    let div = document.getElementById("Nou_personatge");

    console.log(div);
    div.appendChild(crear_div);

    for (let i = 0; i < id_personatges.length; i++) {
        if (i == id_personatges.length - 1) {
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
            //img.setAttribute("src", "#");
            crear_div.appendChild(img);
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
        } else if (i == 0){

            let p = document.createElement("p");
            p.appendChild(document.createTextNode(id_personatges[i].toUpperCase()));
            crear_div.appendChild(p);

            let input = document.createElement("input");
            input.setAttribute("id", "formId");
            input.setAttribute("disabled", true);
            crear_div.appendChild(input);

        } else if(i == id_personatges.length - 3){
          let p = document.createElement("p");
          p.appendChild(document.createTextNode(id_personatges[i].toUpperCase()));
          crear_div.appendChild(p);
          
          let select =  document.createElement("select");
          crear_div.appendChild(select);

          for (let i=0; i<5; i++){
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
          
        }else {
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

    boto.addEventListener("click", acceptar_personatge);

    let boto2 = document.createElement("button");
    boto2.appendChild(document.createTextNode("Cancelar"));
    boto2.setAttribute("id", "Cancelar");
    crear_div.appendChild(boto2);

    boto2.addEventListener("click", cancelar_personatge);

    generarImg();
    guardarImg();
}

function crear_formulari_modificar(posicio) {

    let crear_div = document.createElement("div");

    let div = document.getElementById("Actualitza");

    div.appendChild(crear_div);

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

        } else if (propiedad == "id"){

            let input = document.createElement("input");
            input.setAttribute("id", "formID");
            input.setAttribute("disabled", true);
            crear_div.appendChild(input);

            input.value = personatges[posicio][propiedad];

        } else if(propiedad=="magia"){
          let magia_seleccionada = personatges[posicio][propiedad];
          let p = document.createElement("p");
          crear_div.appendChild(p);
          
          let select =  document.createElement("select");
          crear_div.appendChild(select);

          for (i=0; i<5; i++){
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
          if(magia_seleccionada = magia){
            option.setAttribute("selected", "true");
          }
          select.appendChild(option);
        }

        }else {

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
        if (document.getElementsByTagName("input")[0].value == "") {
            document.getElementsByTagName("input")[0].style.backgroundColor = "red";
        } else {
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

}

function crear_nou_personatge() {
    buidar_taula();
    crear_formulari();

    let id = (document.getElementsByTagName("input")[0].value = contador + 1);
}

function cancelar_modificacio() {
  buidar_modficacio()
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

    if ( caractersitcas_marcadas.charAt(caractersitcas_marcadas.length - 1) == "-" ) {
        caractersitcas_marcadas = caractersitcas_marcadas.slice(0, -1);
    }



    let imatge = document.getElementById("myImg").src;

    if (localStorage.getItem("novaImatge")){
        imatge = localStorage.getItem("novaImatge");
    }

    // if(!solo_num.test(edat.value)){
    // alert("Indica un numero amb el format correcte");
    // }
    //  else{

    console.log(id_global);

    personatges[id_global].nom = nom;
    personatges[id_global].cognom = cognom;
    personatges[id_global].edat = edat;
    personatges[id_global].caracteristiques = caractersitcas_marcadas;
    personatges[id_global].imatge = imatge;

    console.log(personatges);

    buidar_modficacio();
    genera_tabla();
    //  }

    localStorage.removeItem("novaImatge");

}

function acceptar_personatge() {

    contador++;
    let id = contador;
    let nom = document.getElementsByTagName("input")[1].value;
    let cognom = document.getElementsByTagName("input")[2].value;
    let edat = parseInt(document.getElementsByTagName("input")[3].value);
    let magia = document.getElementsByTagName("select")[0].value

    let caracteristicas = document.getElementsByClassName("checkbox");
    let caractersitcas_marcadas = "";
    for (let i = 0; i < caracteristicas.length; i++) {
        if (caracteristicas[i].checked == true) {
        caractersitcas_marcadas += caracteristicas[i].id + "-";
        }
    }
    if ( caractersitcas_marcadas.charAt(caractersitcas_marcadas.length - 1) == "-" ) {
        caractersitcas_marcadas = caractersitcas_marcadas.slice(0, -1);
    }

    let imgNova = "";

    //Si en el localStorage hi ha imatge, mostrem la imatge donada
    if (localStorage.getItem("novaImatge")){
        imgNova = localStorage.getItem("novaImatge");
    //Si no hi ha res en el localStorage, donem una imatge default
    } else {
        imgNova = "../imagenes/Monigote.jpeg";
    }

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

//Aqui agafem una imatge des dels fitxers propis de l'usuari, i ensenyem per pantalla la imatge seleccionada
function generarImg() {

    //Busquem un element HTML amb les característiques de pujada de fitxers
    document.querySelector('input[type="file"]').addEventListener("change", function () {

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
function guardarImg(){

    //Busquem l'input de pujada d'elements, i quan es puji un fitxer, cridem una funció
    document.querySelector('input[type="file"]').addEventListener("change", function(){

        let reader = new FileReader();

        //Quan es carregui la imatge, creem un element en localStorage amb la URL de la imatge
        reader.addEventListener("load", () => {

            localStorage.setItem("novaImatge", reader.result);

        });

        reader.readAsDataURL(this.files[0]);

    });

}
