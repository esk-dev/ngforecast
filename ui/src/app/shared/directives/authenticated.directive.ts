import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject, take, takeLast, takeUntil, tap } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
@Directive({
  selector: '[isAuth]',
})
export class AuthenticatedDirective implements OnInit, OnDestroy {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}
  private destroy$: Subject<boolean> = new Subject<boolean>();
  ngOnInit(): void {
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe((val: boolean) => {
        if (val === true && this.viewContainer.length === 0) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
        if (val === false) {
          this.viewContainer.clear();
        }
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
