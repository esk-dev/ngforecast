import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ShortWeather } from '../../shared/models/models';
import { WeatherService } from '../../shared/services/weather.service';
@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss'],
})
export class SearchpageComponent implements OnInit {
  shortWeather$: Observable<ShortWeather>;
  city$: BehaviorSubject<string> = new BehaviorSubject<string>('London');
  constructor(public WeatherService: WeatherService, private router: Router) {}

  ngOnInit(): void {
    this.onSearch(this.city$.getValue());
  }

  routeToDetails() {
    this.router.navigate(['/details', this.city$.getValue()]);
  }
  onSearch(city: string) {
    if (city) {
      this.city$.next(city);
      this.shortWeather$ = this.WeatherService.getShortWeather(
        this.city$.getValue()
      );
    }
  }
}
