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
  Subject,
  take,
  switchMap,
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
    private errorService: ErrorService,
    private userStorageService: UserStorageService, 
    private jwtService: JwtService, // private userStorageService: UserStorageService,
  ) {}

  private isAuthenticatedSubject$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject$.asObservable();

  private setAuthenticateState(state: boolean) {
    this.isAuthenticatedSubject$.next(state);
  }
  
  // private checkAuthenticated() {
  //   this.refreshToken().pipe(
  //     tap((authResponse: AuthResponse) => {
  //       this.setAuthenticateState(true)
  //     })
  //   )
  // }

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.API_URL}/login`, {
        email,
        password,
      })
      .pipe(
        tap((response: AuthResponse) => {
          this.setAuthenticateState(true);
        }),
      );
  }

  public registration(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.API_URL}/registration`, {
        email,
        password,
      })
      .pipe(
        tap((response: AuthResponse) => {
          this.setAuthenticateState(true);
        }),
      );
  }

  public logout(): Observable<any> {
    return this.http.post(`${environment.API_URL}/logout`, {}).pipe(
      tap((response: AuthResponse) => {
        this.setAuthenticateState(false);
        this.userStorageService.removeUser();
        this.jwtTokenService.deleteToken();
      }),
    );
  }

  public refreshToken(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${environment.API_URL}/refresh`);
  }
}
