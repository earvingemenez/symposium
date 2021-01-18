import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './components/public/pagenotfound/pagenotfound.component';
import { PUBLIC_ROUTES } from './components/public/public.route';

// const routes: Routes = [].concat(PUBLIC_ROUTES, );
const DEFAULT_ROUTES : Routes = [
  {path: "**", component: PagenotfoundComponent}
]


@NgModule({
  imports: [
    PUBLIC_ROUTES,
    RouterModule.forRoot(DEFAULT_ROUTES)
  ],
  exports: [RouterModule]
})
export class AppRouter { }
