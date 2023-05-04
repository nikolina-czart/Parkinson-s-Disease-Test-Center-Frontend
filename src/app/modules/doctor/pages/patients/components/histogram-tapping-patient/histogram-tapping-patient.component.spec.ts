import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistogramTappingPatientComponent } from './histogram-tapping-patient.component';

describe('HistogramTappingPatientComponent', () => {
  let component: HistogramTappingPatientComponent;
  let fixture: ComponentFixture<HistogramTappingPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistogramTappingPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistogramTappingPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
