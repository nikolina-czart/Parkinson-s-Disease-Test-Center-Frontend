import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserPatientComponent } from './browser-patient.component';

describe('BrowserPatientComponent', () => {
  let component: BrowserPatientComponent;
  let fixture: ComponentFixture<BrowserPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowserPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowserPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
