import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisFingerTappingComponent } from './analysis-finger-tapping.component';

describe('AnalysisFingerTappingComponent', () => {
  let component: AnalysisFingerTappingComponent;
  let fixture: ComponentFixture<AnalysisFingerTappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisFingerTappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisFingerTappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
