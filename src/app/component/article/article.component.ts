import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogsConfirmService } from 'app/service/dialog-confirm.service';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { SnackBarProvider } from 'app/providers/snackbar.provider';
import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from "rxjs/Rx";

//TRANSLATION
import { TranslateService } from 'ng2-translate';

import { ArticleService } from 'app/service/article.service';
import { Article } from 'app/model/article';
import { Category } from 'app/model/category';
import { PageArticle } from 'app/model/page/page.article';

@Component( {
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

    items: number[];
    actualPage: number = 1;
    articles: Article[];
    pageObject: PageArticle;
    errorMessage: string;
    dialogResult: any;
    search: string;
    sort: string;
    sortDir: string;
    tableHeader: string[];

    constructor( private service: ArticleService,
        private dialog: DialogsConfirmService,
        private viewContainerRef: ViewContainerRef,
        private snackbar: MdSnackBar,
        private snackbarProvider: SnackBarProvider,
        private translate: TranslateService ) {
        this.sort = 'id';
    }

    ngOnInit() {
        this.pageObject = { content: [], first: true, last: false, number: 0, numberOfElements: 5, size: 5, sort: null, totalElements: 5, totalPages: 0 };
        this.search = '';
        this.change( 0 );
        this.sortDir = "expand_more";
        this.tableHeader = [
            this.myTranslate('label.id',null),
            this.myTranslate('label.title',null),
            this.myTranslate('label.answer',null),
            this.myTranslate('label.action',null),
            this.myTranslate('label.actionName',null)
        ];
        var t = this.snackbarProvider.title;
        if ( t != null && t != "null" ) {
            this.showSnack( t, this.snackbarProvider.message );
        }
    }

    getAllCategories() {
        this.service.getAll()
            .subscribe(
            objects => this.articles = objects,
            error => this.errorMessage = <any>error
            );
    }

    createRange() {
        this.items = [];
        for ( var i = 1; i <= this.pageObject.totalPages; i++ ) {
            this.items.push( i );
        }
    }

    change( next: number ) {
        this.getPage( next );
    }

    changeSize( event ) {
        this.getPage( 0 );
    }

    changeSearch( event ) {
        this.search = event;
        this.getPage( 0 );
    }

    changeSortDir() {
        if ( this.sortDir == "expand_more" ) {
            this.sortDir = "expand_less";
        } else {
            this.sortDir = "expand_more";
        }
        this.getPage( 0 );
    }

    changeSort( event ) {
        this.sortDir = "expand_more";
        this.sort = event;
        this.getPage( 0 );
    }

    getPage( thisPage: number ) {
        var direction = ',asc';
        if ( this.sortDir == "expand_less" ) {
            direction = ',desc';
        }
        this.service.getPage( this.search, thisPage, this.pageObject.size, this.sort + direction )
            .subscribe(
            res => {
                this.pageObject = res;
                console.log(this.pageObject.content);
                this.createRange();
            },
            error => this.errorMessage = <any>error
            );
    }
    
    public openDialog( obj: Article ) {
        if ( obj != null && obj.id != null ) {
            this.dialog
                .confirm( this.myTranslate( 'label.dialog.confirm', null ), this.myTranslate( 'label.dialog.delete', obj.title ), this.viewContainerRef )
                .subscribe( res => {
                    if ( res ) {
                        this.service.deleted( obj.id )
                            .subscribe(
                            res => {
                                this.showSnack( this.myTranslate( 'label.success', null ), this.myTranslate( 'label.deleted.category', null ) );
                                this.getAllCategories()
                            },
                            error => this.showSnack( this.myTranslate( 'label.error', null ), error.error )
                            );
                    } else {
                        console.log( "good :)" );
                    }
                }
                );
        }
    }
    
    prepareChangeCategories(article){
        console.log('prepare: ' + article);
        var array:number[] = [];
        article.categories.forEach((c: Category) => {
            array.push(c.id);
        });
        this.dialog.manageCategories(this.viewContainerRef, article, array).subscribe();
    }

    myTranslate( name: string, args: string ): string {
        var subject: string;
        this.translate.get( name, { value: args }).subscribe(
            ( res: string ) => {
                subject = res;
            }
        );
        return subject;
    }

    showSnack( title, msg ) {
        this.errorMessage = msg;
        let config = new MdSnackBarConfig();
        config.duration = 2000;
        config.viewContainerRef = this.viewContainerRef;
        this.snackbar.open( title, msg, config );
    }
}