import { Injectable } from "@angular/core";
import { HttpClient,HttpResponse,HttpHeaders } from "@angular/common/http"; 
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { GLOBAL } from "./global";


@Injectable()
export class UsuarioServicio{
    public url:string;

    constructor(private _http:HttpClient){
        this.url=GLOBAL.url;
    }

    signup(user_login: any, gethash:any=null){
        if(gethash!=null){
           user_login.gethash=gethash;
        }
        let params=JSON.stringify(user_login);
        let headers= new HttpHeaders({'Content-Type':'application/json'});

        return this._http.post(this.url+'login',params,{headers:headers}).pipe(map(res=>res));
    }
}