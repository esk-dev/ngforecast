import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { DailyWeather } from '../../shared/models/models';
@Component({
  selector: 'app-dailyweather',
  templateUrl: './dailyweather.component.html',
  styleUrls: ['./dailyweather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyweatherComponent implements OnChanges {
  constructor() {}
  @Input() dailyWeather$: Array<DailyWeather>;
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
