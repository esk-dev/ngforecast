import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent, SidenavComponent, HeaderComponent } from './components';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from './../material.module';
@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: [
    NavComponent,
    SidenavComponent,
    HeaderComponent,
    LayoutComponent,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
