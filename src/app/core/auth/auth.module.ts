import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './components/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from './../../material.module';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, AuthRoutingModule],
  providers: [AuthService],
  exports: [AuthComponent],
})
export class AuthModule {}
