import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDigramsComponent } from './my-digrams.component';

describe('MyDigramsComponent', () => {
  let component: MyDigramsComponent;
  let fixture: ComponentFixture<MyDigramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDigramsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDigramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
