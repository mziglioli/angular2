import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from 'app/model/article';
import { ArticleService } from 'app/service/article.service';
import { StaticUrl } from 'app/util/staticurl';
import { SnackBarProvider } from 'app/providers/snackbar.provider';

//TRANSLATION
import { TranslateService } from 'ng2-translate';

@Component( {
    selector: 'app-article-create',
    templateUrl: './article-create.component.html',
    styleUrls: ['./article-create.component.scss']
})
export class ArticleCreateComponent implements OnInit {

    articleyAux: Article;
    article: Article;
    error: string;
    paramsSub: any;
    id: number;
    action: string;
    title: string;
    translateArticle:string;

    constructor( private router: Router, private service: ArticleService, private activatedRoute: ActivatedRoute, private snackbarProvider: SnackBarProvider, private translate: TranslateService ) {

    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
    }

    ngOnInit() {
        this.paramsSub = this.activatedRoute.params.subscribe( params => {
            var auxId = params['id'];
            if ( auxId != null && auxId != 'undefined' && !isNaN( auxId ) ) {
                this.id = parseInt( auxId );
            }
        });
        this.article = { id: null, title: '', answer: '', action:'',actionName:'',categories:[] };
        this.action = this.myTranslate( 'label.save', '' );
        this.translateArticle = this.myTranslate( 'label.article', '' );
        this.title = this.myTranslate( 'label.create.new.object', this.translateArticle );
        if ( this.id != undefined ) {
            this.getArticle( this.id );
        }
        
    }

    getArticle( id: number ) {
        this.service.getObject( id )
            .subscribe(
            article => {
                this.article = article;
                this.articleyAux = Object.assign( {}, article );
                this.action = this.myTranslate( 'label.update', '' );
                this.title = this.myTranslate( 'label.alter.object', this.translateArticle );
            },
            error => this.error = <any>error
            );
    }

    submit() {
        console.log( 'save category: ' + this.article );
        this.error = '';
        var change = true;
        if ( this.articleyAux != null && this.id != undefined ) {
            if ( !this.hasChanged() ) {
                this.error = this.myTranslate( 'warn.no.changes', '' );
                change = false;
            }
        }
        if ( change ) {
            if ( this.id != undefined && this.id != null ) {
                this.update();
            } else {
                this.save();
            }
        }
    }

    private hasChanged() {
        if ( this.articleyAux != null ) {
            if ( this.articleyAux.title == this.article.title && this.articleyAux.answer == this.article.answer &&
                 this.articleyAux.action == this.article.action && this.articleyAux.actionName == this.article.actionName) {
                return false;
            }
        }
        return true;
    }

    private update() {
        this.service.update( this.article, this.id )
            .subscribe(
            result => {
                console.log( "updated: " + result );
                this.snackbarProvider.title = this.myTranslate( 'label.success', '' );
                this.snackbarProvider.message = this.myTranslate( 'label.updated.object', this.translateArticle );
                this.snackbarProvider.style = "info";
                this.router.navigate( [StaticUrl.ROUTER_ARTICLE] );
            },
            error => {
                this.errorHandler( error );
            }
            );
    }

    private save() {
        this.service.save( this.article )
            .subscribe(
            result => {
                console.log( "saved: " + result );
                this.snackbarProvider.title = this.myTranslate( 'label.success', '' );
                this.snackbarProvider.message = this.myTranslate( 'label.saved.object', this.translateArticle );
                this.snackbarProvider.style = "info";
                this.router.navigate( [StaticUrl.ROUTER_ARTICLE] );
            },
            error => {
                this.errorHandler( error );
            }
            );
    }

    private errorHandler( error: any ) {
        if ( error.error != undefined && error.error != '' ) {
            this.error = this.myTranslate( 'exception.dataIntegrityViolation', this.article.title );
        } else {
            this.error = this.myTranslate( 'exception.someErrorOccurred', '' );
        }
        console.log( "logincomponent: error->" + error );
    }

    myTranslate( name: string, args: string ): string {
        var subject: string;
        this.translate.get( name, { value: args }).subscribe(
            ( res: string ) => {
                subject = res;
            }
        );
        return subject;
    };
}