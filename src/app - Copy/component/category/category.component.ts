import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'app/model/category';
import { CategoryService } from 'app/service/category.service';

@Component( {
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

    categories: Category[];
    errorMessage: string;

    constructor( private service: CategoryService ) {
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

}