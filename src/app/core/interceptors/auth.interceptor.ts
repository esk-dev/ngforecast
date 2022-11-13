import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { JwtService } from '../../_services';
import { catchError, map, retry, BehaviorSubject, take, throwError, switchMap } from 'rxjs';
import { AuthResponse } from 'src/app/auth/models/authresponse.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private AuthService: AuthService, private jwtService: JwtService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(this.authReq(request));
    // .pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     if (
    //       error instanceof HttpErrorResponse &&
    //       error.status === 401 &&
    //       !this.isRefreshing$.getValue()
    //     ) {
    //       return this.handle401Error(request, next);
    //     } else {
    //       return throwError(() => error);
    //     }
    //   }),
    // );
  }
  private authReq(request: HttpRequest<any>) {
    const accesstoken = this.jwtService.getToken();
    return request.clone({
      setHeaders: {
        withCredentials: 'true',
        Authorization: `Bearer ${accesstoken}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing$) {
      this.isRefreshing$.next(true);

      return this.AuthService.refreshToken().pipe(
        switchMap((response: AuthResponse) => {
          this.jwtService.saveToken(response.accessToken);
          return next.handle(this.authReq(request));
        }),
      );
    } else {
      return next.handle(this.authReq(request));
    }
  }
}
