import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Input() layoutType$: any;
  constructor() {}

  ngOnInit(): void {
    console.log('nav work');
  }
}
