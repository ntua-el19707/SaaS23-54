import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicedownComponent } from './servicedown.component';

describe('ServicedownComponent', () => {
  let component: ServicedownComponent;
  let fixture: ComponentFixture<ServicedownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicedownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicedownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
