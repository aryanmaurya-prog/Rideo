'use client';

import { useEffect, useState } from 'react';

type Bike = {
  id: string;
  name: string;
  category: string;
  city: string;
  hourlyRatePaise: number;
  status: string;
  registrationNumber: string;
};

export default function BikesPage() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    fetch('http://localhost:4000/api/bikes?limit=100', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch bikes');
        return res.json();
      })
      .then((data) => {
        setBikes(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load bikes. Token might be invalid.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '32px', color: 'white' }}>Loading bikes...</div>;
  if (error) return <div style={{ padding: '32px', color: 'red' }}>{error}</div>;

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="page-kicker">Fleet / Inventory</p>
          <h1>Bike fleet</h1>
          <p>Manage your fleet, locations and vehicle availability.</p>
        </div>
        <button className="admin-button admin-button-primary" type="button">
          ＋ Add bike
        </button>
      </div>

      <div className="filter-toolbar">
        <label>
          Search
          <input className="dark-input" type="search" placeholder="Search bikes..." />
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
          Category
          <select defaultValue="all">
            <option value="all">All categories</option>
            <option>Scooter</option>
            <option>Sports</option>
            <option>Cruiser</option>
            <option>EV</option>
          </select>
        </label>
        <label>
          Status
          <select defaultValue="all">
            <option value="all">All statuses</option>
            <option>Available</option>
            <option>In use</option>
            <option>Reserved</option>
            <option>Maintenance</option>
          </select>
        </label>
      </div>

      <section className="admin-panel">
        <div className="panel-heading">
          <div>
            <h2>All bikes</h2>
            <p>Live database inventory · {bikes.length} bikes</p>
          </div>
          <button className="admin-button" type="button">
            Bulk actions⌄
          </button>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>
                  <input aria-label="Select all bikes" type="checkbox" />
                </th>
                <th>Bike</th>
                <th>Category</th>
                <th>City</th>
                <th>Rate</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bikes.map((bike) => (
                <tr key={bike.id}>
                  <td>
                    <input aria-label={`Select ${bike.name}`} type="checkbox" />
                  </td>
                  <td>
                    <span className="table-primary">{bike.name}</span>
                    <span className="table-muted">{bike.registrationNumber}</span>
                  </td>
                  <td>{bike.category}</td>
                  <td>{bike.city}</td>
                  <td>₹{bike.hourlyRatePaise / 100}/hr</td>
                  <td>
                    <span
                      className={`status-pill ${bike.status === 'MAINTENANCE' ? 'cancelled' : bike.status === 'RESERVED' ? 'pending' : ''}`}
                    >
                      {bike.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="table-action"
                      type="button"
                      aria-label={`More actions for ${bike.name}`}
                    >
                      •••
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
