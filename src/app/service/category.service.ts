import { Injectable } from '@angular/core';
import { Http, Response,Headers,RequestOptionsArgs,RequestOptions,RequestMethod,Request } from '@angular/http';
import { Category } from 'app/model/category';
import { PageCategory } from 'app/model/page/page.category';

import { Observable } from 'rxjs/Rx';
import { LocalStorageService } from 'angular-2-local-storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { StaticUrl } from 'app/util/staticurl'; 
import { MyHeader } from 'app/util/MyHeader'; 

@Injectable()
export class CategoryService {
 
    pageCat : PageCategory;
    
    constructor( private http: Http, public localStorage: LocalStorageService) {
        //TODO
    }
    
    getAllCategories() : Observable<Category[]>{
        return this.http.get(StaticUrl.CATEGORY_ALL)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    getPageCategories(search:string, page:number, size:number) : Observable<PageCategory>{
        return this.http.get(StaticUrl.CATEGORY_PAGE+"search="+search+"&page=" + page + "&size="+ size)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    getCategory(id:number) : Observable<Category>{
        return this.http.get(StaticUrl.CATEGORY_ALL+"/"+id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    save( category: Category ): Observable<Category> {
        let headers = MyHeader.HeaderDefault;
        var requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: StaticUrl.CATEGORY_SAVE,
            headers: headers,
            body: JSON.stringify(category)
        })
        return this.http.request(new Request(requestoptions))
        .map((res:Response) => res)
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
    }
    
    update( category: Category, id: number ): Observable<Category> {
        let headers = MyHeader.HeaderDefault;
        var requestoptions = new RequestOptions({
            method: RequestMethod.Put,
            url: StaticUrl.CATEGORY_SAVE+id,
            headers: headers,
            body: JSON.stringify(category)
        })
        return this.http.request(new Request(requestoptions))
        .map((res:Response) => res)
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
    }
    
    deleted( id: number ) {
        return this.http.delete(StaticUrl.CATEGORY_SAVE+id)
        .map((res:Response) => res)
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
    }
}