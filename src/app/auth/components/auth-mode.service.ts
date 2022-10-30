import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthModeService {
  constructor(private authService: AuthService) {}

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

  public formSubmit(email, password) {
    switch (this.currentAuthModeSubject$.getValue()) {
      case 'log in':
        this.authService.login(email, password).subscribe();
        break;
      case 'sign in':
        this.authService.registration(email, password);
        break;
    }
  }
}
