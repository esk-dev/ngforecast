import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  take,
  switchMap,
} from 'rxjs';
import { User } from '../core/models';
import { ApiService } from './api.service';
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

  private favoriteCitiesSubject$: BehaviorSubject<Array<string>> =
    new BehaviorSubject<Array<string>>([] as Array<string>);
  public favoriteCities$: Observable<Array<string>> =
    this.favoriteCitiesSubject$.asObservable();

  constructor(private apiService: ApiService) {}

  public setUser(response: AuthResponse) {
    const { user } = response;
    this.currentUser$.next(user);
    this.favoriteCitiesSubject$.next(user.favoriteCities);
  }

  public removeUser() {
    this.currentUser$.next({} as User);
    this.favoriteCitiesSubject$.next([] as Array<string>);
  }

  private formattingCityName(city: string): string {
    const formattedCityName: string = city.toLowerCase();
    return formattedCityName;
  }

  public updateFavoriteCityArray(city: string): Observable<any> {
    const formattedCityName = this.formattingCityName(city);
    return this.isCityAdded(formattedCityName).pipe(
      take(1),
      switchMap((value: boolean) => {
        if (value) {
          return this.removeCityFromFavorite(formattedCityName);
        } else {
          return this.pushCityToFavorite(formattedCityName);
        }
      })
    );
  }

  private pushCityToFavorite(city: string): Observable<any> {
    return this.apiService.update(city).pipe(
      map((acc: User) => {
        this.favoriteCitiesSubject$.next(acc.favoriteCities);
      })
    );
  }

  private removeCityFromFavorite(city: string): Observable<any> {
    return this.apiService.delete(city).pipe(
      map((acc: User) => {
        this.favoriteCitiesSubject$.next(acc.favoriteCities);
      })
    );
  }

  public isCityAdded(city: string): Observable<boolean> {
    const formattedCityName: string = this.formattingCityName(city);
    return this.favoriteCities$.pipe(
      map(
        (favoriteCitiesArray) =>
          !!favoriteCitiesArray.includes(formattedCityName)
      )
    );
  }
}
