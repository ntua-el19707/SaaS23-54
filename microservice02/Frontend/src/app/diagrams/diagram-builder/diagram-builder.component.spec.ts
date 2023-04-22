import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramBuilderComponent } from './diagram-builder.component';

describe('DiagramBuilderComponent', () => {
  let component: DiagramBuilderComponent;
  let fixture: ComponentFixture<DiagramBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagramBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagramBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
