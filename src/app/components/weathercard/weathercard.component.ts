import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { weather } from '../../shared/models/models';
@Component({
  selector: 'app-weathercard',
  templateUrl: './weathercard.component.html',
  styleUrls: ['./weathercard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeathercardComponent {
  @Input() weather$!: any;
  constructor() {}
}
