import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'app/model/category';
import { PageCategory } from 'app/model/page/page.category';

import { CategoryService } from 'app/service/category.service';
import { DialogsConfirmService } from 'app/service/dialog-confirm.service';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { SnackBarProvider } from 'app/providers/snackbar.provider';

import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from "rxjs/Rx";

//TRANSLATION
import { TranslateService } from 'ng2-translate';

@Component( {
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    items: number[];
    actualPage: number = 1;
    categories: Category[];
    pageObject: PageCategory;
    errorMessage: string;
    dialogResult: any;
    search: string;
    sort: string;
    sortDir: string;
    tableHeader: string[];

    constructor( private service: CategoryService,
        private dialog: DialogsConfirmService,
        private viewContainerRef: ViewContainerRef,
        private snackbar: MdSnackBar,
        private snackbarProvider: SnackBarProvider,
        private translate: TranslateService ) {
        this.sort = 'id';
    }

    ngOnInit() {
        this.pageObject = { content: [], first: true, last: false, number: 0, numberOfElements: 5, size: 5, sort:null, totalElements: 5, totalPages: 0 };
        this.search = '';
        this.change(0);
        this.tableHeader = ['id','name','icon'];
        this.sortDir = "expand_more";
        var t = this.snackbarProvider.title;
        if ( t != null && t != "null" ) {
            this.showSnack( t, this.snackbarProvider.message );
        }
    }

    getAllCategories() {
        this.service.getAllCategories()
            .subscribe(
            categories => this.categories = categories,
            error => this.errorMessage = <any>error
            );
    }

    createRange() {
        this.items = [];
        for ( var i = 1; i <= this.pageObject.totalPages; i++ ) {
            this.items.push( i );
        }
    }
    
    change(next:number){
        this.getPageCategories(next);
    }
    
    changeSize(event){
        this.getPageCategories(0);
    }
    
    changeSearch(event){
        this.search = event;
        this.getPageCategories(0);
    }
    
    changeSortDir(){
        if(this.sortDir == "expand_more"){
            this.sortDir = "expand_less";
        }else{
            this.sortDir = "expand_more";
        }
        this.getPageCategories(0);
    }
    
    changeSort(event){
        this.sortDir = "expand_more";
        this.sort = event;
        this.getPageCategories(0);
    }

    getPageCategories(thisPage:number) {
        var direction = ',asc';
        if(this.sortDir == "expand_less"){
            direction = ',desc';
        }
        this.service.getPageCategories( this.search, thisPage, this.pageObject.size, this.sort+direction)
            .subscribe(
            res => {
                this.pageObject = res;
                this.createRange();
            },
            error => this.errorMessage = <any>error
            );
    }

    public openDialog( cat: Category ) {
        if ( cat != null && cat.id != null ) {
            this.dialog
                .confirm( this.myTranslate( 'label.dialog.confirm', null ), this.myTranslate( 'label.dialog.delete', cat.name ), this.viewContainerRef )
                .subscribe( res => {
                    if ( res ) {
                        this.service.deleted( cat.id )
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

    myTranslate( name: string, args: string ): string {
        var subject: string;
        this.translate.get( name, { value: args }).subscribe(
            ( res: string ) => {
                subject = res;
            }
        );
        return subject;
    };

    showSnack( title, msg ) {
        this.errorMessage = msg;
        let config = new MdSnackBarConfig();
        config.duration = 2000;
        config.viewContainerRef = this.viewContainerRef;
        this.snackbar.open( title, msg, config );
    }
}