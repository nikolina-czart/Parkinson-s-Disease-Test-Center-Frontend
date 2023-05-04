import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DensityTappingPatientComponent } from './density-tapping-patient.component';

describe('DensityTappingPatientComponent', () => {
  let component: DensityTappingPatientComponent;
  let fixture: ComponentFixture<DensityTappingPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DensityTappingPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DensityTappingPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
