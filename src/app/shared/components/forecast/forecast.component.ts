import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Forecast } from 'src/app/core';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastComponent {
  constructor() {}
  @Input() forecast: Forecast;
}
