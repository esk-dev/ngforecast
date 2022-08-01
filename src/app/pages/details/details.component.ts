import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  constructor(
    public route: ActivatedRoute,
    public WeatherService: WeatherService
  ) {}
  isLoading: Boolean = true;
  dailyWeather$: Observable<any>;
  weather$: Observable<any>;
  city$: BehaviorSubject<string> = new BehaviorSubject<string>('London');
  onSearch(city: string) {
    if (city !== this.city$.getValue()) {
      this.city$.next(city);
      this.dailyWeather$ = this.WeatherService.getDailyWeather(
        this.city$.getValue()
      );
      this.weather$ = this.WeatherService.getWeather(this.city$.getValue());
      // this.todayHighlights$ = this.WeatherService.getTodayHighlights(
      //     this.city$.getValue()
      // ).pipe(tap(() => console.log('loading')));
    } else console.log('input city');
  }
}
