import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPatientSummaryComponent } from './new-patient-summary.component';

describe('NewPatientSummaryComponent', () => {
  let component: NewPatientSummaryComponent;
  let fixture: ComponentFixture<NewPatientSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPatientSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPatientSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
