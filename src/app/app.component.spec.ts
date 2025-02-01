import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module'; // Import your AppModule
import { RouterTestingModule } from '@angular/router/testing'; // Import for routing if used

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule, // Include your AppModule here
        RouterTestingModule // Include RouterTestingModule if your app uses routing
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'workout-tracker'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('workout-tracker'); // Assuming you have a title property
  });

  /* it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // Check if the title is rendered correctly, adjust the selector if needed.
    expect(compiled.querySelector('.content span')?.textContent).toContain('workout-tracker');
  }); */
});
