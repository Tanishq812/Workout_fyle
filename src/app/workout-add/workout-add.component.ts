import { Component } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { User, Workout } from '../workout';

@Component({
  selector: 'app-workout-add',
  templateUrl: './workout-add.component.html',
  styleUrls: ['./workout-add.component.css']
})
export class WorkoutAddComponent {
  newUserName: string = '';
  newWorkoutType: string = 'Running'; // Default workout type
  newWorkoutMinutes: number = 0;
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];

  constructor(private workoutService: WorkoutService) { }

  addWorkout() {
    const newWorkout: Workout = {
      type: this.newWorkoutType,
      minutes: this.newWorkoutMinutes
    };

    let existingUser = this.workoutService.getUsers().find(user => user.name === this.newUserName);

    if (existingUser) {
      existingUser.workouts.push(newWorkout);
      this.workoutService.updateUser(existingUser);
    } else {
      const newUser: User = {
        id: 0,
        name: this.newUserName,
        workouts: [newWorkout]
      };
      this.workoutService.addUser(newUser);
    }

    this.newUserName = '';
    this.newWorkoutMinutes = 0;
    this.newWorkoutType = 'Running'; // Reset to default
  }
}
