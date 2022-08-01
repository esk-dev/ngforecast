import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../shared/services/location.service';
import { WeatherService } from '../../shared/services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
    constructor(
        public route: ActivatedRoute,
        public parameters: LocationService,
        public WeatherService: WeatherService
    ) {}
    dailyWeather$: any;
    shortWeather$: any;
    todayHighlights$: any;
    city$: BehaviorSubject<string> = new BehaviorSubject<string>('London');
    ngOnInit(): void {
        this.onSearch('london');
    }
    onSearch(city: string) {
        if (city !== this.city$.getValue()) {
            this.city$.next(city);
            this.dailyWeather$ = this.WeatherService.getDailyWeather(
                this.city$.getValue()
            );
            this.shortWeather$ = this.WeatherService.getShortWeather(
                this.city$.getValue()
            );
            this.todayHighlights$ = this.WeatherService.getTodayHighlights(
                this.city$.getValue()
            )
        } else console.log('input city');
    }
}
