import { Injectable } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { ApiService } from './api.service';
import { LocationService } from './location.service';
import { Forecast, Overview, ShortWeather } from '../core/models';
import { IconService } from './icon.service';
@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private _api: ApiService, private iconService: IconService) {}

  public getShortWeather(city: string): Observable<ShortWeather> {
    return this._api.getWeather(city).pipe(
      map((response: any) => ({
        location: response.location.name,
        country: response.location.country,
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
    return this._api.getForecast(city).pipe(
      map((response: any) => {
        const { forecastday } = response.forecast;
        return forecastday.map((el: any) => ({
          date: new Date(el['date_epoch'] * 1000),
          icon: el.day.condition.icon,
          condition: el.day.condition.text,
          temperature: el.day.avgtemp_c,
        }));
      }),
    );
  }
}
