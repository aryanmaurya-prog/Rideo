'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { API_URL } from '../lib/api';
import { AUTH_STATE_EVENT, notifyAuthStateChanged } from '../lib/auth';
import { ThemeToggle } from './theme-toggle';

const cities = ['Bangalore', 'Mumbai', 'Goa', 'Manali', 'Udaipur', 'Pune', 'Rishikesh', 'Hyderabad'];

type UserProfile = {
  displayName: string;
  avatarUrl?: string | null;
};

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let active = true;

    async function syncAuthState() {
      const token = localStorage.getItem('token');
      setIsAuthenticated(Boolean(token));

      if (!token) {
        setProfile(null);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
          localStorage.removeItem('token');
          if (active) {
            setIsAuthenticated(false);
            setProfile(null);
          }
          return;
        }
        if (!response.ok) throw new Error('Unable to load account details');

        const user = (await response.json()) as UserProfile;
        if (active) setProfile(user);
      } catch (error) {
        if (active) {
          setProfile(null);
          console.error('Unable to refresh the signed-in user profile', error);
        }
      }
    }

    void syncAuthState();
    window.addEventListener(AUTH_STATE_EVENT, syncAuthState);
    window.addEventListener('storage', syncAuthState);

    return () => {
      active = false;
      window.removeEventListener(AUTH_STATE_EVENT, syncAuthState);
      window.removeEventListener('storage', syncAuthState);
    };
  }, [pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  function handleLogout() {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setProfile(null);
    notifyAuthStateChanged();
    router.push('/');
  }

  const initials = profile?.displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('') || 'A';

  return (
    <header className="site-header">
      <div className="container nav">
        <Link className="brand" href="/" aria-label="Rideo home">
          <span className="brand-mark" aria-hidden="true">↗</span>
          rideo
        </Link>
        <button
          className="nav-menu-toggle"
          type="button"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{mobileMenuOpen ? '×' : '☰'}</span>
        </button>
        <nav
          className={`nav-links${mobileMenuOpen ? ' mobile-open' : ''}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          <Link href="/">Home</Link>
          <Link href="/bikes">Explore bikes</Link>
          <a href="/#how-it-works">How it works</a>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <label className="sr-only" htmlFor="city-select">Choose your city</label>
          <select className="city-select" id="city-select" defaultValue="Bangalore">
            {cities.map((city) => <option key={city}>{city}</option>)}
          </select>
          {isAuthenticated ? (
            <details className="profile-menu">
              <summary className="account-nav-link" aria-label="Open profile menu">
                <span className="account-avatar" aria-hidden="true">{initials}</span>
                <span>{profile?.displayName || 'My account'}</span>
                <span className="profile-menu-chevron" aria-hidden="true">⌄</span>
              </summary>
              <div className="profile-menu-dropdown">
                <Link href="/dashboard">My Bookings</Link>
                <Link href="/account">Settings</Link>
                <button type="button" onClick={handleLogout}>Logout</button>
              </div>
            </details>
          ) : (
            <Link className="button button-secondary" href="/auth">Sign in</Link>
          )}
          <Link className="button" href="/bikes">Book a ride</Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="brand" href="/" aria-label="Rideo home">
              <span className="brand-mark" aria-hidden="true">↗</span>
              <span style={{ color: 'white' }}>rideo</span>
            </Link>
            <p>Good rides, great detours. Find a two-wheeler and make your own way around town.</p>
          </div>
          <div>
            <div className="footer-title">Explore</div>
            <div className="footer-links">
              <Link href="/bikes">Browse bikes</Link>
              <a href="/#how-it-works">How it works</a>
              <Link href="/dashboard">My rides</Link>
            </div>
          </div>
          <div>
            <div className="footer-title">Popular cities</div>
            <div className="footer-links">
              <Link href="/bikes?city=Bangalore">Bangalore</Link>
              <Link href="/bikes?city=Mumbai">Mumbai</Link>
              <Link href="/bikes?city=Goa">Goa</Link>
            </div>
          </div>
          <div>
            <div className="footer-title">Rideo</div>
            <div className="footer-links">
              <Link href="/about">About us</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/auth">Get support</Link>
              <Link href="/account">Your account</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Rideo Mobility. Ride karo, chill karo.</span>
          <span className="footer-legal"><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link></span>
        </div>
      </div>
    </footer>
  );
}
