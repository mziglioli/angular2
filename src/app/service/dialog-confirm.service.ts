import { Observable } from 'rxjs/Rx';
import { DialogConfirmComponent } from 'app/component/dialog-confirm/dialog-confirm.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable()
export class DialogsConfirmService {

    constructor( private dialog: MdDialog ) { }

    public confirm( title: string, message: string, viewContainerRef: ViewContainerRef ): Observable<boolean> {

        let dialogRef: MdDialogRef<DialogConfirmComponent>;
        let config = new MdDialogConfig();
        config.viewContainerRef = viewContainerRef;

        dialogRef = this.dialog.open( DialogConfirmComponent, config );

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }
}