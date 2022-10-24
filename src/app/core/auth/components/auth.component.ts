import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  authMode: string = 'login';
  switchAuthMode() {
    this.authMode == 'login' ? (this.authMode = 'signin') : this.authMode == 'login';
  }
  onSubmit() {
    switch (this.authMode) {
      case 'login':
        console.log('login method', this.authForm.value);
        break;
      default:
        console.log('signin method', this.authForm.value);
        break;
    }
  }
  authForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  constructor(private fb: FormBuilder, private authService: AuthService) {}
}
