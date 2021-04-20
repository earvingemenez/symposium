import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIRouterModule } from '@uirouter/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ChannelsComponent } from './channels/channels.component';
import { ChannelComponent } from './channel/channel.component';



@NgModule({
  declarations: [ChannelsComponent, ChannelComponent],
  imports: [
    CommonModule,
    UIRouterModule,
    FontAwesomeModule
  ]
})
export class ChannelsModule { }
