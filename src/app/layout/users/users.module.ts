import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatTooltipModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MomentModule} from 'angular2-moment';

import {UsersComponent} from './users.component';
import {UsersRoutingModule} from './users-routing.module';
import {UsersFormDialogComponent} from './users-form-dialog/users-form-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule,
        MatTableModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatDividerModule,
        MatIconModule,
        MatTooltipModule,
        MomentModule
    ],
    entryComponents: [UsersFormDialogComponent],
    declarations: [UsersComponent, UsersFormDialogComponent]
})
export class UsersModule { }
