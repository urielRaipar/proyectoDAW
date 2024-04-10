// Modulos 
const express = require('express');
const bodyParser= require('body-parser');

const app=express();

// Cargar rutas
let user_routes=require('./rutas/usuario');
let artist_routes=require('./rutas/artista');
let album_routes=require('./rutas/album');
let cancion_routes=require('./rutas/cancion');

// Convertir a JSON datos de las peticiones http
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras http


// Cargar rutas bases
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api', cancion_routes);

module.exports=app;
