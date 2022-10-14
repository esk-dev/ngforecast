import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { SearchRoutingModule } from './search-routing.module';
@NgModule({
  imports: [CommonModule, SharedModule, CoreModule, SearchRoutingModule],
  declarations: [SearchComponent],
})
export class SearchModule {}
