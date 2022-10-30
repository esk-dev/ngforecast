import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthModeService } from './auth-mode.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(
    private fb: FormBuilder,
    private authModeService: AuthModeService
  ) {}
  public readonly authMode$: Observable<string> = this.authModeService.authMode$;
  public hide: boolean = true;
  public switchAuthMode() {
    this.authModeService.switchAuthMode();
  }
  public onSubmit() {
    const { email, password } = this.authForm.value;
    console.log(email, password);
    this.authModeService.formSubmit(email, password);
  }
  public authForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
}
