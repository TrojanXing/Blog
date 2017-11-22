import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css'],
  // imports: [ BrowserAnimationsModule ],
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
export class ContributeComponent implements OnInit {

  oneSecState = 'inactive';

  constructor() {}

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
