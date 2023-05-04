import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxplotTremorPatientComponent } from './boxplot-tremor-patient.component';

describe('BoxplotTremorPatientComponent', () => {
  let component: BoxplotTremorPatientComponent;
  let fixture: ComponentFixture<BoxplotTremorPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxplotTremorPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxplotTremorPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
