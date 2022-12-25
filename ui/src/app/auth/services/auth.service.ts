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
    // private jwtService: JwtService,
    // private userStorageService: UserStorageService,
  ) {}

  private isAuthenticatedSubject$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject$.asObservable();

  public setAuthenticateState(state: boolean) {
    this.isAuthenticatedSubject$.next(state);
  }

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.API_URL}/login`, {
        email,
        password,
      }).pipe(
        // catchError(),
        tap(
          (value: AuthResponse) => console.log(value);
        )
      )
  }

  public registration(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.API_URL}/registration`, {
        email,
        password,
      }).pipe(
        tap(
          (value: AuthResponse) => console.log(value); // side effect 
        ),
        // catchError(),
      );
  }

  public logout(): Observable<any> {
    return this.http.post(`${environment.API_URL}/logout`, {}).pipe(
      // catchError(),
      tap(
        (value: AuthResponse) => console.log(value);
      )
    );
  }

  public refreshToken(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${environment.API_URL}/refresh`).pipe(
      // catchError(),
      tap(
        (value: AuthResponse) => console.log(value);
      )
    );
  }
}
