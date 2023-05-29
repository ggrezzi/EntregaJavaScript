
class Autos {
    //Clase Autos. Sera la clase de mis objetos autos.

    constructor (id,marca,modelo,color,ano,km,precio,descripcion,idEmpresa,fotos=[]){
        this.id=id;
        this.marca=marca;
        this.modelo=modelo;
        this.color=color;
        this.ano=ano;
        this.km=km;
        this.precio=precio;
        this.descripcion=descripcion;
        this.idEmpresa=idEmpresa;
        this.fotos=fotos; //--> Array con los nombres de las fotos
    }

}

// inicializando las variables que voy a estar usando a lo largo de todo el codigo.
let listaAutos=[];
let code=""; 


function inicio(){
    //funcion que reinicia la lista de autos (lo ideal seria sacar esta info de una DB,)
    //Esta funcion ya no es necesaria. La dejo comentada para no borrar trabajo hecho para entregas
    //anteriores.
    if (listaAutos.lengh==0){
        fetchP();
        if (listaAutos==null){
            listaAutos=[];
            //Esto va mientras no tenga acceso a archivos o DB en donde pueda guardar la lista de autos
            fotos = [];
            fotos.push("BelAir1.webp");
            fotos.push("BelAir2.webp");
            fotos.push("BelAir3.webp");
            fotos.push("BelAir4.webp");
            fotos.push("BelAir5.webp");
            fotos.push("BelAir6.webp");
            listaAutos.push(new Autos("Chevrolet", "BelAir", "Beige", 1956,248000, 12900, "motor y caja original 6 cilidros automatico , exelente estado",fotos)); 
            fotos = [];
            fotos.push("BMW5251.webp");
            fotos.push("BMW5252.webp");
            fotos.push("BMW5253.webp");
            fotos.push("BMW5254.webp");
            fotos.push("BMW5255.webp");
            fotos.push("BMW5256.webp");
            listaAutos.push(new Autos("BMW", "525", "Gris Oscuro", 2007,160000, 29900, "Bmw 525 i e60 paquete M de fábrica , excelente estado",fotos)); 
            fotos = [];
        }

    }
    
    
    
}


function agregarAuto(){
    
    //Funcion para agregar autos a la base de datos.
    //Agarramos toda la informacio del formulario presentado.
    //el ID del auto lo creo con valor 0 ya que ese se numera automaticamente
    //al instertar el auto en la DB.
    //El valor de IdEmpresa lo fuerzo a que sea 1 ya que es la unica empresa
    //con la que por ahora estamos trabajando. (La idea gral es que este backend y DB pueda ser
    //usada por otras automotoras para luego crear una web interactiva)

    let form = document.getElementById("agregarVehiculo");
    for (let index = 0; index < form.length; index++) {
        switch (form.elements[index].name) {
            case "marca":
                marca = form.elements[index].value;
                break;
            case "modelo":
                modelo = form.elements[index].value;
                break;
            case "color":
                color = form.elements[index].value;
                break;
            case "ano":
                ano = form.elements[index].value;
                break;
            case "km":
                km = form.elements[index].value;
                break;
            case "precio":
                precio = form.elements[index].value;
                break;
            case "texto":
                texto = form.elements[index].value;
                break;
            case "fotos":
                tempfotos = form.elements[index].value;
                break;    
            default:
                break;
        }
    }
    fotos = [];
    //tomando el nombre generico de las fotos, le agrego un indice al final del nombre pero antes de la extencion
    let comienzoExt = tempfotos.indexOf(".");
    for (let i = 1; i <= 6; i++) {
        fotos.push(tempfotos.substr(0,(comienzoExt))+i+tempfotos.substr(comienzoExt,(tempfotos.length-1)));        
    }

    //Agregando el nuevo objeto a la base de datos usando uan API POST

    const autoNuevo = new Autos(0,marca, modelo, color, ano,km, precio, texto,1,fotos);
    //console.log("Este es el auto nuevo:");
    //console.log(autoNuevo)
    //console.log("id empresa")
    //console.log(autoNuevo.idEmpresa);
    listaAutos.push(autoNuevo);
    /*var xhr = new XMLHttpRequest();
    var url = "https://localhost:5001/api/Auto/add";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log("xhr readyState")
    console.log(xhr.readyState);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 ) {
            console.log(xhr.status);
            console.log(xhr.responseText);
            //var json = JSON.parse(xhr.responseText);
        }
    };
    var data = JSON.stringify(autoNuevo);
    console.log("data");
    console.log(data);
    xhr.send(data);
    */
    //Aviso que el auto fue agregado satisfactoriamente a la base de datos.
    //No controlo si la API devuelve True or False ya que controlo todos los campos con javascript.

    newElement = document.createElement("p");
    newElement.setAttribute("id","textoAceptar")
    document.getElementById("agregarVehiculo").appendChild(newElement);
    document.getElementById("textoAceptar").innerHTML="El nuevo Vehiculo ha sido agregado";

    
    document.getElementById("accion").value="opcion";
    localStorage.setItem("lista",JSON.stringify(listaAutos));
    //fetchAutos();
    //getAuto();

}


