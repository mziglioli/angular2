import { Injectable } from '@angular/core';

@Injectable()
export class SnackBarProvider {

    public title: string;
    public message: string;
    public style: string;

    public constructor() { }
}