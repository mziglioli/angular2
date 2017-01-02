import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, BrowserXhr } from '@angular/http';

@Injectable()
export class MyBrowserXhr extends BrowserXhr {
  constructor() {
      super();
  }
  build(): any {
    let xhr = super.build();
    xhr.withCredentials = true;
    return <any>(xhr);
  }
}