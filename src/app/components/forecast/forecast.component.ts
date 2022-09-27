import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Forecast } from '../../shared/models/models';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastComponent implements OnChanges {
  constructor() {}
  @Input() forecast: Forecast;
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
