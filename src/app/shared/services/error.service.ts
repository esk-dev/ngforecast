import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { NotificationService } from './notification.service';
@Injectable({
    providedIn: 'root',
})
export class ErrorService {
    constructor(public NotificationService: NotificationService) {}

    public handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('An error occurred:', error.error);
        } else {
            console.error(error);
            this.NotificationService.showError(
                `Backend returned code ${error.status}, body was: ${error.error.error.message}`
            );
        }
        return throwError(
            () => new Error('Something bad happened; please try again later.')
        );
    }
}
