import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute,
    private chan: ChannelService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.chan.getChannel(id)
      .then((resp: any) => {
        this.channel = resp as Channel;
      })
    ;
  }

}
