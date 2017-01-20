import { Category } from 'app/model/category';

export class Article {
    constructor(
        public id: number, 
        public title: string,
        public answer: string,
        public action: string,
        public actionName: string,
        public categories:Category[]
    ){}
}