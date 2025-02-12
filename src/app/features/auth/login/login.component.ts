import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.sevice';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  /** Handle user login */
  onLogin(): void {
    if (this.authService.login(this.email, this.password)) {
      this.router.navigate(['/tasks']); // Redirect to task list after login
    } else {
      this.errorMessage = 'Invalid email or password!';
    }
  }
}
