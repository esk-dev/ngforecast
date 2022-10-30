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
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import {
  JwtService,
  UserStorageService,
  ErrorService,
} from '../../core/services';
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
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
  private isAuthenticatedSubject$ = new ReplaySubject<boolean>(0);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.backendApi}/login`, {
        email,
        password,
      })
      .pipe(
        catchError(this.handleError),
        map((res: AuthResponse) => {
          this.jwtService.saveToken(res.accessToken);
          this.userStorageService.initUserData(res.user);
          this.isAuthenticatedSubject$.next(true);
          this.router.navigate(['/search', 'London']);
          return res;
        })
      );
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
      .pipe(
        catchError((err) => err),
        map((res: AuthResponse) => {
          this.jwtService.saveToken(res.accessToken);
          this.userStorageService.initUserData(res.user);
          this.isAuthenticatedSubject$.next(true);
          this.router.navigate(['/search', 'London']);
          return res;
        })
      );
  }

  public logout(): Observable<unknown> {
    return this.http.post(`${environment.backendApi}/logout`, {}).pipe(
      catchError((err) => err),
      map((res: AuthResponse) => {
        this.jwtService.deleteToken;
        this.isAuthenticatedSubject$.next(false);
        this.router.navigate(['/auth']);
        return res;
      })
    );
  }

  public refreshToken(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${environment.backendApi}/refresh`);
  }
}
