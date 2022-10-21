import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorIntercept } from './error.interceptor';
import { HeaderComponent, FooterComponent, WrapperComponent } from './layout';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [CommonModule, MaterialModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorIntercept, multi: true }],
  declarations: [HeaderComponent, FooterComponent, WrapperComponent],
  exports: [HeaderComponent, FooterComponent, WrapperComponent],
})
export class CoreModule {}
