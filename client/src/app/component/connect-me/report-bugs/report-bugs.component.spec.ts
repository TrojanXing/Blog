import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBugsComponent } from './report-bugs.component';

describe('ReportBugsComponent', () => {
  let component: ReportBugsComponent;
  let fixture: ComponentFixture<ReportBugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportBugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
