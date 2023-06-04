import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardformDialog } from './credit-cardform.dialog';

describe('CreditCardformDialog', () => {
  let component: CreditCardformDialog;
  let fixture: ComponentFixture<CreditCardformDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardformDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardformDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
