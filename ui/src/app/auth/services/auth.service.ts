import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, ReplaySubject, switchMap, iif, of, take } from 'rxjs';
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
    private userStorageService: UserStorageService,
    private jwtTokenService: JwtService
  ) {
    this.checkAuthenticated()
      .pipe(take(1))
      .subscribe((v) => console.log(v));
  }

  private isAuthenticatedSubject$: ReplaySubject<boolean> =
    new ReplaySubject<boolean>();

  public isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject$.asObservable();

  private setAuthenticateState(state: boolean) {
    this.isAuthenticatedSubject$.next(state);
  }

  private checkAuthenticated(): Observable<boolean> {
    return this.jwtTokenService.isTokenExist$.pipe(
      tap((v: boolean) => this.setAuthenticateState(v))
    );
  }

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.API_URL}/login`, {
        email,
        password,
      })
      .pipe(
        tap(() => {
          this.setAuthenticateState(true);
        })
      );
  }

  public registration(
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.API_URL}/registration`, {
        email,
        password,
      })
      .pipe(
        tap(() => {
          this.setAuthenticateState(true);
        })
      );
  }

  public logout(): Observable<any> {
    return this.http.post(`${environment.API_URL}/logout`, {}).pipe(
      tap(() => {
        this.setAuthenticateState(false);
        this.userStorageService.removeUser();
        this.jwtTokenService.deleteToken();
      })
    );
  }

  public refreshToken(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${environment.API_URL}/refresh`).pipe(
      tap(
        (response: AuthResponse) => {
          this.setAuthenticateState(true);
          this.jwtTokenService.saveToken(response.accessToken);
        },
        () => this.setAuthenticateState(false)
      )
    );
  }
}
