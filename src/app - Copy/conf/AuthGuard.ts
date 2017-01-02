import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/model/user';

@Injectable()
export class AuthGuard implements CanActivate {

    user: User;

    constructor( public router: Router, public localStorage: LocalStorageService ) { }

    canActivate() {
        let sessionUser = localStorage.getItem( 'userLogged' );
        if ( sessionUser == null || sessionUser == "null" || sessionUser == "undefined" ) {
            this.router.navigate( ['/login'] );
            return false;
        }

        return true;
    }
}