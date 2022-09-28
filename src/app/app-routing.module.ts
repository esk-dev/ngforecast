import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchpageComponent } from './pages/searchpage/searchpage.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchpageComponent, title: 'Search' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
