import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ErrorService } from './error.service';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient, private error: ErrorService) {}

  getAutoComplete(input: string): Observable<any> {
    return this._http.get(
      `https://api.weatherapi.com/v1/search.json?key=df9ea22d929543f6927163438222504&q=` +
        `${input}`
    );
  }

  getLocationParams(input: string): Observable<any> {
    return this._http.get(
      `https://api.weatherapi.com/v1/search.json?key=df9ea22d929543f6927163438222504&q=` +
        `${input}`
    );
  }

  getWeather(city: string): Observable<any> {
    return this._http.get(
      `https://api.weatherapi.com/v1/current.json?key=df9ea22d929543f6927163438222504&q=` +
        `${city}` +
        `&aqi=yes`
    );
  }

  getDailyWeather(lon: number, lat: number): Observable<any> {
    return this._http.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,current,minutely&units=metric&appid=f92efd7aedf0c556c1b9edf282678ae6`
    );
  }

  getTodayHighlightsWeather(lon: number, lat: number): Observable<any> {
    return this._http.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely&units=metric&appid=f92efd7aedf0c556c1b9edf282678ae6`
    );
  }
}
