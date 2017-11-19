import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../service/auth.service";
import { BlogService } from "../../service/blog.service";

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
  form;
  processing = false;
  username;
  blogPosts;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private blogService: BlogService
  ) {
    this.createNewBlog();
  }

  createNewBlog() {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.titleValidator
      ])],
      body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5),
      ])],
      createdBy: ['']
    });
  }

  /**
   * Enable and disable form
   */
  disableNewBlogForm() {
    this.form.controls['title'].disable();
    this.form.controls['body'].disable();
  }

  enableNewBlogForm() {
    this.form.controls['title'].enable();
    this.form.controls['body'].enable();
  }

  /**
   * Title validator
   */
  titleValidator(controls) {
    let regex = new RegExp(/^[a-zA-Z0-9 ]+$/, 'g');
    if (regex.test(controls.value)) {
      return null;
    } else {
      return { 'titleValidator': true };
    }
  }


  newBlogForm() {
    this.newPost = true;
  }

  onBlogSubmit() {
    this.processing = true;
    this.disableNewBlogForm();
    console.log(this.username);
    const blog = {
      title: this.form.get('title').value,
      body: this.form.get('body').value,
      createdBy: this.username
    };
    this.blogService.newBlog(blog).subscribe(data => {
      if (!data['success']) {
        this.messageClass = 'alert alert-danger';
        this.message = data['message'];
        this.processing = false;
        this.enableNewBlogForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data['message'];
        this.getAllBlogs();
        setTimeout(() => {
          this.newPost = false;
          this.processing = false;
          this.message = false;
          this.form.reset();
        }, 2000);
      }
    });
  }

  getAllBlogs() {
    this.blogService.getAllBlog().subscribe(data => {
      this.blogPosts = data['blogs'];
    })
  }

  goBack() {
    this.newPost = false;
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
    this.authService.getProfile().subscribe(profile => {
      // console.log(profile);
      this.username = profile['user']['username'];
    });
    this.getAllBlogs();
  }

}
