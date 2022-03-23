const fs = require("fs");

const datos = { name: 'Queso', price: 2150}
const newDatos = { name: 'Papas', price: '36546'}


const writeFileAsync = async (arr) => {
  try{
    await fs.promises.writeFile(
    "./productos.txt",
    JSON.stringify(arr, null, 2),
    "utf-8"
  )}
  catch (err){
    throw new Error('Error de lectura!')
  }
};


const readFileAsync = async (arr) => {
  try{
    let file = await fs.promises.readFile("./productos.txt", "utf-8");
    return file;
  }
  catch (err){
    throw new Error('Error de lectura!')
  }
};


class Contenedor {
  constructor() {
    this.producto = [];
  }

  // Metodo Save(Object)
  async save(product) {
    // Leo el archivo
    let fileExits = await readFileAsync();

    // Si el archivo ya contiene productos, le asigno un id correlativo y lo sumo al array de productos ya definidos.
    if (fileExits && fileExits.length >= 0) {
      let dataFile = JSON.parse(fileExits);
      product.id = dataFile.length + 1;
      dataFile.push(product);
      this.producto = dataFile;
      writeFileAsync(this.producto);

    } 
    else {
      // Si el archivo esta vacio, le asigno un id y lo agrego. 
      product.id = 1;
      this.producto.push(product);
      writeFileAsync(this.producto);
    }
  }

  // Metodo getById(Number)
  async getById(id, position){
    let fileExits = await readFileAsync();

    // Si el archivo existe, lo parseo y realizo la busqueda del id
    if (fileExits) {
      let dataFile = JSON.parse(fileExits);
      const found = dataFile.find(element => element.id == id)
      // console.log(dataFile.indexOf(found))

      if(!found){
        return console.log('null')
      }
      if (position){
        return dataFile.indexOf(found)
      }else{
        // retorno el objeto encontrado
        return console.log(found)
      } 
    }
  }

  // Metodo getAll(Number)
  async getAll(){
    let fileExits = await readFileAsync();
    
    if (fileExits) {
      let dataFile = JSON.parse(fileExits);
      this.producto.push(dataFile);
      console.log(this.producto)
    }
  }

  // Metodo deleteById(Number)
  async deleteById(id){
   const positionItem = await this.getById(id, true)
   console.log(positionItem)

    let fileExits = await readFileAsync();

    // Si el archivo existe y el id buscado existe, se elimina del archivo.
    if (fileExits && positionItem >= 0) {
      let dataFile = JSON.parse(fileExits);
      const deleteItem = dataFile.splice(positionItem, 1)
      
      console.log(dataFile)

      // Actualizo el archivo
      writeFileAsync(dataFile);
    }
    else
      console.log('No se pudo eliminar!')
  }


  // Metodo deleteAll(Number)
  async deleteAll(){ 
      writeFileAsync(this.producto);
  }

}



let c = new Contenedor();

// Ejecucion de metodos
c.save(newDatos);
c.getById(3)
c.getAll()
//c.deleteById(6)
//c.deleteAll()