// Modulos
const path=require('path');
const fs =require('fs');
const Artista=require('../modelos/artista');
const Album=require('../modelos/album');
const Cancion=require('../modelos/cancion');
const mongoosePaginate=require('mongoose-pagination');

// Mostrar artista
function getArtist(req,res){
    let artistId=req.params.id;

    Artista.findById(artistId).then(artist=>{
        if(!artist){
            res.status(404).send({message:'El artista no existe'});
        }else{
            res.status(200).send({artist});
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en la peticion'});
    })
}

// Mostrar todos los artistas
function getArtists(req,res){
    if(req.params.page){
        var page=req.params.page;
    }else{
        var page=1;
    }
    let itemsPerPage=3;

    Artista.find().sort('nombre').paginate(page, itemsPerPage).then((artist,total)=>{
        if(!artist){
            res.status(404).send({message:'No hay artistas'});
        }else{
            return res.status(200).send({
                total_items:total,
                artists:artist
            })
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en la peticion'});
    })
}

// Guardar artista 
function saveArtist(req,res){
    let artist= new Artista();

    let params=req.body;
    artist.nombre=params.nombre;
    artist.descripcion=params.descripcion;
    artist.imagen='null';

    artist.save().then(artistStored=>{
        if(!artistStored){
            res.status(404).send({message: 'El artista no ha sido guardado'});
        }else{
            res.status(200).send({artist:artistStored})
        }
    })
    .catch(err=>{
        res.status(500).send({message: 'Error al guardar el artista'})
    })
}

// Actualizar artista
function updateArtist(req,res){
    let artistId=req.params.id;
    let update=req.body;

    Artista.findByIdAndUpdate(artistId,update).then(artistUpdated=>{
        if(!artistUpdated){
            res.status(404).send({message: 'El artista no ha sido actualizado'});
        }else{
            res.status(200).send({artist:artistUpdated})
        }
    })
    .catch(err=>{
        res.status(500).send({message: 'Error en la actualizacion'});
    })
}

module.exports={
    getArtist,
    saveArtist,
    getArtists,
    updateArtist
}