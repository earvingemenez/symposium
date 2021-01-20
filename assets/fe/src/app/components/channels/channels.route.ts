import { Routes, RouterModule } from '@angular/router';
import { LoginRequiredService as LoginRequired } from '../../commons/services/users/interceptors/required.service';

import { ChannelsComponent } from './channels/channels.component';
import { ChannelComponent } from './channel/channel.component';


const routes: Routes = [
  {
    path: 'channels',
    component: ChannelsComponent,
    canActivate: [LoginRequired],
    
  },
  {
    path: 'channels/:id',
    component: ChannelComponent,
    canActivate: [LoginRequired]
  }
]

export const CHANNELS_ROUTES = RouterModule.forChild(routes);