import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtService } from '../../services/jwt.service';
import { AuthResponse } from '../models/authresponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwtService: JwtService) {}

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.backendApi}/login`, {
      email,
      password,
    });
  }

  public registration(
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environment.backendApi}/registration`,
      {
        email,
        password,
      }
    );
  }

  public logout(): Observable<unknown> {
    return this.http.post(`${environment.backendApi}/logout`, {});
  }

  public refreshToken(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${environment.backendApi}/refresh`);
  }
}
