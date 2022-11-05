import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from './../../../auth/services/auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  @Input() layoutType$: any;
  @Output() closeEvent = new EventEmitter();
  constructor(private authService: AuthService) {}
  public eventEmit() {
    this.closeEvent.emit();
  }

  public logOut() {
    this.authService.logout().subscribe((res: any) => {
      console.log(res);
    });
  }
}
