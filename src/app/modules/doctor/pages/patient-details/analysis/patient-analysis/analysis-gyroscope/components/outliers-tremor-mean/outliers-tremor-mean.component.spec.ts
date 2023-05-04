import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutliersTremorMeanComponent } from './outliers-tremor-mean.component';

describe('OutliersTremorMeanComponent', () => {
  let component: OutliersTremorMeanComponent;
  let fixture: ComponentFixture<OutliersTremorMeanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutliersTremorMeanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutliersTremorMeanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
