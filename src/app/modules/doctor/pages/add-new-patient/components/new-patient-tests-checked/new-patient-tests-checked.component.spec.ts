import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPatientTestsCheckedComponent } from './new-patient-tests-checked.component';

describe('NewPatientTestsCheckedComponent', () => {
  let component: NewPatientTestsCheckedComponent;
  let fixture: ComponentFixture<NewPatientTestsCheckedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPatientTestsCheckedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPatientTestsCheckedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
