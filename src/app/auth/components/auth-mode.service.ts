import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { AuthResponse } from '../models/authresponse.model';
import { AuthService } from './../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthModeService {
  constructor(private authService: AuthService, private router: Router) {}

  private currentAuthModeSubject$: BehaviorSubject<string> =
    new BehaviorSubject<string>('log in');
  public authMode$: Observable<string> =
    this.currentAuthModeSubject$.asObservable();

  public switchAuthMode() {
    if (this.currentAuthModeSubject$.getValue() == 'log in') {
      this.currentAuthModeSubject$.next('sign up');
    } else {
      this.currentAuthModeSubject$.next('log in');
    }
  }

  public formSubmit(email: string, password: string): Observable<AuthResponse> {
    return this.authMode$.pipe(
      switchMap((value: string) => {
        if (value === 'log in') {
          return this.authService.login(email, password);
        } else {
          return this.authService.registration(email, password);
        }
      })
    );
  }
}
