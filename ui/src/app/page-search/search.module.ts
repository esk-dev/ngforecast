import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SharedModule } from '../shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';
import { OverviewModule } from '../overview/overview.module';
import { ForecastModule } from '../forecast/forecast.module';
@NgModule({
  imports: [CommonModule, SharedModule, SearchRoutingModule, OverviewModule, ForecastModule],
  declarations: [SearchComponent],
})
export class SearchModule {}
