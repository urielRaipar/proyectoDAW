// Modulos 
const express=require('express');
const AlbumController=require('../controladores/album');
const api=express.Router();
const md_auth=require('../middelwares/autentificacion');
const multipart=require('connect-multiparty');
const md_upload=multipart({uploadDir:'./uploads/album'});

// Rutas
api.get('/album/:id',md_auth.ensureAuth,AlbumController.getAlbum);
api.post('/album',md_auth.ensureAuth,AlbumController.saveAlbum);
api.get('/albums/:artist?',md_auth.ensureAuth,AlbumController.getAlbums);

module.exports=api;