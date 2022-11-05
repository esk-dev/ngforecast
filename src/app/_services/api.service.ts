import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, windowTime } from 'rxjs';
import { ErrorService } from './error.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient, private error: ErrorService) {}

  getAutoComplete(input: string): Observable<any> {
    return this._http
      .get(`${environment.SEARCH_API}${environment.API_KEY}&q=${input}`)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  getWeather(city: string): Observable<any> {
    return this._http
      .get(`${environment.WEATHER_API}${environment.API_KEY}&q=${city}&aqi=yes`)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  getForecast(city: string): Observable<any> {
    return this._http
      .get(`${environment.FORECAST_API}${environment.API_KEY}&q=${city}&days=10&aqi=no&alerts=no`)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }
}
