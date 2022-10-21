import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../../services';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent implements OnInit {
  layoutType$: Observable<string>;
  sidenavMode: boolean;
  constructor(private readonly layoutService: LayoutService) {
    this.layoutType$ = this.layoutService.layoutType$;
    this.sidenavMode = this.layoutService.snapshotLayoutType == 'breakpoints.Web' ? true : false;
  }

  ngOnInit(): void {
    console.log('work');
  }
}
