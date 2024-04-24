import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioServicio } from '../../service/usuario.servicio';
import { GLOBAL } from '../../service/global';
import { Artista } from '../../models/artista';
import { FormsModule } from '@angular/forms';
import { Album } from '../../models/album';
import { AlbumServicio } from '../../service/album.servicio';


@Component({
  selector: 'app-actualizar-album',
  standalone: true,
  imports: [
    FormsModule
  ],
  providers: [
    UsuarioServicio,
    AlbumServicio
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

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UsuarioServicio,
    private _albumService:AlbumServicio
  ){
    this.title='Actualizar album';
    this.identificacion=JSON.parse(this._userService.getIdentity());
    this.token=this._userService.getToken();
    this.url=GLOBAL.url;
    this.album=new Album('','',2024,'','');
  }


  ngOnInit() {
      console.log('Actualizar album: cargado');
  }

  onSubmit(){
    
  }


  fileChangeEvent(ev:any){

  }
}
