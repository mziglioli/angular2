import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'app/service/article.service';
import { Article } from 'app/model/article';
import { Category } from 'app/model/category';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

    constructor() {

    }
    
    ngOnInit() {

    }
}