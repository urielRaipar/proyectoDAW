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
  public alertRegister: any; 

  constructor(
    private _usuarioServicio: UsuarioServicio
  ) {
    this.usuario_registro = new Usuario('', '', '', '', '', 'ROLE_USER', '');
  }

 
// Registrar usuario
onSubmitRegister(){
  this._usuarioServicio.registrer(this.usuario_registro).subscribe((response:any)=>{
    let userAux=response.user;
    this.usuario_registro=userAux;

    if(!this.usuario_registro._id){
      this.alertRegister='<span style="font-weight:bold;">Error</span> al registrarse';
    }else{
      this.alertRegister='El registro se ha realizado correctamente';
      this.usuario_registro = new Usuario('', '', '', '', '', 'ROLE_USER', '');
      setTimeout(() => {
        location.href = 'http://localhost:4200/';
      }, 2000);
    }
  },  
  (error)=>{
    let errorMessage = <any>error;

    if (errorMessage != null) {
      this.alertRegister = error.error.message;
    }
  }
)
}


}
