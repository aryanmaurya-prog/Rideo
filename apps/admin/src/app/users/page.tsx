'use client';

import { useEffect, useState } from 'react';

type User = {
  id: string;
  displayName: string;
  phone: string | null;
  email: string | null;
  city: string | null;
  role: string;
  totalRides: number;
  createdAt: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    fetch('http://localhost:4000/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load users. Token might be invalid.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '32px', color: 'white' }}>Loading users...</div>;
  if (error) return <div style={{ padding: '32px', color: 'red' }}>{error}</div>;

  // KPI Calculation
  const totalRiders = users.length;
  const activeRiders = users.filter((u) => u.role === 'RIDER').length;

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="page-kicker">People / Riders</p>
          <h1>Rider directory</h1>
          <p>Understand your rider community and find account details.</p>
        </div>
        <button className="admin-button" type="button">
          ↓ Export users
        </button>
      </div>

      <section className="kpi-grid">
        <article className="kpi-card">
          <div className="kpi-top">Total riders</div>
          <p className="kpi-value">{totalRiders}</p>
          <div className="kpi-foot">Registered users</div>
        </article>
        <article className="kpi-card">
          <div className="kpi-top">Active Riders (Role)</div>
          <p className="kpi-value">{activeRiders}</p>
          <div className="kpi-foot">Users with RIDER role</div>
        </article>
      </section>

      <div className="filter-toolbar">
        <label>
          Search riders
          <input className="dark-input" type="search" placeholder="Name or phone number" />
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
          Status
          <select defaultValue="all">
            <option value="all">All riders</option>
            <option>Active</option>
            <option>Review</option>
          </select>
        </label>
      </div>

      <section className="admin-panel">
        <div className="panel-heading">
          <div>
            <h2>Riders</h2>
            <p>Live database directory</p>
          </div>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>
                  <input aria-label="Select all riders" type="checkbox" />
                </th>
                <th>Rider</th>
                <th>Contact</th>
                <th>Home city</th>
                <th>Rides</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                    No users found in the database yet.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <input aria-label={`Select ${u.displayName}`} type="checkbox" />
                    </td>
                    <td>
                      <span className="avatar-dark">
                        {u.displayName ? u.displayName.substring(0, 2).toUpperCase() : 'NA'}
                      </span>
                      <span className="table-primary">{u.displayName || 'Unknown User'}</span>
                      <span className="table-muted">{u.email || 'No email'}</span>
                    </td>
                    <td>{u.phone || '-'}</td>
                    <td>{u.city || '-'}</td>
                    <td>{u.totalRides || 0}</td>
                    <td>
                      <span className={`status-pill ${u.role === 'ADMIN' ? 'pending' : ''}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>
                      <button className="table-action" type="button">
                        •••
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
