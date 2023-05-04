import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxplotPatientComponent } from './boxplot-patient.component';

describe('BoxplotPatientComponent', () => {
  let component: BoxplotPatientComponent;
  let fixture: ComponentFixture<BoxplotPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxplotPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxplotPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
