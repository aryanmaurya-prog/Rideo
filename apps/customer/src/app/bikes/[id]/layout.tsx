import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bike details | Rideo',
  description: 'Vehicle details and booking information for your next Rideo trip.',
};

export default function BikeDetailLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
