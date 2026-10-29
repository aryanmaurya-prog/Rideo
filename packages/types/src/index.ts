export type Id = string;

export type BookingStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'ACTIVE'
  | 'COMPLETED'
  | 'CANCELLED';

export type BikeStatus = 'AVAILABLE' | 'RESERVED' | 'IN_USE' | 'MAINTENANCE' | 'INACTIVE';

export interface BikeSummary {
  id: Id;
  name: string;
  category: string;
  city: string;
  hourlyRatePaise: number;
  status: BikeStatus;
}

export interface BookingSummary {
  id: Id;
  bikeId: Id;
  userId: Id;
  startsAt: string;
  endsAt: string;
  status: BookingStatus;
  totalPaise: number;
}

export interface KpiSnapshot {
  capturedAt: string;
  revenuePaise: number;
  activeRides: number;
  newUsers: number;
  availableBikes: number;
  utilizationRate: number;
  cancellationRate: number;
}
