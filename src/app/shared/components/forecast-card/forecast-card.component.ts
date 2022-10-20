import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Forecast } from 'src/app/core';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastCardComponent {
  constructor() {}
  @Input() forecast: Forecast;
}
