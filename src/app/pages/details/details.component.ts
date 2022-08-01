import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
    constructor(
        public route: ActivatedRoute,
        public WeatherService: WeatherService
    ) {}
    isLoading: Boolean = true;
    dailyWeather$: Observable<any>;
    shortWeather$: Observable<any>;
    todayHighlights$: Observable<any>;
    stream$: any;
    city$: BehaviorSubject<string> = new BehaviorSubject<string>('London');
    ngOnInit(): void {
        this.onSearch('london');
    }
    onSearch(city: string) {
        if (city !== this.city$.getValue()) {
            this.city$.next(city);
            this.dailyWeather$ = this.WeatherService.getDailyWeather(
                this.city$.getValue()
            ).pipe(tap(() => console.log('loading')));
            this.shortWeather$ = this.WeatherService.getShortWeather(
                this.city$.getValue()
            ).pipe(tap(() => console.log('loading')));
            this.todayHighlights$ = this.WeatherService.getTodayHighlights(
                this.city$.getValue()
            ).pipe(tap(() => console.log('loading')));
        } else console.log('input city');
    }
}
