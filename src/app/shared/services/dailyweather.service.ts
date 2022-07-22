import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ApiService } from './api.service';
import { StoreService } from './store.service';
import { dailyWeather } from '../models/models';
@Injectable({
    providedIn: 'root',
})
export class DailyweatherService {
    lon!: number;
    lat!: number;

    constructor(public _store: StoreService, public _api: ApiService) {
        this._store.params$.subscribe(params => {
            (this.lon = params.lon), (this.lat = params.lat);
        });
    }

    getDailyWeather() {
        this._api
            .getDailyWeather(this.lon, this.lat)
            .pipe(
                map((response: any) =>
                    response.daily.map((el: any) => ({
                        date: new Date(el.dt * 1000),
                        icon: el.weather[0].main.toLowerCase(),
                        temperature: el.temp.eve,
                    }))
                )
            )
            .subscribe((response: Object[]) => {
                console.log(response);
                this._store.dailyWeather$.next(response);
            });
    }
}
