import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'app/model/category';
import { CategoryService } from 'app/service/category.service';

@Component( {
    selector: 'app-category-create',
    templateUrl: './category-create.component.html',
    styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {

    categoryAux: Category;
    category: Category;
    error: string;
    paramsSub: any;
    id: number;
    action:string;

    constructor( private router: Router, private service: CategoryService, private activatedRoute: ActivatedRoute ) {

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
        this.category = { id: null, name: '', icon: '' };
        this.action = "Save";
        if ( this.id != undefined ) {
            this.getCategory( this.id );
        }
    }

    getCategory( id: number ) {
        this.service.getCategory( id )
            .subscribe(
            category => {
                this.category = category;
                this.categoryAux = Object.assign({}, category);
                this.action = "Update";
            },
            error => this.error = <any>error
            );
    }

    save() {
        console.log( 'save category: ' + this.category );
        this.error = '';
        var change = true;
        if(this.categoryAux != null && this.id != undefined){
            if(this.categoryAux == this.category){
                this.error = "No Changes detected";
                change = false;
            }
        }
        if(change){
            this.service.save( this.category )
                .subscribe(
                result => {
                    console.log( "saved: " + result );
                    this.router.navigate( ['category'] );
                },
                error => {
                    if ( error.error != undefined && error.error != '' ) {
                        this.error = error.error;
                    } else {
                        //FIXME
                        this.error = 'Some error occurred';
                    }
                    console.log( "logincomponent: error->" + error );
                }
            );
        }
    }
}