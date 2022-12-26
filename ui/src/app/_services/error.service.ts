import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorObserver, throwError, Observable } from 'rxjs';
import { NotificationService } from './notification.service';
@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(public notify: NotificationService) {}
  
  private messageError(error: HttpErrorResponse): string {
    let message: string;
    let status: number = error.status;
    let errorMessage: string | undefined = error?.error?.message;
    
    message = errorMessage ? errorMessage : 'Unknown error message'
    
    switch (status) {
      case 401:
        return message
        break;
      case 400:
        return message
        break;
      case 500:
        return message
        break;
      default:
        return message
    };
  }
  
  public handleError(error: HttpErrorResponse) {
    let userMessage = this.messageError(error);
    this.notify.showError(userMessage);
    console.error(error);
    
    // if (error.status === 0) {
    //   console.error('An error occurred:', error);
    //   this.notify.showError(userMessage);
    // } else {
    //   console.error(
    //     `Backend returned code ${error.status}, body was: `,
    //     error.error
    //   );
    //   userMessage = 'The backend returned an unsuccessful response code.';
    //   this.notify.showError(userMessage);
    // }
    return throwError(
      () => error
    );
  }
}
