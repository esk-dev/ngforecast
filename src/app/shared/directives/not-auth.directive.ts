import { Directive, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
@Directive({
  selector: '[notAuth]',
})
export class NotAuthDirective implements OnInit, OnDestroy {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService,
  ) {}
  private destroy$: Subject<boolean> = new Subject<boolean>();
  ngOnInit(): void {
    this.authService.isAuthenticated$.pipe(takeUntil(this.destroy$)).subscribe((value: boolean) => {
      if (value === true) {
        this.viewContainer.clear();
      } else {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
