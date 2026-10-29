import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../components/site-shell';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rideo — Ride karo, chill karo',
  description: 'Find and book two-wheelers for your everyday rides and Indian getaways.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
