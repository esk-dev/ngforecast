import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(public zone: NgZone, public snackBar: MatSnackBar) {}

  showSucces(message: string) {
    this.zone.run(() => {
      this.snackBar.open(message);
    });
  }

  showError(message: string) {
    this.zone.run(() => {
      this.snackBar.open(message, 'Close', { duration: 5000 });
    });
  }
}
