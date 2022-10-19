import { Component, OnDestroy } from '@angular/core';
import { WeatherService } from '../core/services';
import { ActivatedRoute } from '@angular/router';
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
    public ActivatedRoute: ActivatedRoute,
    public WeatherService: WeatherService,
    public StoreService: StoreService
  ) {
    this.StoreService.currentCity$
      .pipe(takeUntil(this.destroy$))
      .subscribe((city: string) => {
        this.forecast$ = this.WeatherService.getForecast(city);
        this.shortWeather$ = this.WeatherService.getShortWeather(city);
        this.overview$ = this.WeatherService.getOverview(city);
        console.log(this.overview$);
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
}
