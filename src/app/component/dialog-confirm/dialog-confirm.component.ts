import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component( {
    selector: 'app-dialog-confirm',
    templateUrl: './dialog-confirm.component.html',
    styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

    public title: string;
    public message: string;

    constructor( public dialogRef: MdDialogRef<DialogConfirmComponent> ) {

    }

    ngOnInit() {
    }

}
