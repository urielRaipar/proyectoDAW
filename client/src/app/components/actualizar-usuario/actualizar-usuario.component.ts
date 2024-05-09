import { Component, OnInit } from '@angular/core';
import { UsuarioServicio } from '../../service/usuario.servicio';
import { Usuario } from '../../models/usuario';
import { FormsModule } from '@angular/forms';
import { GLOBAL } from '../../service/global';


@Component({
  selector: 'app-actualizar-usuario',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './actualizar-usuario.component.html',
  styleUrl: './actualizar-usuario.component.css'
})


export class ActualizarUsuarioComponent implements OnInit {
  public titulo:string;
  public usuario:Usuario;
  public identificacion:any;
  public token:any;
  public alertUpdate:any;
  public filesToUpload:any;
  public url:any;
  public rellenar:any;
  public emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(
    private _usuarioServicio:UsuarioServicio
  ){
    this.titulo='Actualizar mis datos';
    
    // LocalStorage
    this.identificacion=JSON.parse(this._usuarioServicio.getIdentity());
    this.token=this._usuarioServicio.getToken();
    this.usuario = this.identificacion;
    this.url=GLOBAL.url;
  }

  ngOnInit(){
      console.log('actualizar-usuario.component.ts cargado')
  }

  // Actualizar usuario
  onSubmit(){
    if(this.usuario.nombre=='' || this.usuario.apellidos=='' || this.usuario.contrasenya==''
   ||  this.usuario.email==''){
      this.rellenar='Tienes que rellenar todos los campos';
   }else if(this.emailRegex.test(this.usuario.email)){
    this._usuarioServicio.updateUser(this.usuario).subscribe((response:any)=>{
      
      if(!response.user){
        this.alertUpdate='El usuario no se ha actualizado';
      }else{
        // this.usuario=response.user;
        localStorage.setItem('identity',JSON.stringify(this.usuario));
        let nom:any=document.querySelector('#nombre_usuario');
        nom.innerHTML=this.usuario.nombre;
        
        if(!this.filesToUpload){
          // Redireccion
        }else{
          this.makeFileRequest(this.url+'/upload-image-user/'+this.usuario._id,[],this.filesToUpload)
          .then((result:any)=>{
            // Guardar imagen en bbdd
            this.usuario.imagen=result.imagen;
            localStorage.setItem('identity',JSON.stringify(this.usuario));

            // Actualizar imagen sin recarga
            let image_path=this.url+'/get-image-user/'+this.usuario.imagen;
            document.getElementById('imagen_usuario')?.setAttribute('src',image_path);
          });
        }
        this.alertUpdate='El usuario se ha actualizado';
        setTimeout(()=>{location.reload();},2000);
      }
    },
    (error)=>{
      let errorMessage = <any>error;

      if (errorMessage != null) {
        this.alertUpdate = error.error.message;
      }
    });
    }else{
      this.rellenar='El correo electronico no es valido';
    }
  }

  // Subir ficheros
  fileChangeEvent(fileInput:any){
    this.filesToUpload=<Array<File>>fileInput.target.files;
    console.log(this.filesToUpload)
  }

  // Subir fichero a la base de datos con autorizacion de token
  makeFileRequest(url:any,params:Array<string>,files:Array<File>){
    let token=this.token;

    return new Promise((resolve,reject)=>{
      let formData:any=new FormData();
      let xhr=new XMLHttpRequest();

      for(let i=0;i<files.length;i++){
        formData.append('imagen',files[i],files[i].name);
      }

      xhr.onreadystatechange=()=>{
        if(xhr.readyState==4){
          if(xhr.status==200){
            resolve(JSON.parse(xhr.response))
          }else{
            reject(xhr.response)
          }
        }
      }
      xhr.open('POST',url,true);
      xhr.setRequestHeader('Authorization',token);
      xhr.send(formData);
    });
  }
}
