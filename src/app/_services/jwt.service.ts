import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private isTokenExistSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public tokenState$: Observable<boolean> = this.isTokenExistSubject$.asObservable();

  constructor() {
    this.isTokenExistSubject$.next(!!this.getToken());
  }

  tokenStateChange() {
    if (this.getToken()) {
      this.isTokenExistSubject$.next(true);
      console.log('stateChangeWork t');
    } else {
      this.isTokenExistSubject$.next(false);
      console.log('stateChangeWork f');
    }
  }
  getToken(): string {
    return window.localStorage.getItem('jwtToken');
  }

  saveToken(jwtToken: string): void {
    window.localStorage.setItem('jwtToken', jwtToken);
    this.isTokenExistSubject$.next(true);
  }

  deleteToken(): void {
    window.localStorage.removeItem('jwtToken');
    this.isTokenExistSubject$.next(false);
  }
}
