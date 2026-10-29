import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Bookings | Rideo',
  description: 'Review your Rideo rides, booking status and trip details.',
};

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
