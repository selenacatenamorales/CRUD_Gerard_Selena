//Array JSON amb les dades inicials
var personatges = [

    {
        id: 1,
        nom: "Vanessa",
        cognom: "Enoteca",
        edat: 24,
        magia: "Otros",
        caracteristiques: "Timido-Feroz",
        habilitat: [
            {
                id: 1,
                nom: "Hilo rojo del destino",
                tipus: "Fisic",
                efecte: "Defensa",
            },
            {
                id: 2,
                nom: "Espada del destino",
                tipus: "Fisic",
                efecte: "Atac-Defensa",
            },
        ],

        imatge: "imagenes/vanessa.jpg",
    },

    {
        id: 2,
        nom: "Yami",
        cognom: "Sukehiro",
        edat: 28,
        magia: "Agua",
        caracteristiques: "Valiente",
        habilitat: [
            {
                id: 1,
                nom: "Corte apagado",
                tipus: "Fisic",
                efecte: "Defensa",
            },
        ],
        imatge: "imagenes/yami.jpg",
    },
];

// ***** VARIABLES GLOBALS *******

//Cadena que utilizamos para mostrar los errores al validar los inputs con las expressiones regulares
var cadena_errors = "";

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

//variable global para controlar pos del array de habilidad que hay que modifcar o eliminar
var pos_global = 0;

//variable global para controlar el id de las habilidades
var contador_habilitat_global = 0;

// ****** INICI PROGRAMA ******

//cridem a la funcio per generar la taula
genera_tabla(personatges);

// ***** FUNCIONS PERSONATGES *****

