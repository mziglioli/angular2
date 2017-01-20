import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './conf/AuthGuard';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { ArticleComponent } from './component/article/article.component';
import { ArticleCreateComponent } from './component/article/article-create/article-create.component';
import { CategoryComponent } from './component/category/category.component';
import { CategoryCreateComponent } from './component/category/category-create/category-create.component';
import { TesteComponent } from './component/teste/teste.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';

export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'teste', component: TesteComponent , canActivate: [AuthGuard]},
    { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
    { path: 'article', canActivate: [AuthGuard], 
        children: [
             { path: '', component: ArticleComponent },
             { path: 'edit/:id', component: ArticleCreateComponent },         
             { path: 'new', redirectTo:'new', pathMatch: 'full' },
             { path: 'new', component: ArticleCreateComponent },         
    ]},
    { path: 'category', canActivate: [AuthGuard], 
        children: [
             { path: '', component: CategoryComponent },
             { path: 'edit/:id', component: CategoryCreateComponent },         
             { path: 'new', redirectTo:'new', pathMatch: 'full' },
             { path: 'new', component: CategoryCreateComponent },         
    ]},
];
export const routes: ModuleWithProviders = RouterModule.forRoot( router );