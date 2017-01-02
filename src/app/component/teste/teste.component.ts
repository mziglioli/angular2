import { Component, OnInit } from '@angular/core';
import { TestService } from 'app/service/test.service';
import { Article } from 'app/model/article';
import { Category } from 'app/model/category';

@Component( {
    selector: 'app-teste',
    templateUrl: './teste.component.html',
    styleUrls: ['./teste.component.scss']
})
export class TesteComponent implements OnInit {

    myText: string;
    categories: Category[];
    errorMessage: string;

    constructor( private testService: TestService ) {
        this.getArticles();
    }

    myInputKeyPress( event: any ) {
        this.myText = event.target.value;
    }

    ngOnInit() {
        this.myText = this.testService.someMethod();
    }

    getArticles() {
        this.testService.getCategories()
            .subscribe(
            categories => this.categories = categories,
            error => this.errorMessage = <any>error
            );
    }
}