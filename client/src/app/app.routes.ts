import { Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { ActualizarUsuarioComponent } from './components/actualizar-usuario/actualizar-usuario.component';

export const routes: Routes = [
    {
        path: 'registrarse',
        component: RegistroComponent
    },
    {
        // Ruta seguramente no necesaria
        path:'actualizar-usuario',
        component: ActualizarUsuarioComponent
    }
];
