import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutliersTremorBoxplotComponent } from './outliers-tremor-boxplot.component';

describe('OutliersTremorBoxplotComponent', () => {
  let component: OutliersTremorBoxplotComponent;
  let fixture: ComponentFixture<OutliersTremorBoxplotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutliersTremorBoxplotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutliersTremorBoxplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
