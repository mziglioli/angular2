import { Injectable } from '@angular/core';
import { Http, Response,Headers,RequestOptionsArgs,RequestOptions,RequestMethod,Request } from '@angular/http';
import { Category } from 'app/model/category';
import { Observable } from 'rxjs/Rx';
import { LocalStorageService } from 'angular-2-local-storage';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { StaticUrl } from 'app/util/staticurl'; 

@Injectable()
export class CategoryService {
 
    constructor( private http: Http, public localStorage: LocalStorageService) {
        //TODO
    }
    
    getAllCategories() : Observable<Category[]>{
        return this.http.get(StaticUrl.CATEGORY_ALL)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    getCategory(id:number) : Observable<Category>{
        return this.http.get(StaticUrl.CATEGORY_ALL+"/"+id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    save( category: Category ): Observable<Category> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

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
}