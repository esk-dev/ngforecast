import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
  ButtonComponent,
  WeathercardComponent,
  InputComponent,
  ForecastCardComponent,
  OverviewCardComponent,
  DateComponent,
} from './components';
import { AuthenticatedDirective } from './directives/authenticated.directive';
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
    ForecastCardComponent,
    InputComponent,
    OverviewCardComponent,
    DateComponent,
    AuthenticatedDirective,
  ],
  exports: [
    CommonModule,
    ButtonComponent,
    WeathercardComponent,
    ForecastCardComponent,
    OverviewCardComponent,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    InputComponent,
    DateComponent,
    AuthenticatedDirective,
  ],
  providers: [],
})
export class SharedModule {}
