import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap, map } from 'rxjs';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root',
})
export class InputCatchService {
  constructor(private _api: ApiService) { }

  getAutoCompleteArray(value: string): Observable<Array<string>> {
    return of(value).pipe(
      switchMap((value: string) => this._api.getAutoComplete(value)),
      map((response: Observable<any>) => {
        let arr: string[] = []
          response.forEach((element: any) => {
              arr.push(element.name);
            });
        return arr;
      })
    );
  }
}
