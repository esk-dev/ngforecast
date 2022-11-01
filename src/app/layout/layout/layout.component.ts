import { Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../_services';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  readonly breakpoints = Breakpoints;
  layoutType$: any = this.layoutService.layoutType$;
  constructor(private layoutService: LayoutService) {}
}
