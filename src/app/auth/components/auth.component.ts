import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  private currentAuthModeSubject$: BehaviorSubject<string> =
    new BehaviorSubject<string>('log in');
  public authMode$ = this.currentAuthModeSubject$.asObservable();

  public switchAuthMode() {
    if (this.currentAuthModeSubject$.getValue() == 'log in') {
      this.currentAuthModeSubject$.next('sign up');
    } else {
      this.currentAuthModeSubject$.next('log in');
    }
  }
  onSubmit() {
    const { email, password } = this.authForm.value;
    console.log(email, password);
    switch (this.currentAuthModeSubject$.getValue()) {
      case 'log in':
        this.authService.login(email, password).subscribe();
        break;
      case 'sign in':
        this.authService.registration(email, password);
        break;
    }
  }
  authForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  constructor(private fb: FormBuilder, private authService: AuthService) {}
}
