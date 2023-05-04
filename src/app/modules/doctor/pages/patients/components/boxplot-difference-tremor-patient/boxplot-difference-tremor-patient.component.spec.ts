import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxplotDifferenceTremorPatientComponent } from './boxplot-difference-tremor-patient.component';

describe('BoxplotDifferenceTremorPatientComponent', () => {
  let component: BoxplotDifferenceTremorPatientComponent;
  let fixture: ComponentFixture<BoxplotDifferenceTremorPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxplotDifferenceTremorPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxplotDifferenceTremorPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
