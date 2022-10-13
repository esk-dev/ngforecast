import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class StoreService {
  constructor() {}

  public currentCity$: BehaviorSubject<string> = new BehaviorSubject<string>('Moscow');

  public favoriteCity$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([
    'Moscow',
    'london',
    'new york',
    'krasnoyarsk',
    'Moscow',
    'london',
    'new york',
    'krasnoyarsk',
  ]);
}
