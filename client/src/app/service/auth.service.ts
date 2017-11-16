import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
// import 'rxjs/add/operatpr/map';

@Injectable()
export class AuthService {

  domain = "http://localhost:3000";
  result: string[];

  constructor(
    private http:HttpClient
  ) { }

  registerUser(user) {
    return this.http.post(this.domain + '/auth/register', user);
  }
  checkUsername(username) {
    return this.http.get(this.domain + '/auth/checkusername/' + username);
  }
  checkEmail(email) {
    return this.http.get(this.domain + '/auth/checkemail/' + email);
  }

}
