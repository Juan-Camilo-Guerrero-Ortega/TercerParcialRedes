var express = require('express');
var mysql = require('mysql');
var cors = require('cors');

var app = express();
app.use(express.json());
app.use(cors());

//Establecemos los parametros de conexion
var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'articulosdb'
});

//Prueba de conexion con la base de datos
conexion.connect(function(error){
    if(error){
        throw error
    }else{
        console.log("¡¡Conexion exitosa con la base de datos!!")
    }
});

app.get('/', function(req,res){
    res.send('Ruta INICIO');
});

//Mostrar todos los articulos
app.get('/api/articulos', (req,res)=>{
    conexion.query('SELECT * FROM articulos', (error,filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas)
        }
    })
});

//Mostrar un SOLO articulo
app.get('/api/articulos/:id', (req,res)=>{
    conexion.query('SELECT * FROM articulos WHERE id = ?',[req.params.id], (error,filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    })
});

//Crear un articulo
app.post('/api/articulos', (req,res)=>{
    let data = {descripcion:req.body.descripcion, precio:req.body.precio, stock:req.body.stock};
    let sql = "INSERT INTO articulos SET ?";
    conexion.query(sql, data, function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    });
});

//Editar un articulo
app.put('/api/articulos/:id', (req,res)=>{
    let id = req.params.id;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    let stock = req.body.stock;
    let sql = "UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?";
    conexion.query(sql, [descripcion, precio, stock, id], function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    });
});

//Eliminar un articulo
app.delete('/api/articulos/:id', (req,res)=>{
    conexion.query('DELETE FROM articulos WHERE id = ?', [req.params.id], function(error, filas){
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });
});

app.listen('3000', function(){
    console.log("Servidor OK con el puerto 3000");
});