import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs-compat';
import {MatDialog} from '@angular/material';
import {NotifierService} from 'angular-notifier';

import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.mode';
import {UsersFormDialogComponent} from './users-form-dialog/users-form-dialog.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'role', 'datecreated', 'datemodified', 'actions'];

  constructor(
      private usersService: UsersService, public dialog: MatDialog, private notifierService: NotifierService) { }

  ngOnInit() {
      this.fetch();
  }

  fetch() {
      this.usersService.getAll().subscribe((res: User[]) => {
          this.users = res;
      }, e => {
          console.log(e);
      });
  }

  addUser() {
      this.openDialog().flatMap(data => !data ? Observable.empty() : this.usersService.addUser(data).first())
      .subscribe((res: any) => {
          this.notifierService.notify('success', 'Success');
          this.fetch();
      }, e => {
          this.notifierService.notify('error', e.error.message || 'Something went wrong');
      });
  }

  editUser(id) {
      this.usersService.getById(id)
      .flatMap((user: User) => this.openDialog({user}))
      .flatMap(data => !data ? Observable.empty() : this.usersService.editUser(data).first())
      .subscribe((res: any) => {
          this.notifierService.notify('success', 'Success');
          this.fetch();
      }, e => {
          this.notifierService.notify('error', e.error.message || 'Something went wrong');
      });
  }

  openDialog(data = {}) {
      const dialogRef = this.dialog.open(UsersFormDialogComponent, {data});
      return dialogRef.afterClosed();
  }
}
