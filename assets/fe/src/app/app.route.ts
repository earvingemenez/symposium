import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { fromEventPattern } from 'rxjs';
import { PagenotfoundComponent } from './components/public/pagenotfound/pagenotfound.component';

import { GLOBALS_ROUTES } from './components/globals/globals.route';
import { PUBLIC_ROUTES } from './components/public/public.route';
import { CHANNELS_ROUTES } from './components/channels/channels.route';
import { USERS_ROUTES } from './components/users/users.route';

const DEFAULT_ROUTES : Routes = [
  {path: "**", component: PagenotfoundComponent}
]


@NgModule({
  imports: [
    GLOBALS_ROUTES,
    PUBLIC_ROUTES,
    USERS_ROUTES,
    CHANNELS_ROUTES,
    RouterModule.forRoot(DEFAULT_ROUTES)
  ],
  exports: [RouterModule]
})
export class AppRouter { }
