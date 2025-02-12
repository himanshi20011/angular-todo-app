import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersKey = 'users';
  private loggedInUserKey = 'loggedInUser';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable for navbar to subscribe to

  constructor() {}

  /** Register a new user */
  register(userName: string, email: string, password: string): boolean {
    const users = this.getUsers();
    if (users.some(user => user.email === email)) return false;

    users.push({userName, email, password });
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return true;
  }

  /** Login user */
  login(email: string, password: string): boolean {
    const user = this.getUsers().find(user => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem(this.loggedInUserKey, email);
      this.isLoggedInSubject.next(true); // Notify subscribers (navbar)
      return true;
    }

    return false;
  }

  /** Check if user is logged in */
  isLoggedIn(): boolean {
    return localStorage.getItem(this.loggedInUserKey) !== null;
  }

  /** Logout user */
  logout(): void {
    localStorage.removeItem(this.loggedInUserKey);
    this.isLoggedInSubject.next(false); // Notify subscribers (navbar)
  }

  /** Retrieve users from localStorage */
  private getUsers(): {userName: string; email: string; password: string }[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }
}
