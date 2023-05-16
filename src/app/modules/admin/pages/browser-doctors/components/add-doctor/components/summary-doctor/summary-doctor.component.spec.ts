import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryDoctorComponent } from './summary-doctor.component';

describe('SummaryDoctorComponent', () => {
  let component: SummaryDoctorComponent;
  let fixture: ComponentFixture<SummaryDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
