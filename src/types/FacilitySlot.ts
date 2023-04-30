import { Facility } from './Facility';
import { User } from './User';

export interface FacilitySlot {
  id: number;
  user: User;
  facility: Facility;
  startTimeStamp: string;
  endTimeStamp: string;
}
