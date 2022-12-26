import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  ReplaySubject,
  take,
  tap,
  of,
  find,
  switchMap
} from 'rxjs';
import { User } from '../core/models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { AuthResponse } from '../auth/models/authresponse.model';
@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  // TODO Remove User MetaData
  private currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(
    {} as User
  );
  public userData$: Observable<User> = this.currentUser$.asObservable();
  
  private favoriteCitiesSubject$: ReplaySubject<Array<string>> = new ReplaySubject<Array<string>>();
  public favoriteCities$: Observable<Array<string>> = this.favoriteCitiesSubject$.asObservable();

  constructor(private apiService: ApiService) {}
  
  public setUser(response: AuthResponse) {
    const { user } = response;
    this.currentUser$.next(user);
    this.favoriteCitiesSubject$.next(user.favoriteCities);
  }
  private formattingCityName(city: string): string {
    const formattedCityName: string = city.toLowerCase().replaceAll(' ', '');
    return formattedCityName;
  }
  public updateFavoriteCityArray(city: string): Observable<any> {
    const formattedCityName = this.formattingCityName(city);
    return this.isCityAdded(formattedCityName).pipe(
      switchMap(
        (value: boolean) => {
          if (value) {
            return this.removeCityFromFavorite(formattedCityName);
          } else {
            return this.pushCityToFavorite(formattedCityName);
          }
        }
      )
    )
  }

  public pushCityToFavorite(city: string): Observable<any> {
    return this.apiService.update(city.toLowerCase()).pipe(
      tap((acc: User) => {
        this.currentUser$.next(acc);
      })
    );
  }
  
  public removeCityFromFavorite(city: string): Observable<any> {
    return this.apiService.delete(city.toLowerCase()).pipe(
      map((city: string) => this.formattingCityName(city)),
      tap((acc: User) => {
        this.currentUser$.next(acc);
      })
    );
  }
  
  
  
  public isCityAdded(city: string): Observable<boolean> {
    const formattedCityName: string = this.formattingCityName(city);
    return this.favoriteCities$.pipe(
      map((favoriteCitiesArray) => !!favoriteCitiesArray.includes(formattedCityName)),
    )
  }

  public readUserData(): Observable<any> {
    return this.apiService.read().pipe(
      map((acc: User) => {
        this.currentUser$.next(acc);
      })
    );
  }

  public updateUserData(city: string): Observable<any> {
    return this.apiService.update(city.toLowerCase()).pipe(
      map((acc: User) => {
        this.currentUser$.next(acc);
      })
    );
  }

  public deleteUserData(city: string): Observable<any> {
    return this.apiService.delete(city.toLowerCase()).pipe(
      map((acc: User) => {
        this.currentUser$.next(acc);
      })
    );
  }
}
