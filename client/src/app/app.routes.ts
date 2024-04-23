import { Routes } from '@angular/router';
// import { RegistroComponent } from './components/registro/registro.component';
import { ActualizarUsuarioComponent } from './components/actualizar-usuario/actualizar-usuario.component';
import { ListaArtistasComponent } from './components/lista-artistas/lista-artistas.component';
import { AnyadirArtistaComponent } from './components/anyadir-artista/anyadir-artista.component';


export const routes: Routes = [
    {
        path:'',
        redirectTo:'artists/1',
        pathMatch:'full'
    },
    {
        path: 'misDatos',
        component: ActualizarUsuarioComponent
    },

    {
        path:'artists/:page',
        component: ListaArtistasComponent
    },
    {
        path:'anyadirArtista',
        component: AnyadirArtistaComponent
    },
    {
        path:'',
        component: ListaArtistasComponent
    },
    {
        path:'**',
        component: ListaArtistasComponent
    },
   
];
