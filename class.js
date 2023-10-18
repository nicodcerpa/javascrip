class sahumerio{
    constructor(id, marca, titulo, precio, imagen){
       
//PROPIEDADES
       this.id = id,
       this.marca = marca,
       this.titulo = titulo,
       this.precio = precio,
       this.imagen = imagen
    }
    mostrarInfosahumerio(){
        console.log(`El sahumerio es ${this.marca} su fragancia es ${this.titulo} y su precio es ${this.precio}`)
     }
    
    exponerEnCatalogo(){
        console.log(this.id, this.titulo, this.marca, this.precio)
    }
}
 //OBJETOS
 const sahumerio1 = new sahumerio(1, "Copal Natural", "copal", 800, "copalNatural.jpg")

 const sahumerio2 = new sahumerio(2, "Patagonia Natural", "Hisbiscus", 1200, "Hibiscus.jpg")

 const sahumerio3 = new sahumerio(3, "Incienso Natural", "Incienso", 650, "inciensoNatural.jpg")

 const sahumerio4 = new sahumerio(4, "Orquidias y Laurel", "Yagra", 1100, "orquideas-laurel.jpg")

 const sahumerio5 = new sahumerio(5, "Rosa y Vainilla", "Amor", 1000, "rosa-vainilla.jpg")

 const sahumerio6 = new sahumerio(6, "Patagonia Natural", "Rosa mosqueta", 1250, "RosaMosqueta.jpg")


 let estanterias = []
 if(localStorage.getItem("estanterias")){
     
    
     for(let sahumerios of JSON.parse(localStorage.getItem("estanterias"))){
         let sahumerioStorage = new sahumerio (sahumerios.id, sahumerios.marca, sahumerios.titulo, sahumerios.precio, sahumerios.imagen)
        estanterias.push(sahumerioStorage)
    }

}else{
    
    console.log("seteamos por primera vez")
    estanterias.push(sahumerio1,sahumerio2,sahumerio3,sahumerio4,sahumerio5,sahumerio6)
    localStorage.setItem("estanterias", JSON.stringify(estanterias))
}

let productosCarro = JSON.parse(localStorage.getItem("carro")) ?? []
console.log(productosCarro)
