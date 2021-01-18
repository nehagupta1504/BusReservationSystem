import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskEmailBookingidComponent } from './ask-email-bookingid.component';

describe('AskEmailBookingidComponent', () => {
  let component: AskEmailBookingidComponent;
  let fixture: ComponentFixture<AskEmailBookingidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskEmailBookingidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskEmailBookingidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
