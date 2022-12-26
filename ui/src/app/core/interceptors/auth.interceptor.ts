import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { JwtService, UserStorageService } from '../../_services';
import {
  catchError,
  map,
  retry,
  BehaviorSubject,
  take,
  throwError,
  switchMap,
  Observable,
} from 'rxjs';
import { AuthResponse } from 'src/app/auth/models/authresponse.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // TODO Разделить логику на разные сервисы
  private isRefreshing$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  constructor(private jwtService: JwtService, private http: HttpClient) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(this.authReq(request)).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !this.isRefreshing$.getValue()
        ) {
          return this.handle401Error(request, next);
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  private authReq(request: HttpRequest<any>) {
    // TODO Убрать id из хедеров
    const accesstoken = this.jwtService.getToken();
    const id = localStorage.getItem('userId');
    return request.clone({
      setHeaders: {
        withCredentials: 'true',
        Authorization: `Bearer ${accesstoken}`,
        id: `${id}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing$) {
      this.isRefreshing$.next(true);

      return this.refreshToken().pipe(
        switchMap((response: AuthResponse) => {
          this.jwtService.saveToken(response.accessToken);
          return next.handle(this.authReq(request));
        })
      );
    } else {
      return next.handle(this.authReq(request));
    }
  }

  private refreshToken(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${environment.API_URL}/refresh`);
  }
}
