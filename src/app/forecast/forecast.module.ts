import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastComponent } from './forecast/forecast.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ForecastComponent],
  imports: [CommonModule, SharedModule],
  exports: [ForecastComponent],
})
export class ForecastModule {}
