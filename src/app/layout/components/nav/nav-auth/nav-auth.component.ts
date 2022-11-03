import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-nav-auth',
  templateUrl: './nav-auth.component.html',
  styleUrls: ['./nav-auth.component.scss'],
})
export class NavAuthComponent {
  constructor(private authService: AuthService) {}

  public logOut() {
    this.authService.logout().subscribe((res: any) => {
      console.log(res);
    });
  }
}
