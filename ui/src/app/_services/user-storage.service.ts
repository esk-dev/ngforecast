import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, ReplaySubject, take, tap } from 'rxjs';
import { User } from '../core/models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  private currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

  public userData$: Observable<User> = this.currentUser$.asObservable();

  public userId: User = this.currentUser$.getValue();

  public favoriteCities$: Observable<Array<string | null>> = this.userData$.pipe(
    map((acc: User) => acc.favoriteCities),
    );

  constructor(private apiService: ApiService) {
    this.apiService
      .read()
      .pipe(take(1))
      .subscribe((user: User) => {
        if (user) {
          this.currentUser$.next(user);
        }
      });
  }
    
  public initUserData(user: User) {
    this.currentUser$.next(user);
    localStorage.setItem('userId', user.id);
  }

  public getIdUser(): string {
    return this.currentUser$.getValue().id;
  }
  public clearUserData() {
    localStorage.clear();
    this.currentUser$.next({} as User);
  }

  public isCityAdded(city: string): Observable<boolean> {
    return this.favoriteCities$.pipe(
      map((acc: Array<string | null>) => {
        if (acc.length !== 0) {
          return acc.includes(city.toLowerCase());
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
    return this.apiService.update(city.toLowerCase()).pipe(
      map((acc: User) => {
        this.currentUser$.next(acc);
      }),
    );
  }

  public deleteUserData(city: string): Observable<any> {
    return this.apiService.delete(city.toLowerCase()).pipe(
      map((acc: User) => {
        this.currentUser$.next(acc);
      }),
    );
  }
}
