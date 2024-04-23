import { Injectable } from "@angular/core";
import { HttpClient,HttpResponse,HttpHeaders } from "@angular/common/http"; 
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Artista } from "../models/artista";


@Injectable()
export class ArtistaServicio{
    public url:string;

    constructor(
        private _http:HttpClient
    ){
        this.url=GLOBAL.url;
    }

    // Añadir artista
    addArtist(token:any,artista:Artista){
        let params=JSON.stringify(artista);
        let headers=new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.post(this.url+'artista',params,{headers:headers}).pipe(map(res=>res));
    }

    // Mostrar artista
    getArtista(token:any,page:any){
        let headers= new HttpHeaders({

        });
    }
}