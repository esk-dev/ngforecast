import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
  ButtonComponent,
  WeathercardComponent,
  SearchComponent,
  NavBarComponent,
  ForecastComponent,
  TodayHighlightsComponent,
} from './components';
import { MaterialModule } from '../material.module';
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MaterialModule, HttpClientModule],
  declarations: [
    ButtonComponent,
    WeathercardComponent,
    TodayHighlightsComponent,
    ForecastComponent,
    SearchComponent,
    NavBarComponent,
  ],
  exports: [
    CommonModule,
    ButtonComponent,
    WeathercardComponent,
    TodayHighlightsComponent,
    ForecastComponent,
    SearchComponent,
    NavBarComponent,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [],
})
export class SharedModule {}
