import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ShortWeather } from './../../../core';
@Component({
  selector: 'app-weathercard',
  templateUrl: './weathercard.component.html',
  styleUrls: ['./weathercard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeathercardComponent {
  @Input() shortWeather: ShortWeather;
  constructor() {}
}
