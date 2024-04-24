import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { GLOBAL } from '../../service/global';
import { UsuarioServicio } from '../../service/usuario.servicio';
import { ArtistaServicio } from '../../service/artista.servicio';


@Component({
  selector: 'app-artista-detalle',
  standalone: true,
  imports: [
    RouterLink
  ],
  providers: [
    UsuarioServicio,
    ArtistaServicio
  ],
  templateUrl: './artista-detalle.component.html',
  styleUrl: './artista-detalle.component.css'
})
export class ArtistaDetalleComponent implements OnInit{
  public artista:any;
  public albums:any;
  public identificacion;
  public token;
  public url;
  public alertMessage:any;


  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UsuarioServicio,
    private _artistService:ArtistaServicio
  ){
    this.identificacion=JSON.parse(this._userService.getIdentity());
    this.token=this._userService.getToken();
    this.url=GLOBAL.url;
  

  }

  ngOnInit(){
    console.log('artista detalle: cargado');

    // Llamar al metodo del api para sacar un artista en base a su id getArtist
    this.getArtists();
  }


  // Mostrar listas de artistas
  getArtists(){
    this._route.params.forEach((params:Params)=>{
      let id=params['id'];
      this._artistService.getArtista(this.token,id).subscribe(
        (response:any)=>{
          if(!response.artist){
            this._router.navigate(['']);
          }else{
            this.artista=response.artist;

            // Sacar los albums del artista

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