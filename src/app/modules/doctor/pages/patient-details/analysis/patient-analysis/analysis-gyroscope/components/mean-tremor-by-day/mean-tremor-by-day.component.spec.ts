import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeanTremorByDayComponent } from './mean-tremor-by-day.component';

describe('MeanTremorByDayComponent', () => {
  let component: MeanTremorByDayComponent;
  let fixture: ComponentFixture<MeanTremorByDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeanTremorByDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeanTremorByDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
