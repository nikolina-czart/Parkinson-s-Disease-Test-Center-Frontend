import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserDoctorsComponent } from './browser-doctors.component';

describe('BrowserDoctorsComponent', () => {
  let component: BrowserDoctorsComponent;
  let fixture: ComponentFixture<BrowserDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowserDoctorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowserDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
