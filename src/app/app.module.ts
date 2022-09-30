import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorIntercept } from './error.interceptor';

import { WeathercardComponent } from './components/weathercard/weathercard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { SearchpageComponent } from './pages/searchpage/searchpage.component';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { TodayHighlightsComponent } from './components/today-highlights/today-highlights.component';
import { ButtonComponent } from './components/button/button.component';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    SearchComponent,
    HeaderComponent,
    FooterComponent,
    WeathercardComponent,
    ForecastComponent,
    SearchpageComponent,
    TodayHighlightsComponent,
    HomeComponent,
    ButtonComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorIntercept, multi: true },
  ],
})
export class AppModule {}
