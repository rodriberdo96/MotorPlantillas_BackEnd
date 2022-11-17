//importaciones
const express = require('express')
const  Contenedor  = require('./Contenedor/Contenedor.js')

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
    productos.getAll().then((productos) => {
        res.render('historial.pug', {productos})
    })
})


app.post ('/productos', async (req,res) => {
    const data= req.body
    const producto=data 
    const id = await productos.save(producto)
    res.render('index', {productos})
})



// Levantar el servidor en el puerto indicado
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto: http://localhost:${PORT}`);
});

server.on("error", error => console.log(`Error en servidor ${error}`));
