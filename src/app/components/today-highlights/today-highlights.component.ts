import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-today-highlights',
  templateUrl: './today-highlights.component.html',
  styleUrls: ['./today-highlights.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodayHighlightsComponent {

  constructor() { }
  @Input() todayHighlights$: any;

}