import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  getAutoComplete(input: string): Observable<any> {
    return this._http.get(
      `https://api.weatherapi.com/v1/search.json?key=df9ea22d929543f6927163438222504&q=`
      + `${input}`);
  }

  getWeather(city: string): Observable<any> {
    return this._http.get(
      `https://api.weatherapi.com/v1/current.json?key=df9ea22d929543f6927163438222504&q=`
      + `${city}`
      + `&aqi=yes`
      );
  }

}
