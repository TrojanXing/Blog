import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BlogService } from "../../../service/blog.service";

@Component({
  selector: 'app-delete-blog',
  templateUrl: './delete-blog.component.html',
  styleUrls: ['./delete-blog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DeleteBlogComponent implements OnInit {

  message;
  messageClass;
  foundBlog = false;
  processing;

  constructor(
    private blogService: BlogService
  ) { }

  deleteBlog() {

  }

  ngOnInit() {
  }

}
