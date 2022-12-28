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
  FavoriteButtonComponent,
} from './components';
import { AuthenticatedDirective } from './directives/authenticated.directive';
import { NotAuthDirective } from './directives/not-auth.directive';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MaterialModule, HttpClientModule],
  declarations: [
    ButtonComponent,
    WeathercardComponent,
    ForecastCardComponent,
    InputComponent,
    OverviewCardComponent,
    DateComponent,
    AuthenticatedDirective,
    NotAuthDirective,
    FavoriteButtonComponent,
  ],
  exports: [
    CommonModule,
    ButtonComponent,
    WeathercardComponent,
    ForecastCardComponent,
    OverviewCardComponent,
    FavoriteButtonComponent,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    InputComponent,
    DateComponent,
    AuthenticatedDirective,
    NotAuthDirective,
  ],
  providers: [],
})
export class SharedModule {}
