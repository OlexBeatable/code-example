import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}
  private url = environment.api_url;

  getById(id) {
      return this.http.get(this.url + 'user/' + id);
  }

  getAll() {
      return this.http.get(this.url + 'user/list');
  }

  addUser(user) {
      return this.http.put(this.url + 'user/', user);
  }

  editUser(user) {
      return this.http.post(this.url + 'user/', user);
  }

  changePassword(userName, newPassword) {
      return this.http.post(this.url + 'user/change-password/' + userName, {newPassword});
  }
}
