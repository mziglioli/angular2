import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs, RequestOptions, RequestMethod, Request } from '@angular/http';
import { Article } from 'app/model/article';
import { PageArticle } from 'app/model/page/page.article';

import { Observable } from 'rxjs/Rx';
import { LocalStorageService } from 'angular-2-local-storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { StaticUrl } from 'app/util/staticurl';
import { MyHeader } from 'app/util/MyHeader';

@Injectable()
export class ArticleService {

    pageObject: PageArticle;

    constructor( private http: Http, public localStorage: LocalStorageService ) {}

    getAll(): Observable<Article[]> {
        return this.http.get( StaticUrl.ARTICLE_ALL )
            .map(( res: Response ) => res.json() )
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    getPage( search: string, page: number, size: number, sort: string ): Observable<PageArticle> {
        return this.http.get( StaticUrl.ARTICLE_PAGE + "search=" + search + "&page=" + page + "&size=" + size + "&sort=" + sort )
            .map(( res: Response ) => res.json() )
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    getObject( id: number ): Observable<Article> {
        return this.http.get( StaticUrl.ARTICLE_ALL + "/" + id )
            .map(( res: Response ) => res.json() )
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    save( category: Article ): Observable<Article> {
        let headers = MyHeader.HeaderDefault;
        var requestoptions = new RequestOptions( {
            method: RequestMethod.Post,
            url: StaticUrl.ARTICLE_SAVE,
            headers: headers,
            body: JSON.stringify( category )
        })
        return this.http.request( new Request( requestoptions ) )
            .map(( res: Response ) => res )
            .catch(( error: any ) => Observable.throw( error.json() || 'Server error' ) );
    }

    update( category: Article, id: number ): Observable<Article> {
        let headers = MyHeader.HeaderDefault;
        var requestoptions = new RequestOptions( {
            method: RequestMethod.Put,
            url: StaticUrl.ARTICLE_SAVE + id,
            headers: headers,
            body: JSON.stringify( category )
        })
        return this.http.request( new Request( requestoptions ) )
            .map(( res: Response ) => res )
            .catch(( error: any ) => Observable.throw( error.json() || 'Server error' ) );
    }

    deleted( id: number ) {
        return this.http.delete( StaticUrl.ARTICLE_SAVE + id )
            .map(( res: Response ) => res )
            .catch(( error: any ) => Observable.throw( error.json() || 'Server error' ) );
    }
}