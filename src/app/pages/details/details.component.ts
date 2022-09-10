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
  DailyWeather,
  TodayHighlights,
  ShortWeather,
} from '../../shared/models/models';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnDestroy {
  constructor(
    public ActivatedRoute: ActivatedRoute,
    public WeatherService: WeatherService
  ) {
    this.ActivatedRoute.paramMap
      .pipe(
        map((params: any) => params.get('city')),
        takeUntil(this.destroy$)
      )
      .subscribe((city: string) => {
        this.city$.next(city);
      });
    this.city$.pipe(takeUntil(this.destroy$)).subscribe((city: string) => {
      this.dailyWeather$ = this.WeatherService.getDailyWeather(city);
      this.shortWeather$ = this.WeatherService.getShortWeather(city);
      this.todayHighlights$ = this.WeatherService.getTodayHighlights(city);
    });
  }
  destroy$: Subject<boolean> = new Subject();
  isLoading: Boolean = false;
  dailyWeather$: Observable<Array<DailyWeather>>;
  shortWeather$: Observable<ShortWeather>;
  todayHighlights$: Observable<TodayHighlights>;
  city$: BehaviorSubject<string> = new BehaviorSubject('new york');

  onSearch(city: string) {
    this.city$.next(city);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
