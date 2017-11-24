import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";
import { FormBuilder,  Validators } from "@angular/forms";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  searchForm;
  searching;

  constructor(
    public authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private formBuilder: FormBuilder
  ) {
    this.createSearchForm();
  }

  createSearchForm() {
    this.searchForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        this.usernameValidator
      ])]
    });
  }

  /**
   * Enable and disable search form
   */
  enableSearchForm() {
    this.searchForm.controls['username'].enable();
  }
  disableSearchForm() {
    this.searchForm.controls['username'].disable();
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

  /**
   * Submit search form
   */
  onSearchSubmit() {
    this.searching = true;
    this.disableSearchForm();

    this.authService.searchUser(this.searchForm.get('username').value).subscribe(data => {
      if(!data['success']) {
        this.searching = false;
        this.enableSearchForm();
      } else {
        console.log(data);
        setTimeout( () => {

        }, 2000);
      }
    });
  }


  onLogoutClick() {
    this.authService.logout();
    this.flashMessagesService.show('You are Logged out', {cssClass: 'alert-info'});
    this.router.navigate(['/home'])
  }

  ngOnInit() {
  }

}
