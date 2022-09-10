import { Injectable, Input } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../shared/api.service';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private _api: ApiService) { }

  getWeather(city: string): Observable<any> {
    return this._api.getWeather(city).pipe(
      map((response: any) => ({
        location: response.location.name,
        condition: {
          icon: response.current.condition.icon,
          text: response.current.condition.text,
        },
        temperature: response.current.temp_c,
        wind: response.current.wind_kph,
        humidity: response.current.humidity,
        isDay: response.current.is_day,
        feelslike: response.current.feelslike_c,
        uv: response.current.uv,
      }))
    );
  }
}
