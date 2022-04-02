const express = require('express');
const fs = require('fs')

const app = express();
const port = process.env.PORT || 8080;


// Rutas
app.get('/', (req, res) => {
    res.send(`<h1>Mi servidor express</h1>`)
})


// Leo el archivo
const readFileAsync = async (path) =>{
    try{
        let file = await fs.promises.readFile(path, 'utf-8');
        return file;
    }
    catch(err){
        throw new Error('Error de lectura!..')
    }
}

class Contenedor {
    constructor(){
        this.producto = []
    }

    async getAll(path){
        let data = await readFileAsync(path);

        if (data){
            let dataFile = JSON.parse(data);
        
        // Devolver array con todos los productos
        app.get('/products', (req, res) => {
            res.json(dataFile)
        })

        // Devolver producto al azar
        app.get('/getramdomproducts', (req, res) => {
            let productRandom = dataFile[Math.floor(Math.random() * dataFile.length)]
            res.json(productRandom)
        })

        }
    }
}

let ListProducts = new Contenedor();
ListProducts.getAll("./productos.txt")





// listen port
app.listen(port, () => {
    console.log('Server run on port ' + port)
})

