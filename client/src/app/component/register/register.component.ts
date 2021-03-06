import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class RegisterComponent implements OnInit {

  form;
  message;
  messageClass;
  processing = false;
  usernameValid = true;
  usernameMessage;
  emailValid = true;
  emailMessage;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm()
  }

  /**
   * Create a form
   */
  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        this.emailValidator
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.usernameValidator
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        this.passwordValidator
      ])],
      confirm: ['', Validators.required]
    }, { validator: this.matchingPassword('password', 'confirm')})
  }

  /**
   * Value in confirm should equal to that in password
   *
   * @param password
   * @param confirm
   * @returns {(group: FormGroup) => {matchingPassword: boolean}}
   */
  matchingPassword(password, confirm) {
    return function(group: FormGroup) {
      if(group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return { 'matchingPassword': true }
      }
    }
  }

  /**
   * Validators for username, email and password
   * @param controls
   * @returns {any}
   */
  emailValidator(controls) {
    const regex = new RegExp('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$');
    if (regex.test(controls.value)) {
      return null;
    } else {
      return { 'emailValidator': true };
    }
  }

  usernameValidator(controls) {
    let regex = new RegExp('^[a-zA-Z0-9_-]{3,15}$');
    if (regex.test(controls.value)) {
      return null;
    } else {
      return { 'usernameValidator': true };
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

  /**
   * Enable and disable form
   */
  disableForm() {
    this.form.controls['email'].disable();
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
  }

  enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
  }

  /**
   * Submit form
   */
  onRegisterSubmit() {
    this.processing = true;
    this.disableForm();
    const user = {
      email: this.form.get('email').value,
      username: this.form.get('username').value,
      password: this.form.get('password').value,
    };
    this.authService.registerUser(user).subscribe(data => {
      if(!data['success']) {
        this.messageClass = 'alert alert-danger';
        this.message = data['message'];
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data['message'];
        setTimeout( () => {
          this.router.navigate( ['/login']);
        }, 2000);
      }
    });
  }

  /**
   * Check email in server when input blur
   */
  checkEmail() {
    const email = this.form.controls['email'].value;
    if (email) {
      this.authService.checkEmail(email).subscribe(data => {
        if(!data['success']) {
          this.emailValid = false;
          this.emailMessage = data['message'];
        } else {
          this.emailValid = true;
          this.emailMessage = data['message'];
        }
      });
    } else {
      this.emailValid = false;
      // this.emailMessage = 'Email is not provided'
    }

  }

  /**
   * Check username in server when input blur
   */
  checkUsername() {
    const username = this.form.controls['username'].value;
    if (username) {
      this.authService.checkUsername(username).subscribe(data => {
        if(!data['success']) {
          this.usernameValid = false;
          this.usernameMessage = data['message'];
        } else {
          this.usernameValid = true;
          this.usernameMessage = data['message'];
        }
      });
    } else {
      this.usernameValid = false;
      // this.usernameMessage = 'Username is not provided';
    }

  }

  ngOnInit() {
  }

}
