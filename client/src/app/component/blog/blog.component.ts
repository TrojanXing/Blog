import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BlogComponent implements OnInit {

  messageClass;
  message;
  newPost = false;
  loadingBlog = false;

  constructor() { }

  newBlogForm() {
    this.newPost = true;
  }

  reloadBlog() {
    this.loadingBlog = true;
    setTimeout(() => {
      this.loadingBlog = false;
    }, 4000);
  }

  draftComment() {

  }

  ngOnInit() {
  }

}
