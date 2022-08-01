import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
    shortWeather,
    dailyWeather,
    todayHighlights,
    params,
} from '../models/models';
@Injectable({ providedIn: 'root' })
export class StoreService {
    constructor() {}

    // city$: BehaviorSubject<string> = new BehaviorSubject<string>('London');

    // shortWeather$: BehaviorSubject<shortWeather> =
    //     new BehaviorSubject<shortWeather>({
    //         location: 'London',
    //         icon: 'assets/clouds.svg',
    //         condition: 'Sunny',
    //         temperature: 18,
    //         wind: 2,
    //         humidity: 3,
    //         feelslike: 23,
    //     });

    // dailyWeather$: BehaviorSubject<Object[]> = new BehaviorSubject<Object[]>([
    //     {},
    // ]);

    // todayHighlights$: BehaviorSubject<todayHighlights> =
    //     new BehaviorSubject<todayHighlights>({
    //         pressure: 18,
    //         clouds: 19,
    //         uvi: 2,
    //         sunrise: 19,
    //         sunset: 0.2,
    //         visibility: 15,
    //         dewPoint: 34,
    //     });

    // params$: BehaviorSubject<params> = new BehaviorSubject<params>({
    //     lat: 50,
    //     lon: 33,
    // });
}
