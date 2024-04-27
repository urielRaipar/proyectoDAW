import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { GLOBAL } from '../../service/global';
import { UsuarioServicio } from '../../service/usuario.servicio';
import { AlbumServicio } from '../../service/album.servicio';
import { Album } from '../../models/album';
import { Cancion } from '../../models/cancion';
import { CancionServicio } from '../../service/cancion.servicio';



@Component({
  selector: 'app-album-detalle',
  standalone: true,
  imports: [
    RouterLink,
  ],
  providers: [
    UsuarioServicio,
    AlbumServicio,
    CancionServicio
  ],
  templateUrl: './album-detalle.component.html',
  styleUrl: './album-detalle.component.css'
})
export class AlbumDetalleComponent implements OnInit{
  public artista:any;
  public album:any;
  public identificacion;
  public token;
  public url;
  public alertMessage:any;
  public confirmado:any;
  public canciones:any;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UsuarioServicio,
    private _albumService:AlbumServicio,
    private _cancionesServicio:CancionServicio
  ){
    this.identificacion=JSON.parse(this._userService.getIdentity());
    this.token=this._userService.getToken();
    this.url=GLOBAL.url;
  }

  ngOnInit(){
    console.log('album detalle: cargado');

    // Sacar album de la bbdd
    this.getAlbum();
  }


  // Mostrar listas de albums
  getAlbum(){
    console.log("El metodo detalle album")
    this._route.params.forEach((params:Params)=>{
      let id=params['id'];
    
      this._albumService.getAlbum(this.token,id).subscribe(
        (response:any)=>{
          if (!response.album) {
            this._router.navigate(['/']);
          } else {
            this.album=response.album;

              // Sacar canciones
              this._cancionesServicio.getCanciones(this.token,response.album._id).subscribe(
                (response:any)=>{
                  if (!response.songs) {
                    this.alertMessage='El album no tiene canciones';
                  } else {
                    this.canciones=response.songs;
                  }
              });  
          }
        },
        (error)=>{
          let errorMessage=<any>error;

          if(errorMessage != null){
            let body=JSON.parse(error.body);
            this.alertMessage=body.message;
  
            console.log(error)
          }  
        }
      )
    })
  }

  // Confirmar eliminacion
  onDeleteConfirm(id:any){
    this.confirmado=id;
  }

  // Eliminar cancion
  onDeleteSong(id:any){
    this._cancionesServicio.deleteCancion(this.token,id).subscribe(
      (response:any)=>{
        if (!response.songs) {
          this.alertMessage='Error en el servidor';
        } else {
          this.getAlbum();
        }
      },
      (error)=>{
        let errorMessage=<any>error;

        if(errorMessage != null){
          let body=JSON.parse(error.body);
          // this.alertMessage=body.message;

          console.log(error)
        }  
      }
    );
  }

  // Cancelar eliminacion
  onCancelSong(){
    this.confirmado=null;
  }
}
