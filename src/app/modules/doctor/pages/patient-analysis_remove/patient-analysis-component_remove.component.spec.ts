import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAnalysisComponent_remove } from './patient-analysis-component_remove.component';

describe('PatientAnalysisComponent', () => {
  let component: PatientAnalysisComponent_remove;
  let fixture: ComponentFixture<PatientAnalysisComponent_remove>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAnalysisComponent_remove ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAnalysisComponent_remove);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
