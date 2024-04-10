// Modulos
const path=require('path');
const fs =require('fs');
const Artista=require('../modelos/artista');
const Album=require('../modelos/album');
const Cancion=require('../modelos/cancion');
const mongoosePaginate=require('mongoose-pagination');
const album = require('../modelos/album');


// Mostrar cancion
function getSong(req,res){
    let songId=req.params.id;

    Cancion.findById(songId).populate({path: 'album'}).exec().then(song=>{
        if(!song){
            res.status(404).send({message:'La cancion no existe'});
        }else{
            res.status(200).send({song});
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en el servidor'});
    })
}

// Añadir canciones
function saveCanciones(req,res){
    let song= new Cancion();

    let params=req.body;
    song.numero=params.numero;
    song.nombre=params.nombre;
    song.duracion=params.duracion;
    song.ficheroMP3=null;
    song.album=params.album;

    song.save().then(songStore=>{
        if(!songStore){
            res.status(404).send({message:'No se ha guardado la cancion'});
        }else{
            res.status(200).send({song:songStore});
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en el servidor'});
    })
}

// Mostrar todas las canciones por album&global
function getSongs(req,res){
    let albumId=req.params.album;

    if(!albumId){
        var find=Cancion.find({}).sort('numero');
    }else{
        var find=Cancion.find({album:albumId}).sort('numero');
    }

    find.populate({
        path: 'album',
        populate:{
            path:'artista',
            model:'Artista'
        }
    }).exec().then(songs=>{
        if(!songs){
            res.status(404).send({message:'No hay canciones'});
        }else{
            res.status(200).send({songs});
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en el servidor'});
    })

}


module.exports={
    getSong,
    saveCanciones,
    getSongs
}