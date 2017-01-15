import { Category } from 'app/model/category';

export class PageCategory{
    constructor(
        public content:Category[],
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