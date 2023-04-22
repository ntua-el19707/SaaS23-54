import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramOppsComponent } from './diagram-opps.component';

describe('DiagramOppsComponent', () => {
  let component: DiagramOppsComponent;
  let fixture: ComponentFixture<DiagramOppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagramOppsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagramOppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
