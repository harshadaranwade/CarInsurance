import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistartionDetailsComponent } from './registartion-details.component';

describe('RegistartionDetailsComponent', () => {
  let component: RegistartionDetailsComponent;
  let fixture: ComponentFixture<RegistartionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistartionDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistartionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
