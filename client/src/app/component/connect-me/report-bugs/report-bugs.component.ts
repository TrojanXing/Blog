import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-report-bugs',
  templateUrl: './report-bugs.component.html',
  styleUrls: ['./report-bugs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportBugsComponent implements OnInit {

  message;
  messageClass;
  processing = false;
  form;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createBugsForm();
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
  }

  ngOnInit() {
  }

}
