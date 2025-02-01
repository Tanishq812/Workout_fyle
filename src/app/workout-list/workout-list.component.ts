import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { User } from '../workout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  filterType: string = 'All';
  workoutTypes: string[] = ['All', 'Running', 'Cycling', 'Swimming', 'Yoga'];
  selectedWorkoutType: string = 'All';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  /* selectedUsers: User[] = []; */ // Add this to store selected users
  showComparison: boolean = false;
  selectedUser: User | null = null; // Add this to control graph visibility
  private userSubscription: Subscription = new Subscription();

  constructor(private workoutService: WorkoutService) { }

  ngOnInit(): void {
    this.loadUsers();

    this.userSubscription = this.workoutService.users$.subscribe(users => {
      this.users = users;
      this.applyFilters();
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  loadUsers() {
    this.users = this.workoutService.getUsers();
    this.applyFilters();
  }

  searchUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.applyFilters();
  }

  filterWorkouts() {
    if (this.filterType === 'All') {
      this.filteredUsers = this.users;
      return;
    }

    this.filteredUsers = this.users.filter(user =>
      user.workouts.some(workout => workout.type === this.filterType)
    );
  }

  onWorkoutTypeChange(event: any) {
    this.selectedWorkoutType = event.target.value;
    this.filterWorkouts();
  }

  calculateTotalMinutes(user: User): number {
    return user.workouts.reduce((sum, w) => sum + w.minutes, 0);
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  isNextPageDisabled(): boolean {
    const pageCount = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    return this.currentPage === pageCount || pageCount === 0;
  }

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  applyFilters() {
    this.searchUsers(); // Apply search FIRST
    this.filterWorkouts(); // Apply workout type filter
  }

  selectUser(user: User) {
    this.selectedUser = user ? {...user}: null; // Set the selected user
  }
}
