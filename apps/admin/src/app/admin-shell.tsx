'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navigation = [
  { label: 'Dashboard', href: '/', icon: '▦' },
  { label: 'Analytics', href: '/analytics', icon: '⌁' },
  { label: 'Heatmap', href: '/heatmap', icon: '⌖' },
  { label: 'Forecast', href: '/forecast', icon: '↗' },
  { label: 'Reports', href: '/reports', icon: '▤' },
  { label: 'Bikes', href: '/bikes', icon: '◉' },
  { label: 'Bookings', href: '/bookings', icon: '▣' },
  { label: 'Users', href: '/users', icon: '♙' },
  { label: 'Settings', href: '/settings', icon: '⚙' },
];

export function AdminShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const [light, setLight] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('rideo-admin-theme');
    setLight(savedTheme === 'light');
  }, []);

  function toggleTheme() {
    const nextLight = !light;
    window.localStorage.setItem('rideo-admin-theme', nextLight ? 'light' : 'dark');
    setLight(nextLight);
  }

  return (
    <div className={`admin-layout${light ? ' light' : ''}${isLoginPage ? ' auth-layout' : ''}`}>
      {!isLoginPage && (
        <aside className="admin-sidebar">
          <Link className="admin-brand" href="/">
            <span className="admin-mark" aria-hidden="true">R</span>
            <span>rideo<small>Operations</small></span>
          </Link>
          <div className="nav-caption">Workspace</div>
          <nav className="admin-nav" aria-label="Admin navigation">
            {navigation.map(({ label, href, icon }) => {
              const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link className={active ? 'active' : ''} href={href} key={href} aria-current={active ? 'page' : undefined}>
                  <span className="nav-icon" aria-hidden="true">{icon}</span>{label}
                </Link>
              );
            })}
          </nav>
          <div className="sidebar-spacer" />
          <div className="sidebar-foot">
            <strong>Rideo Mobility</strong>
            <p>Fleet operations and rider insights, all in one place.</p>
          </div>
        </aside>
      )}
      <div className="admin-main">
        {!isLoginPage && (
          <header className="admin-topbar">
            <label className="topbar-search">
              <span aria-hidden="true">⌕</span>
              <span className="sr-only">Search dashboard</span>
              <input type="search" placeholder="Search bikes, bookings, users..." />
              <kbd>⌘ K</kbd>
            </label>
            <div className="topbar-actions">
              <button className="theme-toggle-admin" type="button" onClick={toggleTheme} aria-label={`Switch to ${light ? 'dark' : 'light'} mode`} title={`Switch to ${light ? 'dark' : 'light'} mode`}>
                {light ? '☾' : '☼'}
              </button>
              <span aria-label="Notifications">♧</span>
              <span className="admin-avatar" aria-label="Admin profile">A</span>
            </div>
          </header>
        )}
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
