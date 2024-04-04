// Modulos
const express=require('express');
const UserController=require('../controladores/usuario');

// Instanciar express
let api=express.Router();

// Rutas
api.get('/probando-controlador',UserController.pruebas);
api.post('/registro',UserController.guardarUsuario);
api.post('/login',UserController.loginUsuario);

module.exports=api;

