import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTremorPatientComponent } from './table-tremor-patient.component';

describe('TableTremorPatientComponent', () => {
  let component: TableTremorPatientComponent;
  let fixture: ComponentFixture<TableTremorPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableTremorPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableTremorPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
