import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Forecast } from 'src/app/core';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent {
  @Input() forecast$: Observable<Forecast[]>;
  constructor() {}
}
