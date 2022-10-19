import { T } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Params } from '../models';
import { ApiService } from './api.service';
import { StoreService } from './store.service';
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private _store: StoreService, private _api: ApiService) {}

  getParams(city: string): Observable<Params> {
    return this._api.getLocationParams(city).pipe(
      map((response: any) => ({
        lat: response[0].lat,
        lon: response[0].lon,
      }))
    );
  }
}
