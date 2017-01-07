import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
//import { Observable } from 'rxjs/Observable';
import {Observable, Observer, Subject} from "rxjs/Rx";
import { User } from 'app/model/user';
import { StaticUrl } from 'app/util/staticurl'; 
import { PublicService } from 'app/service/public.service';

@Injectable()
export class AuthGuard implements CanActivate {

    user: User;

    constructor( public router: Router, public localStorage: LocalStorageService, public service: PublicService ) { }

    canActivate() {
        return this.userLogged();
    }
    
    userLogged(): Observable<any> {
        var subject = new Subject<boolean>();
        this.service.userLogged().subscribe(
            res => {
                this.user = res.json();
                localStorage.setItem( "userLogged", JSON.stringify( this.user ) );
                subject.next(true);
            },
            error => {
                localStorage.removeItem( 'userLogged' );
                this.router.navigate( [StaticUrl.ROUTER_LOGIN] );
                subject.next(false);
            }
        );
        return subject.asObservable().first();
    }
}