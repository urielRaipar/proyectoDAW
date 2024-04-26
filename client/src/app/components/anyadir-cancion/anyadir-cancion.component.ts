import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioServicio } from '../../service/usuario.servicio';
import { GLOBAL } from '../../service/global';
import { Cancion } from '../../models/cancion';


@Component({
  selector: 'app-anyadir-cancion',
  standalone: true,
  imports: [],
  providers:[
    UsuarioServicio
  ],
  templateUrl: './anyadir-cancion.component.html',
  styleUrl: './anyadir-cancion.component.css'
})
export class AnyadirCancionComponent {
  public title:any;
  public cancion:Cancion;
  public identificacion;
  public token;
  public url;
  public alertMessage:any;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UsuarioServicio,
  ){
    this.title='Añadir cancion';
    this.identificacion=JSON.parse(this._userService.getIdentity());
    this.token=this._userService.getToken();
    this.url=GLOBAL.url;
    this.cancion=new Cancion(1,'','','','');
  }

  ngOnInit() {
    console.log('Añadir cancion componente: cargado');
  }

// Insertar album
  onSubmit(){
    // this._route.params.forEach((params:Params)=>{
    //   let artist_id=params['artista'];
    //   this.album.artista=artist_id

    //   this._albumService.addAlbum(this.token,this.album).subscribe(
    //     (response:any)=>{
       
    //       if(!response.album){
    //         this.alertMessage='Error en el servidor';
    //       }else{
    //         this.alertMessage='El album se ha creado correctamente';
    //         this.album=response.album;
    //         this._router.navigate(['/editarAlbum',response.album._id]);
    //       }
    //     },
    //     (error)=>{
    //       let errorMessage=<any>error;
  
    //       if(errorMessage != null){
    //         let body=JSON.parse(error.body);
    //         this.alertMessage=body.message;
  
    //         console.log(error)
    //       }
    //     }
    //   )
    // });
  
  }

}
