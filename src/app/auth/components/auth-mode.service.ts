import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from '../models/authresponse.model';
import { AuthService } from './../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthModeService {
  constructor(private authService: AuthService, private router: Router) {}

  private currentAuthModeSubject$: BehaviorSubject<string> = new BehaviorSubject<string>('log in');
  public authMode$: Observable<string> = this.currentAuthModeSubject$.asObservable();

  public switchAuthMode() {
    if (this.currentAuthModeSubject$.getValue() == 'log in') {
      this.currentAuthModeSubject$.next('sign up');
    } else {
      this.currentAuthModeSubject$.next('log in');
    }
  }

  public formSubmit(email, password) {
    switch (this.currentAuthModeSubject$.getValue()) {
      case 'log in':
        this.authService.login(email, password).subscribe((response: AuthResponse) => {
          this.authService.setAuthData(response);
          this.router.navigate(['/search', 'London']);
          console.log(response);
        });
        break;
      case 'sign up':
        this.authService.registration(email, password).subscribe((response: AuthResponse) => {
          this.authService.setAuthData(response);
          this.router.navigate(['/home']);
        });
        break;
    }
  }
}
