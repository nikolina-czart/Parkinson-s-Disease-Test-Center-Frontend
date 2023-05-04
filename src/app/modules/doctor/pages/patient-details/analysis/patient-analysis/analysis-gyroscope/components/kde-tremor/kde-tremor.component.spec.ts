import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KdeTremorComponent } from './kde-tremor.component';

describe('KdeTremorComponent', () => {
  let component: KdeTremorComponent;
  let fixture: ComponentFixture<KdeTremorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KdeTremorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KdeTremorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
