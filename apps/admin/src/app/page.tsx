'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Token nahi hai toh login page pe bhej do
      window.location.href = '/login';
      return;
    }

    fetch('http://localhost:4000/api/admin/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load dashboard. Token might be invalid.');
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div
        style={{ padding: '40px', color: 'white', backgroundColor: '#0a0a0a', minHeight: '100vh' }}
      >
        Loading dashboard...
      </div>
    );
  if (error)
    return (
      <div
        style={{ padding: '40px', color: 'red', backgroundColor: '#0a0a0a', minHeight: '100vh' }}
      >
        {error}
      </div>
    );
  if (!data) return null;

  const { stats, recentBookings, bikesByCity } = data;

  return (
    <div
      style={{ padding: '32px', backgroundColor: '#0a0a0a', minHeight: '100vh', color: 'white' }}
    >
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>Dashboard</h1>
      <p style={{ color: '#888', marginBottom: '32px' }}>Live data from database</p>

      {/* KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div
          style={{
            backgroundColor: '#171717',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #262626',
          }}
        >
          <p style={{ color: '#888', fontSize: '14px' }}>Total Users</p>
          <h3 style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '8px' }}>
            {stats.totalUsers}
          </h3>
        </div>
        <div
          style={{
            backgroundColor: '#171717',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #262626',
          }}
        >
          <p style={{ color: '#888', fontSize: '14px' }}>Total Bikes</p>
          <h3 style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '8px' }}>
            {stats.totalBikes}
          </h3>
        </div>
        <div
          style={{
            backgroundColor: '#171717',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #262626',
          }}
        >
          <p style={{ color: '#888', fontSize: '14px' }}>Total Bookings</p>
          <h3 style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '8px' }}>
            {stats.totalBookings}
          </h3>
        </div>
        <div
          style={{
            backgroundColor: '#171717',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #262626',
          }}
        >
          <p style={{ color: '#888', fontSize: '14px' }}>Total Revenue</p>
          <h3 style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '8px', color: '#ff6b00' }}>
            ₹{(stats.totalRevenuePaise / 100).toLocaleString('en-IN')}
          </h3>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        {/* Recent Bookings */}
        <div
          style={{
            backgroundColor: '#171717',
            borderRadius: '12px',
            border: '1px solid #262626',
            padding: '24px',
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
            Recent Bookings
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentBookings.map((b: any) => (
              <div
                key={b.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #262626',
                  paddingBottom: '16px',
                }}
              >
                <div>
                  <p style={{ fontWeight: '500' }}>{b.user.displayName}</p>
                  <p style={{ color: '#888', fontSize: '14px' }}>{b.bike.name}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 'bold' }}>
                    ₹{(b.totalPaise / 100).toLocaleString('en-IN')}
                  </p>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: b.status === 'COMPLETED' ? '#22c55e' : '#eab308',
                    }}
                  >
                    {b.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bikes by City */}
        <div
          style={{
            backgroundColor: '#171717',
            borderRadius: '12px',
            border: '1px solid #262626',
            padding: '24px',
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
            Bikes by City
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {bikesByCity.map((c: any) => (
              <div key={c.city} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <p style={{ color: '#ccc', width: '100px' }}>{c.city}</p>
                <div
                  style={{
                    flex: 1,
                    height: '8px',
                    backgroundColor: '#262626',
                    borderRadius: '999px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      backgroundColor: '#ff6b00',
                      width: `${(c.count / stats.totalBikes) * 100}%`,
                    }}
                  />
                </div>
                <p style={{ fontWeight: 'bold' }}>{c.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
