import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutliersTremorKdeComponent } from './outliers-tremor-kde.component';

describe('OutliersTremorKdeComponent', () => {
  let component: OutliersTremorKdeComponent;
  let fixture: ComponentFixture<OutliersTremorKdeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutliersTremorKdeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutliersTremorKdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