function  quitarVehiculo () {

    //Quitamos el Auto seleccionado de la DB mandando el ID del mismo.
    //en la API directo quitamos tambien las fotos.
    let nroVehiculo=parseInt(document.getElementById("seleccionVehiculo").value);
    //fetch('https://localhost:5001/api/Auto/' + nroVehiculo,  {
    //  method: 'DELETE'
    //})
    
    //limpiarTemporal();
    newElement =  document.createElement("p") ;
    newElement.setAttribute("id","textoMensaje");
    document.getElementById("temporal").appendChild(newElement);
    document.getElementById("textoMensaje").innerHTML="Vehiculo borrado";
    console.log(nroVehiculo);
    listaAutos.splice(nroVehiculo,1)
    console.log(listaAutos) 
    //fetchAutos();
    //getAuto();
    document.getElementById("accion").value="opcion";
    //fetchAutos();
    //getAuto();
    localStorage.setItem("lista",JSON.stringify(listaAutos));
}

function calculoFinanciacion(){
    //La automotora ofrece financiacion propia. Con esta funcion calcularemos los intereses, 
    //el valor de cada cuota y el precio total financiad.
    let meses=0;
    let monto=0;
    let total=0;
    let form = document.getElementById("formularioFinanciacion");
    for (let index = 0; index < form.length; index++) {
        if (form.elements[index].name=="meses"){
            meses = parseInt(form.elements[index].value);
        }
        if (form.elements[index].name=="monto"){
            monto = parseInt(form.elements[index].value);
        }
        if (form.elements[index].name=="precio"){
            total = parseInt(form.elements[index].value);
        }
    }
    if (meses>24 || meses<1) {
        //la financiacion solo se permite como maximo en 24 meses.
        document.querySelector(".resultado").innerHTML="";
        document.querySelector(".error").innerHTML="Solamente se financian entre 1 y 24 meses. Intente nuevamente"
    }
    else{
        if (monto> (total/2) || monto<1) {
            //Error si el monto solicitado como financiacion es mayor que el 50% del valor del vehiculo
            //o si el monto es menor a 1
            document.querySelector(".resultado").innerHTML="";
            document.querySelector(".error").innerHTML="El monto a financiar debe ser entre 1 y "+(total/2)+". Intente nuevamente";
        }
        else{
        //Ya pasando los controles, se calculan los valores de Cuota y PTF.
        let intereses=2*meses;
        let ptf=total+monto*(intereses/100);
        let cuotas=(monto*(1+(intereses/100)))/meses;
        document.querySelector(".resultado").innerHTML="El costo de cada cuota es de : "+cuotas+"\r\nEl costo total es de "+ptf;
        document.querySelector(".error").innerHTML=""
        }    
    }
}

