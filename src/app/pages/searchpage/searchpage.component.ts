import { Component, OnDestroy, OnInit } from '@angular/core';
improt { Router } from ' @angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ShortWeather } from '../../shared/models/models';
import { WeatherService } from '../../shared/services/weather.service';
@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss'],
})
export class SearchpageComponent implements OnInit, OnDestroy {
  shortWeather$!: ShortWeather;
  city$: BehaviorSubject<string> = new BehaviorSubject<string>('London');
  subscription: Subscription;
  constructor(public WeatherService: WeatherService, private router: Router  )) {}

  ngOnInit(): void {
    this.onSearch(this.city$.getValue());
  }

  routeToDetails() {
    this.router.navigate(['/details', { city: this.city$.getValye() }]);
  }
  onSearch(city: string) {
    if (city) {
      this.city$.next(city);
      this.subscription = this.WeatherService.getShortWeather(
        this.city$.getValue()
      ).subscribe((shortWeather) => (this.shortWeather$ = shortWeather));
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
