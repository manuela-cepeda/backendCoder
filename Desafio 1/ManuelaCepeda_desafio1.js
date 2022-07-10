class Usuario {
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }

    addMascotas(mascota){
        this.mascotas.push(mascota)
        
    }
    countMascotas(){        
        return `Tengo ${this.mascotas.length} mascotas`
    }

    addBook(nombre, autor){
        this.libros.push({nombre, autor})  
    }

    getBookNames(){
       return this.libros.map(libros => libros.nombre )
    }
}

let usuario1 = new Usuario('Manuela', 'Cepeda')

console.log(usuario1.getFullName())
usuario1.addMascotas('perro')
usuario1.addMascotas('gato')
console.log(usuario1.countMascotas())
usuario1.addBook('Harry Potter' , 'JK Rowling')
usuario1.addBook('El señor de los anillos' , 'JRR Tolkien')
console.log(usuario1.getBookNames())

