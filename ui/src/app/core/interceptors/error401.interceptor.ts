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
export class Error401Interceptor implements HttpInterceptor {
  // TODO Разделить логику на разные сервисы
  private isRefreshing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private authService: AuthService,
    private jwtTokenService: JwtService,
    private http: HttpClient,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const handle401Error = (request: HttpRequest<any>, next: HttpHandler) => {
      if (!this.isRefreshing$.getValue()) {
        this.isRefreshing$.next(true);
        return this.authService.refreshToken().pipe(
          switchMap((response: AuthResponse) => {
            this.jwtTokenService.saveToken(response.accessToken);
            return next.handle(request);
          }),
        );
      } else {
        return next.handle(request);
      }
    };
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !this.isRefreshing$.getValue()
        ) {
          return handle401Error(request, next);
        } else {
          return throwError(() => error);
        }
      }),
    );
  }
}
