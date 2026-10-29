import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a ride | Rideo',
  description: 'Choose your ride times and plan your Rideo booking.',
};

export default function BookingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
