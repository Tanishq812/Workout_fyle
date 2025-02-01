import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutAddComponent } from './workout-add.component';
import { WorkoutService } from '../workout.service';
import { FormsModule } from '@angular/forms';
import { User, Workout } from '../workout';
import { of } from 'rxjs';

describe('WorkoutAddComponent', () => {
  let component: WorkoutAddComponent;
  let fixture: ComponentFixture<WorkoutAddComponent>;
  let workoutService: WorkoutService;

  beforeEach(async () => {
    const workoutServiceMock = {
      getUsers: () => [
        { id: 1, name: 'Existing User', workouts: [] }
      ] as User[],
      updateUser: (user: User) => { },
      addUser: (user: User) => { }
    };

    await TestBed.configureTestingModule({
      declarations: [WorkoutAddComponent],
      imports: [FormsModule],
      providers: [
        { provide: WorkoutService, useValue: workoutServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutAddComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add workout to existing user', () => {
    const mockWorkout: Workout = { type: 'Running', minutes: 30 };
    component.newWorkoutType = mockWorkout.type;
    component.newWorkoutMinutes = mockWorkout.minutes;
    component.newUserName = 'Existing User';

    const addButton = fixture.nativeElement.querySelector('button');

    spyOn(workoutService, 'getUsers').and.returnValue([
      { id: 1, name: 'Existing User', workouts: [] }
    ] as User[]);

    spyOn(workoutService, 'updateUser');

    addButton.click();
    fixture.detectChanges();

    expect(workoutService.updateUser).toHaveBeenCalledWith({
      id: 1,
      name: 'Existing User',
      workouts: [mockWorkout]
    });

    expect(component.newUserName).toBe('');
    expect(component.newWorkoutMinutes).toBe(0);
    expect(component.newWorkoutType).toBe('Running');
  });

  it('should add workout to new user', () => {
    const mockWorkout: Workout = { type: 'Swimming', minutes: 45 };
    component.newWorkoutType = mockWorkout.type;
    component.newWorkoutMinutes = mockWorkout.minutes;
    component.newUserName = 'New User';

    const addButton = fixture.nativeElement.querySelector('button');

    spyOn(workoutService, 'getUsers').and.returnValue([]);
    spyOn(workoutService, 'addUser');

    addButton.click();
    fixture.detectChanges();

    expect(workoutService.addUser).toHaveBeenCalledWith({
      id: jasmine.any(Number), // Check if ID is a number
      name: 'New User',
      workouts: [mockWorkout]
    });

    expect(component.newUserName).toBe('');
    expect(component.newWorkoutMinutes).toBe(0);
    expect(component.newWorkoutType).toBe('Running');
  });

  it('should handle form input changes', () => {
    const userNameInput = fixture.nativeElement.querySelector('input[type="text"]');
    userNameInput.value = 'Test Name';
    userNameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.newUserName).toBe('Test Name');

    const minutesInput = fixture.nativeElement.querySelector('input[type="number"]');
    minutesInput.value = '60';
    minutesInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.newWorkoutMinutes).toBe(60);

    const typeSelect = fixture.nativeElement.querySelector('select');
    typeSelect.value = 'Cycling';
    typeSelect.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.newWorkoutType).toBe('Cycling');
  });
});
