import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore bikes | Rideo',
  description: 'Find a two-wheeler for your next ride with Rideo.',
};

export default function BikesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
