import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {
  NavComponent,
  SidenavComponent,
  HeaderComponent,
  NavLinkComponent,
  NavAuthComponent,
} from './components';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from './../material.module';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, SharedModule],
  declarations: [
    NavComponent,
    SidenavComponent,
    HeaderComponent,
    LayoutComponent,
    NavLinkComponent,
    NavAuthComponent,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
