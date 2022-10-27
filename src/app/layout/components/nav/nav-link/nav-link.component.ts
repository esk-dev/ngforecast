import { Component, Input, OnInit } from '@angular/core';
import { Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.scss'],
})
export class NavLinkComponent {
  @Input() title: string;
  @Input() link: string;
  @Input() icon: string;
  @Input() layoutType$: any;
  readonly breakpoints = Breakpoints;
  constructor() {}
}
