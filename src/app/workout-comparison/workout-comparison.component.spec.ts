import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutComparisonComponent } from './workout-comparison.component';

describe('WorkoutComparisonComponent', () => {
  let component: WorkoutComparisonComponent;
  let fixture: ComponentFixture<WorkoutComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutComparisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

