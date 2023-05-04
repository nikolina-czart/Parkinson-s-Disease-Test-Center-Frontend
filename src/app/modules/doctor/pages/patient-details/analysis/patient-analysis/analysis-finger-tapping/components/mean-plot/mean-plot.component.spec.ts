import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeanPlotComponent } from './mean-plot.component';

describe('MeanPlotComponent', () => {
  let component: MeanPlotComponent;
  let fixture: ComponentFixture<MeanPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeanPlotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeanPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
