import { Component, OnInit } from '@angular/core';
import { UsuarioServicio } from '../../service/usuario.servicio';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-actualizar-usuario',
  standalone: true,
  imports: [
    
  ],
  templateUrl: './actualizar-usuario.component.html',
  styleUrl: './actualizar-usuario.component.css'
})


export class ActualizarUsuarioComponent implements OnInit {
  public titulo:string;
  // public user:Usuario;
  public identity:any;
  public token:any;

  constructor(
    private _userService:UsuarioServicio
  ){
    this.titulo='Actualizar mis datos';
  }

  ngOnInit(){
      console.log('actualizar-usuario.component.ts cargado')
  }
}
