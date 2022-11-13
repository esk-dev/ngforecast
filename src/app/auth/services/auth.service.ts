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
    private jwtService: JwtService,
    private userStorageService: UserStorageService,
    private errorService: ErrorService,
    private router: Router,
  ) {}
  private isAuthenticatedSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject$.asObservable();

  public setAuthData(response: AuthResponse) {
    this.jwtService.saveToken(response.accessToken, response.refreshToken);
    this.userStorageService.initUserData(response.user);
    this.isAuthenticatedSubject$.next(true);
  }

  public checkAuth(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${environment.API_URL}/refresh`).pipe();
  }

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.API_URL}/login`, {
        email,
        password,
      })
      .pipe();
  }

  public registration(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.API_URL}/registration`, {
        email,
        password,
      })
      .pipe(catchError(this.errorService.handleError));
  }

  public logout(): Observable<any> {
    return this.http.post(`${environment.API_URL}/logout`, {}).pipe(
      catchError(this.errorService.handleError),
      tap(() => {
        this.jwtService.deleteToken();
        this.userStorageService.clearUserData();
        this.isAuthenticatedSubject$.next(false);
      }),
    );
  }

  public refreshToken(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${environment.API_URL}/refresh`);
  }
}
