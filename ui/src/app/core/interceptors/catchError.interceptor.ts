import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { ErrorService } from '../../_services';
import {
  catchError,
} from 'rxjs';

@Injectable()
export class CatchErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService, private http: HttpClient) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorService.handleError(error);
      })
    );
  }
}
