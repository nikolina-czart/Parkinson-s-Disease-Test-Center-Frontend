import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutliersTremorHistogramComponent } from './outliers-tremor-histogram.component';

describe('OutliersTremorHistogramComponent', () => {
  let component: OutliersTremorHistogramComponent;
  let fixture: ComponentFixture<OutliersTremorHistogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutliersTremorHistogramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutliersTremorHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
