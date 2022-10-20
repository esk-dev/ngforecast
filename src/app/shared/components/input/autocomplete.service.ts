import { EventEmitter, Injectable, Output } from '@angular/core';
import { distinctUntilChanged, filter, Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs';
import { ApiService } from '../../../core';
@Injectable({
  providedIn: 'any',
})
export class AutoComplete {
  constructor(private _api: ApiService) {}

  getAutoCompleteArray(value: string): Observable<string[]> {
    return of(value).pipe(
      distinctUntilChanged(),
      filter((val) => val.length > 2),
      switchMap((value: string) => this._api.getAutoComplete(value)),
      map((response: Observable<any>) => {
        let arr: string[] = [];
        response.forEach((element: any) => {
          arr.push(element.name);
        });
        return arr;
      })
    );
  }
}
