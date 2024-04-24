import { Routes } from '@angular/router';
// import { RegistroComponent } from './components/registro/registro.component';
// Importaciones usuario
import { ActualizarUsuarioComponent } from './components/actualizar-usuario/actualizar-usuario.component';
// Importaciones artista
import { ListaArtistasComponent } from './components/lista-artistas/lista-artistas.component';
import { AnyadirArtistaComponent } from './components/anyadir-artista/anyadir-artista.component';
import { ActualizarArtistaComponent } from './components/actualizar-artista/actualizar-artista.component';
import { ArtistaDetalleComponent } from './components/artista-detalle/artista-detalle.component';
// Importaciones album
import { AnyadirAlbumComponent } from './components/anyadir-album/anyadir-album.component';
import { ActualizarAlbumComponent } from './components/actualizar-album/actualizar-album.component';



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
        path:'editarArtista/:id',
        component: ActualizarArtistaComponent
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
        path:'artista/:id',
        component:ArtistaDetalleComponent
    },
    {
        path:'crearAlbum/:artista',
        component:AnyadirAlbumComponent
    },
    {
        path:'actualizarAlbum/:id',
        component:ActualizarAlbumComponent
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
