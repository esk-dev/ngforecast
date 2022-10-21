import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Overview } from '../../core/models';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent implements OnInit {
  @Input() overview$: Observable<Overview>;
  constructor() {}

  ngOnInit() {
    this.overview$.subscribe((res) => console.log(res));
  }
}
