class Sahumerio{
    constructor(id, marca, titulo, precio, imagen){
       
//PROPIEDADES
       this.id = id,
       this.marca = marca,
       this.titulo = titulo,
       this.precio = precio,
       this.imagen = imagen
       this.cantidad = 1
    }
    mostrarInfosahumerio(){
        console.log(`El sahumerio es ${this.marca} su fragancia es ${this.titulo} y su precio es ${this.precio}`)
     }
    
    exponerEnCatalogo(){
        console.log(this.id, this.titulo, this.marca, this.precio)
    }
    sumarUnidad(){
        this.cantidad++
        return this.cantidad
    }
    restarUnidad(){
        this.cantidad = this.cantidad - 1
        return this.cantidad
    }
}
 //CARGAR DESDE EL .JSON
function cargarSahumerio (array) {

 fetch("sahumerios.json")
.then((resp)=>resp.json())
.then((dataSahumerio) => {
   for(let sahu of dataSahumerio){
    let sahumerioNuevo = new Sahumerio (sahu.id, sahu.marca, sahu.titulo, sahu.precio, sahu.imagen)
    array.push(sahumerioNuevo)
   }
   localStorage.setItem("estanterias", JSON.stringify(array))
})
}
 let estanterias = []
 if(localStorage.getItem("estanterias")){
     
    
     for(let sahumerios of JSON.parse(localStorage.getItem("estanterias"))){
         let sahumerioStorage = new Sahumerio (sahumerios.id, sahumerios.marca, sahumerios.titulo, sahumerios.precio, sahumerios.imagen)
        estanterias.push(sahumerioStorage)
    }

}else{
    
    console.log("seteamos por primera vez")
    cargarSahumerio(estanterias)
    console.log(estanterias)
}

let productosCarro = JSON.parse(localStorage.getItem("carro")) ?? []

