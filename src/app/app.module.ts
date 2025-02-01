import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutAddComponent } from './workout-add/workout-add.component';
import { WorkoutComparisonComponent } from './workout-comparison/workout-comparison.component';



@NgModule({
  declarations: [
    AppComponent,
    WorkoutListComponent,
    WorkoutAddComponent,
    WorkoutComparisonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
     // Add FormsModule to the imports array

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
