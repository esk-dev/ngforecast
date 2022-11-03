import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, tap } from 'rxjs';
import { User } from '../core/models';
import { JwtService } from './jwt.service';
@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  constructor(private jwtService: JwtService) {}

  private currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  private isAuth$: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);

  // TODO: CRUD
  public initUserData(user: User) {
    // Запрос к API
    console.log(user);
    this.currentUser$.next(user);
  }
  public clearUserData() {
    this.currentUser$.next({} as User);
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
