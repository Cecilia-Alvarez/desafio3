const express = require('express')
const app = express()

const Container = require("./container");

const tester = new Container("./products.txt");

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${server.address().port}`)
})



app.get('/', (req,res) => {
    res.send(`<h1>Este es el Desafío 3: Servidor Express</h1>`)
})

app.get('/productos', async (req,res) => {
    let allProducts = await tester.getAll();
    res.json(allProducts)
})

app.get('/productoRandom', async (req,res) => {
    let allProducts = await tester.getAll();
    console.log(allProducts)
    let randomProduct = allProducts[Math.floor(Math.random()*allProducts.length)]
    console.log(randomProduct)
    res.json(randomProduct)
})
// res.type("application/json")
// res.send(JSON.stringify(randomProduct))

