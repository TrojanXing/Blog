import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    })
  }

  onLoginSubmit() {

  }

  ngOnInit() {
  }

}
