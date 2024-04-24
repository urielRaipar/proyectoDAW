import { Injectable } from "@angular/core";
import { HttpClient,HttpResponse,HttpHeaders, HttpRequest } from "@angular/common/http"; 
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Album } from "../models/album";


@Injectable()
export class AlbumServicio{
    public url:string;

    constructor(
        private _http:HttpClient
    ){
        this.url=GLOBAL.url;
    }

    addAlbum(token:any,album:Album){
        let params =JSON.stringify(album);
        let headers=new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.post(this.url+'album',params,{headers:headers}).pipe(map(res=>res));
    }
}