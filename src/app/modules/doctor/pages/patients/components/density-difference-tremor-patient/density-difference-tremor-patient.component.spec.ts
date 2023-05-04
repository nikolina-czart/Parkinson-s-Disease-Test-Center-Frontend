import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DensityDifferenceTremorPatientComponent } from './density-difference-tremor-patient.component';

describe('DensityDifferenceTremorPatientComponent', () => {
  let component: DensityDifferenceTremorPatientComponent;
  let fixture: ComponentFixture<DensityDifferenceTremorPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DensityDifferenceTremorPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DensityDifferenceTremorPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
