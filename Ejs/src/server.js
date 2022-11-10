//importaciones
const express = require('express')
const  Contenedor  = require('./../Contenedor/Contenedor.js')

//instancias
const app = express()

//config puerto
const PORT = 8080

//middleware 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
express.static('public')
const productos = new Contenedor('productos.json')
app.set ('view engine', 'ejs')



//rutas
app.get('/', (req,res) => {
    res.render('pages/index', {productos})
})

app.get('/productosC.ejs',  (req,res) => {
    res.render('pages/productosC', {productos})
})

app.post ('/productos',  (req,res) => {
    const {title,price,thumbnail} = req.body
    productos.save(title,price,thumbnail)
    res.redirect('/', {productos})
})

app.post('productosC.ejs', async (req,res) => {
    const {title,price,thumbnail} = req.body
    productos.save(title,price,thumbnail)
    res.redirect('/', {productos})
})




// Levantar el servidor en el puerto indicado
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto: http://localhost:${PORT}`);
});

server.on("error", error => console.log(`Error en servidor ${error}`));