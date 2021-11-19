//Referenciamos al div padre de las mesas
const divPadre = document.getElementById('historialDiv');

//Referenciamos al div padre de las option mesas
const selectPadre = document.getElementById('mesas');

const comidas = document.getElementById('comidas');
const btnCrearMesas = document.getElementById('crearMesas');
const nuevasMesas = document.getElementById('nuevasMesas');
const cantidadProducto = document.getElementById('cantidad');
const btnenviarComanda = document.getElementById('enviarComanda');
const historialComanda = document.getElementById('historialComandas');

btnCrearMesas.addEventListener('click', crearMesa);
btnenviarComanda.addEventListener('click', agregarComanda);

//Este array contiene el nombre de las mesas.
var mesasBar = [];
//Este array tiene cada cuadrado que seria la mesa
var misNodos = [];
//Este array tiene los option del select de mesas
var mesasNodos = [];
//Este array contiene las comandas
var comandas = [];

//Este array contiene los platos
const platos = [
    { id: 0, nombre: "Ravioles", precio: 300 },
    { id: 1, nombre: "Milanesa", precio : 400 },
    { id: 2, nombre: "Papas Fritas", precio: 270 },
    { id: 3, nombre: "Hamburguesa", precio: 260 },
    { id: 4, nombre: "Coca-Cola", precio: 100 },
    { id: 5, nombre: "Sprite", precio: 150 },
    { id: 6, nombre: "Pepsi", precio: 150 },
  ];



function crearMesa() {

    //Borramos las mesas para generar las nuevas.
    mesasBar.splice(0, mesasBar.length);

   //Creando los nombres de las mesas
   for (let index = 0; index < Number(nuevasMesas.value); index++) {
       let nombre = `Mesa ${index}`
       mesasBar.push(nombre)
   }

   creadorDeNodos();

}

function creadorDeNodos() {

    eliminarHijos();

    //Ademas de borrar los nodos hijos, es necesario dejar vacio los arrays para no dejar elementos.
    //Me olvide de vaciar el de mesasNodos y se rompio todo el <select> jajaja.

    misNodos.splice(0, misNodos.length);
    mesasNodos.splice(0, mesasNodos.length);
    
    //Creamos los nodos
    for (let index = 0; index < mesasBar.length; index++) {        
        
        //Este nodo es para la mesa (el cuadrado verde).
        let nodo = document.createElement('div');
        
        //Este nodo es para los option del select
        let nodoSelect = document.createElement('option');

        //Aprovechando el for, creamos los nombre aptos para agregar al nodo
        //Es el mismo para los div y los option
        let textNode = document.createTextNode(mesasBar[index]);   

        //Agregamos el texto que vamos creando al nuevo nodo        
        nodo.appendChild(textNode);
        nodoSelect.appendChild(textNode);

        //Se supone que aca le agregamos el nombre al nodo, en las mesas no aparece jaja (raaro)
        divPadre.appendChild(nodo)
        selectPadre.appendChild(nodoSelect);

        misNodos.push(nodo)
        mesasNodos.push(nodoSelect)
        
    }   
    
    agregarClass();

}

function agregarClass() {

    if ( misNodos.length > 0) {

        //Recorremos los nodos y le asignamos una clase
        for (let index = 0; index < misNodos.length; index++) {
            misNodos[index].setAttribute('class', 'mesasBar');            
        }

    } else {
        alert('Se debe ingresar al menos una mesa')
    }

}

function eliminarHijos() {

    console.clear()

    //misNodos tiene todos los divs hijos de la etiqueta padre divPadre
    //recorro a misNodos y por cada elemento iterado, lo voy quitando del padre
    //El mismo mecanismo se aplica al select con sus options.
    
    for (let index = 0; index < misNodos.length; index++) {  
        //console.log('borrando misNodos',misNodos[index])
        divPadre.removeChild(misNodos[index]);            
    }

    for (let index = 0; index < mesasNodos.length; index++) {    
        //console.log('borrando mesasNodos',mesasNodos[index])                    
        selectPadre.removeChild(mesasNodos[index]);
    } 


}

function agregarComanda() {
    const busqueda = platos.find(plato => plato.nombre === comidas.value)
    var obj = {
        mesa: mesas.value, 
        producto: comidas.value,
        cantidad: Number(cantidad.value), 
        precio: busqueda.precio * Number(cantidad.value)
    }
    comandas.push(obj)
    mostrarHistorial();
}

function mostrarHistorial() {
    historialComanda.innerHTML = ' ';
    historialComanda.innerHTML = " <span>  Historial de Comandas </span> <br />"
    for (let index = 0; index < comandas.length; index++) {
        const element = comandas[index];
        historialComanda.innerHTML += `<span> ${element.mesa} - ${element.producto} </span> <br />`;
    }
    console.log(historialComanda);
}       




