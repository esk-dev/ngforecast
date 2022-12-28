import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtService, UserStorageService } from '../../_services';
import { AuthResponse } from '../models/authresponse.model';
import { AuthService } from '../services/auth.service';
// import { AuthModeService } from './auth-mode.service';
// import { AuthFacadeService } from '../services/authFacade.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userStorageService: UserStorageService,
    private jwtTokenService: JwtService,
  ) {}

  private authModeSubject$: BehaviorSubject<string> = new BehaviorSubject<string>('log in');

  public readonly authMode$: Observable<string> = this.authModeSubject$.asObservable();

  public hide: boolean = true;

  public authForm!: FormGroup;

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
    });
  }

  public onSubmit(): void {
    const { email, password } = this.authForm.value;
    this.sendForm(email, password).subscribe((response: AuthResponse) => {
      this.userStorageService.setUser(response);
      this.jwtTokenService.saveToken(response.accessToken);
      window.localStorage.setItem('id', response.user.id);
      this.router.navigate(['home']);
    });
  }

  public switchAuthMode(): void {
    switch (this.authModeSubject$.getValue()) {
      case 'log in':
        this.authModeSubject$.next('sign up');
        break;

      default:
        this.authModeSubject$.next('log in');
        break;
    }
  }

  private sendForm(email: string, password: string): Observable<AuthResponse> {
    switch (this.authModeSubject$.getValue()) {
      case 'log in':
        return this.authService.login(email, password);
        break;

      default:
        return this.authService.registration(email, password);
        break;
    }
  }
}
