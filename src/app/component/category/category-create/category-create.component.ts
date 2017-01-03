import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'app/model/category';
import { CategoryService } from 'app/service/category.service';
import { StaticUrl } from 'app/util/staticurl'; 

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
    title:string;

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
        this.title = "Create New Category";
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
                this.title = "Alter Category";
            },
            error => this.error = <any>error
            );
    }

    submit() {
        console.log( 'save category: ' + this.category );
        this.error = '';
        var change = true;
        if(this.categoryAux != null && this.id != undefined){
            if(!this.hasChanged()){
                this.error = "No Changes detected";
                change = false;
            }
        }
        if(change){
            if ( this.id != undefined && this.id != null ) {
                this.update();
            }else{
                this.save();
            }
        }
    }
    
    private hasChanged(){
        if(this.categoryAux != null){
            if(this.categoryAux.name == this.category.name && this.categoryAux.icon == this.category.icon){
                return false;
            }
        }
        return true;
    }
    
    private update(){
        this.service.update(this.category, this.id)
        .subscribe(
            result => {
                console.log( "updated: " + result );
                this.router.navigate( [StaticUrl.ROUTER_CATEGORY] );
            },
            error => {
                this.errorHandler(error);
            }
        );
    }
    
    private save(){
        this.service.save( this.category )
        .subscribe(
            result => {
                console.log( "saved: " + result );
                this.router.navigate( [StaticUrl.ROUTER_CATEGORY] );
            },
            error => {
                this.errorHandler(error);
            }
        );
    }
    
    private errorHandler(error:any){
        if ( error.error != undefined && error.error != '' ) {
            this.error = error.error;
        } else {
            //FIXME
            this.error = 'Some error occurred';
        }
        console.log( "logincomponent: error->" + error );
    }
}