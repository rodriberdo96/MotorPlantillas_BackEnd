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
    productos.getAll().then((productos) => {
        res.render('pages/productosC', {productos})
    })  

})

app.post ('/productos', async (req,res) => {
    const {title,price,thumbnail} = req.body
    const producto = {title,price,thumbnail}
    const id = await productos.save(producto)
    res.redirect('/productosC.ejs')
})

app.post('productosC.ejs', async (req,res) => {
    const {title,price,thumbnail} = req.body
    const producto = {title,price,thumbnail}
    const id = await productos.save(producto)
    res.redirect('/productosC.ejs')
})




// Levantar el servidor en el puerto indicado
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto: http://localhost:${PORT}`);
});

server.on("error", error => console.log(`Error en servidor ${error}`));
