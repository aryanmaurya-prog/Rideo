import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in | Rideo',
  description: 'Sign in to manage your Rideo bookings.',
};

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
