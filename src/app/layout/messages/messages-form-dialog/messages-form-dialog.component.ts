import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'app-messages-form-dialog',
    templateUrl: './messages-form-dialog.component.html',
    styleUrls: ['./messages-form-dialog.component.scss']
})

export class MessagesFormDialogComponent implements OnInit {
    form: FormGroup;
    message;

    constructor(public dialogRef: MatDialogRef<MessagesFormDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {
        this.message = data;
    }

    ngOnInit() {
        this.form = new FormGroup({
            _id: new FormControl(this.message._id),
            text: new FormControl(this.message.text, [Validators.required]),
            user: new FormControl(this.message.user, [Validators.required]),
        });
    }

    submitForm() {
        if (this.form.valid) {
            this.dialogRef.close(this.form.value);
        }
    }

    onCloseCancel() {
        this.dialogRef.close('CANCEL');
    }
}
