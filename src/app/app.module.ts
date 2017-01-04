import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, XHRBackend, BrowserXhr } from '@angular/http';
import { routes } from './app.router';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

//CONF
import { MyBrowserXhr } from 'app/conf/MyBrowserXhr';
import { AuthGuard } from 'app/conf/AuthGuard';

//COMPONENTS
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { ArticleComponent } from './component/article/article.component';
import { TesteComponent } from './component/teste/teste.component';
import { CategoryComponent } from './component/category/category.component';
import { LoginComponent } from './component/login/login.component';
import { CategoryCreateComponent } from './component/category/category-create/category-create.component';
import { HomeComponent } from './component/home/home.component';


//SERVICES
import { ArticleService } from 'app/service/article.service';
import { CategoryService } from 'app/service/category.service';
import { TestService } from 'app/service/test.service';
import { PublicService } from 'app/service/public.service';
import { DialogsConfirmService } from 'app/service/dialog-confirm.service';

//SESSION
import { LocalStorageModule } from 'angular-2-local-storage';
import { DialogConfirmComponent } from './component/dialog-confirm/dialog-confirm.component';

//PROVIDERS
import { SnackBarProvider } from 'app/providers/snackbar.provider';

@NgModule( {
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ArticleComponent,
        TesteComponent,
        CategoryComponent,
        LoginComponent,
        CategoryCreateComponent,
        HomeComponent,
        DialogConfirmComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routes,
        LocalStorageModule.withConfig( {
            prefix: 'app-root',
            storageType: 'localStorage'
        }),
        MaterialModule.forRoot()
    ],
    providers: [
        AuthGuard,
        ArticleService,
        CategoryService,
        TestService,
        PublicService,
        { provide: BrowserXhr, useClass: MyBrowserXhr },
        DialogsConfirmService,
        SnackBarProvider
    ],
    entryComponents: [
        DialogConfirmComponent,
    ],
    bootstrap: [AppComponent]

})
export class AppModule { }
