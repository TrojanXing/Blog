import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";
import { AuthGuard } from "../../guards/auth.guard";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  form;
  processing = false;
  message;
  messageClass;
  previousUrl;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard
  ) {
    this.createForm();

  }

  /**
   * Create a form
   */
  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        this.usernameValidator
      ])],
      password: ['', Validators.compose([
        Validators.required,
        this.passwordValidator
      ])]
    });
  }

  /**
   * Username and password validator
   * @param controls
   * @returns {any}
   */
  usernameValidator(controls) {
    let regex = new RegExp('^[a-zA-Z0-9_-]{3,15}$');
    if (regex.test(controls.value)) {
      return null;
    } else {
      return { 'usernameVa': true };
    }
  }

  passwordValidator(controls) {
    let regex = new RegExp('^(?=.*\\d)(?=.*?[A-Z])(?=.*?[a-z]).{8,20}$');
    if (regex.test(controls.value)) {
      return null;
    } else {
      return { 'passwordValidator': true };
    }
  }

  disableForm() {
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
  }

  enableForm() {
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
  }

  onLoginSubmit() {
    this.processing = true;
    this.disableForm();
    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value,
    };
    this.authService.loginUser(user).subscribe(data => {
      if(!data['success']) {
        this.messageClass = 'alert alert-danger';
        this.message = data['message'];
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data['message'];
        this.authService.storeUserData(data['token'], data['user']);
        setTimeout( () => {
          if (this.previousUrl) {
            this.router.navigate([this.previousUrl]);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }, 2000);
      }
    });
  }

  ngOnInit() {
    // If current page is redirected from other page
    if (this.authGuard.redirectUrl) {
      console.log(this.authGuard.redirectUrl);
      this.message = 'You must be logged in to view that page';
      this.messageClass = 'alert alert-danger';
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
  }

}
