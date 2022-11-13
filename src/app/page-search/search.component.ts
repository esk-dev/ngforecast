import { Component, OnDestroy } from '@angular/core';
import { UserStorageService, WeatherService } from '../_services/';
import { Router } from '@angular/router';
import { Observable, takeUntil, Subject, switchMap } from 'rxjs';
import { Forecast, Overview, ShortWeather } from '../core/models';
import { StoreService } from '../_services/';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnDestroy {
  destroy$: Subject<boolean> = new Subject();
  forecast$: Observable<Forecast[]>;
  shortWeather$: Observable<ShortWeather>;
  overview$: Observable<Overview>;
  isCityAdded$: Observable<boolean>;
  constructor(
    public Router: Router,
    public WeatherService: WeatherService,
    public StoreService: StoreService,
    public UserStorageService: UserStorageService,
  ) {
    this.StoreService.currentCity$.pipe(takeUntil(this.destroy$)).subscribe((city: string) => {
      this.forecast$ = this.WeatherService.getForecast(city);
      this.shortWeather$ = this.WeatherService.getShortWeather(city);
      this.overview$ = this.WeatherService.getOverview(city);
      this.isCityAdded$ = this.UserStorageService.isCityAdded(city);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  searchEvent(city: string) {
    this.StoreService.currentCity$.next(city);
    this.Router.navigate(['/search', city]);
  }

  toFavorite(city: string) {
    this.isCityAdded$
      .pipe(
        takeUntil(this.destroy$),
        switchMap((acc: boolean) => {
          if (acc) {
            return this.UserStorageService.deleteUserData(city);
          } else {
            return this.UserStorageService.updateUserData(city);
          }
        }),
      )
      .subscribe();
  }
}
