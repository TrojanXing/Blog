import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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


  constructor(
    private formBuilder: FormBuilder
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
      createdBy: ['', Validators.compose([
        Validators.required
      ])]
    });
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
    console.log('Form submit');
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
  }

}
