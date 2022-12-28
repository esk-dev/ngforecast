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
import { JwtService, ErrorService } from '../../_services';
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
export class CatchErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService, private http: HttpClient) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorService.handleError(error);
      }),
    );
  }
}
