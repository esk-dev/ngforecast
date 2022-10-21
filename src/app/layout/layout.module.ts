import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent, SidenavComponent, HeaderComponent } from './components';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [NavComponent, SidenavComponent, HeaderComponent, LayoutComponent],
  imports: [CommonModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
