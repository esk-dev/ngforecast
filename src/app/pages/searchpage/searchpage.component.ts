import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shortWeather } from '../../shared/models/models';
import { WeatherService } from '../../shared/services/weather.service';
@Component({
    selector: 'app-searchpage',
    templateUrl: './searchpage.component.html',
    styleUrls: ['./searchpage.component.scss'],
})
export class SearchpageComponent implements OnInit {
    shortWeather$!: Observable<shortWeather>;
    city$: BehaviorSubject<string> = new BehaviorSubject<string>('London');
    constructor(public WeatherService: WeatherService) {}

    ngOnInit(): void {
        this.onSearch('new york');
    }
    onSearch(city: string) {
        if (city) {
            this.city$.next(city);
        }
        this.shortWeather$ = this.WeatherService.getShortWeather(
            this.city$.getValue()
        );
    }
}
