import { HeaderContent } from '../../commons/utils/layouts.util';
import { LoginRequired } from '../../commons/utils/security.util';

import { ChannelsComponent } from './channels/channels.component';
import { ChannelComponent } from './channel/channel.component';

export const CHANNELS_ROUTES: Object[] = [
  {
    name: 'channels',
    url: '/channels',
    views: HeaderContent(ChannelsComponent),
    onEnter: LoginRequired
  },
  {
    name: 'channel',
    url: '/channels/:id',
    views: HeaderContent(ChannelComponent),
    onEnter: LoginRequired
  }
]
;