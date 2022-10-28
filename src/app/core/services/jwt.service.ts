import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  getToken(): string {
    return window.localStorage.getItem['jwtToken'];
  }

  saveToken(jwtToken: string): void {
    window.localStorage.setItem('jwtToken', jwtToken);
  }

  deleteToken(): void {
    window.localStorage.removeItem('jwtToken');
  }
}
