import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioServicio } from '../../service/usuario.servicio';
import { GLOBAL } from '../../service/global';
import { Artista } from '../../models/artista';
import { FormsModule } from '@angular/forms';
import { Album } from '../../models/album';
import { AlbumServicio } from '../../service/album.servicio';
import { UploadServicio } from '../../service/upload.servicio';


@Component({
  selector: 'app-actualizar-album',
  standalone: true,
  imports: [
    FormsModule
  ],
  providers: [
    UsuarioServicio,
    AlbumServicio,
    UploadServicio
  ],
  templateUrl: './actualizar-album.component.html',
  styleUrl: './actualizar-album.component.css'
})
export class ActualizarAlbumComponent implements OnInit{
  public title:any;
  // public artista:Artista;
  public album:Album;
  public identificacion;
  public token;
  public url;
  public alertMessage:any;
  public filesToUpload:any;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UsuarioServicio,
    private _albumService:AlbumServicio,
    private _uploadService:UploadServicio
  ){
    this.title='Actualizar album';
    this.identificacion=JSON.parse(this._userService.getIdentity());
    this.token=this._userService.getToken();
    this.url=GLOBAL.url;
    this.album=new Album('','',2024,'','');
  }


  ngOnInit() {
      console.log('Actualizar album: cargado');

      // Conseguir el album
       this.getAlbum();
  }

  // Mostrar album
  getAlbum(){
    this._route.params.forEach((params:Params)=>{
      let id=params['id'];

      this._albumService.getAlbum(this.token, id).subscribe(
        (response:any)=>{
            if(!response.album){
              this._router.navigate(['/artista',this.album.artista]);
            }else{
              this.alertMessage='El album se ha creado correctamente';
              this.album=response.album;
            }
        },
        (error)=>{
          let errorMessage=<any>error;

          if(errorMessage!=null){
            let body=JSON.parse(error._body)
            // this.alertMessage=body.message;
          }
        }
      );
    });
  }


  // Enviar formulario
  onSubmit(){
    this._route.params.forEach((params:Params)=>{
      let id=params['id'];

      this._albumService.editAlbum(this.token,id,this.album).subscribe(
        (response:any)=>{
            if(!response.album){
              this.alertMessage='Error en el servidor';
            }else{
              this.alertMessage='El album se ha actualizado correctamente';
              this._router.navigate(['artista',this.album.artista]);

              // Subir la imagen del album
              this._uploadService.makeFileRequest(this.url+'upload-image-album/'+id,[],this.filesToUpload,this.token,'imagen')
              .then(
                (result)=>{
                  this._router.navigate(['artista',this.album.artista]);
                },
                (error:any)=>{
                  console.log(error)
                }
              )
            }
        },
        (error)=>{
          let errorMessage=<any>error;

          if(errorMessage!=null){
            let body=JSON.parse(error._body);

            console.log(error);
          }
        }
      );
    });
  }

  fileChangeEvent(fileInput:any){
    this.filesToUpload=<Array<File>>fileInput.target.files;
  }
}
