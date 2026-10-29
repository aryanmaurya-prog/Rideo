import type { Metadata } from 'next';
import { AdminShell } from './admin-shell';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rideo Ops — Fleet intelligence',
  description: 'Rideo fleet operations and business analytics',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
