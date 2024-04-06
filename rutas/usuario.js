// Modulos
const express=require('express');
const UserController=require('../controladores/usuario');
const api=express.Router();
const md_auth=require('../middelwares/autentificacion');
const multipart=require('connect-multiparty');
const md_upload=multipart({uploadDir:'./uploads/usuarios'});

// Rutas
api.get('/probando-controlador',md_auth.ensureAuth,UserController.pruebas);
api.post('/registro',UserController.guardarUsuario);
api.post('/login',UserController.loginUsuario);
api.put('/update-user/:id',md_auth.ensureAuth,UserController.updateUser);
api.post('/upload-image-user/:id',[md_auth.ensureAuth, md_upload],UserController.uploadImage);

module.exports=api;

