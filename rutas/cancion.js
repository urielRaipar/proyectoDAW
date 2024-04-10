// Modulos 
const express=require('express');
const CancionController=require('../controladores/cancion');
const api=express.Router();
const md_auth=require('../middelwares/autentificacion');
const multipart=require('connect-multiparty');
const md_upload=multipart({uploadDir:'./uploads/canciones'});

// Rutas
api.get('/cancion/:id',md_auth.ensureAuth,CancionController.getSong);
api.post('/cancion',md_auth.ensureAuth,CancionController.saveCanciones);
api.get('/canciones/:album?',md_auth.ensureAuth,CancionController.getSongs);

module.exports=api;