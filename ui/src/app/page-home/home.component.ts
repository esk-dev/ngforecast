import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { ShortWeather } from '../core';
import { StoreService, UserStorageService } from '../_services';
import { WeatherService } from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public favoriteCitiesWeather$: Array<Observable<ShortWeather>>;
  public emptyAlert$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public destroy$: Subject<boolean> = new Subject();
  public isCityAdded$: Observable<boolean>;
  constructor(
    private UserStorageService: UserStorageService,
    private WeatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.UserStorageService.favoriteCities$
      .pipe(takeUntil(this.destroy$))
      .subscribe((cities: Array<string | null>) => {
        if (cities) {
          this.favoriteCitiesWeather$ = cities.map((city: string) => {
            return this.WeatherService.getShortWeather(city);
          });
        } else {
          this.emptyAlert$.next('Empty favorite cities store');
        }
      });
  }

  public isCityAdded(city: string): boolean {
    let isAdded: boolean;
    this.UserStorageService.isCityAdded(city.toLowerCase())
      .pipe(take(1))
      .subscribe((val: boolean) => (isAdded = val));
    return isAdded;
  }
  toFavorite(city: string) {
    // TODO вынести в сервис
    // if (this.isCityAdded(city)) {
    //   return this.UserStorageService.deleteUserData(city);
    // } else {
    //   return this.UserStorageService.updateUserData(city);
    // }
    this.UserStorageService.isCityAdded(city)
      .pipe(
        take(1),
        takeUntil(this.destroy$),
        switchMap((acc: boolean) => {
          if (acc === true) {
            return this.UserStorageService.deleteUserData(city);
          } else {
            return this.UserStorageService.updateUserData(city);
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
