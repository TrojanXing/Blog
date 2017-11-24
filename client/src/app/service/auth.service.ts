import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from "../../environments/environment";

@Injectable()
export class AuthService {

  // domain = "https://xingblog.herokuapp.com";  environment = prod
  // domain = "http://localhost:3000";  environment = dev
  domain = environment.domain;
  authToken;
  user;
  httpOptions;

  constructor(
    private http:HttpClient
  ) { }

  createAuthHeader() {
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

  searchUser(username){
    return this.http.get(this.domain + '/user/publicProfile/' + username);
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
    this.createAuthHeader();
    return this.http.get(this.domain + '/user/profile', this.httpOptions);
  }

  loggedIn() {
    return tokenNotExpired();
  }
}
