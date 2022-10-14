import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../core/services';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  map,
  takeUntil,
  Subject,
} from 'rxjs';
import { Forecast, TodayHighlights, ShortWeather } from '../core/models/models';
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
        console.log(city);
        this.forecast$ = this.WeatherService.getForecast(city);
        this.shortWeather$ = this.WeatherService.getShortWeather(city);
        this.todayHighlights$ = this.WeatherService.getTodayHighlights(city);
      });
  }
  destroy$: Subject<boolean> = new Subject();
  isLoading: Boolean = false;
  forecast$: Observable<Array<Forecast>>;
  shortWeather$: Observable<ShortWeather>;
  todayHighlights$: Observable<TodayHighlights>;

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
