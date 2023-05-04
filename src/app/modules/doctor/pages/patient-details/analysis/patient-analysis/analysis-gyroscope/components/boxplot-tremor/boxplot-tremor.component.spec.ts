import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxplotTremorComponent } from './boxplot-tremor.component';

describe('BoxplotTremorComponent', () => {
  let component: BoxplotTremorComponent;
  let fixture: ComponentFixture<BoxplotTremorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxplotTremorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxplotTremorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
