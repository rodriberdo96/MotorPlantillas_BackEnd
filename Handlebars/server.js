//importaciones
const express = require('express')
const  Contenedor  = require('./Contenedor/Contenedor.js')
const handlebars = require('express-handlebars')
//instancias
const app = express()

//config puerto
const PORT = 8080

//middleware 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
express.static('public')
const productos = new Contenedor('productos.json')
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layout',
    partialsDir: __dirname + '/views/partials'
}))
app.set ('view engine', 'hbs')
app.set ('views',  './views')

//rutas
app.get('/', (req,res) => {
    res.render('form', {productos})
})

app.get('/productos',  (req,res) => {
    productos.getAll().then((productos) => {
        res.render('historial.hbs', {productos})
    })
})

app.post ('/productos', async (req,res) => {
    const {title,price,thumbnail} = req.body
    const producto = {title,price,thumbnail}
    const id = await productos.save(producto)
    res.render('historial.hbs')
})

app.post ('/productos', async (req,res) => {
    const {title,price,thumbnail} = req.body
    const producto = {title,price,thumbnail}
    const id = await productos.save(producto)
    res.render('form')
})


// Levantar el servidor en el puerto indicado
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto: http://localhost:${PORT}`);
});

server.on("error", error => console.log(`Error en servidor ${error}`));
