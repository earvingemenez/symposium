import { User } from './users.model';


export interface Member {
  id: number;
  user: User;
  channel: number;
  date_joined: string;
}

export interface Channel {
  id: number;
  host: User;
  name: string;
  date_created: string;
  members: Member[];
}
