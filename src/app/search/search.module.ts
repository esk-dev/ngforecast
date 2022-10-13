import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [SearchComponent],
  exports: [CommonModule, SearchComponent],
})
export class SearchModule {}
