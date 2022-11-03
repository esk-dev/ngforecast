import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorObserver, throwError } from 'rxjs';
import { NotificationService } from './notification.service';
@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(public notify: NotificationService) {}
  public handleError(error: HttpErrorResponse) {
    let userMessage;
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      userMessage = 'A client-side or network error occurred. Handle it accordingly.';
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
      userMessage = 'The backend returned an unsuccessful response code.';
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
