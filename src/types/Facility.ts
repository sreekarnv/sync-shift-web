export interface Facility {
  id: number;
  name: string;
  type: string;
  location: string;
  isAvailable: boolean;
  availableStartTime: string;
  availableEndTime: string;
}
