import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistogramTremorComponent } from './histogram-tremor.component';

describe('HistogramTremorComponent', () => {
  let component: HistogramTremorComponent;
  let fixture: ComponentFixture<HistogramTremorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistogramTremorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistogramTremorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
