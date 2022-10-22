import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, tap } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { AuthResponse, User } from './models/authresponse.model';
import { User } from './models/authresponse'
import { JwtService } from './jwt.service';
@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  constructor(private authService: AuthService, private jwtService: JwtService) {}
  
  private currentUser$: BehaviorSubect<User> = new BehaviorSubject<User>({} as User);
  private isAuth$: ReplaySubject<boolean> = new ReplaySubject<boolean>(false);
  // TODO: CRUD
  initUserData(): void {
    // Запрос к API
  }
  setAuth(email: string, password: string) {
    this.authService.login(email, password).pipe(
      
    )
  }
  // setUser(user: User) {
  //   this.user = user;
  // }

  // setAuth(bool: boolean) {
  //   this.isAuth = bool;
  // }

  // public login(email: string, password: string) {
  //   this.authService.login(email, password).pipe(
  //     tap((response: AuthResponse) => {
  //       localStorage.setItem('token', response.accessToken);
  //       this.setUser(response.user);
  //       this.setAuth(true);
  //     }),
  //   );
  // }
  // public registration(email: string, password: string) {
  //   this.authService.registration(email, password).pipe(
  //     tap((response: AuthResponse) => {
  //       localStorage.setItem('token', response.accessToken);
  //       this.setUser(response.user);
  //       this.setAuth(true);
  //     }),
  //   );
  // }

  // public logout() {
  //   this.authService.logout().subscribe();
  // }
}