/*
const getAuto = async () => {
    //funcion para recuperar la lista de autos desde la DB.
    //enviamos el IdEmpresa (en este caso 1) y recibimos todos los autos de la misma.
    listaAutos=[];
    const resp = await fetch('https://localhost:5001/api/Auto/1');
    listaAutos = await resp.json();
    console.log("Lista de autos conseguidas por JSON:")
    console.log(listaAutos)
    console.log(window.location.href);
    if (window.location.href.indexOf('productos.html')>0){
    cargarAutos()}
}
*/




function cargarAutos(){
    
    //funcion que carga todas las cards de cada auto en el array listaAutos
    row=0
    // recobrando la lista del localStorage para no perder los autos agregados.
    listaAutos=JSON.parse(localStorage.getItem("lista"));
    for (let index = 0; index < listaAutos.length; index++) {
        console.log("test");
        const tempAuto = listaAutos[index];
        //me agrego una ROW por cada 3 autos ya que cada tarjeta ocupa 4 cols de las 12 que van por pagina.
        if (index==0 || ((index)%3==0)){
            row=row+1;
            let newRow = document.createElement("div");
            newRow.classList.add("row");
            newRow.classList.add("linea"+row);
            document.querySelector(".cards").appendChild(newRow);
        }     

        let newElement = document.createElement("div");
        newElement.classList.add("col-lg-4");
        newElement.classList.add("mb-3");
        newElement.classList.add("d-flex");
        newElement.classList.add("align-items-stretch");
        newElement.classList.add("auto"+index);
        document.querySelector(".linea"+row).appendChild(newElement);

        newElement = document.createElement("div");
        newElement.classList.add("card"+index);
        newElement.classList.add("card");
        document.querySelector(".auto"+index).appendChild(newElement);

        newElement = document.createElement("div");
        newElement.classList.add("carousel");
        newElement.classList.add("slide");
        newElement.setAttribute("id","carousel"+index);
        document.querySelector(".card"+index).appendChild(newElement);

        newElement = document.createElement("div");
        newElement.classList.add("carousel-inner");
        newElement.setAttribute("id","inner"+index);
        document.getElementById("carousel"+index).appendChild(newElement);
        tempFotos = tempAuto.fotos;
        id="inner"+index;
        indexAuto=index;
        tempFotos.forEach((element,index) => {
            //recorro el array de nombre de las fotos para agregarlas al carousel de imagenes.
            newElement =  document.createElement("div");    
            newElement.classList.add("carousel-item");
            if (index==0){
                newElement.classList.add("active");
            }
            newElement.setAttribute("id","foto"+index+"auto"+indexAuto);
            document.getElementById(id).appendChild(newElement);
            newElement =  document.createElement("img") ;
            newElement.classList.add("d-block");
            newElement.classList.add("w-100");
            newElement.setAttribute("src","../img/"+element);
            newElement.setAttribute("height","250px");
            document.getElementById("foto"+index+"auto"+indexAuto).appendChild(newElement);
        });

        //agrego botones de PREV y NEXT en el carousel.
        //PREV
        newElement =  document.createElement("button") ;
        newElement.classList.add("carousel-control-prev");
        newElement.setAttribute("type","button");
        newElement.setAttribute("data-bs-target","#carousel"+index);
        newElement.setAttribute("data-bs-slide","prev");
        newElement.setAttribute("id","botonPrev"+index);
        document.getElementById("carousel"+index).appendChild(newElement);
        newElement =  document.createElement("span") ;
        newElement.classList.add("carousel-control-prev-icon");
        newElement.setAttribute("aria-hidden","true");
        document.getElementById("botonPrev"+index).appendChild(newElement);
        newElement =  document.createElement("span") ;
        newElement.classList.add("visually-hidden");
        node = document.createTextNode("Anterior");
        newElement.appendChild(node);
        document.getElementById("botonPrev"+index).appendChild(newElement);
        //NEXT
        newElement =  document.createElement("button") ;
        newElement.classList.add("carousel-control-next");
        newElement.setAttribute("type","button");
        newElement.setAttribute("data-bs-target","#carousel"+index);
        newElement.setAttribute("data-bs-slide","next");
        newElement.setAttribute("id","botonNext"+index);
        document.getElementById("carousel"+index).appendChild(newElement);
        newElement =  document.createElement("span") ;
        newElement.classList.add("carousel-control-next-icon");
        newElement.setAttribute("aria-hidden","true");
        document.getElementById("botonNext"+index).appendChild(newElement);
        newElement =  document.createElement("span") ;
        newElement.classList.add("visually-hidden");
        node = document.createTextNode("Siguiente");
        newElement.appendChild(node);
        document.getElementById("botonNext"+index).appendChild(newElement);


        newElement = document.createElement("div");
        newElement.classList.add("card-body");
        newElement.classList.add("d-flex");
        newElement.classList.add("flex-column");
        newElement.setAttribute("id","texto"+index);
        document.querySelector(".card"+index).appendChild(newElement);

        newElement =  document.createElement("h5") ;
        newElement.classList.add("card-title");
        node = document.createTextNode(tempAuto.marca+" "+tempAuto.modelo);
        newElement.appendChild(node);
        document.getElementById("texto"+index).appendChild(newElement);
        newElement =  document.createElement("p") ;
        newElement.classList.add("card-title");
        newElement.classList.add("mb-4");
        newElement.setAttribute("id","datosAuto"+index);
        document.getElementById("texto"+index).appendChild(newElement);
        document.getElementById("datosAuto"+index).innerHTML="Color: "+tempAuto.color+"<br>Año: "+tempAuto.ano+"<br>KM: "+tempAuto.km+"<br>Precio: "+tempAuto.precio+"<br>"+tempAuto.descripcion;
        newElement =  document.createElement("a");
        newElement.setAttribute("target","_blank");
        newElement.setAttribute("href","https://wa.me/+59898344452?text=Hola.%20Quisiera%20mas%20informacion%20sobre%20el%20auto%20"+tempAuto.marca+"%20modelo"+tempAuto.modelo+"%20Desde%20ya%20muchas%20gracias");
        newElement.classList.add("btn");
        newElement.classList.add("btn-secondary");
        newElement.classList.add("mt-auto");
        newElement.classList.add("align-self-start");
        node = document.createTextNode("Solicitar mas info");
        newElement.appendChild(node);
        document.getElementById("texto"+index).appendChild(newElement);

        newElement =  document.createElement("a");
        newElement.setAttribute("href","financiacion.html?precio="+tempAuto.precio);
        newElement.classList.add("btn");
        newElement.classList.add("btn-secondary");
        newElement.classList.add("mt-auto");
        newElement.classList.add("align-self-start");
        node = document.createTextNode("Calcular/solicitar financiacion");
        newElement.appendChild(node);
        document.getElementById("texto"+index).appendChild(newElement);

    }
    
}


