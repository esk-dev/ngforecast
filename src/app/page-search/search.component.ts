import { Component, OnDestroy } from '@angular/core';
import { WeatherService } from '../core/services';
import { Router } from '@angular/router';
import { Observable, takeUntil, Subject } from 'rxjs';
import { Forecast, Overview, ShortWeather } from '../core/models';
import { StoreService } from '../core/services';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnDestroy {
  constructor(
    public Router: Router,
    public WeatherService: WeatherService,
    public StoreService: StoreService,
  ) {
    this.StoreService.currentCity$.pipe(takeUntil(this.destroy$)).subscribe((city: string) => {
      this.forecast$ = this.WeatherService.getForecast(city);
      this.shortWeather$ = this.WeatherService.getShortWeather(city);
      this.overview$ = this.WeatherService.getOverview(city);
    });
  }
  destroy$: Subject<boolean> = new Subject();

  forecast$: Observable<Forecast[]>;
  shortWeather$: Observable<ShortWeather>;
  overview$: Observable<Overview>;

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  searchEvent(city: string) {
    this.StoreService.currentCity$.next(city);
    this.Router.navigate(['/search', city]);
  }
}
