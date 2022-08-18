import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Output() buttonAction = new EventEmitter();
  constructor() { }
  clickOnButton() {
    this.buttonAction.emit(null);
  }

}