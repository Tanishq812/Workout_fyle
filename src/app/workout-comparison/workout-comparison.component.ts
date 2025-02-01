import { Component, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { User } from '../workout'; // Adjust the path if necessary
import { Chart, BarController, CategoryScale, LinearScale, PointElement, BarElement, Title, Legend, Tooltip } from 'chart.js';

Chart.register(BarController, CategoryScale, LinearScale, PointElement, BarElement, Title, Legend, Tooltip);

@Component({
  selector: 'app-workout-comparison',
  templateUrl: './workout-comparison.component.html',
  styleUrls: ['./workout-comparison.component.css']
})
export class WorkoutComparisonComponent implements AfterViewInit, OnDestroy {
  @Input() user: User | null = null;
  public chart: any;
  private chartCreated: boolean = false;

  ngAfterViewInit() {
    this.createOrUpdateChart();
  }

  ngOnDestroy() {
    this.destroyChart();
  }

  ngOnChanges() {
    this.createOrUpdateChart();
  }

  createOrUpdateChart() {
    if (!this.user) {
      this.destroyChart();
      return;
    }

    const labels = this.user.workouts.length > 0 ? this.user.workouts.map(workout => workout.type) : ['No Workouts'];
    const workoutMinutes = this.user.workouts.length > 0 ? this.user.workouts.map(workout => workout.minutes) : [0];

    const canvas = document.getElementById('MyChart') as HTMLCanvasElement;

    if (canvas) {
      const ctx = canvas.getContext('2d');

      if (this.chartCreated) {
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = workoutMinutes;
        this.chart.options.plugins.title.text = `${this.user.name}'s Workouts`;
        this.chart.update();
      } else if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Workout Minutes',
              data: workoutMinutes,
              backgroundColor: function(context) { // Gradient for the bars
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, 'rgba(255, 192, 203, 0.7)'); // Light pink/rose start
                gradient.addColorStop(1, 'rgba(255, 105, 180, 0.4)'); // Hot pink end
                return gradient;
            },
            borderColor: 'rgba(255, 105, 180, 1)', // Hot pink border
              borderWidth: 0.7

            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  color: 'rgba(2, 1, 0, 0.1)'
                }
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(1, 2, 3, 0.1)'
                }
              }
            },
            plugins: {
              title: {
                display: true,
                text: `${this.user.name}'s Workouts`,
                font: {
                  size: 16,
                  weight: 'bold'
                }
              },
              legend: {
                display: true,
                position: 'bottom'
              }
            }
          }
        });
        this.chartCreated = true;
      }
    }
  }

  destroyChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
      this.chartCreated = false;
    }
  }

  calculateTotalMinutes(user: User): number {
    return user.workouts.reduce((sum, w) => sum + w.minutes, 0);
  }
}
