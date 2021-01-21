import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/angular';

import { ChannelService } from '../../../commons/services/channels/channel.service';
import { Channel } from '../../../commons/models/channels.model';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styles: [
  ]
})
export class ChannelComponent implements OnInit {
  channel = {} as Channel;

  constructor(
    private state: StateService,
    private chan: ChannelService
  ) {}

  ngOnInit(): void {
    this.chan.getChannel(this.state.params.id)
      .then((resp: any) => {
        this.channel = resp as Channel;
      })
    ;
  }

}
