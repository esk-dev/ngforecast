import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './auth/no-auth-guard.service';
import { AuthGuard } from './auth-guard.service';
import { LayoutComponent } from './layout/layout/layout.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'search/:city',
        loadChildren: () => import('./page-search/search.module').then((m) => m.SearchModule),
      },
      {
        path: 'home',
        loadChildren: () => import('./page-home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
