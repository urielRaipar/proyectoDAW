// Modulos 
const  mongoose = require('mongoose');
const app=require('./app');
const puerto=process.env.PORT || 4000;


//Conexion BBDD 
const conectarBBDD= async ()=>{
    try{
       await mongoose.connect('mongodb://127.0.0.1:27017/webapp_musica');
       console.log('Conectado a la BBDD');

       app.listen(puerto,()=>{
        console.log(`Servidor del api escuchando en http://localhost:${puerto}`);
       });
    }catch(err){
        throw err;
    }
}
conectarBBDD();





