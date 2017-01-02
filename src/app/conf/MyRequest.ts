import { BaseRequestOptions, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MyRequest extends BaseRequestOptions {
    constructor() {
        super();
    }

    merge( options?: RequestOptionsArgs ): RequestOptions {
        let header = new Headers();
//        header.append( 'Content-Type', 'application/x-www-form-urlencoded' );
//        if(options.method === 1){
//          header.append( 'Content-Type', 'application/json' );
//          options.withCredentials = true;
//        }
//        header.append("Authentication", "teste");
        header.append('Accept', 'application/json');
        options.headers = header;
        var result = super.merge( options );
        result.merge = this.merge;
        return result;
    }
}