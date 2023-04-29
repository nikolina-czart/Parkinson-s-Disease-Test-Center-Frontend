import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisGyroscopeComponent } from './analysis-gyroscope.component';

describe('AnalysisGyroscopeComponent', () => {
  let component: AnalysisGyroscopeComponent;
  let fixture: ComponentFixture<AnalysisGyroscopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisGyroscopeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisGyroscopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
