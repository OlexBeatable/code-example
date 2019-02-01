import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }
  private url = environment.api_url;

  getById(id) {
      return this.http.get(this.url + 'message/' + id);
  }

  getAll(params) {
      return this.http.get(
              this.url + 'message/list',
              {
                  params: new HttpParams({
                  fromObject: params
                  })
              }
          );
  }

  putEntity(text) {
      const headers: any = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.put(this.url + 'message/', {text}, headers);
  }

  changeMessage(text) {
      return this.http.post(this.url + 'message/', text);
  }
}
