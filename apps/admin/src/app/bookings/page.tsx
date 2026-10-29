'use client';

import { useEffect, useState } from 'react';

type Booking = {
  id: string;
  user: { displayName: string; phone: string };
  bike: { name: string; city: string };
  startsAt: string;
  endsAt: string;
  totalPaise: number;
  status: string;
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    fetch('http://localhost:4000/api/bookings', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch bookings');
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load bookings. Token might be invalid.');
        setLoading(false);
      });
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await fetch(`http://localhost:4000/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) return <div style={{ padding: '32px', color: 'white' }}>Loading bookings...</div>;
  if (error) return <div style={{ padding: '32px', color: 'red' }}>{error}</div>;

  const totalBookings = bookings.length;
  const activeNow = bookings.filter((b) => b.status === 'ACTIVE').length;
  const pendingConfirm = bookings.filter((b) => b.status === 'PENDING').length;

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="page-kicker">Operations / Reservations</p>
          <h1>Bookings</h1>
          <p>Track rides, manage reservations and help riders get moving.</p>
        </div>
        <button className="admin-button" type="button">
          ↓ Export bookings
        </button>
      </div>

      <section className="kpi-grid">
        <article className="kpi-card">
          <div className="kpi-top">All bookings</div>
          <p className="kpi-value">{totalBookings}</p>
          <div className="kpi-foot">Live database snapshot</div>
        </article>
        <article className="kpi-card">
          <div className="kpi-top">Active now</div>
          <p className="kpi-value">{activeNow}</p>
          <div className="kpi-foot">Rides currently ongoing</div>
        </article>
        <article className="kpi-card">
          <div className="kpi-top">Awaiting confirmation</div>
          <p className="kpi-value">{pendingConfirm}</p>
          <div className="kpi-foot">Pending approval</div>
        </article>
      </section>

      <div className="filter-toolbar">
        <label>
          Status
          <select defaultValue="all">
            <option value="all">All statuses</option>
            <option>PENDING</option>
            <option>CONFIRMED</option>
            <option>ACTIVE</option>
            <option>COMPLETED</option>
            <option>CANCELLED</option>
          </select>
        </label>
        <label>
          City
          <select defaultValue="all">
            <option value="all">All cities</option>
            <option>Bangalore</option>
            <option>Mumbai</option>
            <option>Goa</option>
          </select>
        </label>
        <label>
          From
          <input className="dark-input" type="date" />
        </label>
        <label>
          To
          <input className="dark-input" type="date" />
        </label>
      </div>

      <section className="admin-panel">
        <div className="panel-heading">
          <div>
            <h2>Latest bookings</h2>
            <p>Recent activity across your cities</p>
          </div>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Rider</th>
                <th>Bike</th>
                <th>City</th>
                <th>Ride window</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                    No bookings found in the database yet.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => {
                  const start = new Date(b.startsAt).toLocaleString('en-IN', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  });
                  const end = new Date(b.endsAt).toLocaleString('en-IN', {
                    timeStyle: 'short',
                  });

                  return (
                    <tr key={b.id}>
                      <td className="table-primary">{b.id.slice(-6).toUpperCase()}</td>
                      <td>{b.user.displayName}</td>
                      <td>{b.bike.name}</td>
                      <td>{b.bike.city}</td>
                      <td>
                        {start} – {end}
                      </td>
                      <td>₹{b.totalPaise / 100}</td>
                      <td>
                        <span className={`status-pill ${b.status.toLowerCase()}`}>{b.status}</span>
                      </td>
                      <td>
                        {b.status === 'PENDING' ? (
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => handleStatusChange(b.id, 'CONFIRMED')}
                              style={{
                                padding: '4px 8px',
                                fontSize: '12px',
                                backgroundColor: '#22c55e',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                              }}
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleStatusChange(b.id, 'CANCELLED')}
                              style={{
                                padding: '4px 8px',
                                fontSize: '12px',
                                backgroundColor: '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button className="table-action" type="button">
                            •••
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
