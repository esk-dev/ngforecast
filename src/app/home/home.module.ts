import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, CoreModule, HomeRoutingModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
