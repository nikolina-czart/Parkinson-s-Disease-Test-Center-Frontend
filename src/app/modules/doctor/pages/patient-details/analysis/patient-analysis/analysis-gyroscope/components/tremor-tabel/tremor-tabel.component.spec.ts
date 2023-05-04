import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TremorTabelComponent } from './tremor-tabel.component';

describe('TremorTabelComponent', () => {
  let component: TremorTabelComponent;
  let fixture: ComponentFixture<TremorTabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TremorTabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TremorTabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
