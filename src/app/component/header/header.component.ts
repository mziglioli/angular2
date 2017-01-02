import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

import { User } from 'app/model/user';
import { PublicService } from 'app/service/public.service';

import { StaticUrl } from 'app/util/staticurl';
 
@Component( {
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    user: User;
    error:string;
    constructor(private router: Router, public publicService: PublicService, public localStorage: LocalStorageService) { }

    ngOnInit() {
        this.isUserLogged();
    } 
    
    isUserLogged(){
        let sessionUser = localStorage.getItem('userLogged');
        if(sessionUser != null && sessionUser != "null" && sessionUser != "undefined"){
            this.user = JSON.parse(sessionUser);
            return true;
        }
        return false;
    }
    
    logout(){
        console.log( 'logout' );
        this.error = '',
        this.publicService.logout()
            .subscribe(
                res => {
                    if(res != null && res != "undefined"){
                        console.log("result: " + res.status + " = " + res._body);
                    }
                    localStorage.setItem('userLogged', null);
                    this.user = null;
                    this.router.navigate([StaticUrl.ROUTER_LOGIN]);
                },
                error => {
                    if(error.error != undefined && error.error != ''){
                        this.error = error.error;
                    }else{
                        //FIXME
                        this.error = 'Some error occurred';
                    }
                    console.log( "logout component: error->" + error );
                }
            );
    }
}