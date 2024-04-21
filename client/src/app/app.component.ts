import { Component, OnInit } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { Usuario } from './models/usuario';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioServicio } from './service/usuario.servicio';
import { RegistroComponent } from './components/registro/registro.component';
import { ActualizarUsuarioComponent } from './components/actualizar-usuario/actualizar-usuario.component';
import { GLOBAL } from './service/global';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    HttpClientModule,
    RegistroComponent,
    RouterLink,
    ActualizarUsuarioComponent
  ],
  providers: [UsuarioServicio],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  public title = 'Spotismall';
  public usuario: Usuario;
  public identificacion: any;
  public token: any;
  public errorMessage: any;
  public url:any;

  constructor(
    private _usuarioServicio: UsuarioServicio
  ) {
    this.usuario = new Usuario('', '', '', '', '', 'ROLE_USER', '');
    this.url=GLOBAL.url;
  }

  // Inicializar variables
  ngOnInit() {
    this.identificacion=JSON.parse(this._usuarioServicio.getIdentity());
    this.token=this._usuarioServicio.getToken();

    console.log(this.identificacion)
    console.log(this.token)
  }

  // Logearse
  public onSubmit() {
    console.log(this.usuario)

    // Conseguir datos del usuario identificado
    this._usuarioServicio.signup(this.usuario).subscribe((response: any) => {
      let identity = response.user;
      this.identificacion = identity;

      if (!this.identificacion._id) {
        alert("El usuario no está correctamente identificado");
      } else {
        // Crear elemento en el localstorage para tener al usuario en sesion
        localStorage.setItem('identity',JSON.stringify(this.identificacion));


          // Conseguir el token para enviarselo a cada peticion http
          this._usuarioServicio.signup(this.usuario,'true').subscribe((response: any) => {
            let tokenn = response.token;
            this.token = tokenn;

            if (this.token.length<=0) {
              alert("El token no se ha generado correctamente");
            } else {
              // Crear elemento en el localstorage para tener el token disponible
              localStorage.setItem('token',this.token);
              console.log(this.token);
              console.log(this.identificacion)
            }
          },
            (error) => {
              let errorMessage = <any>error;

              if (errorMessage != null) {
                this.errorMessage = error.error.message;
              }
            });
      }
    },
      (error) => {
        let errorMessage = <any>error;

        if (errorMessage != null) {
          this.errorMessage = error.error.message;
        }
      });
  }

  // Cerrar sesion(borrar sesion)
  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    // Eliminacion global
    localStorage.clear();

    this.identificacion=null;
    this.token=null;

    location.href = 'http://localhost:4200/';

  }
}
