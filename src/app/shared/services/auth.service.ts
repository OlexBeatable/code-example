import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.api_url;
  private activeToken: BehaviorSubject<string> = new BehaviorSubject(null);

  private userRole: string;

  constructor(private http: HttpClient, private router: Router) {
      this.userRole = localStorage.getItem('user_role');

      const savedToken = localStorage.getItem('token');
      savedToken ? this.activeToken.next(savedToken) : this.activeToken.next(null);
  }

  logIn(data) {
    return this.http.post(this.url + 'login', data);
  }

  getToken() {
      return this.activeToken.asObservable();
  }

  setToken(token) {
      localStorage.setItem('token', token);
      this.activeToken.next(token);
  }

  setRole(role) {
      localStorage.setItem('user_role', role);
      this.userRole = role;
  }

  isAdmin() {
      return this.userRole === 'admin';
  }

  logOut() {
      // this.http.get(this.url + 'logout').subscribe(res => {
      //     console.log(res);
      // })
      localStorage.removeItem('token');
      localStorage.removeItem('user_role');
      this.activeToken.next(null);
      this.router.navigate(['/login']);
  }
}
