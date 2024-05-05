// Modulos
const Usuario=require('../modelos/usuario');
const bcrypt=require('bcrypt-nodejs');
const jwt=require('../servicios/jwt');
const multipart=require('connect-multiparty');
const fs=require('fs');
const path=require('path');

function pruebas(req,res){
    res.status(200).send({
        message:"Probando una accion del controlador"
    });
}

// Guardar nuevo usuario
function guardarUsuario(req, res){
    let user=new Usuario();

    let param=req.body;

    console.log(param)

    user.nombre=param.nombre;
    user.apellidos=param.apellidos;
    user.email=param.email;
    user.rol='ROLE_USER';
    user.imagen='null';

    if(param.contrasenya){
        // Encriptar contraseña
        bcrypt.hash(param.contrasenya,null,null,function(err,hash){
            user.contrasenya=hash;

            if(user.nombre!=null && user.apellidos!=null && user.email!=null){
                // Guardar el usuario
                user.save().then((userStored)=>{
                    if(!userStored){
                        res.status(404).send({message:'No se ha registrado el usuario'});
                    }else{
                        res.status(200).send({user: userStored});
                    }
                })
                .catch((err)=>{
                    res.status(500).send({message:'Error al guardar el usuario'});
                });
            }else{
                res.status(200).send({message:'Introduce todos los campos'});
            }
        });
    }else{
        res.status(200).send({message:'Introduce la contraseña'});
    }
}

// Buscar usuario login
function loginUsuario(req, res){
    let params=req.body;

    let email=params.email;
    let contrasenya=params.contrasenya;

    //Consulta en la bbdd 
    Usuario.findOne({email: email}).then((user)=>{
        
        if(user){
            // Comprobar la contraeña 
            bcrypt.compare(contrasenya, user.contrasenya,(err,check)=>{
                // Posible error
                if(check){
                    // devolver datos del usuario logeado
                    if(params.gethash){
                        // devolver token 
                        res.status(200).send({
                            token:jwt.createToken(user)
                        });
                    }else{
                        res.status(200).send({user});
                    }
                }else{
                    res.status(404).send({message:'El usuario no ha podido loguearse'});
                }
            });
        }else{
            res.status(404).send({message:'El usuario no existe'});
        }
    })
    .catch((err)=>{
        res.status(500).send({message:'Error en la peticion'});
    })
}


// Mostrar usuarios
function getUsuarios(req,res){
    Usuario.find().sort('nombre').then((usur,total)=>{
        if(!usur){
            res.status(404).send({message:'No hay usuarios'});
        }else{
            return res.status(200).send({
                total_items:total,
                usurs:usur
            })
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en la peticion'});
    })
}


// Eliminar usuario
function deleteUsuario(req,res){
    let usuId=req.params.id;
    console.log(usuId)
    Usuario.findByIdAndDelete({_id:usuId}).then(usuRemove=>{
        if(!usuRemove){
            res.status(404).send({message:'El usuario no se ha borrado correctamente'});
        }else{
            res.status(200).send({usu:usuRemove});
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en el servidor'});
    })
}


// Actualizar usuario
function updateUser(req,res){
    let userId=req.params.id;
    let update=req.body;
    let prueba;

    if(userId!=req.user.sub){
       return res.status(500),send({message:'No tienes permiso para actualizar este usuario'});
    }

    // Encriptar contraseña
    if(update.contrasenya){
        bcrypt.hash(update.contrasenya,null,null,function(err,hash){
            if (err) {
                return res.status(500).send({ message: 'Error al encriptar la contraseña' });
            }

            update.contrasenya=hash;
            
            Usuario.findByIdAndUpdate(userId, update).then((userUpdated)=>{
                if(!userUpdated){
                    res.status(404).send({message:'No se ha podidio actualizar el usuario'});
                }else{
                    res.status(200).send({user:userUpdated});
                }
            })
            .catch(err=>{
                res.status(500),send({message:'Error al actualizar el usuario'});
            });
        });
    }else{
        res.status(200).send({message:'Introduce la contraseña'});
    }
}

// Subir imagenes de usuario
function uploadImage(req,res){
    let userId=req.params.id;
    let file_name='Imagen no subida...';

    if(req.files){
         // Puede que en un futuro haya que sustituir req.files.image.path <--RESUELTO
        let file_path=req.files.imagen.path;
        let file_split=file_path.split('\\');
        let file_name= file_split[2];

        let ext_split=file_name.split('\.');
        let file_ext=ext_split[1];

       if(file_ext=='png'|| file_ext=='jpg'||file_ext=='gif'){
            Usuario.findByIdAndUpdate(userId,{imagen:file_name}).then(userUpdated=>{
                if(!userUpdated){
                    res.status(404).send({message:'No se ha podidio actualizar la imagen de usuario'});
                }else{
                    res.status(200).send({imagen:file_name,user:userUpdated});
                }
            })
            .catch(err=>{
                res.status(200).send({message:'Error al subir la imagen'})
            });
       }else{
            res.status(200).send({message:'Extension del archivo no valida'});
       }

    }else{
        res.status(200).send({message:'No se ha subido ninguna imagen...'});
    }
}

// Mostrar imagen de usuario
function getImageFile(req,res){
    let imageFile=req.params.imageFile;
    let path_file='./uploads/usuarios/'+imageFile;

    fs.exists(path_file,exists=>{
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message:'No existe la imagen...'})
        }
    }); 
}

module.exports={
    pruebas,
    guardarUsuario,
    loginUsuario,
    updateUser,
    uploadImage,
    getImageFile,
    getUsuarios,
    deleteUsuario
};