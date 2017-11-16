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

  form: FormGroup;
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

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        this.validateEmail
      ])],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    }, { validator: this.matchingPassword('password', 'confirm')})
  }

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

  matchingPassword(password, confirm) {
    return function(group: FormGroup) {
      if(group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return { 'matchingPassword': true }
      }
    }
  }

  validateEmail(controls) {
    const regex = new RegExp('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$');
    if (regex.test(controls.value)) {
      return null;
    } else {
      return { 'validateEmail': true };
    }
  }

  onRegisterSubmit() {
    // console.log('form submitted');
    // console.log(this.form.get('email').value);
    // console.log(this.form.get('username').value);
    // console.log(this.form.get('password').value);
    this.processing = true;
    this.disableForm()
    const user = {
      email: this.form.get('email').value,
      username: this.form.get('username').value,
      password: this.form.get('password').value,
    };
    this.authService.registerUser(user).subscribe(data => {
      // console.log(data);
      if(!data['success']) {
        this.messageClass = 'alert alert-danger';
        this.message = data['message'];
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data['message'];
        setTimeout(function () {
          this.router.navigate(['/login']);
        }, 2000);
      }
    });
  }

  checkEmail() {
    const email = this.form.controls['email'].value;
    this.authService.checkEmail(email).subscribe(data => {
      if(!data['success']) {
        this.emailValid = false;
        this.emailMessage = data['message'];
      } else {
        this.emailValid = true;
        this.emailMessage = data['message'];
      }
    });
  }

  checkUsername() {
    const username = this.form.controls['username'].value;
    this.authService.checkUsername(username).subscribe(data => {
      if(!data['success']) {
        this.usernameValid = false;
        this.usernameMessage = data['message'];
      } else {
        this.usernameValid = true;
        this.usernameMessage = data['message'];
      }
    });
  }

  ngOnInit() {
  }

}
