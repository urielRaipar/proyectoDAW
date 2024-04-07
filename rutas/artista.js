// Modulos 
const express=require('express');
const ArtistController=require('../controladores/artista');
const api=express.Router();
const md_auth=require('../middelwares/autentificacion');

// Rutas
api.get('/artista/:id',md_auth.ensureAuth,ArtistController.getArtist);
api.post('/artista',md_auth.ensureAuth,ArtistController.saveArtist);
api.get('/artistas/:page?',md_auth.ensureAuth,ArtistController.getArtists);
api.put('/artista/:id',md_auth.ensureAuth,ArtistController.updateArtist);

module.exports=api;