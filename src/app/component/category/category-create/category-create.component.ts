import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'app/model/category';
import { CategoryService } from 'app/service/category.service';
import { StaticUrl } from 'app/util/staticurl'; 
import { SnackBarProvider } from 'app/providers/snackbar.provider';

//TRANSLATION
import { TranslateService } from 'ng2-translate';

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

    constructor( private router: Router, private service: CategoryService, private activatedRoute: ActivatedRoute, private snackbarProvider: SnackBarProvider,private translate: TranslateService ) {

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
        this.action = this.myTranslate('label.save', '');
        this.title = this.myTranslate('label.create.new.object', 'Category');
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
                this.action = this.myTranslate('label.update', '');
                this.title = this.myTranslate('label.alter.object', 'Category');
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
                this.error = this.myTranslate('warn.no.changes', '');
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
                this.snackbarProvider.title = this.myTranslate('label.success', '');
                this.snackbarProvider.message = this.myTranslate('label.updated.object', 'Category');
                this.snackbarProvider.style = "info";
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
                this.snackbarProvider.title = this.myTranslate('label.success', '');
                this.snackbarProvider.message = this.myTranslate('label.saved.object', 'Category');
                this.snackbarProvider.style = "info";
                this.router.navigate( [StaticUrl.ROUTER_CATEGORY] );
            },
            error => {
                this.errorHandler(error);
            }
        );
    }
    
    private errorHandler(error:any){
        if ( error.error != undefined && error.error != '' ) {
            this.error = this.myTranslate('exception.dataIntegrityViolation', this.category.name);
        } else {
            this.error = this.myTranslate('exception.someErrorOccurred','');
        }
        console.log( "logincomponent: error->" + error );
    }
    
    myTranslate(name:string, args:string): string {
        var subject:string;
        this.translate.get(name, {value: args}).subscribe(
             (res: string) => { 
                 subject = res;
             }
         );
        return subject;
     };
}