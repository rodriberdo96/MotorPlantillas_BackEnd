//importaciones
const express = require('express')
const  Contenedor  = require('./../Contenedor/Contenedor.js')
const handlebars = require('express-handlebars')
//instancias
const app = express()

//config puerto
const PORT = 8080

//middleware 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
express.static('public')
const routerProductos = express.Router()
const productos = new Contenedor('productos.json')
app.set ('views', './views')
app.set ('view engine', 'hbs')
app.engine ('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir:  'views/layout',
    partialsDir:  '/views'
}))

//rutas
app.get('/', (req,res) => {
    res.render('index', {productos})
})


app.get ('/productos', routerProductos)


routerProductos.get('/', async (req,res) => {
    const productos = await productos.getAll()
    res.render('historial', {productos})
})

routerProductos.post ('/', async (req,res) => {
    const {title, price, thumbnail} = req.body
    const producto = await productos.save(title, price, thumbnail)
    res.render('historial', {producto})
})


// Levantar el servidor en el puerto indicado
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto: http://localhost:${PORT}`);
});

server.on("error", error => console.log(`Error en servidor ${error}`));
