import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, tap, ReplaySubject } from 'rxjs';
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
export class DetailsComponent {
  constructor(
    public route: ActivatedRoute,
    public WeatherService: WeatherService
  ) {
    this.subscription = this.city$.subscribe((city: string) => {
        this.dailyWeather$ = this.WeatherService.getDailyWeather(
          city
        );
        this.shortWeather$ = this.WeatherService.getShortWeather(
          city
        );
        this.todayHighlights$ = this.WeatherService.getTodayHighlights(
          city
        );
    })
  }

  subscription: Subscription;
  isLoading: Boolean = false;
  dailyWeather$: Observable<DailyWeather>;
  shortWeather$: Observable<ShortWeather>;
  todayHighlights$: Observable<TodayHighlights>;
  city$: BehaviorSubject<string> = new BehaviorSubject('New york');

  onSearch(city: string) {
      this.city$.next(city);
      console.log(this.city$);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
