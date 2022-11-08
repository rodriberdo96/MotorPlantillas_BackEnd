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
app.set ('views', './views')
app.set ('view engine', 'pug')



//rutas
app.get('/', (req,res) => {
    res.render('index', {productos})
})

app.get ('/productos', (req,res) => {
    res.render('productos', {productos})
})


app.post ('/productos',  (req,res) => {
    const {title, price, thumbnail} = req.body
    productos.save (title, price, thumbnail)
    console.log (productos)
    res.redirect('/')
})
app.post ('/historial.pug',  (req,res) => {
    const {title, price, thumbnail} = req.body
    productos.push (title, price, thumbnail)
    console.log (productos)
    res.redirect('/')
})


// Levantar el servidor en el puerto indicado
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto: http://localhost:${PORT}`);
});

server.on("error", error => console.log(`Error en servidor ${error}`));
