import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersOptionComponent } from './passengers-option.component';

describe('PassengersOptionComponent', () => {
  let component: PassengersOptionComponent;
  let fixture: ComponentFixture<PassengersOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengersOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengersOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
