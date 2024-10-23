export type TripStatus = 'idea' | 'planned' | 'booked' | 'visited'

export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  notes?: string;
  status: TripStatus;
}
