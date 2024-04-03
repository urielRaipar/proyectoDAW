// Metodos 
const express = require('express');
const bodyParser= require('body-parser');

const app=express();

// Cargar rutas


// Convertir a JSON datos de las peticiones http
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras http


// Cargar rutas bases
app.get('/pruebas',(req, res)=>{
    res.status(200).send({mensaje:'Bienvenido Uri'})
})



module.exports=app;
