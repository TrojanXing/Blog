import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  title = "Xing Blog";

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  // open() {
  //   const modalRef = this.modalService.show(SignupModalComponent);
  //   // modalRef.componentInstance.name = 'World';
  // }

}
