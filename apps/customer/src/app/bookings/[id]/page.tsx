'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formatRupees } from '../../../components/bike-data';
import { API_URL } from '../../../lib/api';

type BookingDetails = {
  id: string;
  startsAt: string;
  endsAt: string;
  pickupAddress: string | null;
  aadhaarNumber: string | null;
  drivingLicense: string | null;
  totalPaise: number;
  paymentStatus: string | null;
  status: string;
  bike: {
    name: string;
    imageUrl: string;
    city: string;
    category: string;
  };
};

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function BookingDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace(`/auth?next=${encodeURIComponent(`/bookings/${params.id}`)}`);
      return;
    }

    let active = true;
    fetch(`${API_URL}/bookings/${encodeURIComponent(params.id)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        const data = (await response.json()) as BookingDetails | { message?: string };
        if (!response.ok) {
          throw new Error('message' in data && data.message ? data.message : 'Unable to load this booking.');
        }
        return data as BookingDetails;
      })
      .then((data) => {
        if (active) setBooking(data);
      })
      .catch((requestError: unknown) => {
        if (active) setError(requestError instanceof Error ? requestError.message : 'Unable to load this booking.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [params.id, router]);

  if (loading) {
    return <main className="container booking-page-state">Loading booking details...</main>;
  }
  if (!booking) {
    return (
      <main className="container booking-page-state">
        <p className="notice" role="alert">{error || 'Booking not found.'}</p>
        <Link className="button" href="/dashboard">Go to My Bookings</Link>
      </main>
    );
  }

  return (
    <main className="container booking-details-page">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Booking reference · {booking.id}</span>
          <h1>Your booking</h1>
        </div>
        <span className={`status-pill ${booking.status.toLowerCase()}`}>{booking.status}</span>
      </div>
      <div className="booking-details-grid">
        <section className="content-panel booking-detail-bike">
          <div className="booking-details-image">
            <Image src={booking.bike.imageUrl} alt={booking.bike.name} fill sizes="(max-width: 700px) 100vw, 45vw" />
          </div>
          <h2>{booking.bike.name}</h2>
          <p className="muted">{booking.bike.category} · {booking.bike.city}</p>
          <div className="booking-detail-fields">
            <div><span>Start date &amp; time</span><strong>{formatDateTime(booking.startsAt)}</strong></div>
            <div><span>End date &amp; time</span><strong>{formatDateTime(booking.endsAt)}</strong></div>
            <div><span>Pickup address</span><strong>{booking.pickupAddress || 'Not provided'}</strong></div>
          </div>
        </section>
        <aside className="content-panel booking-payment-panel">
          <h2>Booking summary</h2>
          <div className="booking-summary-total">
            <span>Total amount</span>
            <strong>{formatRupees(booking.totalPaise)}</strong>
          </div>
          <div className="booking-detail-fields">
            <div><span>Payment status</span><strong>{booking.paymentStatus || 'PENDING'}</strong></div>
            <div><span>Payment method</span><strong className="pay-pickup-badge">Pay on Pickup</strong></div>
            <div><span>Aadhaar number</span><strong>{booking.aadhaarNumber || 'Not provided'}</strong></div>
            <div><span>Driving license number</span><strong>{booking.drivingLicense || 'Not provided'}</strong></div>
            <div><span>Booking status</span><strong>{booking.status}</strong></div>
          </div>
          <section className="booking-qr-section" aria-labelledby="booking-qr-heading">
            <h3 id="booking-qr-heading">Pickup QR code</h3>
            <p className="muted">Show this code to the team when you pick up your bike.</p>
            <img
              className="booking-qr-image"
              src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&format=svg&data=${encodeURIComponent(booking.id)}`}
              alt={`QR code for booking ${booking.id}`}
              referrerPolicy="no-referrer"
              loading="lazy"
              width={220}
              height={220}
            />
            <code>{booking.id}</code>
          </section>
          <Link className="button button-secondary booking-back-link" href="/dashboard">Back to My Bookings</Link>
        </aside>
      </div>
    </main>
  );
}
