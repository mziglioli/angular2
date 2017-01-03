import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'app/model/category';
import { CategoryService } from 'app/service/category.service';
import { DialogsConfirmService } from 'app/service/dialog-confirm.service';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Component( {
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

    categories: Category[];
    errorMessage: string;
    dialogResult: any;

    constructor( private service: CategoryService, 
                 private dialog: DialogsConfirmService, 
                 private viewContainerRef: ViewContainerRef, 
                 private snackbar: MdSnackBar) {
        this.getAllCategories();
    }

    ngOnInit() {
    }

    getAllCategories() {
        this.service.getAllCategories()
            .subscribe(
            categories => this.categories = categories,
            error => this.errorMessage = <any>error
            );
    }

    public openDialog( cat: Category ) {
        if ( cat != null && cat.id != null ) {
            this.dialog
                .confirm( 'Confirm Dialog', 'Are you sure you want to delete ' + cat.name + '?', this.viewContainerRef )
                .subscribe( res => {
                    if ( res ) {
                        this.service.deleted( cat.id )
                            .subscribe(
                            res => {this.showSnack('Sucess: ' , 'Category deleted');this.getAllCategories()},
                            error => this.showSnack('Error: ' , error.error)
                            );
                    } else {
                        console.log( "good :)" );
                    }
                }
            );
        }
    }
    
    showSnack(title, msg) { 
        this.errorMessage = msg;
        let config = new MdSnackBarConfig(); 
        config.duration = 2000; 
        config.viewContainerRef = this.viewContainerRef; 
        this.snackbar.open(title, msg, config); 
      }
}