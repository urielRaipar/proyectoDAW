import { Component, OnInit } from '@angular/core';
import { UsuarioServicio } from '../../service/usuario.servicio';
import { ArtistaServicio } from '../../service/artista.servicio';
import { Artista } from '../../models/artista';
import { GLOBAL } from '../../service/global';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-arstista-edit',
  standalone: true,
  imports: [],
  providers: [
    UsuarioServicio,
    ArtistaServicio
  ],
  templateUrl: './arstista-edit.component.html',
  styleUrl: './arstista-edit.component.css'
})
export class ArstistaEditComponent implements OnInit{
  public titulo:string;
  public artista:Artista;
  public identificacion;
  public token;
  public url:string;
  // public alertMessage;
  public is_edit;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UsuarioServicio,
    private _artistaServicio:ArtistaServicio
  ){
    this.titulo='Crear nuevo artista';
    this.identificacion=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.url=GLOBAL.url;
    this.artista=new Artista('','','');
    this.is_edit=true;
  }

  ngOnInit(){
    console.log('artista-edit, cargado');
    // Llamar al metodo del api para sacar un artista en base a su id getArtist
  }

}
