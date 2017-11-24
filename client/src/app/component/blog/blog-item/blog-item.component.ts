import { Component, OnInit, Output, Input, ViewEncapsulation, EventEmitter } from '@angular/core';
import { BlogService } from "../../../service/blog.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BlogItemComponent implements OnInit {

  messageClass;
  message;
  form;
  processing = false;
  deleteTarget;
  tooltipMessage;
  newComment = [];
  commentForm;
  showComment = false;

  @Input() blog;
  @Input() username;
  @Output() updateBlogs = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService
  ) {
    this.createCommentForm();
  }

  /**
   * Delete a Blog
   */
  getDeleteTarget(blog) {
    this.deleteTarget = blog;
  }
  deleteBlog() {
    console.log()
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
          this.updateBlogs.emit();
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
      this.updateBlogs.emit();
    });
  }

  dislikeBlog(id) {
    this.blogService.dislikeBlog(id).subscribe(data => {
      this.updateBlogs.emit();
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
        this.processing = false;
        this.enableCommentForm();
      } else {
        this.updateBlogs.emit();
        const ind = this.newComment.indexOf(id);
        this.newComment.splice(ind, 1);
        this.enableCommentForm();
        this.processing = false;
        this.commentForm.reset();
        if (!this.showComment) {
          this.expand();
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

  expand() {
    this.showComment = true;
  }
  collapse() {
    this.showComment = false;
  }

  ngOnInit() {

  }

}
