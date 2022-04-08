import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPdfComponent } from './verify-pdf.component';

describe('VerifyPdfComponent', () => {
  let component: VerifyPdfComponent;
  let fixture: ComponentFixture<VerifyPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
