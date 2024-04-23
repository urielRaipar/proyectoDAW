import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params, RouterModule, RouterLink } from '@angular/router';
import { GLOBAL } from '../../service/global';
import { UsuarioServicio } from '../../service/usuario.servicio';
import { Artista } from '../../models/artista';


@Component({
  selector: 'app-lista-artistas',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink
  ],
  providers: [UsuarioServicio],
  templateUrl: './lista-artistas.component.html',
  styleUrl: './lista-artistas.component.css'
})

export class ListaArtistasComponent implements OnInit{
  public titulo:any;
  // public artistas:Artista[];
  public identificacion;
  public token;
  public url;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UsuarioServicio
  ){
    this.titulo='Artista';
    this.identificacion=JSON.parse(this._userService.getIdentity());
    this.token=this._userService.getToken();
    this.url=GLOBAL.url;
    
  }

  ngOnInit(){
      console.log('Listas de artistas componente: cargado');
    
      // Listado de artistas
  }

  


}
