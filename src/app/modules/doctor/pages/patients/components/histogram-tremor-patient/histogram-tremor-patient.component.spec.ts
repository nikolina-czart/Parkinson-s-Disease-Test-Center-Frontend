import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistogramTremorPatientComponent } from './histogram-tremor-patient.component';

describe('HistogramTremorPatientComponent', () => {
  let component: HistogramTremorPatientComponent;
  let fixture: ComponentFixture<HistogramTremorPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistogramTremorPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistogramTremorPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
