import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/angular';

import { ChannelService } from '../../../commons/services/channels/channel.service';
import { Channel } from '../../../commons/models/channels.model';


@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styles: [
  ]
})
export class ChannelsComponent implements OnInit {
  channels = [] as Channel[];

  constructor(
    private state: StateService,
    private chan: ChannelService
  ) { }

  ngOnInit(): void {
    this.chan.getChannels()
      .then((resp: any) => {
        this.channels = resp as Channel[];
      })
    ;
  }

}
