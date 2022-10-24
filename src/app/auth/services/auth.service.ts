import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap, catchError, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtService, UserStorageService, ErrorService } from '../../core/services';
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
  ) {}

  private isAuthenticatedSubject$ = new ReplaySubject<boolean>(0);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.backendApi}/login`, {
        email,
        password,
      })
      .pipe(
        catchError((err) => err),
        map((res: AuthResponse) => {
          this.jwtService.saveToken(res.accessToken);
          this.userStorageService.initUserData(res.user);
          this.isAuthenticatedSubject$.next(true);
          return res;
        }),
      );
  }

  public registration(email: string, password: string): Observable<AuthResponse> {
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
          return res;
        }),
      );
  }

  public logout(): Observable<unknown> {
    return this.http.post(`${environment.backendApi}/logout`, {}).pipe(
      catchError((err) => err),
      map((res: AuthResponse) => {
        this.jwtService.deleteToken;
        this.isAuthenticatedSubject$.next(false);
        return res;
      }),
    );
  }

  public refreshToken(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${environment.backendApi}/refresh`);
  }
}
