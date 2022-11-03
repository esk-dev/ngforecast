import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './components/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from './../material.module';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  declarations: [AuthComponent],
  exports: [],
  providers: [],
})
export class AuthModule {}
