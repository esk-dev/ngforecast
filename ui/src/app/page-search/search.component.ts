import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserStorageService, WeatherService } from '../_services/';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, takeUntil, Subject, switchMap, take, map } from 'rxjs';
import { Forecast, Overview, ShortWeather } from '../core/models';
import { StoreService } from '../_services/';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject();
  forecast$: Observable<Forecast[]>;
  shortWeather$: Observable<ShortWeather>;
  overview$: Observable<Overview>;
  isCityAdded$: Observable<boolean>;
  constructor(
    public ActivatedRoute: ActivatedRoute,
    public Router: Router,
    public WeatherService: WeatherService,
    public StoreService: StoreService,
    public UserStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    this.ActivatedRoute.paramMap
      .pipe(map((params) => params.get('city'),takeUntil(this.destroy$)))
      .subscribe((city) => {
        this.forecast$ = this.WeatherService.getForecast(city);
        this.shortWeather$ = this.WeatherService.getShortWeather(city);
        this.overview$ = this.WeatherService.getOverview(city);
        this.isCityAdded$ = this.UserStorageService.isCityAdded(city);
      });
  }

  searchEvent(city: string) {
    this.Router.navigate(['/search', city]);
  }

  toFavorite(city: string) {
    this.UserStorageService.updateFavoriteCityArray(city).pipe(
      take(1),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
