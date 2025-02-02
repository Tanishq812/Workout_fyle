  import { Injectable } from '@angular/core';
  import { User } from '../app/workout';
  import { BehaviorSubject } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class WorkoutService {
    private readonly STORAGE_KEY = 'workoutData';
    private userData: User[] = [];
    private usersUpdated = new BehaviorSubject<User[]>([]);
    public users$ = this.usersUpdated.asObservable();

    constructor() {
      this.loadFromLocalStorage();
      if (this.userData.length === 0) {
        this.initializeData();
      }
    }

    private initializeData() {
      this.userData = [
        { id: 1, name: 'Aarav Verma', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }] },
        { id: 2, name: 'Priya Patel', workouts: [{ type: 'Swimming', minutes: 60 }, { type: 'Running', minutes: 20 }] },
        { id: 3, name: 'Rohan Chauhan', workouts: [{ type: 'Yoga', minutes: 50 }, { type: 'Cycling', minutes: 40 }] }
      ];
      this.saveToLocalStorage();
    }



    addUser(user: User) {
      user.id = this.generateId();
      this.userData.push(user);
      this.saveToLocalStorage();
      this.usersUpdated.next([...this.userData]); // Emit a new array
    }

    updateUser(updatedUser: User) {
      const index = this.userData.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        this.userData[index] = updatedUser;
        this.saveToLocalStorage();
        this.usersUpdated.next([...this.userData]);

      }
    }

    getUsers(): User[] {
      return this.userData;
    }

    private generateId(): number {
      return this.userData.length > 0 ? Math.max(...this.userData.map(u => u.id)) + 1 : 1;
    }

    private loadFromLocalStorage() {
      const storedData = localStorage.getItem(this.STORAGE_KEY);
      this.userData = storedData ? JSON.parse(storedData) : [];
    }

    private saveToLocalStorage() {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.userData));
    }
  }
