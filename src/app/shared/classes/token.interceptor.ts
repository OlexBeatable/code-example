import {Injectable, OnInit} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs-compat';
import {AuthService} from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor, OnInit {
  private token;
  constructor(private authService: AuthService) {
    this.authService.getToken().subscribe(_token => {
      this.token = _token;
    });
  }

  ngOnInit() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token) {
      req = req.clone({
        setHeaders: {
          Authorization: this.token
        }
      });
    }
    return next.handle(req).do(event => {}, err => {
      if (err instanceof HttpErrorResponse && err.status == 401) {
        this.authService.logOut();
      }
    });
  }
}
