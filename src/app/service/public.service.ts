import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptions,RequestMethod,Request } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { LoginForm } from 'app/model/form/login.form';
import { StaticUrl } from 'app/util/staticurl'; 
import { User } from 'app/model/user';

@Injectable()
export class PublicService {
    public token: string;

    constructor( private http: Http) {}
    
    login( loginForm: LoginForm ): Observable<any> {
        console.log("login:"+loginForm.username + ', ' + loginForm.password);
        
        return this.http.post( StaticUrl.LOGIN ,JSON.stringify(loginForm))
        .map((res:Response) => res)
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
    }

    logout(): Observable<any> {
        return this.http.get( StaticUrl.LOGOUT)
        .map((res:Response) => res)
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
    }
}