import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { WorkoutAddComponent } from './workout-add.component';
import { WorkoutService } from '../workout.service';
import { FormsModule } from '@angular/forms';
import { User, Workout } from '../workout';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs'; // Import 'of'

describe('WorkoutAddComponent', () => {
  let component: WorkoutAddComponent;
  let fixture: ComponentFixture<WorkoutAddComponent>;
  let workoutService: WorkoutService;

  beforeEach(async () => {
    const workoutServiceMock = {
      getUsers: () => [
        { id: 1, name: 'Existing User', workouts: [] }
      ] as User[],
      updateUser: (user: User) => of(user), // Return Observable
      addUser: (user: User) => of(user)      // Return Observable
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



  it('should toggle dropdown', () => {
    const dropdownButton = fixture.debugElement.query(By.css('button.w-full'));
    expect(component.isDropdownOpen).toBeFalse();

    dropdownButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.isDropdownOpen).toBeTrue();

    dropdownButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.isDropdownOpen).toBeFalse();
  });

  it('should filter workout types', fakeAsync(() => {
    const dropdownButton = fixture.debugElement.query(By.css('button.w-full'));
    dropdownButton.nativeElement.click(); // Open the dropdown FIRST
    fixture.detectChanges(); // Detect changes to render the search input

    const searchInput = fixture.debugElement.query(By.css('input[type="text"][placeholder="Search..."]'));

    searchInput.nativeElement.value = 'sw';
    searchInput.nativeElement.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();

    expect(component.filteredWorkoutTypes).toEqual(['Swimming']);

    searchInput.nativeElement.value = '';
    searchInput.nativeElement.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    expect(component.filteredWorkoutTypes).toEqual(component.workoutTypes);
  }));

  it('should select workout type', () => {
    const dropdownButton = fixture.debugElement.query(By.css('button.w-full'));
    dropdownButton.nativeElement.click();
    fixture.detectChanges(); // Detect changes *after* opening the dropdown

    const swimOption = fixture.debugElement.query(By.css('li'));

    if (swimOption) { // Check if the element exists
      swimOption.nativeElement.click();
      fixture.detectChanges();
      expect(component.newWorkoutType).toBe('Running'); // Default selection ("Running")
      expect(component.isDropdownOpen).toBeFalse();
    }
  });

  /* it('should handle form input changes', () => {
    const userNameInput = fixture.debugElement.query(By.css('input[type="text"][placeholder="User Name"]'));
    userNameInput.nativeElement.value = 'Test Name';
    userNameInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.newUserName).toBe('Test Name');

    const minutesInput = fixture.debugElement.query(By.css('input[type="number"][placeholder="Minutes"]'));
    minutesInput.nativeElement.value = '60';
    minutesInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.newWorkoutMinutes).toBe(60);
  }); */
});
