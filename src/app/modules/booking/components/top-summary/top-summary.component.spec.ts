import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSummaryComponent } from './top-summary.component';

describe('TopSummaryComponent', () => {
  let component: TopSummaryComponent;
  let fixture: ComponentFixture<TopSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
