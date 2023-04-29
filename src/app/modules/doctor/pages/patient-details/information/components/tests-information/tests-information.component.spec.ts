import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsInformationComponent } from './tests-information.component';

describe('TestsInformationComponent', () => {
  let component: TestsInformationComponent;
  let fixture: ComponentFixture<TestsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestsInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
