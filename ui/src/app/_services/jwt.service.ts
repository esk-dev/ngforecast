import { Injectable, OnInit } from '@angular/core';
import { ReplaySubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private isTokenExistSubject$: ReplaySubject<boolean> = new ReplaySubject();
  public isTokenExist$: Observable<boolean> =
    this.isTokenExistSubject$.asObservable();

  constructor() {
    this.initToken();
  }

  initToken() {
    this.isTokenExistSubject$.next(!!this.getToken());
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
