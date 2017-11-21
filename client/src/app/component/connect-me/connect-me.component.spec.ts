import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectMeComponent } from './connect-me.component';

describe('ConnectMeComponent', () => {
  let component: ConnectMeComponent;
  let fixture: ComponentFixture<ConnectMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
