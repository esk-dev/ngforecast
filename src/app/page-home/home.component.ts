import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
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
  constructor(
    private UserStorageService: UserStorageService,
    private WeatherService: WeatherService,
  ) {}

  destroy$: Subject<boolean> = new Subject();
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
