import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { SearchRoutingModule } from './search-routing.module';
import { OverviewModule } from '../overview/overview.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    SearchRoutingModule,
    OverviewModule,
  ],
  declarations: [SearchComponent],
})
export class SearchModule {}
