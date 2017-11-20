import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable()
export class BlogService {

  httpOptions;
  domain = this.authService.domain;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  createAuthHeader() {
    this.authService.loadToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth': this.authService.authToken
      })
    };
  }

  newBlog(blog) {
    this.createAuthHeader();
    return this.http.post(this.domain + '/blog/newBlog', blog, this.httpOptions);
  }

  getAllBlog() {
    this.createAuthHeader();
    return this.http.get(this.domain + '/blog/allBlogs', this.httpOptions);
  }

  getSingleBlog(id) {
    this.createAuthHeader();
    return this.http.get(this.domain + '/blog/singleBlog/' + id, this.httpOptions);
  }

  editBlog(blog) {
    this.createAuthHeader();
    return this.http.put(this.domain + '/blog/updateBlog', blog, this.httpOptions);
  }
}
