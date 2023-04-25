import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPatientBaseFormComponent } from './new-patient-base-form.component';

describe('NewPatientBaseFormComponent', () => {
  let component: NewPatientBaseFormComponent;
  let fixture: ComponentFixture<NewPatientBaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPatientBaseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPatientBaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
