import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, tap, ReplaySubject } from 'rxjs';
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
    // this.dailyWeather$ = this.WeatherService.getDailyWeather(
    //   this.city$.getValue()
    // );
    // this.shortWeather$ = this.WeatherService.getShortWeather(
    //   this.city$.getValue()
    // );
    // this.todayHighlights$ = this.WeatherService.getTodayHighlights(
    //   this.city$
    // );
  }

  isLoading: Boolean = false;
  dailyWeather$: Observable<DailyWeather>;
  shortWeather$: Observable<ShortWeather>;
  todayHighlights$: Observable<TodayHighlights>;
  city$: ReplaySubject<string> = new ReplaySubject();

  onSearch(city: string) {
      this.city$.next(city);
      console.log(this.city$);
  }
}
