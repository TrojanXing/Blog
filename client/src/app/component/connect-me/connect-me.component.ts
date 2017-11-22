import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-connect-me',
  templateUrl: './connect-me.component.html',
  styleUrls: ['./connect-me.component.css'],
  animations: [
    trigger('oneSecState', [
      state('inactive', style({
        color: '#000',
        top: 150,
        display: 'none'
      })),
      state('active',   style({
        top: 0,
        color: '#fff'
      })),
      transition('inactive => active', animate('1000ms ease-in')),
      // transition('active => inactive', animate('1000ms ease-out'))
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class ConnectMeComponent implements OnInit {

  message;
  messageClass;
  processing = false;
  showingElement = 1;
  form;
  oneSecState = 'inactive';

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createBugsForm();
  }

  show(id) {
    this.showingElement = id;
  }

  /**
   * Report bugs
   */
  createBugsForm() {
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
      ])]
    })
  }

  /**
   * Enable and disable form
   */
  disableBugsForm() {
    this.form.controls['title'].disable();
    this.form.controls['body'].disable();
  }

  enableBugsForm() {
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
   * Submit Bugs
   */
  onBugsSubmit() {
    this.messageClass = 'alert alert-success';
    this.message = 'Bugs submitted, developer will never see this, 23333333333';
    this.processing = true;
    this.disableBugsForm();
    setTimeout(() => {
      this.goBack();
      this.message = false;
      this.processing = false;
      this.form.reset();
      this.enableBugsForm();
    }, 5000);
  }

  /**
   * Cancel report bugs
   */
  goBack() {
    this.form.reset();
    this.showingElement = 1;
  }

  /**
   * Contribute animation
   */
  toggleState() {
    this.oneSecState = 'active';
    setTimeout(() => {
      this.oneSecState = 'inactive';
    }, 1000);
  }


  ngOnInit() {
  }

}
