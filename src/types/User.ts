export interface User {
  id: number;
  role: string;
  email: string;
  name: string;
  defaultStartAvailableTime?: string;
  defaultEndAvailableTime?: string;
  isWithdrawn?: boolean;
}
