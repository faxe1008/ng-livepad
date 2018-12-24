import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarReconnectComponent } from './snackbar-reconnect.component';

describe('SnackbarReconnectComponent', () => {
  let component: SnackbarReconnectComponent;
  let fixture: ComponentFixture<SnackbarReconnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbarReconnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarReconnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
