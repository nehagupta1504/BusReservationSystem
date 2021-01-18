import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBusListComponent } from './update-bus-list.component';

describe('UpdateBusListComponent', () => {
  let component: UpdateBusListComponent;
  let fixture: ComponentFixture<UpdateBusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBusListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
