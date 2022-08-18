import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, map, tap, ReplaySubject } from 'rxjs';
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
    public ActivatedRoute: ActivatedRoute,
    public WeatherService: WeatherService
  ) {
    this.subscription2 = this.ActivatedRoute.paramMap.pipe(
      map((params: any) => params.get('city'))).subscribe((city: string) => {
        this.city$.next(city);
      });
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
  subscription2: Subscription;
  isLoading: Boolean = false;
  dailyWeather$: Observable<DailyWeather>;
  shortWeather$: Observable<ShortWeather>;
  todayHighlights$: Observable<TodayHighlights>;
  city$: BehaviorSubject<string> = new BehaviorSubject('new york');

  onSearch(city: string) {
      this.city$.next(city);
      console.log(this.city$);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
