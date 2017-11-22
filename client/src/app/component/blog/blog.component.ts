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
  deleteTarget;
  tooltipMessage;
  newComment = [];
  commentForm;
  enabledComment = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private blogService: BlogService,
  ) {
    this.createNewBlog();
    this.createCommentForm();
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
        this.getAllBlogs();
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
  getAllBlogs() {
    this.blogService.getAllBlog().subscribe(data => {
      this.blogPosts = data['blogs'];
    });
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
    this.getAllBlogs();
    setTimeout(() => {
      this.loadingBlog = false;
    }, 200);
  }

  /**
   * Delete a Blog
   */
  getDeleteTarget(blog) {
    this.deleteTarget = blog;
  }
  deleteBlog() {
    if (this.deleteTarget) {
      this.processing = true;
      this.blogService.deleteBlog(this.deleteTarget._id).subscribe(data => {
        if (!data['success']) {
          this.messageClass = 'alert alert-danger';
          this.message = data['message'];
          this.processing = false;
        } else {
          this.messageClass = 'alert alert-success';
          this.message = data['message'];
          this.getAllBlogs();
        }
        setTimeout(() => {
          this.message = false;
          this.processing = false;
        }, 1000);
      });
      this.deleteTarget = null;
    }

  }

  /**
   * like and dislike a blog
   */
  likeBlog(id) {
    this.blogService.likeBlog(id).subscribe(data => {
      this.getAllBlogs();
    });
  }

  dislikeBlog(id) {
    this.blogService.dislikeBlog(id).subscribe(data => {
      this.getAllBlogs();
    })
  }
  getTooltipMessage(blog, like) {
    let users = like? blog.likedBy : blog.dislikedBy;
    if (users.length === 0) {
      this.tooltipMessage = like ? 'No user like this post yet, be the first one' :
        'A good blog, no user dislike this yet!';
    } else {
      this.tooltipMessage = '';
      for (let i = 0; i < 3 && i < users.length; i++) {
        this.tooltipMessage += (users[i] + ', ');
      }
      this.tooltipMessage += like? 'etc like this post' : 'etc dislike this blog';
    }
  }

  /**
   * Create comment form
   */
  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.compose([
        Validators.maxLength(100),
        Validators.minLength(1),
        Validators.required
      ])]
    })
  }

  /**
   * Enable and disable comment form
   */
  enableCommentForm() {
    this.commentForm.controls['comment'].enable();
  }
  disableCommentForm() {
    this.commentForm.controls['comment'].disable();
  }

  /**
   * Create a comment
   */
  draftComment(id) {
    this.newComment = [];
    this.newComment.push(id);
  }
  /**
   * Post comment
   */
  postComment(id) {
    this.processing = true;
    this.disableCommentForm();
    this.blogService.postComment(id, this.commentForm.get('comment').value).subscribe(data => {
      if (!data['success']) {
        console.log(data['message']);
        this.processing = false;
        this.enableCommentForm();
      } else {
        this.getAllBlogs();
        const ind = this.newComment.indexOf(id);
        this.newComment.splice(ind, 1);
        this.enableCommentForm();
        this.processing = false;
        this.commentForm.reset();
        if (this.enabledComment.indexOf(id) === -1) {
          this.expand(id);
        }
      }
    });
  }

  cancelComment(id) {
    const ind = this.newComment.indexOf(id);
    this.newComment.splice(ind,1);
    this.commentForm.reset();
    this.enableCommentForm();
    this.processing = false;
  }

  expand(id) {
    this.enabledComment.push(id);
  }
  collapse(id) {
    const ind = this.enabledComment.indexOf(id);
    this.enabledComment.splice(ind, 1);
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      if (typeof profile != "undefined") {
        this.username = profile['user']['username'];
      }
    });
    this.getAllBlogs();
  }

}
