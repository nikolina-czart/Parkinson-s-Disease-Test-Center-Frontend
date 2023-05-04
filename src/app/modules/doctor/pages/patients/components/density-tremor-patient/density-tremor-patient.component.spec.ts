import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DensityTremorPatientComponent } from './density-tremor-patient.component';

describe('DensityTremorPatientComponent', () => {
  let component: DensityTremorPatientComponent;
  let fixture: ComponentFixture<DensityTremorPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DensityTremorPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DensityTremorPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
