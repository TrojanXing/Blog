import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tokenNotExpired } from 'angular2-jwt';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  domain = "http://localhost:3000";
  authToken;
  user;
  httpOptions;

  constructor(
    private http:HttpClient
  ) { }

  creatAuthHeader() {
    this.loadToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth': this.authToken
      })
    }
  }

  /**
   * load token from browser local storage
   */
  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
    // console.log('load token: ' + token);
  }

  registerUser(user) {
    return this.http.post(this.domain + '/auth/register', user);
  }
  checkUsername(username) {
    return this.http.get(this.domain + '/auth/checkusername/' + username);
  }
  checkEmail(email) {
    return this.http.get(this.domain + '/auth/checkemail/' + email);
  }

  loginUser(user) {
    return this.http.post(this.domain + '/auth/login', user);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
    this.authToken = token;
    this.user = user;
  }

  getProfile() {
    this.creatAuthHeader();
    return this.http.get(this.domain + '/auth/profile', this.httpOptions);
  }

  loggedIn() {
    return tokenNotExpired();
  }
}
