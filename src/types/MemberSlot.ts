import { User } from './User';

export interface MemberSlot {
  id: number;
  requested: User;
  accepted: User;
  startTimeStamp: string;
  endTimeStamp: string;
}
