import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Article } from 'app/model/article';
import { Category } from 'app/model/category';
import { Observable } from 'rxjs/Rx';

import { StaticUrl } from 'app/util/staticurl'; 

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TestService {

    constructor (private http: Http) {
        
    }
    
    someMethod(){
        return "Hello";
    }

    getCategories() : Observable<Category[]>{
        return this.http.get(StaticUrl.CATEGORY_ALL)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}