'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatRupees, type Bike } from '../../../components/bike-data';

type BikeDetails = Bike & {
  status: string;
  fuelType: string;
  transmission: string;
};

export default function BikeDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [bike, setBike] = useState<BikeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:4000/api/bikes/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Bike not found');
        return res.json();
      })
      .then((data) => {
        setBike(data as BikeDetails);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [params.id]);

  if (loading)
    return (
      <div className="container" style={{ padding: '80px 0' }}>
        Loading bike details...
      </div>
    );
  if (error || !bike)
    return (
      <div className="container" style={{ padding: '80px 0', color: 'red' }}>
        {error || 'Bike not found'}
      </div>
    );

  return (
    <main className="container">
      <section className="page-hero">
        <Link className="text-link" href="/bikes">
          ← All rides
        </Link>
        <h1>{bike.name}</h1>
        <p>
          {bike.category} · {bike.city} · <span className="rating">★ {bike.rating}</span>{' '}
          <span className="muted">({bike.totalRides} rides)</span>
        </p>
      </section>

      <div className="detail-grid">
        <div>
          <div
            className="detail-image"
            style={{ position: 'relative', overflow: 'hidden', padding: 0 }}
          >
            <Image src={bike.imageUrl} alt={bike.name} fill className="bike-photo" />
          </div>
          <section className="content-panel" style={{ marginTop: 18 }}>
            <h2>About this ride</h2>
            <p className="muted">{bike.description}</p>
            <div className="spec-grid">
              <div className="spec-item">
                <small>Type</small>
                <strong>{bike.category}</strong>
              </div>
              <div className="spec-item">
                <small>Pickup city</small>
                <strong>{bike.city}</strong>
              </div>
              <div className="spec-item">
                <small>Rental</small>
                <strong>Hourly</strong>
              </div>
              <div className="spec-item">
                <small>Fuel</small>
                <strong>{bike.fuelType}</strong>
              </div>
              <div className="spec-item">
                <small>Transmission</small>
                <strong>{bike.transmission}</strong>
              </div>
              <div className="spec-item">
                <small>Reg. No</small>
                <strong>{bike.registrationNumber}</strong>
              </div>
            </div>
          </section>
        </div>

        <aside className="content-panel booking-card">
          <p className="booking-price">
            {formatRupees(bike.hourlyRatePaise)} <small>/ hour</small>
          </p>
          <p className="muted">Choose your pickup and return time in the booking form.</p>
          <div className="form-stack" style={{ marginTop: 20 }}>
            <button
              className="button"
              onClick={() => router.push(`/booking/${bike.id}`)}
              disabled={bike.status !== 'AVAILABLE'}
            >
              {bike.status !== 'AVAILABLE' ? 'Not Available' : 'Book Now'}
            </button>
            <Link className="button button-secondary" href="/bikes">
              Browse other rides
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
