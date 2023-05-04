import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTappingPatientComponent } from './table-tapping-patient.component';

describe('TableTappingPatientComponent', () => {
  let component: TableTappingPatientComponent;
  let fixture: ComponentFixture<TableTappingPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableTappingPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableTappingPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
