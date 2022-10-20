import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StoreService } from '../core/services';
import { WeatherService } from '../core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  favoriteCitiesWeather: any;
  constructor(public StoreService: StoreService, public WeatherService: WeatherService) {}

  destroy$: Subject<boolean> = new Subject();
  ngOnInit(): void {
    this.StoreService.favoriteCity$
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: string[]) => {
        this.favoriteCitiesWeather = response.map((city: string) => {
          return this.WeatherService.getShortWeather(city);
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
