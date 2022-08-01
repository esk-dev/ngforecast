import { Injectable } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { ApiService } from './api.service';
import { StoreService } from './store.service';
import { LocationService } from './location.service';
import { shortWeather } from '../models/models';
import { dailyWeather } from '../models/models';
@Injectable({ providedIn: 'root' })
export class WeatherService {
    constructor(private _api: ApiService, private params: LocationService) {}

    getShortWeather(city: string): Observable<shortWeather> {
        return this._api.getWeather(city).pipe(
            map((response: any) => ({
                location: response.location.name,
                icon: response.current.condition.icon,
                condition: response.current.condition.text,
                temperature: response.current.temp_c,
                wind: response.current.wind_kph,
                humidity: response.current.humidity,
                feelslike: response.current.feelslike_c,
            }))
        );
    }

    getDailyWeather(city: string): Observable<dailyWeather> {
        return this.params.getParams(city).pipe(
            switchMap((params: any) => {
                return this._api.getDailyWeather(params.lon, params.lat).pipe(
                    map((response: any) =>
                        response.daily.map((el: any) => ({
                            date: new Date(el.dt * 1000),
                            icon: el.weather[0].main.toLowerCase(),
                            temperature: el.temp.eve,
                        }))
                    )
                );
            })
        );
    }

    getTodayHighlights(city: string): Observable<any> {
        return this.params.getParams(city).pipe(
            switchMap((params: any) => {
                return this._api
                    .getTodayHighlightsWeather(params.lon, params.lat)
                    .pipe(
                        map((response: any) => ({
                            devPoint: response.current.dew_point,
                            pressure: response.current.pressure,
                            windDeg: response.current.wind_deg,
                            windSpeed: response.current.wind_speed,
                            sunrise: new Date(response.current.sunrise * 1000),
                            sunset: new Date(response.current.sunset * 1000),
                            uvi: response.current.uvi,
                            visibility: response.current.visibility,
                        }))
                    );
            })
        );
    }
}
