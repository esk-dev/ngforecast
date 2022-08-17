import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { weather } from '../../shared/models/models';
import { WeatherService } from '../../shared/services/weather.service';
@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss'],
})
export class SearchpageComponent implements OnInit, OnDestroy {
  shortWeather$!: weather;
  city$: BehaviorSubject<string> = new BehaviorSubject<string>('London');
  subscription: Subscription;
  constructor(public WeatherService: WeatherService) {}

  ngOnInit(): void {
    this.onSearch('london');
  }
  onSearch(city: string) {
    if (city) {
      this.city$.next(city);
      this.subscription = this.WeatherService.getWeather(
        this.city$.getValue()
      ).subscribe((weather) => (this.shortWeather$ = weather));
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
