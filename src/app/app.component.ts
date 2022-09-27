import { Component, VERSION } from '@angular/core';
import { StoreService } from './shared/services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public StoreService: StoreService) {}

  onSearch(city: string) {
    this.StoreService.currentCity$.next(city);
  }
}
