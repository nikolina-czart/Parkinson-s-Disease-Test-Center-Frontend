import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPatientsComponent } from './summary-patients.component';

describe('SummaryPatientsComponent', () => {
  let component: SummaryPatientsComponent;
  let fixture: ComponentFixture<SummaryPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryPatientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
