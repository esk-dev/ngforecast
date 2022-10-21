import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from './services/auth.service';
import { AuthResponse, User } from './models/authresponse.model';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  constructor(private authService: AuthService) {}
  user: User;
  isAuth: boolean;

  setUser(user: User) {
    this.user = user;
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  public login(email: string, password: string) {
    this.authService.login(email, password).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('token', response.accessToken);
        this.setUser(response.user);
        this.setAuth(true);
      }),
    );
  }
  public registration(email: string, password: string) {
    this.authService.registration(email, password).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('token', response.accessToken);
        this.setUser(response.user);
        this.setAuth(true);
      }),
    );
  }

  public logout() {
    this.authService.logout().subscribe();
  }
}
