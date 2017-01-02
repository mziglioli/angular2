import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

import { LoginForm } from 'app/model/form/login.form';
import { PublicService } from 'app/service/public.service';
import { LoginResponse } from 'app/model/form/login.response';
import { User } from 'app/model/user';
import { StaticUrl } from 'app/util/staticurl';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component( {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    loginForm: LoginForm;
    loading = false;
    error = '';
    result: any;

    constructor(
        private router: Router,
        private publicService: PublicService,
        public localStorage: LocalStorageService ) { }

    ngOnInit() {
        this.loginForm = { username: '', password: '' };
        if(this.isUserLogged()){
            this.redirecToHome();
        }
    }
    
    isUserLogged(){
        let sessionUser = localStorage.getItem('userLogged');
        if(sessionUser != null && sessionUser != "null" && sessionUser != "undefined"){
            return true;
        }
        return false;
    }
    
    redirecToHome(){
        this.router.navigate( [StaticUrl.ROUTER_HOME] );
    }

    login() {
        console.log( 'login' );
        this.loading = true;
        this.error = '',
        this.publicService.login( this.loginForm ).subscribe(
            res => {
                this.loading = false;
                var str = res._body;
                var json = JSON.parse(str);
                localStorage.setItem( "userLogged", JSON.stringify( json ) );
                this.redirecToHome();
            },
            error => {
                if ( error.error != undefined && error.error != '' ) {
                    this.error = error.error;
                } else {
                    //FIXME
                    this.error = 'Some error occurred';
                }
                this.loading = false;
                console.log( "logincomponent: error->" + error );
            }
        );
    }
}