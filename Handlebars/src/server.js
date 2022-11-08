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
const productos = new Contenedor('productos.json')
app.engine ('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + './views/layout',
    partialsDir: __dirname + './views/partials'
}))

app.set ('views', './views/layout')
app.set ('view engine', 'hbs')


//rutas
app.get('/', (req,res) => {
    res.render('index', {productos})
})


app.get ('/productos', (req,res) => {
    res.render('productos', {productos})
})


app.post ('/productos',  (req,res) => {
    productos.push (req.body)
    console.log (productos)
    res.redirect('/')
})
app.post ('/historial.hbs',  (req,res) => {
    productos.push (req.body)
    console.log (productos)
    res.redirect('/')
})


// Levantar el servidor en el puerto indicado
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto: http://localhost:${PORT}`);
});

server.on("error", error => console.log(`Error en servidor ${error}`));
