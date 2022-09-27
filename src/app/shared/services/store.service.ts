import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class StoreService {
  constructor() {}

  currentCity$: BehaviorSubject<string> = new BehaviorSubject<string>('Moscow');
}
