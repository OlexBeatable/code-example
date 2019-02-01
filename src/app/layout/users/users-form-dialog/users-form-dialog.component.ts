import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {User} from '../../../shared/models/user.mode';

@Component({
    selector: 'app-users-form-dialog',
    templateUrl: './users-form-dialog.component.html',
    styleUrls: ['./users-form-dialog.component.scss']
})

export class UsersFormDialogComponent implements OnInit {
    form: FormGroup;
    user: User;

    constructor(public dialogRef: MatDialogRef<UsersFormDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {
        if (data.user) {
            this.user = data.user;
        } else {
            this.user = new User('', '');
        }
    }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl(this.user.name, [Validators.required]),
            password: new FormControl(''),
            role: new FormControl(this.user.role, [Validators.required]),
            _id: new FormControl(this.user._id)
        });
    }

    submitForm() {
        if (this.form.valid) {
            this.dialogRef.close(this.form.value);
        }
    }

    onCloseCancel() {
        this.dialogRef.close();
    }
}
