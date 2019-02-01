import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs-compat';
import {NotifierService} from 'angular-notifier';
import {MatDialog} from '@angular/material';

import {MessagesService} from '../../shared/services/messages.service';
import {MessagesFormDialogComponent} from './messages-form-dialog/messages-form-dialog.component';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages = [];
  adminDisplayedColumns: string[] = ['user', 'text', 'datecreated', 'datemodified', 'actions'];
  userDisplayedColumns: string[] = ['text', 'datecreated', 'datemodified'];
  isAdmin: boolean;
  params = {};

  constructor(
      private messagesService: MessagesService,
      public dialog: MatDialog,
      private notifierService: NotifierService,
      private authService: AuthService
  ) {
      this.isAdmin = this.authService.isAdmin();
  }

    fetch(params = {}) {
      this.messagesService.getAll(params).subscribe((res: any[]) => {
          this.messages = res;
      }, e => {
          console.log(e);
      });
    }

    ngOnInit() {
      this.fetch();
    }

    onMessageAdded(message) {
      this.messages.push(message);
      this.fetch(this.params);
    }

    onTimeChange() {
      this.fetch(this.params);
    }

    editMessage(id) {
      this.messagesService.getById(id)
      .flatMap(message => this.openDialog(message))
      .flatMap(result => {
          return result === 'CANCEL' ? Observable.empty() :  this.messagesService.changeMessage(result.text).first();
      })
      .subscribe(res => {
          this.notifierService.notify('success', 'Success');
          this.fetch(this.params);
      }, e => {
          this.notifierService.notify('error', e.error.message || 'Something went wrong');
      });
    }

    openDialog(data = {}) {
        const dialogRef = this.dialog.open(MessagesFormDialogComponent, {data});
        return dialogRef.afterClosed();
    }
}
