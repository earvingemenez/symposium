import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRouter } from './app.route';
import { AppComponent } from './app.component';

import { TokenService } from './commons/services/users/interceptors/token.service';

import { PublicModule } from './components/public/public.module';
import { GlobalsModule } from './components/globals/globals.module';
import { UsersModule } from './components/users/users.module';
import { ChannelsModule } from './components/channels/channels.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouter,
    PublicModule,
    GlobalsModule,
    UsersModule,
    ChannelsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
