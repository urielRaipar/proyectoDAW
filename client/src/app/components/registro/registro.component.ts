import { Component } from '@angular/core';
import { UsuarioServicio } from '../../service/usuario.servicio';
import { Usuario } from '../../models/usuario';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  public usuario_registro: Usuario;

  constructor(
    private _usuarioServicio: UsuarioServicio
  ) {
    this.usuario_registro = new Usuario('', '', '', '', '', 'ROLE_USER', '');
  }


  onSubmitRegister(){
    console.log(this.usuario_registro);
  }

}
