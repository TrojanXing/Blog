import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { BlogService } from "../../../service/blog.service";

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditBlogComponent implements OnInit {

  message;
  messageClass;
  blog = {
    title: String,
    body: String
  };
  processing = false;
  currentUrl;
  loading = true;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService
  ) {}


  onEditBlogSubmit() {

  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.blogService.getSingleBlog(this.currentUrl.id).subscribe(data => {
      if (data['success']) {
        this.blog = data['blog'];
        this.loading = false;
      } else {
        this.messageClass = 'alert alert-warning';
        this.message = 'Blog not found';
      }
    });
  }

}
