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

  deleteBlog(id) {
    this.createAuthHeader();
    return this.http.delete(this.domain + '/blog/deleteBlog/' + id, this.httpOptions);
  }

  likeBlog(id) {
    this.createAuthHeader();
    let body = {
      _id: id
    };
    return this.http.put(this.domain + '/blog/likeBlog', body, this.httpOptions);
  }

  dislikeBlog(id) {
    this.createAuthHeader();
    let body = {
      _id: id
    };
    return this.http.put(this.domain + '/blog/dislikeBlog', body, this.httpOptions);
  }

  postComment(id, comment) {
    this.createAuthHeader();
    let body = {
      id: id,
      comment: comment
    };
    return this.http.post(this.domain + '/blog/comment', body, this.httpOptions);
  }
}
