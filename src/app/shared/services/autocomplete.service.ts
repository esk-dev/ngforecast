import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs';
import { ApiService } from './api.service';
@Injectable({
    providedIn: 'root',
})
export class AutoComplete {
    constructor(private _api: ApiService) {}

    getAutoCompleteArray(value: string): Observable<string[]> {
        return of(value).pipe(
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
