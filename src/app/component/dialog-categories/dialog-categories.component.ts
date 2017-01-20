import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'app/model/article';
import { Category } from 'app/model/category';
import { PageCategory } from 'app/model/page/page.category';

import { CategoryService } from 'app/service/category.service';
import { DialogsConfirmService } from 'app/service/dialog-confirm.service';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { SnackBarProvider } from 'app/providers/snackbar.provider';
import { MdDialogRef } from '@angular/material';

import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from "rxjs/Rx";

//TRANSLATION
import { TranslateService } from 'ng2-translate';

@Component( {
    selector: 'app-dialog-categories',
    templateUrl: './dialog-categories.component.html',
    styleUrls: ['./dialog-categories.component.scss']
})
export class DialogCategoriesComponent implements OnInit {

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
    checkedCategories: number[];
    article: Article;

    constructor(
        public dialogRef: MdDialogRef<DialogCategoriesComponent>,
        private service: CategoryService,
        private translate: TranslateService ) {
        this.sort = 'id';
    }

    ngOnInit() {
        this.pageObject = { content: [], first: true, last: false, number: 0, numberOfElements: 5, size: 5, sort: null, totalElements: 5, totalPages: 0 };
        this.search = '';
        this.change( 0 );
        this.tableHeader = ['id', 'name', 'icon'];
        this.sortDir = "expand_more";
        console.log('init article: ' + this.article);
        var array:number[] = [];
    }
    
    saveAndClose() {
        console.log( 'save category: ' + this.article );
        console.log( 'save articles: ' + this.checkedCategories );
        //TODO
        // articleservice.save()
        this.dialogRef.close();
    }
    
    markCategory(value){
        var index = this.checkedCategories.indexOf(value);
        if(index >= 0){
            this.checkedCategories.splice(index, 1);
        }else{
            this.checkedCategories.push(value);
        }
        console.log(this.checkedCategories);
    }

    isChecked(value){
        var index = this.checkedCategories.indexOf(value);
        if(index >= 0){
            return true;
        }
        return false;
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

    change( next: number ) {
        this.getPageCategories( next );
    }

    changeSize( event ) {
        this.getPageCategories( 0 );
    }

    changeSearch( event ) {
        this.search = event;
        this.getPageCategories( 0 );
    }

    changeSortDir() {
        if ( this.sortDir == "expand_more" ) {
            this.sortDir = "expand_less";
        } else {
            this.sortDir = "expand_more";
        }
        this.getPageCategories( 0 );
    }

    changeSort( event ) {
        this.sortDir = "expand_more";
        this.sort = event;
        this.getPageCategories( 0 );
    }

    getPageCategories( thisPage: number ) {
        var direction = ',asc';
        if ( this.sortDir == "expand_less" ) {
            direction = ',desc';
        }
        this.service.getPageCategories( this.search, thisPage, this.pageObject.size, this.sort + direction )
            .subscribe(
            res => {
                this.pageObject = res;
                this.createRange();
            },
            error => this.errorMessage = <any>error
            );
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