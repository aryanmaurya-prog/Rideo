'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatRupees } from '../../components/bike-data';
import { API_URL } from '../../lib/api';

type DashboardBooking = {
  id: string;
  startsAt: string;
  totalPaise: number;
  status: string;
  bike: {
    imageUrl: string;
    name: string;
    city: string;
  };
};

export default function DashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<DashboardBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth');
      return;
    }

    fetch(`${API_URL}/bookings/my`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [router]);

  if (loading)
    return (
      <div className="container" style={{ padding: '60px 0' }}>
        Loading your bookings...
      </div>
    );
  if (error)
    return (
      <div className="container" style={{ padding: '60px 0', color: 'red' }}>
        {error}
      </div>
    );

  return (
    <main className="container" style={{ padding: '60px 0', minHeight: '60vh' }}>
      <div className="section-heading" style={{ marginBottom: '32px' }}>
        <div>
          <span className="eyebrow">My Account</span>
          <h1>My Bookings</h1>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="content-panel empty-state">
          <h2>No bookings yet</h2>
          <p>You haven't booked any rides. Explore our fleet to get started.</p>
          <Link className="button" href="/bikes" style={{ marginTop: '16px' }}>
            Explore bikes
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {bookings.map((b) => (
            <Link
              key={b.id}
              className="content-panel dashboard-booking-card"
              href={`/bookings/${b.id}`}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div className="dashboard-booking-summary">
                <img
                  src={b.bike.imageUrl}
                  alt={b.bike.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                  }}
                />
                <div>
                  <h3 style={{ margin: 0 }}>{b.bike.name}</h3>
                  <p className="muted" style={{ margin: '4px 0' }}>
                    {b.bike.city} · {new Date(b.startsAt).toLocaleDateString()}
                  </p>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>
                    Total: {formatRupees(b.totalPaise)}
                  </p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className={`status-pill ${b.status.toLowerCase()}`}>{b.status}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
