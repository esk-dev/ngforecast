import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Observable,
  map,
  tap,
  catchError,
  ReplaySubject,
  throwError,
  BehaviorSubject,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtService, UserStorageService, ErrorService } from '../../_services';
import { AuthResponse } from '../models/authresponse.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private userStorageService: UserStorageService,
    private router: Router
  ) {}
  // private isAuthenticatedSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.jwtService.tokenState$;

  public setAuthData(response: AuthResponse) {
    this.jwtService.saveToken(response.accessToken);
    this.userStorageService.initUserData(response.user);
  }

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.backendApi}/login`, {
        email,
        password,
      })
      .pipe();
  }

  public registration(
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.backendApi}/registration`, {
        email,
        password,
      })
      .pipe();
  }

  public logout(): Observable<unknown> {
    return this.http.post(`${environment.backendApi}/logout`, {});
  }

  public refreshToken(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${environment.backendApi}/refresh`);
  }
}
