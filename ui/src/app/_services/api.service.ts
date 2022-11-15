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
      .post(`${environment.API_URL}/search`, {
        input,
      })
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  getWeather(city: string): Observable<any> {
    return this._http
      .post(`${environment.API_URL}/weather`, {
        city,
      })
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  getForecast(city: string): Observable<any> {
    return this._http
      .post(`${environment.API_URL}/forecast`, {
        city,
      })
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  read(): Observable<any> {
    return this._http.get(`${environment.API_URL}/read`);
  }

  update(city: string): Observable<any> {
    return this._http.put(`${environment.API_URL}/update`, { city });
  }

  delete(city: string): Observable<any> {
    return this._http.put(`${environment.API_URL}/delete`, { city });
  }
}
