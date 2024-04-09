// Modulos
const path=require('path');
const fs =require('fs');
const Artista=require('../modelos/artista');
const Album=require('../modelos/album');
const Cancion=require('../modelos/cancion');
const mongoosePaginate=require('mongoose-pagination');
const album = require('../modelos/album');

// Mostrar album
function getAlbum(req,res){
    let albumId=req.params.id;

    Album.findById(albumId).populate({path:'artista'}).exec().then(album=>{
        if(!album){
            res.status(404).send({message:'No existe el album'});
        }else{
            res.status(200).send({album});
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en el servidor'});
    })
}

// Guardar album
function saveAlbum(req,res){
    let album=new Album();
    let params =req.body;
    album.titulo=params.titulo;
    album.descripcion=params.descripcion;
    album.anyo=params.anyo;
    album.imagen=params.imagen;
    album.artista=params.artista;


    album.save().then(albumStored=>{
        if(!albumStored){
            res.status(404).send({message:'No se ha guardado el album'});
        }else{
            res.status(200).send({album:albumStored});
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en el servidor'});
    })
}

// Mostrar todos los albums de un artista
function getAlbums(req,res){
    let artistId=req.params.artist;

    if(!artistId){
        // Sacar todos los albums de la base de datos
        var find=Album.find({}).sort('titulo');
    }else{
        // Sacar los albums de un artista concreto de la base de datos
        var find=Album.find({artista:artistId}).sort('anyo');
    }

    find.populate({path:'artista'}).exec().then(albums=>{
        if(!albums){
            res.status(404).send({message:'No hay albums'});
        }else{
            res.status(200).send({albums});
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en el servidor'});
    })
}


module.exports={
    getAlbum,
    saveAlbum,
    getAlbums
}