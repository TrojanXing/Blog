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

  currentPage = 1;
  blogNumber;
  itemsPerPage = 5;
  hasNextPage = false;
  hasPrevPage = false;
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
    private blogService: BlogService,
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

  /**
   * Create a new blog
   */
  newBlogForm() {
    this.newPost = true;
  }

  /**
   * Submit new blog
   */
  onBlogSubmit() {
    this.processing = true;
    this.disableNewBlogForm();
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
        this.blogService.getBlogNumber().subscribe(data => {
          if (data['success']) {
            this.blogNumber = data['count'];
          }
        });
        this.changePage(1);
        this.processing = false;
        setTimeout(() => {
          this.newPost = false;
          this.message = false;
          this.form.reset();
          this.enableNewBlogForm();
        }, 1000);
      }
    });
  }

  /**
   * Get all blog from server
   */
  // getAllBlogs() {
  //   this.blogService.getAllBlog().subscribe(data => {
  //     this.blogPosts = data['blogs'];
  //   });
  // }

  /**
   * Get blogs for current page
   */
  getBlogs() {
    this.blogService.getBlogPage(this.currentPage).subscribe(data => {
      // console.log(data);
      this.blogPosts = data['blogs'];
    });
  }

  /**
   * Change page
   */
  changePage(page) {
    if (page >= 1) {
      this.currentPage = page;
      this.getBlogs();
      this.hasNextPage = (this.currentPage * this.itemsPerPage < this.blogNumber);
      this.hasPrevPage = this.currentPage > 1;
    }
  }

  /**
   * Go back to blog page, cancel create new blog
   */
  goBack() {
    this.newPost = false;
  }

  /**
   * Reload blog page
   */
  reloadBlog() {
    this.loadingBlog = true;
    this.getBlogs();
    setTimeout(() => {
      this.loadingBlog = false;
    }, 2000);
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      if (typeof profile != "undefined") {
        this.username = profile['user']['username'];
      }
    });
    this.blogService.getBlogNumber().subscribe(data => {
      // console.log(data['success']);
      // console.log(data['count']);
      if (data['success']) {
        this.blogNumber = data['count'];
        this.hasPrevPage = false;
        this.hasNextPage = (this.currentPage * this.itemsPerPage < this.blogNumber);
      }
    });

    // console.log(this.blogNumber);
    // console.log(this.hasNextPage);
    this.getBlogs();
  }

}