function limpiar(){
    //limpiando la lista para que queden solo los 2 autos por defecto
    listaAutos=null;
    localStorage.setItem("lista",JSON.stringify(listaAutos));
    console.log(listaAutos);
}


function financiacion () {
    //calculo de la financiacion. Carga formulario y pone por defecto el valor del vehiculo seleccionado
    //el maximo de meses y el maximo posible a financiar.
    const url =window.location.href
    const urlParams = new URL(url).searchParams;
    code = urlParams.get("precio");
    console.log(code);
    if (code=="" || code==null){document.getElementById("precio").removeAttribute("disabled");}
    else {document.getElementById("precio").setAttribute("value",code);}
    document.getElementById("monto").setAttribute("value",(code/2));
    document.getElementById("montolabel").innerHTML="Monto a finananciar (Debe ser igual o menor a "+(code/2)+")";
    document.getElementById("meses").setAttribute("value",24);
}



function formAdmin(){
    //lista de opciones en admin

    //Esto incluye "Agregar un auto"
    //             "Borrar un auto"
    listaAutos=JSON.parse(localStorage.getItem("lista"));
    let opcion = document.getElementById("accion").value;
    switch (opcion) {
        case "opcion":
            //Limpio la pantalla
            limpiarTemporal();
            break;
    
        case "agregar":
            //creo el formulario para agregar un auto.
            //en la parte de FOTOS, hay que ingresar el nombre general de los archivos y 
            //el sistema automaticamente le agrega del 1 al 6 para que suban 6 fotos con el mismo nombre
            //Ej: BMW1.JPG , BMW2.JPG. ETC...
            limpiarTemporal();
            newElement =  document.createElement("form") ;
            newElement.classList.add("agregarVehiculo");
            newElement.setAttribute("id","agregarVehiculo");
            document.getElementById("temporal").appendChild(newElement);


            newElement =  document.createElement("label") ;
            newElement.setAttribute("for","marca");
            newElement.setAttribute("id","labelMarca");
            document.getElementById("agregarVehiculo").appendChild(newElement);
            document.getElementById("labelMarca").innerHTML="Marca:";
            newElement =  document.createElement("br") ;
            document.getElementById("agregarVehiculo").appendChild(newElement);

            newElement =  document.createElement("input") ;
            newElement.setAttribute("type","text");
            newElement.setAttribute("id","marca");
            newElement.setAttribute("name","marca");
            document.getElementById("agregarVehiculo").appendChild(newElement);
            newElement =  document.createElement("br") ;
            document.getElementById("agregarVehiculo").appendChild(newElement);

            newElement =  document.createElement("label") ;
            newElement.setAttribute("for","modelo");
            newElement.setAttribute("id","labelModelo");
            document.getElementById("agregarVehiculo").appendChild(newElement);
            document.getElementById("labelModelo").innerHTML="Modelo:";
            newElement =  document.createElement("br") ;
            document.getElementById("agregarVehiculo").appendChild(newElement);

            newElement =  document.createElement("input") ;
            newElement.setAttribute("type","text");
            newElement.setAttribute("id","modelo");
            newElement.setAttribute("name","modelo");
            document.getElementById("agregarVehiculo").appendChild(newElement);
            newElement =  document.createElement("br") ;
            document.getElementById("agregarVehiculo").appendChild(newElement);

            newElement =  document.createElement("label") ;
            newElement.setAttribute("for","color");
            newElement.setAttribute("id","labelColor");
            document.getElementById("agregarVehiculo").appendChild(newElement);
            document.getElementById("labelColor").innerHTML="Color:";
            newElement =  document.createElement("br") ;
            document.getElementById("agregarVehiculo").appendChild(newElement);

            newElement =  document.createElement("input") ;
            newElement.setAttribute("type","text");
            newElement.setAttribute("id","color");
            newElement.setAttribute("name","color");
            document.getElementById("agregarVehiculo").appendChild(newElement);
            newElement =  document.createElement("br") ;
            document.getElementById("agregarVehiculo").appendChild(newElement);

            newElement =  document.createElement("label") ;
            newElement.setAttribute("for","ano");
            newElement.setAttribute("id","labelAno");
            document.getElementById("agregarVehiculo").appendChild(newElement);
            document.getElementById("labelAno").innerHTML="Año:";
            newElement =  document.createElement("br") ;
            document.getElementById("agregarVehiculo").appendChild(newElement);

            newElement =  document.createElement("input") ;
            newElement.setAttribute("type","number");
            newElement.setAttribute("id","ano");
            newElement.setAttribute("name","ano");
            document.getElementById("agregarVehiculo").appendChild(newElement);
            newElement =  document.createElement("br") ;
            document.getElementById("agregarVehiculo").appendChild(newElement);

            newElement =  document.createElement("label") ;
            newElement.setAttribute("for","km");
            newElement.setAttribute("id","labelKm");
            document.getElementById("agregarVehiculo").appendChild(newElement);
            document.getElementById("labelKm").innerHTML="Km:";
            newElement =  document.createElement("br") ;
            document.getElementById("agregarVehiculo").appendChild(newElement);

            newElement =  document.createElement("input") ;
            newElement.setAttribute("type","number");
            newElement.setAttribute("id","km");
            newElement.setAttribute("name","km");
            document.getElementById("agregarVehiculo").appendChild(newElement);
            newElement =  document.createElement("br") ;
            document.getElementById("agregarVehiculo").appendChild(newElement);

            newElement =  document.createElement("label") ;
            newElement.setAttribute("for","precio");
            newElement.setAttribute("id","labelPrecio");
            document.getElementById("agregarVehiculo").appendChild(newElement);
            document.getElementById("labelPrecio").innerHTML="Precio:";
            newElement =  document.createElement("br") ;
            document.getElementById("agregarVehiculo").appendChild(newElement);

            newElement =  document.createElement("input") ;
            newElement.setAttribute("type","number");
            newElement.setAttribute("id","precio");
            newElement.setAttribute("name","precio");
            document.getElementById("agregarVehiculo").appendChild(newElement);
            newElement =  document.createElement("br") ;
            document.getElementById("agregarVehiculo").appendChild(newElement);

            newElement =  document.createElement("label") ;
            newElement.setAttribute("for","texto");
            newElement.setAttribute("id","labelTexto");
            document.getElementById("agregarVehiculo").appendChild(newElement);
            document.getElementById("labelTexto").innerHTML="Descripcion:";
            newElement =  document.createElement("br") ;
            document.getElementById("agregarVehiculo").appendChild(newElement);

            newElement =  document.createElement("input") ;
            newElement.setAttribute("type","text");
            newElement.setAttribute("id","texto");
            newElement.setAttribute("name","texto");
            document.getElementById("agregarVehiculo").appendChild(newElement);
            newElement =  document.createElement("br") ;
            document.getElementById("agregarVehiculo").appendChild(newElement);

            newElement =  document.createElement("label") ;
            newElement.setAttribute("for","fotos");
            newElement.setAttribute("id","labelFotos");
            document.getElementById("agregarVehiculo").appendChild(newElement);
            document.getElementById("labelFotos").innerHTML="Nombre de las imagenes:";
            newElement =  document.createElement("br") ;
            document.getElementById("agregarVehiculo").appendChild(newElement);

            newElement =  document.createElement("input") ;
            newElement.setAttribute("type","text");
            newElement.setAttribute("id","fotos");
            newElement.setAttribute("name","fotos");
            document.getElementById("agregarVehiculo").appendChild(newElement);
            newElement =  document.createElement("br") ;
            document.getElementById("agregarVehiculo").appendChild(newElement);

            newElement =  document.createElement("label") ;
            newElement.setAttribute("id","ejemploFotos");
            document.getElementById("agregarVehiculo").appendChild(newElement);
            document.getElementById("ejemploFotos").innerHTML="Ej: jeep.webp, BMW525.jpg, etc.";
            newElement =  document.createElement("br") ;
            document.getElementById("agregarVehiculo").appendChild(newElement);

            newElement =  document.createElement("br") ;
            document.getElementById("agregarVehiculo").appendChild(newElement);

            newElement =  document.createElement("button") ;
            newElement.setAttribute("type","button");
            newElement.setAttribute("value","agregarAuto");
            newElement.setAttribute("onclick","agregarAuto()");
            newElement.setAttribute("id","botonAgregarAuto");
            document.getElementById("agregarVehiculo").appendChild(newElement);
            document.getElementById("botonAgregarAuto").innerHTML="Aceptar";

            break;

        case "borrar":
            //Borro un auto X mandando el ID por API
            limpiarTemporal();
            newElement =  document.createElement("form") ;
            newElement.classList.add("quitarVehiculo");
            newElement.setAttribute("id","quitarVehiculo");
            document.getElementById("temporal").appendChild(newElement);

            newElement =  document.createElement("select") ;
            newElement.classList.add("seleccionVehiculo");
            newElement.setAttribute("id","seleccionVehiculo");
            document.getElementById("quitarVehiculo").appendChild(newElement);

            for (let index = 0; index < listaAutos.length; index++) {
                const element = listaAutos[index];
                newElement =  document.createElement("option") ;
                newElement.setAttribute("value",index);
                newElement.setAttribute("id","auto"+index);
                document.getElementById("seleccionVehiculo").appendChild(newElement);
                document.getElementById("auto"+index).innerHTML=element.marca+" "+element.modelo+" "+element.color;
            }

            newElement =  document.createElement("br") ;
            document.getElementById("quitarVehiculo").appendChild(newElement);
            newElement =  document.createElement("button") ;
            newElement.setAttribute("type","button");
            newElement.setAttribute("value","quitarVehiculo");
            //newElement.setAttribute("onclick","quitarVehiculotest()");
            //newElement.setAttribute("onclick","test()");
            newElement.setAttribute("id","botonQuitarVehiculo");
            document.getElementById("quitarVehiculo").appendChild(newElement);
            document.getElementById("botonQuitarVehiculo").innerHTML="Borrar auto seleccionado";
            newElement =  document.createElement("button") ;
            newElement.setAttribute("type","button");
            newElement.setAttribute("value","cancelar");
            newElement.setAttribute("onclick","limpiarTemporal()");
            newElement.setAttribute("id","cancelar");
            document.getElementById("quitarVehiculo").appendChild(newElement);
            document.getElementById("cancelar").innerHTML="Cancelar";
            document.getElementById("botonQuitarVehiculo").addEventListener("click", quitarVehiculo)
            break;
    
        case "limpiar":
            limpiarTemporal();

            document.getElementById("acciones").appendChild(newElement);
            newElement = document.createElement("div");
            newElement.setAttribute("id","limpiarLista");
            document.getElementById("temporal").appendChild(newElement);
            newElement = document.createElement("p");
            newElement.setAttribute("id","textoConfimacion");
            document.getElementById("limpiarLista").appendChild(newElement);
            document.getElementById("textoConfimacion").innerHTML="Si acepta se borraran todos los cambios en la lista y se volvera a la original del BelAir y el BMW.";
            newElement =  document.createElement("button") ;
            newElement.setAttribute("type","button");
            newElement.setAttribute("value","aceptar");
            newElement.setAttribute("onclick","limpiar(),inicio(),limpiarTemporal()");
            newElement.setAttribute("id","aceptar");
            document.getElementById("limpiarLista").appendChild(newElement);
            document.getElementById("aceptar").innerHTML="Aceptar";
            newElement =  document.createElement("button") ;
            newElement.setAttribute("type","button");
            newElement.setAttribute("value","cancelar");
            newElement.setAttribute("onclick","limpiarTemporal()");
            newElement.setAttribute("id","cancelar");
            document.getElementById("limpiarLista").appendChild(newElement);
            document.getElementById("cancelar").innerHTML="Cancelar";
            break;
    }

}

function limpiarTemporal(){
    var parent = document.getElementById("acciones");
    var child = document.getElementById("temporal");
    parent.removeChild(child);
    newElement =  document.createElement("div") ;
    newElement.setAttribute("id","temporal");
    document.getElementById("acciones").appendChild(newElement);
}



function fetchP(){
    if (listaAutos.length==0){
    //no tiene www. o https quiere decir que es una ruta relativa en local
    fetch('data.json')
        .then( (res) => res.json())
        //cuando yo ya recuperé el texto y lo convertí en objeto nuevamente (res.json)
        .then( (res) => {
            localStorage.setItem("lista",JSON.stringify(res));
            res.forEach((producto) => {
                listaAutos.push(producto);
            })
        })
    }
}

