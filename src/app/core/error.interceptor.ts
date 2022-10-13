import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NotificationService } from './services/notification.service';
@Injectable()
export class ErrorIntercept implements HttpInterceptor {
  constructor(public notification: NotificationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          console.error(error);
          errorMessage = `Error: ${error.error.message}`;
        }
        if (error.status == 401) {
          // refresh token
          console.error(error.message);
        } else {
          // server-side error
          console.error(error);
          errorMessage = `Error Status: ${error.status}\nMessage: ${error.error.error.message}`;
        }
        this.notification.showError(errorMessage);
        return throwError(() => new Error(error.message));
      }),
    );
  }
}
