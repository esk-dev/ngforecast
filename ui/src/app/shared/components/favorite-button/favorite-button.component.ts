import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteButtonComponent {
  @Input() added: boolean;
  @Output() clickEvent = new EventEmitter<null>();
  constructor() {}
  public addingAction() {
    this.clickEvent.emit();
  }
}
