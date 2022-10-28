import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  currentAuthMode$: BehaviorSubject<string> = new BehaviorSubject<string>('login');
  switchAuthMode() {
    // TODO: Переключател названия компонента
  }
  onSubmit() {
    // TODO: Вызов метода в зависимости от названия компонента
    // switch (this.authMode) {
    //   case 'login':
    //     console.log(this.authMode, this.authForm.value);
    //     break;
    //   case 'signin':
    //     console.log(this.authMode, this.authForm.value);
    //     break;
    //   default:
    //     break;
    // }
  }
  authForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  constructor(private fb: FormBuilder, private authService: AuthService) {}
}
