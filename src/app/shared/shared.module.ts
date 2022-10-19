import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
  ButtonComponent,
  WeathercardComponent,
  InputComponent,
  NavBarComponent,
  ForecastComponent,
  OverviewCardComponent,
} from './components';
import { MaterialModule } from '../material.module';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
  ],
  declarations: [
    ButtonComponent,
    WeathercardComponent,
    ForecastComponent,
    NavBarComponent,
    InputComponent,
    OverviewCardComponent,
  ],
  exports: [
    CommonModule,
    ButtonComponent,
    WeathercardComponent,
    ForecastComponent,
    NavBarComponent,
    OverviewCardComponent,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    InputComponent,
  ],
  providers: [],
})
export class SharedModule {}
