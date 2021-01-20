import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelsComponent } from './channels/channels.component';
import { ChannelComponent } from './channel/channel.component';



@NgModule({
  declarations: [ChannelsComponent, ChannelComponent],
  imports: [
    CommonModule
  ]
})
export class ChannelsModule { }
