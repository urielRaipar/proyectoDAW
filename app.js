// Modulos 
const express = require('express');
const bodyParser= require('body-parser');

const app=express();

// Cargar rutas
let user_routes=require('./rutas/usuario');
let artist_routes=require('./rutas/artista');

// Convertir a JSON datos de las peticiones http
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras http


// Cargar rutas bases
app.use('/api', user_routes);
app.use('/api', artist_routes);

module.exports=app;
