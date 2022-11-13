import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from '../core/models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  constructor(private apiService: ApiService) {}

  private currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  public userData$: Observable<User> = this.currentUser$.asObservable();
  public userId: User = this.currentUser$.getValue();
  public favoriteCities$: Observable<Array<string | null>> = this.userData$.pipe(
    map((acc: User) => acc.favoriteCities),
  );

  public initUserData(user: User) {
    this.currentUser$.next(user);
  }
  getUserId(): string | null {
    if (!!this.currentUser$.getValue()) {
      return this.userId.id;
    } else {
      return null;
    }
  }
  public clearUserData() {
    this.currentUser$.next({} as User);
  }
  public isCityAdded(city: string): Observable<boolean> {
    return this.favoriteCities$.pipe(
      map((acc: Array<string | null>) => {
        if (acc) {
          return acc.includes(city);
        } else {
          return false;
        }
      }),
    );
  }
  public readUserData(): Observable<any> {
    return this.apiService.read().pipe(
      map((acc: User) => {
        this.currentUser$.next(acc);
      }),
    );
  }

  public updateUserData(city: string): Observable<any> {
    return this.apiService.update(city).pipe(
      map((acc: User) => {
        this.currentUser$.next(acc);
      }),
    );
  }

  public deleteUserData(city: string): Observable<any> {
    return this.apiService.delete(city).pipe(
      map((acc: User) => {
        this.currentUser$.next(acc);
      }),
    );
  }
}
