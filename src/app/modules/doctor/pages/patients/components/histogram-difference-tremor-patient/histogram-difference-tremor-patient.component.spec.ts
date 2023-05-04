import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistogramDifferenceTremorPatientComponent } from './histogram-difference-tremor-patient.component';

describe('HistogramDifferenceTremorPatientComponent', () => {
  let component: HistogramDifferenceTremorPatientComponent;
  let fixture: ComponentFixture<HistogramDifferenceTremorPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistogramDifferenceTremorPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistogramDifferenceTremorPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
