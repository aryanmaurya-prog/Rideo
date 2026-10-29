import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Booking details | Rideo',
  description: 'View your Rideo booking, trip details, pickup information and payment status.',
};

export default function BookingsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
