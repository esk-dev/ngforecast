import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  map,
  takeUntil,
  Subject,
} from 'rxjs';
import {
  Forecast,
  TodayHighlights,
  ShortWeather,
} from '../../shared/models/models';
import { StoreService } from '../../shared/services/store.service';
@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss'],
})
export class SearchpageComponent implements OnDestroy {
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
