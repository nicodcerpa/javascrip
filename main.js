//CAPTURA DOM
let containersahumerio = document.getElementById("sahumerio")
let formCargarsahumerio = document.getElementById("formCargarsahumerio")
let selectOrden = document.getElementById("selectOrden")
let buscador = document.getElementById("buscador")
let coincidenciasDiv = document.getElementById("coincidencias")
let modalBodyCarrito = document.getElementById("modal-bodyCarro")
let botonCarrito = document.getElementById("botonCarrito")
let precioTotal = document.getElementById("precioTotal")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
let productosCarrito = [];




//FUNCTIONS
//MOSTRAR CATALOGO
function mostrarCatalogoDOM(array){
    containersahumerio.innerHTML = ""
    for(let sahumerio of array){
        
        let sahumerioNuevoDiv= document.createElement("div")
        sahumerioNuevoDiv.className = "col-12 col-md-6 col-lg-4 my-2"
        sahumerioNuevoDiv.innerHTML = `
            <div id="${sahumerio.id}" class="card" style="width: 18rem;">
                    <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${sahumerio.imagen}" alt="${sahumerio.titulo} de ${sahumerio.marca} ">
                    <div class="card-body">
                        <h4 class="card-title"></h4>
                        <p>Marca: ${sahumerio.marca}</p>
                        <p>${sahumerio.titulo}</p>
                        <p class="${sahumerio.precio <= 1000 && "oferta"}">Precio: ${sahumerio.precio}</p>
                    <button id="agregarBtn${sahumerio.id}" class="btn btn-outline-success">Agregar al carrito</button>
                    </div>
        </div> `
        containersahumerio.append(sahumerioNuevoDiv)
        let agregarBtn = document.getElementById(`agregarBtn${sahumerio.id}`)
        //
        agregarBtn.addEventListener("click", () => {
            agregarAlCarro(sahumerio)
        })
    }
}

//AGREGAR AL CARRITO
function agregarAlCarro(elemento){
    
    let sahumerioAgregado = productosCarrito.find((sahumerio) => sahumerio.id == elemento.id)
    

    sahumerioAgregado == undefined ?  
            (
            productosCarro.push(elemento),
            
            localStorage.setItem("carrito", JSON.stringify(productosCarro)),
            Toastify({
                text: `El sahumerio ${elemento.titulo} ha sido sumado al carrito`,
                duration: 3000,
                gravity: "bottom", 
                position: "right", 
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
              }).showToast()) :
              Toastify({
                text: `El sahumerio ${elemento.titulo} ya existe en el carrito`,
                duration: 2500,
                gravity: "top", 
                position: "center", 
                style: {
                  background: "linear-gradient(to right, red, orange)",
                  color: "black",
                  fontWeight: "bold"
                },
              }).showToast()
}
//CARGAR PRODUCTOS
function cargarProductosCarro(array){
    modalBodyCarrito.innerHTML = ""
    array.forEach(
        (productoCarrito) => {
            modalBodyCarrito.innerHTML += `
            <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
                 <img class="card-img-top" height="300px" src="assets/${productoCarrito.imagen}" alt="">
                 <div class="card-body">
                        <h4 class="card-title">${productoCarrito.titulo}</h4>
                        <p class="card-text">${productoCarrito.marca}</p>
                         <p class="card-text">$${productoCarrito.precio}</p> 
                         <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                 </div>    
            </div>
            `
        }
    )
    //BORRAR LO QUE ESTA EN EL CARRITO
    array.forEach(
        (productoCarrito) => {
            document.getElementById(`botonEliminar${productoCarrito.id}`).
            addEventListener("click", () =>{

                let cardproducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
                cardproducto.remove()
           
                let posicion = array.indexOf(productoCarrito)
                
                array.splice(posicion, 1)
                
           
            localStorage.setItem("carrito", JSON.stringify(array))
           
            calcularTotal(array)
            })
        }
    )
    calcularTotal(array)    
}


//CALCULAR EL TOTAL

function calcularTotal(array){
    
    
    const totalReduce = array.reduce(
        

        (acumulador, sahumerio)=>
        {return acumulador + sahumerio.precio},
        0
    )
    totalReduce > 0 ? precioTotal.innerHTML = `<strong>El total de su compra es: ${totalReduce}</strong>` : precioTotal.innerHTML = `No hay productos en el carrito` 
    return totalReduce
}

//FINALIZAR COMPRA 
function finalizarCompra(array){
    
    let total = calcularTotal(array)
    Swal.fire({
        text: `Gracias por su compra, usted ha gastado ${total}`
    })
    
    productosCarro = []
    
    localStorage.removeItem("carrito")
  
}

//ORDENAR DE MAYOR A MENOR 
function ordenarMayorMenor(array){
    
    let arrayMayorMenor = array.concat()
    
     arrayMayorMenor.sort(
        (par1,par2) => par2.precio - par1.precio
    )
    mostrarCatalogoDOM(arrayMayorMenor)
}

//ORDENAR DE MENOR A MAYOR 
function ordenarMenorMayor(ar){
    let arrMenor = ar.concat()
    arrMenor.sort(
        
        (a, b) => a.precio - b.precio
    )
    mostrarCatalogoDOM(arrMenor)
}

//ORDENAR ALFABETICAMENTE
function ordenarAlfabeticamenteTitulo(array){
    let ordenadoAlf = array.concat()
    ordenadoAlf.sort(
        (a,b) => {
            if(a.titulo > b.titulo){
                return 1
            }
            if(a.titulo < b.titulo){
                return -1
            }
            
            return 0
        }
    )
    mostrarCatalogoDOM(ordenadoAlf)
}


//BUSCAR
function buscarInfo(buscado,array){
    
    let coincidencias = array.filter(
        (sahumerio) => {
            
            return sahumerio.marca.toLowerCase().includes(buscado.toLowerCase()) || sahumerio.titulo.toLowerCase().includes(buscado.toLowerCase())
        }
    )
    

    coincidencias.length > 0 ? (mostrarCatalogoDOM(coincidencias), coincidenciasDiv.innerHTML ="") : (mostrarCatalogoDOM(array), coincidenciasDiv.innerHTML = `<h3>No hay coincidencias con su búsqueda, este es nuestro catálogo completo</h3>`) 
}



buscador.addEventListener("input", () => {
    console.log(buscador.value)
    buscarInfo(buscador.value,estanterias)
})



selectOrden.addEventListener("change", () => {
    
    console.log(selectOrden.value)
    switch(selectOrden.value){
        case "1":
            ordenarMayorMenor(estanterias)
        break
        case "2":
            ordenarMenorMayor(estanterias)
        break
        case "3":
            ordenarAlfabeticamenteTitulo(estanterias)
        break
        default:
            mostrarCatalogoDOM(estanterias)
        break
    }
})
botonCarrito.addEventListener("click", () => {
    cargarProductosCarro(productosCarro)

})








botonFinalizarCompra.addEventListener("click", () => {
    finalizarCompra(productosCarro)
    
})

//CÓDIGO
mostrarCatalogoDOM(estanterias)

