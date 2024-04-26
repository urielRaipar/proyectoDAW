import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { GLOBAL } from '../../service/global';
import { UsuarioServicio } from '../../service/usuario.servicio';
import { AlbumServicio } from '../../service/album.servicio';
import { Album } from '../../models/album';


@Component({
  selector: 'app-album-detalle',
  standalone: true,
  imports: [
    RouterLink,
  ],
  providers: [
    UsuarioServicio,
    AlbumServicio
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


  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UsuarioServicio,
    private _albumService:AlbumServicio
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
}
