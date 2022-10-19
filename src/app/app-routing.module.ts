import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'search/:city',
    loadChildren: () =>
      import('./page-search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./page-home/home.module').then((m) => m.HomeModule),
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
