import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { NoAuthGuard } from './auth/no-auth-guard.service';
const routes: Routes = [
  {
    path: 'search/:city',
    loadChildren: () => import('./page-search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./page-home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
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
