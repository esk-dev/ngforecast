import { Injectable } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { ApiService } from './api.service';
import { StoreService } from './store.service';
import { LocationService } from './location.service';
import { Forecast, TodayHighlights, ShortWeather } from '../models/models';
@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private _api: ApiService, private params: LocationService) {}

  public getShortWeather(city: string): Observable<ShortWeather> {
    return this._api.getWeather(city).pipe(
      map((response: any) => ({
        location: response.location.name,
        icon: response.current.condition.icon,
        condition: response.current.condition.text,
        temperature: response.current.temp_c,
        wind: response.current.wind_kph,
        humidity: response.current.humidity,
        feelslike: response.current.feelslike_c,
      })),
    );
  }

  public getTodayHighlights(city: string): Observable<TodayHighlights> {
    return this._api.getTodayHighlightsWeather(city).pipe(
      map((response: any) => ({
        is_day: response.current.is_day,
        pressure: response.current.pressure_mb,
        wind_dir: response.current.wind_dir,
        wind_speed: response.current.wind_kph,
        uv: response.current.uv,
        visibility: response.current.vis_km,
      })),
    );
  }

  public getForecast(city: string): Observable<Array<Forecast>> {
    return this.params.getParams(city).pipe(
      switchMap((params: any) => {
        return this._api.getForecast(params.lon, params.lat).pipe(
          map((response: any) =>
            response.daily.map((el: any) => ({
              date: new Date(el.dt * 1000),
              icon: el.weather[0].main.toLowerCase(),
              temperature: el.temp.eve,
            })),
          ),
        );
      }),
    );
  }
}
