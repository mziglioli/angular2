import { Headers } from '@angular/http';

export class MyHeader {

    public static get HeaderDefault(): Headers { 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return headers;
    }
}