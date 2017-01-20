import { Article } from 'app/model/article';

export class PageArticle{
    constructor(
        public content:Article[],
        public first: boolean,
        public last: boolean,
        public number: number,
        public numberOfElements:number,
        public size: number,
        public sort: any,
        public totalElements: number,
        public totalPages: number
    ){}
}