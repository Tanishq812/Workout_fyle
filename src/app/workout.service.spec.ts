import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';
import { User, Workout } from './workout';
import { of } from 'rxjs';

describe('WorkoutService', () => {
  let service: WorkoutService;
  const initialUsers: User[] = [ // Define initial users OUTSIDE beforeEach
    { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }] },
    { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }, { type: 'Running', minutes: 20 }] },
    { id: 3, name: 'Mike Johnson', workouts: [{ type: 'Yoga', minutes: 50 }, { type: 'Cycling', minutes: 40 }] }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStorage.clear(); // Clear local storage BEFORE each test
    localStorage.setItem('workoutData', JSON.stringify(initialUsers)); // Set initial data
    service = TestBed.inject(WorkoutService); // Inject the service AFTER setting localStorage
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users', () => {
    const users = service.getUsers();
    expect(users).toEqual(initialUsers); // Compare with initialUsers
  });

  it('should add user', () => {
    const newUser: User = { id: 0, name: 'New User', workouts: [{ type: 'Swimming', minutes: 45 }] };
    service.addUser(newUser);
    const users = service.getUsers();
    expect(users.length).toBe(4);
    expect(users.find(user => user.name === 'New User')).toBeTruthy();
  });

  it('should update user', () => {
    const updatedUser: User = { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 75 }] };
    service.updateUser(updatedUser);
    const users = service.getUsers();
    const foundUser = users.find(user => user.id === 2);
    expect(foundUser).toBeTruthy();
    expect(foundUser?.workouts).toEqual(updatedUser.workouts);
  });

  it('should generate a new ID for a new user', () => {
    const newUser: User = { id: 0, name: 'New User', workouts: [{ type: 'Swimming', minutes: 45 }] };
    service.addUser(newUser);
    const users = service.getUsers();
    const addedUser = users.find(user => user.name === 'New User');
    expect(addedUser?.id).toBeGreaterThan(0);
  });



  it('should initialize data if local storage is empty', () => {
    localStorage.clear();
    const newService = new WorkoutService();
    const users = newService.getUsers();
    expect(users.length).toBeGreaterThan(0);
  });

  it('should load data from local storage', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'Test User', workouts: [{ type: 'Running', minutes: 30 }] }
    ];
    localStorage.setItem('workoutData', JSON.stringify(mockUsers));
    const newService = new WorkoutService();
    const users = newService.getUsers();
    expect(users).toEqual(mockUsers);
  });


});
