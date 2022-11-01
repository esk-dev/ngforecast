import { Injectable } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { ApiService } from './api.service';
import { LocationService } from './location.service';
import { Forecast, Overview, ShortWeather } from '../core/models';
import { IconService } from './icon.service';
@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(
    private _api: ApiService,
    private params: LocationService,
    private iconService: IconService,
  ) {}

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
  public getOverview(city: string): Observable<Overview> {
    return this._api.getWeather(city).pipe(
      map((response: any) => {
        const { pressure_mb, wind_kph, wind_dir, uv, vis_km } = response.current;
        return {
          wind: {
            icon: this.iconService.registerIcon(
              '/assets/icons/weather/wi-wind-beaufort-0.svg',
              'windIcon',
            ),
            values: wind_kph,
            name: 'wind',
            properties: wind_dir,
          },
          pressure: {
            icon: this.iconService.registerIcon(
              '/assets/icons/weather/wi-barometer.svg',
              'pressureIcon',
            ),
            name: 'pressure',
            values: pressure_mb,
          },
          uv: {
            icon: this.iconService.registerIcon('/assets/icons/weather/wi-raindrop.svg', 'uvIcon'),
            name: 'uv',
            values: uv,
          },
          visibility: {
            icon: this.iconService.registerIcon(
              '/assets/icons/weather/wi-refresh-alt.svg',
              'visIcon',
            ),
            name: 'visibility',
            values: vis_km,
          },
        };
      }),
    );
  }

  public getForecast(city: string): Observable<Forecast[]> {
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
