// Modulos
const Usuario=require('../modelos/usuario');
const bcrypt=require('bcrypt-nodejs');

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

    

    Usuario.findOne({email: email.toLowerCase()}).then((user)=>{
        
        if(user){
            // Comprobar la contraeña 
            bcrypt.compare(contrasenya, user.contrasenya,(err,check)=>{
                // Posible error
                if(check){
                    // devolver datos del usuario logeado
                    if(params.gethash){
                        // devolver token 
                    }else{
                        res.status(200).send({user})
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

module.exports={
    pruebas,
    guardarUsuario,
    loginUsuario
};