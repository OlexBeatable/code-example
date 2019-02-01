import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule, MatDialogModule, MatInputModule, MatSelectModule, MatTableModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentModule} from 'angular2-moment';

import {MessagesFormDialogComponent} from './messages-form-dialog/messages-form-dialog.component';
import { NewMessageComponent } from './new-message/new-message.component';
import {MessagesComponent} from './messages.component';
import {MessagesRoutingModule} from './messages-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MessagesRoutingModule,
        MatListModule,
        MatDividerModule,
        FlexLayoutModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MomentModule,
        MatSelectModule
    ],
    entryComponents: [MessagesFormDialogComponent],
    declarations: [MessagesComponent, NewMessageComponent, MessagesFormDialogComponent]
})
export class MessagesModule { }
