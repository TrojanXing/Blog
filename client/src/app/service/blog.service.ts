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
    return this.http.post(this.domain + '/blog', blog, this.httpOptions);
  }

  getBlogNumber() {
    this.createAuthHeader();
    return this.http.get(this.domain + '/blog/blogNumber', this.httpOptions);
  }

  // getAllBlog() {
  //   this.createAuthHeader();
  //   return this.http.get(this.domain + '/blog/allBlogs', this.httpOptions);
  // }

  getBlogPage(page) {
    this.createAuthHeader();
    return this.http.get(this.domain + '/blog/page/' + page, this.httpOptions);
  }

  getSingleBlog(id) {
    this.createAuthHeader();
    return this.http.get(this.domain + '/blog/' + id, this.httpOptions);
  }

  editBlog(blog) {
    this.createAuthHeader();
    return this.http.put(this.domain + '/blog', blog, this.httpOptions);
  }

  deleteBlog(id) {
    this.createAuthHeader();
    return this.http.delete(this.domain + '/blog/' + id, this.httpOptions);
  }

  likeBlog(id) {
    this.createAuthHeader();
    let body = {
      _id: id
    };
    return this.http.put(this.domain + '/blog/like', body, this.httpOptions);
  }

  dislikeBlog(id) {
    this.createAuthHeader();
    let body = {
      _id: id
    };
    return this.http.put(this.domain + '/blog/dislike', body, this.httpOptions);
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
