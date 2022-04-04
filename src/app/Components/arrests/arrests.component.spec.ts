import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrestsComponent } from './arrests.component';

describe('ArrestsComponent', () => {
  let component: ArrestsComponent;
  let fixture: ComponentFixture<ArrestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