//funcion para generar la tabla con la info del array json
function genera_tabla(personatges) {

    // Obtener la referencia del elemento body
    var div = document.getElementsByTagName("div")[0];

    // Crea un elemento <table> y un elemento <tbody>
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    // Crea les files
    for (var i = 0; i <= personatges.length; i++) {
        // Crea les celes de la fila
        var hilera = document.createElement("tr");

        if (i != 0) {
            //comprovamos la hilera para incluir el css
            hilera.setAttribute("class", "defTr");
        }

        //comprovem si estem en la primera fila
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
                } else if (propiedad == "habilitat") {
                    //si la propietat correspon a la habilitat, el que fem es crear uu enllaç que ens portara a una altre taula,
                    //on podrem veure l'habilitat
                    var celda = document.createElement("td");
                    var textoCelda = document.createElement("a");
                    textoCelda.appendChild(document.createTextNode("Veure habilitat"));
                    textoCelda.setAttribute("class", "habilitat");

                } else {
                    //la resta de celes son nomes td amb la informació que esta guardad en l'objecte JSON
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

    //creem el boto a sota de la taula que ens servirà per crear un nou personatge
    var boto = document.createElement("button");
    boto.appendChild(document.createTextNode("Nou Personatge"));
    boto.setAttribute("id", "nou_personatge");
    boto.setAttribute("class", "lc");
    div.appendChild(boto);

    //funcio que serveix per afegir a cada boto de modificar el seu event de click
    generar_add_event_listener_modifcar();

    //funcio que serveix per afegir a cada boto de eliminar el seu event de click
    generar_add_event_listener_eliminar();

    //funcio que serveix per afegir a cada boto de veure habilitat el seu event de click
    generar_add_event_listener_habilitat();

    //afegim un event de click al boto de crear nou personatge
    var nou_personatge = document.getElementById("nou_personatge");
    nou_personatge.addEventListener("click", crear_nou_personatge);

    set_eliminar_imatge();
    document.getElementById("Taula").classList.add("Taula");
    document.getElementById("Nou_personatge").classList.remove("nou_personatge");
    document.getElementById("Actualitza").classList.remove("actualitza");
    document.getElementById("TaulaH").classList.remove("Taula");

    //realitzem un evente que al fer click a la n del teclat, creem un personatge nou
    document.addEventListener("keydown", function (event) {

        if (event.key == "n") {
            crear_nou_personatge();
        }
    });
    //funcio per cambiar el color de les capceleres de cada columna
    set_multicolor_th();
}

function generar_add_event_listener_modifcar() {

    //guardem en un array tots els elements que son de classe modificar
    let b = document.getElementsByClassName("modificar");

    for (i = 0; i < b.length; i++) {
        //per cada element de l'array li assignem un event de click
        b[i].addEventListener("click", modificar_personatge);
    }
}

function generar_add_event_listener_eliminar() {

    //guardem en un array tots els elements que son de classe eliminar
    let a = document.getElementsByClassName("eliminar");

    for (i = 0; i < a.length; i++) {
        //per cada element de l'array li assignem un event de click
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
function aconseguir_posicio(e) {

    let posicio = 0;
    for (let i = 0; i < personatges.length; i++) {
        if (parseInt(e.target.parentNode.parentNode.firstChild.innerText) == personatges[i].id) {
            posicio = i;
        }
    }
    return posicio;
}

function buidar_taula() {

    //funcio que ens serveix per buidar el primer div on tenim emmagatzemada la taula, tame s'encarrega de gestionar el css
    let tabla = document.getElementsByTagName("div")[0].firstChild;
    let boton = document.getElementById("nou_personatge");
    boton.parentNode.removeChild(boton);
    tabla.parentNode.removeChild(tabla);
    document.getElementById("Taula").classList.remove("Taula");
    document.getElementById("TaulaH").classList.remove("Taula");
    document.getElementById("Taula").classList.remove("actualitza");
    document.getElementById("Nou_personatge").classList.add("nou_personatge");

    //realitzem un event listener, que prement la tecla esc cridem a cancelar personatge i per tant cancelem la seva creació
    document.addEventListener("keydown", function (event) {
        if (event.key == "Escape") {
            cancelar_personatge();
        }
    });
}

function sin_registros(div) {

    //funcion que nos muestra por pantalla un texto cuando no tenemos personajes en el array
    var p = document.createElement("p");
    var texto = document.createTextNode( "Ens hem quedat sense cap registre per mostrar, perque no proves a crear un nou personatge");
    p.appendChild(texto);
    div.appendChild(p);
}

function eliminar_personatge(e) {

    //funcio per eliminar un personatge de la taula
    let pregunta = confirm("Estas segur que vols eliminar aquest personatge?");

    if (pregunta) {
        let posicio = 0;
        posicio = aconseguir_posicio(e); //en aquets part del codi aconseguim la posicio en la que estem

        personatges.splice(posicio, 1); //eliminem el personatge de la posicio seleccionada

        buidar_taula();
        if (personatges.length == 0) {
            //comprovem si no tenim cap persontage a l'array
            let div = document.getElementsByTagName("div")[0]; //
            sin_registros(div);

            var boto = document.createElement("button");
            boto.appendChild(document.createTextNode("Nou Personatge"));
            boto.setAttribute("id", "nou_personatge");
            div.appendChild(boto);

            var nou_personatge = document.getElementById("nou_personatge");

            nou_personatge.addEventListener("click", crear_nou_personatge);
        } else {
            genera_tabla(personatges);
        }
    }
}

function crear_imagen(crear_div, i) {

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

function crear_estadisticas(crear_div) {

    let caracteristica = "";

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
}

function crear_id(numero, crear_div) {

    let input = document.createElement("input");
    input.setAttribute("id", "formId");
    input.setAttribute("disabled", true);
    crear_div.appendChild(input);
    input.value = numero;

}

function crear_magia(i) {

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
    return magia;
}

function comprovar_dades() {

    let caracteristicas = document.getElementsByClassName("checkbox");
    let errors = false;
    let cadena = "";
    cadena_errors = "";
    let contador = 0;

    for (let i = 0; i < caracteristicas.length; i++) {
        if (caracteristicas[i].checked == false) {
            contador++;
        }
    }

    if (contador == 4) {
        errors = true;
        cadena += "HAS DE MARCAR ALGUNA OPCIO EN EL CHECKBOX";
    }

    if (document.getElementsByTagName("input")[1].value == "") {
        document.getElementsByTagName("input")[1].style.borderColor = "red";
        cadena += "\nEl nom no pot estar en blanc";
        errors = true;
    }

    if (document.getElementsByTagName("input")[2].value == "") {
        document.getElementsByTagName("input")[2].style.borderColor = "red";
        cadena += "\nEl cognom no pot estar en blanc";
        errors = true;
    }

    cadena_errors = cadena;

    return errors;
}

function crear_botones_aceptar(crear_div) {

    let br = document.createElement("br");
    let br2 = document.createElement("br");
    crear_div.appendChild(br);
    crear_div.appendChild(br2);

    let boto = document.createElement("button");
    boto.appendChild(document.createTextNode("Acceptar"));
    boto.setAttribute("id", "Acceptar");
    crear_div.appendChild(boto);
}

function crear_formulari() {

    let crear_div = document.createElement("div");

    let div = document.getElementById("Nou_personatge");

    console.log(div);
    div.appendChild(crear_div);

    console.log(id_personatges.length);

    for (let i = 0; i < id_personatges.length; i++) {

        if (i == id_personatges.length - 1) {
            crear_imagen(crear_div, i);

        } else if (i == id_personatges.length - 3) {

            let p = document.createElement("p");
            p.appendChild(document.createTextNode(id_personatges[i].toUpperCase()));

            crear_div.appendChild(p);

            crear_estadisticas(crear_div);

        } else if (i == 0) {

            let p = document.createElement("p");
            p.appendChild(document.createTextNode(id_personatges[i].toUpperCase()));
            crear_div.appendChild(p);

            crear_id(contador + 1, crear_div);

        } else if (i == id_personatges.length - 4) {

            let magia = "";
            let p = document.createElement("p");
            p.appendChild(document.createTextNode(id_personatges[i].toUpperCase()));
            crear_div.appendChild(p);

            let select = document.createElement("select");
            crear_div.appendChild(select);

            for (let i = 0; i < 5; i++) {
                magia = crear_magia(i);
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

    crear_botones_aceptar(crear_div);

    boto = document.getElementById("Acceptar");

    boto.addEventListener("click", function () {
        errors = comprovar_dades();
        if (errors == false) {
            acceptar_personatge();
        } else {
            alert(cadena_errors);
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

    document.querySelector("input[type='file']").addEventListener("change", function () {
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
        if (propiedad == "habilitat") {
        } else {
            let p = document.createElement("p");
            p.appendChild(document.createTextNode(propiedad.toUpperCase()));

            crear_div.appendChild(p);
        }

        if (propiedad == "caracteristiques") {
            let caractersitcas_marcadas = personatges[posicio][propiedad].split("-");

            crear_estadisticas(crear_div);

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
            crear_id(personatges[posicio][propiedad], crear_div);
        } else if (propiedad == "magia") {
            let magia = "";
            let magia_seleccionada = personatges[posicio][propiedad];
            let p = document.createElement("p");
            crear_div.appendChild(p);

            let select = document.createElement("select");
            crear_div.appendChild(select);

            for (i = 0; i < 5; i++) {
                magia = crear_magia(i);

                let option = document.createElement("option");
                option.appendChild(document.createTextNode(magia));
                if (magia_seleccionada == magia) {
                    option.setAttribute("selected", "true");
                }
                select.appendChild(option);
            }
        } else if (propiedad == "habilitat") {
        } else {
            let input = document.createElement("input");
            crear_div.appendChild(input);

            input.value = personatges[posicio][propiedad];
        }
    }

    crear_botones_aceptar(crear_div);

    boto = document.getElementById("Acceptar");

    boto.addEventListener("click", function () {
        errors = comprovar_dades();
        if (errors == false) {
            acceptar_modificacio();
        } else {
            alert(cadena_errors);
        }
    });

    let boto2 = document.createElement("button");

    boto2.appendChild(document.createTextNode("Cancelar"));
    boto2.setAttribute("id", "Cancelar");
    crear_div.appendChild(boto2);

    boto2.addEventListener("click", cancelar_modificacio);

    generarImg();
    guardarImg();

    document.addEventListener("keydown", function (event) {
        if (event.key == "Escape") {
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

    genera_tabla(personatges);
}

function cancelar_personatge() {
    buidar_personatge();
    if (personatges.length == 0) {
        let div = document.getElementsByTagName("div")[0];
        sin_registros(div);
    }

    genera_tabla(personatges);
}

function buidar_personatge() {
    let div = document.getElementById("Nou_personatge").firstChild;
    div.parentNode.removeChild(div);
}

function buidar_modficacio() {
    let div = document.getElementById("Actualitza").firstChild;
    div.parentNode.removeChild(div);
}

function comrpovar_exprreg(edat, nom) {

    let error = false;

    if (solo_num.test(edat) == false) {
        document.getElementsByTagName("input")[3].style.borderColor = "red";
        alert("Indica un numero amb el format correcte");
        error = true;

    } else if (solo_letra.test(nom) == false) {
        document.getElementsByTagName("input")[1].style.borderColor = "red";
        error = true;
        alert(
            "Indica un nom amb el format correcte. Enrecorda't que la priemra lletra ha der ser majuscula"
        );
    }
    console.log(error);
    return error;

}

function acceptar_modificacio() {
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

    let imatge = document.getElementById("myImg").src;

    if (localStorage.getItem("novaImatge")) {
        imatge = localStorage.getItem("novaImatge");
    }

    if (comrpovar_exprreg(edat, nom) == false) {
        personatges[posicio_global].nom = nom;
        personatges[posicio_global].cognom = cognom;
        personatges[posicio_global].edat = edat;
        personatges[posicio_global].caracteristiques = caractersitcas_marcadas;
        personatges[posicio_global].imatge = imatge;
        personatges[posicio_global].magia = magia;

        buidar_modficacio();
        genera_tabla(personatges);
        localStorage.removeItem("novaImatge");
    }
}

function acceptar_personatge() {

    document.getElementsByTagName("input")[1].style.borderColor = null;
    document.getElementsByTagName("input")[2].style.borderColor = null;
    document.getElementsByTagName("input")[3].style.borderColor = null;

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

    if (comrpovar_exprreg(edat, nom) == false) {
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
            habilitat: [
                {
                    id: 1,
                    nom: "exemple",
                    tipus: "Cura-Atac",
                    efecte: "Fisic",
                },
            ],

            //uploaded imatge
            imatge: imgNova,
        });

        console.log(personatges);

        buidar_personatge();
        genera_tabla(personatges);
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

function set_eliminar_imatge() {
    let event_imatge = document.getElementsByClassName("classImg");

    for (let i = 0; i < event_imatge.length; i++) {
        event_imatge[i].addEventListener("dblclick", eliminar_imatge);
    }
}

function eliminar_imatge(e) {
    console.log("Es vol eliminar la imatge");

    let posicio = 0;
    posicio = aconseguir_posicio(e);
    let img = document.getElementsByClassName("classImg")[posicio];
    img.src = "";

    personatges[posicio].imatge = "";
}

function set_multicolor_th() {
    let th = document.getElementsByTagName("th");

    for (let i = 0; i < th.length; i++) {
        th[i].setAttribute("class", "th");
    }

    let cc = document.getElementsByClassName("th");

    for (let i = 0; i < cc.length; i++) {
        cc[i].addEventListener("mouseover", canviColor);
        cc[i].addEventListener("mouseout", colorDef);
    }
}

function canviColor(e) {
    let colors = ["pink", "red", "orange", "yellow", "green", "blue", "violet"];
    let rand = Math.floor(Math.random() * (colors.length - 0));

    let pos = e.target;
    pos.style.color = colors[rand];
}

function colorDef(e) {
    e.target.style.color = "white";
}

// ***** FUNCIONS HABILITATS ******

function generar_add_event_listener_modifcar_habilitat() {
    //guardem en un array tots els elements que son de classe modificar
    let b = document.getElementsByClassName("modificar_habilitat");

    for (i = 0; i < b.length; i++) {
        //per cada element de l'array li assignem un event de click
        b[i].addEventListener("click", modificar_habilitat);
    }
}

function generar_add_event_listener_habilitat() {
    //guardem en un array tots els elements que son de classe modificar
    let b = document.getElementsByClassName("habilitat");

    for (i = 0; i < b.length; i++) {
        //per cada element de l'array li assignem un event de click
        b[i].addEventListener("click", generar_taula_habilitat);
    }
}

function generar_add_event_listener_eliminar_hablitat() {
    //guardem en un array tots els elements que son de classe eliminar
    let a = document.getElementsByClassName("eliminar_habilitat");

    for (i = 0; i < a.length; i++) {
        //per cada element de l'array li assignem un event de click
        a[i].addEventListener("click", eliminar_habilitat);
    }
}

function eliminar_habilitat(e) {

    let posicio = 0;
    for (let i = 0; i < personatges[posicio_global].habilitat.length; i++) {
        if (parseInt(e.target.parentNode.parentNode.firstChild.innerText) == personatges[posicio_global].habilitat[i].id) {
            posicio = i;
        }
    }
    let pregunta = confirm("Estas segur que vols eliminar aquesta habilitat?");
    if (pregunta) {

        if (personatges[posicio_global].habilitat.length == 1){
            alert("El personatge no es pot quedar sense habilitats");
        } else {
            personatges[posicio_global].habilitat.splice(posicio, 1); //eliminem la habilitat de la posicio seleccionada
        }
    }

    if (personatges[posicio_global].habilitat.length == 0) {

        //comprovem si no tenim cap habilitat a l'array
        let div = document.getElementsByTagName("div")[1]; //
        sin_registros(div);

        let tabla = document.getElementsByTagName("div")[1].firstChild;
        tabla.parentNode.removeChild(tabla);


    } else {

        let divB = document.getElementById("divBtns");
        divB.parentNode.removeChild(divB);
        let tabla = document.getElementsByTagName("div")[1].firstChild;
        tabla.parentNode.removeChild(tabla);

        genera_tabla_habilitat(posicio_global);
    }
}

//funcion que utilizamos para recoger las claves del objeto JSON y para saber porque id vamos
function generar_taula_habilitat(e) {
    let contador_habilitat = 0;
    let id_hablitat = [];
    buidar_taula();
    for (propiedad in personatges[0].habilitat[0]) {
        //guardamos en un array las claves del objeto JSON habilidad
        id_hablitat.push(propiedad);
    }
    posicio_global = aconseguir_posicio(e); //llamamos a la función para conseguir la pos global y saber en que personaje estamos
    if (personatges[posicio_global].habilitat.length == 0) {
        //comprovamos si hay algun registro en habilidad, si no hay el contador sera 0
        contador_habilitat = 0;
    } else {
        //si hay contador, buscaremos el ultimo registro de habilidad y assignaremos su id al contador de habilidad global
        contador_habilitat = parseInt(
            personatges[posicio_global].habilitat[
                personatges[posicio_global].habilitat.length - 1
            ].id
        );
    }
    contador_habilitat_global = contador_habilitat;
    genera_tabla_habilitat(); //llamamos a la función para generar la tabla de las habilidades
}

function genera_tabla_habilitat() {
    // Obtener la referencia del elemento body
    var div = document.getElementsByTagName("div")[1];
    div.classList.add("Taula", "flex-col", "cc");
    document.getElementById("Nou_personatge").classList.remove("nou_personatge");
    document.getElementById("Actualitza").classList.remove("nou_personatge");

    // Crea un elemento <table> y un elemento <tbody>
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    // Crea les files
    for (var i = 0; i <= personatges[posicio_global].habilitat.length; i++) {
        // Crea les celes de la fila
        var hilera = document.createElement("tr");

        if (i != 0) {
            hilera.setAttribute("class", "defTr");
        }

        //comprovem si estem en la primera
        if (i == 0) {
            //si es aixi, el que fem es indicar les claus dels objectes JSON
            for (let propiedad in personatges[posicio_global].habilitat[0]) {
                var celda = document.createElement("th");

                var textoCelda = document.createTextNode(propiedad.toUpperCase());
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);
            }
        } else {
            //si no estem en la primera fila, comencem a intruidir les dades de cada paersoantge
            for (let propiedad in personatges[posicio_global].habilitat[i - 1]) {
                //la resta de celes son nomes td amb la informació que esta guardad en l'objecte JSON
                var celda = document.createElement("td");

                var textoCelda = document.createTextNode(
                    personatges[posicio_global].habilitat[i - 1][propiedad]
                );

                celda.appendChild(textoCelda);
                hilera.appendChild(celda);
            }
            //creem tambe els enllaços de eliminar
            var celda = document.createElement("td");
            var textoCelda = document.createElement("a");
            textoCelda.appendChild(document.createTextNode("Eliminar"));
            textoCelda.setAttribute("class", "eliminar_habilitat");

            celda.appendChild(textoCelda);
            hilera.appendChild(celda);

            //creem tambe els enllaços de modificar
            var celda = document.createElement("td");
            var textoCelda = document.createElement("a");
            textoCelda.appendChild(document.createTextNode("Modificar"));
            textoCelda.setAttribute("class", "modificar_habilitat");

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

    //funcio que serveix per afegir a cada boto de modificar el seu event de click
    generar_add_event_listener_modifcar_habilitat();

    //funcio que serveix per afegir a cada boto de eliminar el seu event de click
    generar_add_event_listener_eliminar_hablitat();

    //si el contador global es 0, cridem a la funcio que mostra el text de que no hi ha cap registre
    if (contador_habilitat_global == 0) {
        sin_registros(div);
    }

    var divBtns = document.createElement("div");
    divBtns.setAttribute("id", "divBtns");
    divBtns.setAttribute("class", "divBtns");
    divBtns.classList.add("flex-row");
    div.appendChild(divBtns);

    //creem el boto de tornar
    var boto = document.createElement("button");
    boto.appendChild(document.createTextNode("Tornar"));
    boto.setAttribute("id", "tornar");
    divBtns.appendChild(boto);

    //event listener del boto de tornar
    boto.addEventListener("click", tornar);

    //creem el boto de nova habilitat
    var boto2 = document.createElement("button");
    boto2.appendChild(document.createTextNode("Nova Habilitat"));
    boto2.setAttribute("id", "nova_habilitat");
    divBtns.appendChild(boto2);

    //event listener del boto de nova habilitat
    boto2.addEventListener("click", nova_habilitat);
}

function nova_habilitat() {

    document.getElementById("Nou_personatge").classList.add("nou_personatge");
    document.getElementById("TaulaH").classList.remove("Taula");

    //Primer de tot eliminem el div que conté el boto de tornar i el de nova habilitat, i la taula

    let divb = document.getElementById("divBtns");
    divb.parentNode.removeChild(divb);
    let tabla = document.getElementById("TaulaH").firstChild;
    tabla.parentNode.removeChild(tabla);

    //Seguidament creem un div on crearem el formulari
    let crear_div = document.createElement("div");

    let div = document.getElementById("Nou_personatge");
    div.appendChild(crear_div);

    for (let propiedad in personatges[posicio_global].habilitat[0]) {
        let p = document.createElement("p");
        p.appendChild(document.createTextNode(propiedad.toUpperCase()));
        crear_div.appendChild(p);

        if (propiedad == "id") {

            let input = document.createElement("input");
            input.value = contador_habilitat_global + 1;
            input.setAttribute("id", "formId");
            input.setAttribute("disabled", true);
            crear_div.appendChild(input);

        } else if (propiedad == "efecte") {

            for (let i = 0; i < 4; i++) {
                switch (i) {
                    case 0:
                        caracteristica = "Atac";
                        break;
                    case 1:
                        caracteristica = "Defensa";
                        break;
                    case 2:
                        caracteristica = "Suport";
                        break;
                    case 3:
                        caracteristica = "Cura";
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
        } else if (propiedad == "tipus") {

            for (let i = 0; i < 2; i++) {

                switch (i) {
                    case 0:
                        tipus = "Fisic";
                        break;
                    case 1:
                        tipus = "Magic";
                        break;
                }

                let input = document.createElement("input");
                input.setAttribute("type", "radio");
                input.setAttribute("id", tipus);
                input.setAttribute("class", "radio");
                input.setAttribute("name", "efecte");

                if (i == 0) input.setAttribute("checked", true);

                let label = document.createElement("label");
                label.setAttribute("for", tipus);
                label.appendChild(document.createTextNode(tipus));
                crear_div.appendChild(input);
                crear_div.appendChild(label);

            }


        } else {
            let input = document.createElement("input");
            crear_div.appendChild(input);
        }
    }

    let br = document.createElement("br");
    crear_div.appendChild(br);
    let br2 = document.createElement("br");
    crear_div.appendChild(br2);

    let boto3 = document.createElement("button");
    boto3.appendChild(document.createTextNode("Acceptar"));
    boto3.setAttribute("id", "accceptar_habilitat");
    crear_div.appendChild(boto3);

    boto3.addEventListener("click", function(){

        errors = comprovar_dades_habilitats();
        if (errors == false){
            acceptar_habilitat();
        } else {
            alert(cadena_errors);
        }

    });

    let boto4 = document.createElement("button");
    boto4.appendChild(document.createTextNode("Cancelar"));
    boto4.addEventListener("click", cancelar_habilitat);
    boto4.setAttribute("id", "cancelar_habilitat");
    crear_div.appendChild(boto4);
}

function cancelar_habilitat() {
    let div = document.getElementById("Nou_personatge").firstChild;
    div.parentNode.removeChild(div);
    genera_tabla_habilitat();
}

function acceptar_habilitat() {

    let id = document.getElementsByTagName("input")[0].value;
    let nom = document.getElementsByTagName("input")[1].value;

    let efecte = document.getElementsByClassName("checkbox");
    let efectes_marcats = "";
    for (let i = 0; i < efecte.length; i++) {
        if (efecte[i].checked == true) {
            efectes_marcats += efecte[i].id + "-";
        }
    }
    if (efectes_marcats.charAt(efectes_marcats.length - 1) == "-") {
        efectes_marcats = efectes_marcats.slice(0, -1);
    }

    //let efecte = document.getElementsByTagName("select")[0].value;
    let tipus = document.getElementsByClassName("radio");
    let valTipus = "";

    if (tipus[0].checked){
        valTipus = tipus[0].id;
    } else if (tipus[1].checked){
        valTipus = tipus[1].id;
    }

    personatges[posicio_global].habilitat.push({
        id: id,
        nom: nom,
        tipus: valTipus,
        efecte: efectes_marcats,
    });

    let taula = document.getElementById("Nou_personatge").firstChild;
    taula.parentNode.removeChild(taula);

    contador_habilitat_global++;

    genera_tabla_habilitat();
}

function tornar() {

    let divb = document.getElementById("divBtns");
    divb.parentNode.removeChild(divb);
    let taula = document.getElementById("TaulaH").firstChild;
    taula.parentNode.removeChild(taula);
    genera_tabla(personatges);

}

function modificar_habilitat(e) {

    let posicio = 0;
    for (let i = 0; i < personatges[posicio_global].habilitat.length; i++) {
        if (parseInt(e.target.parentNode.parentNode.firstChild.innerText) == personatges[posicio_global].habilitat[i].id) {
            posicio = i;
        }
    }

    let divb = document.getElementById("divBtns");
    divb.parentNode.removeChild(divb);

    let taula = document.getElementById("TaulaH").firstChild;
    taula.parentNode.removeChild(taula);
    taula_modificar_habilitat(posicio);

}

function taula_modificar_habilitat(posicio) {
    let crear_div = document.createElement("div");

    let div = document.getElementById("Actualitza");
    div.classList.add("nou_personatge");
    document.getElementById("TaulaH").classList.remove("Taula");

    div.appendChild(crear_div);
    console.log(posicio_global);

    for (let propiedad in personatges[posicio_global].habilitat[posicio]) {
        let p = document.createElement("p");
        p.appendChild(document.createTextNode(propiedad.toUpperCase()));
        crear_div.appendChild(p);

        if (propiedad == "id") {
            let input = document.createElement("input");
            input.value = personatges[posicio_global].habilitat[posicio][propiedad];
            input.setAttribute("id", "formId");
            input.setAttribute("disabled", true);
            crear_div.appendChild(input);

        } else if (propiedad == "efecte") {

            for (let i = 0; i < 4; i++) {
                switch (i) {
                    case 0:
                        caracteristica = "Atac";
                        break;
                    case 1:
                        caracteristica = "Defensa";
                        break;
                    case 2:
                        caracteristica = "Suport";
                        break;
                    case 3:
                        caracteristica = "Cura";
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

            let tipus_marcados = personatges[posicio_global].habilitat[posicio][propiedad].split("-");
            console.log(tipus_marcados);

            for (let i = 0; i < tipus_marcados.length; i++) {
                let input = document.getElementById(tipus_marcados[i]);
                input.setAttribute("checked", true);
            }

        } else if (propiedad == "tipus") {


            let efecte_seleccionado = personatges[posicio_global].habilitat[posicio][propiedad];
            console.log("Tipus: " + efecte_seleccionado);

            for (let i = 0; i < 2; i++) {

                switch (i) {
                    case 0:
                        efecte = "Fisic";
                        break;
                    case 1:
                        efecte = "Magic";
                        break;
                }

                let input = document.createElement("input");
                input.setAttribute("type", "radio");
                input.setAttribute("id", efecte);
                input.setAttribute("class", "radio");
                input.setAttribute("name", "efecte");

                if (efecte_seleccionado == efecte){
                    input.setAttribute("checked", true);
                }

                let label = document.createElement("label");
                label.setAttribute("for", efecte);
                label.innerText = efecte;
                crear_div.appendChild(input);
                crear_div.appendChild(label);

            }

        } else {
            let input = document.createElement("input");
            input.value = personatges[posicio_global].habilitat[posicio][propiedad];
            crear_div.appendChild(input);
        }
    }

    let br = document.createElement("br");
    crear_div.appendChild(br);
    let br2 = document.createElement("br");
    crear_div.appendChild(br2);

    let boto = document.createElement("button");

    boto.appendChild(document.createTextNode("Acceptar"));
    boto.setAttribute("id", "Acceptar");
    crear_div.appendChild(boto);

    pos_global = posicio;

    boto.addEventListener("click", acceptar_modificacio_habilitat);

    let boto2 = document.createElement("button");

    boto2.appendChild(document.createTextNode("Cancelar"));
    boto2.setAttribute("id", "Cancelar");
    crear_div.appendChild(boto2);

    boto2.addEventListener("click", cancelar_modificacio_habilitat);
}

function acceptar_modificacio_habilitat() {

    let id = document.getElementsByTagName("input")[0].value;
    let nom = document.getElementsByTagName("input")[1].value;
    let efecte = document.getElementsByClassName("checkbox");
    let efectes_marcats = "";

    for (let i = 0; i < efecte.length; i++) {
        if (efecte[i].checked == true) {
            efectes_marcats += efecte[i].id + "-";
        }
    }

    if (efectes_marcats.charAt(efectes_marcats.length - 1) == "-") {
        efectes_marcats = efectes_marcats.slice(0, -1);
    }

    let tipus = document.getElementsByClassName("radio");
    let valTipus = "";

    if (tipus[0].checked){
        valTipus = tipus[0].id;
    } else if (tipus[1].checked){
        valTipus = tipus[1].id;
    }

    personatges[posicio_global].habilitat[pos_global].id = id;
    personatges[posicio_global].habilitat[pos_global].nom = nom;
    personatges[posicio_global].habilitat[pos_global].tipus = valTipus;
    personatges[posicio_global].habilitat[pos_global].efecte = efectes_marcats;

    let taula = document.getElementById("Actualitza").firstChild;
    taula.parentNode.removeChild(taula);

    genera_tabla_habilitat();
}

function cancelar_modificacio_habilitat() {
    let taula = document.getElementById("Actualitza").firstChild;
    taula.parentNode.removeChild(taula);

    genera_tabla_habilitat();
}

function comprovar_dades_habilitats(){

    let efectes = document.getElementsByClassName("checkbox");
    let errors = false;
    let cadena = "";
    cadena_errors = "";
    let contador = 0;

    if (document.getElementsByTagName("input")[1].value == ""){
        document.getElementsByTagName("input")[1].style.borderColor = "red";
        cadena += "\nEl nom és obligatori";
    }

    for (let i = 0; i < efectes.length; i++){
        if (efectes[i].checked == false) contador++;
    }

    if (contador == 4){
        errors = true;
        cadena += "Has de marcar una efecte mínim";
    }

    cadena_errors = cadena;
    return errors;

}
