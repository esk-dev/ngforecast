import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './_helpers/no-auth-guard.service';
import { AuthGuard } from './_helpers/auth-guard.service';
import { LayoutComponent } from './layout/layout/layout.component';
const mainTitle = 'ngForecast';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    title: mainTitle,
    children: [
      {
        path: 'search/:city',
        title: `${mainTitle} - search`,
        loadChildren: () =>
          import('./page-search/search.module').then((m) => m.SearchModule),
      },
      {
        path: 'home',
        title: `${mainTitle} - home`,
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./page-home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'login',
        title: 'Authentication',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
      { path: '**', redirectTo: '/login', pathMatch: 'full' },
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
