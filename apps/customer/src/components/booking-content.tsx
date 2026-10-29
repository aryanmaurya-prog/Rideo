'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { formatRupees, type Bike } from './bike-data';
import { API_URL } from '../lib/api';

type BookingContentProps = {
  bikeId: string;
};

type BookingBike = Bike & {
  status: string;
};

function toDateTimeLocal(date: Date) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return localDate.toISOString().slice(0, 16);
}

function getEarliestStart(now: number) {
  const earliestStart = new Date(now);
  earliestStart.setMinutes(earliestStart.getMinutes() + 1, 0, 0);
  return toDateTimeLocal(earliestStart);
}

export function BookingContent({ bikeId }: BookingContentProps) {
  const router = useRouter();
  const [bike, setBike] = useState<BookingBike | null>(null);
  const [loadingBike, setLoadingBike] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [createdBookingId, setCreatedBookingId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const [startsAt, setStartsAt] = useState('');
  const [endsAt, setEndsAt] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [drivingLicense, setDrivingLicense] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const earliestStart = useMemo(() => getEarliestStart(currentTime), [currentTime]);

  useEffect(() => {
    const interval = window.setInterval(() => setCurrentTime(Date.now()), 30_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let active = true;
    fetch(`${API_URL}/bikes/${bikeId}`)
      .then(async (response) => {
        if (!response.ok) throw new Error('Unable to load this bike.');
        return (await response.json()) as BookingBike;
      })
      .then((data) => {
        if (active) setBike(data);
      })
      .catch((requestError: unknown) => {
        if (active) setError(requestError instanceof Error ? requestError.message : 'Unable to load this bike.');
      })
      .finally(() => {
        if (active) setLoadingBike(false);
      });

    return () => {
      active = false;
    };
  }, [bikeId]);

  const durationHours = useMemo(() => {
    if (!startsAt || !endsAt) return 0;
    const duration = new Date(endsAt).getTime() - new Date(startsAt).getTime();
    return duration > 0 ? Math.ceil(duration / (60 * 60 * 1000)) : 0;
  }, [startsAt, endsAt]);
  const totalPaise = durationHours * (bike?.hourlyRatePaise ?? 0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const start = new Date(startsAt);
    const end = new Date(endsAt);
    if (!startsAt || Number.isNaN(start.getTime()) || start.getTime() <= Date.now()) {
      setError('Choose a start date and time in the future.');
      return;
    }
    if (!endsAt || Number.isNaN(end.getTime()) || end <= start) {
      setError('Return date and time must be after pickup.');
      return;
    }
    if (!agreedToTerms) {
      setError('Please agree to the bike damage responsibility terms to continue.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      router.push(`/auth?next=${encodeURIComponent(`/booking/${bikeId}`)}`);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bikeId,
          startsAt: start.toISOString(),
          endsAt: end.toISOString(),
          pickupAddress: pickupAddress.trim(),
          aadhaarNumber: aadhaarNumber.replace(/\s/g, ''),
          drivingLicense: drivingLicense.trim(),
          agreedToTerms,
          paymentMethod: 'PAY_ON_PICKUP',
        }),
      });

      const data = (await response.json()) as { id?: string; message?: string | string[] };
      if (!response.ok) {
        throw new Error(Array.isArray(data.message) ? data.message.join(', ') : data.message || 'Booking could not be completed.');
      }
      if (!data.id) throw new Error('Booking was created without a booking reference.');

      setCreatedBookingId(data.id);
    } catch (submitError: unknown) {
      setError(submitError instanceof Error ? submitError.message : 'Booking could not be completed.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingBike) {
    return <main className="container booking-page-state">Loading bike details...</main>;
  }
  if (!bike) {
    return (
      <main className="container booking-page-state">
        <p className="notice" role="alert">{error || 'Bike not found.'}</p>
        <Link className="text-link" href="/bikes">Browse bikes</Link>
      </main>
    );
  }

  return (
    <main className="container">
      <section className="page-hero">
        <span className="eyebrow">Make it official</span>
        <h1>Book your ride.</h1>
        <p>Enter your trip details and review the total before confirming.</p>
      </section>
      <div className="booking-grid">
        <section className="content-panel">
          <h2>Booking details</h2>
          <p className="muted">All fields are required to request your booking.</p>
          {error && <p className="notice" role="alert">{error}</p>}
          <form className="form-stack booking-form" onSubmit={handleSubmit}>
            <div className="booking-date-grid">
              <label htmlFor="startsAt">Start date &amp; time
                <input
                  id="startsAt"
                  type="datetime-local"
                  min={earliestStart}
                  required
                  value={startsAt}
                  onChange={(event) => setStartsAt(event.target.value)}
                />
              </label>
              <label htmlFor="endsAt">End date &amp; time
                <input
                  id="endsAt"
                  type="datetime-local"
                  min={startsAt || earliestStart}
                  required
                  value={endsAt}
                  onChange={(event) => setEndsAt(event.target.value)}
                />
              </label>
            </div>
            <label htmlFor="pickupAddress">Pickup address
              <textarea
                id="pickupAddress"
                autoComplete="street-address"
                minLength={5}
                maxLength={300}
                required
                value={pickupAddress}
                onChange={(event) => setPickupAddress(event.target.value)}
                placeholder={`Where should we hand over your bike in ${bike.city}?`}
              />
            </label>
            <label htmlFor="aadhaarNumber">Aadhaar number
              <input
                id="aadhaarNumber"
                inputMode="numeric"
                autoComplete="off"
                pattern="[0-9 ]{12,14}"
                minLength={12}
                maxLength={14}
                required
                value={aadhaarNumber}
                onChange={(event) => setAadhaarNumber(event.target.value)}
                placeholder="12-digit Aadhaar number"
              />
            </label>
            <label htmlFor="drivingLicense">Driving license number
              <input
                id="drivingLicense"
                autoComplete="off"
                minLength={5}
                maxLength={30}
                required
                value={drivingLicense}
                onChange={(event) => setDrivingLicense(event.target.value)}
                placeholder="Enter your driving license number"
              />
            </label>
            <label className="terms-checkbox" htmlFor="agreedToTerms">
              <input
                id="agreedToTerms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(event) => setAgreedToTerms(event.target.checked)}
              />
              <span>I agree that I am responsible for any damages to the bike.</span>
            </label>
            <div className="booking-price-summary" aria-live="polite">
              <span>{durationHours ? `${durationHours} rental hour${durationHours === 1 ? '' : 's'}` : 'Select your trip dates'}</span>
              <strong>{formatRupees(totalPaise)}</strong>
              <small>Payment is due at pickup. Final hours are rounded up.</small>
            </div>
            {bike.status !== 'AVAILABLE' && (
              <p className="notice" role="status">This bike is currently unavailable for booking.</p>
            )}
            <button className="button" type="submit" disabled={submitting || bike.status !== 'AVAILABLE'}>
              {submitting
                ? 'Creating booking...'
                : bike.status !== 'AVAILABLE'
                  ? 'Bike unavailable'
                  : `Request booking · ${formatRupees(totalPaise)}`}
            </button>
          </form>
        </section>
        <aside className="content-panel booking-card">
          <h2>Your ride</h2>
          <div className="booking-bike-image">
            <Image
              src={bike.imageUrl}
              alt={bike.name}
              fill
              className="bike-photo"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <h3>{bike.name}</h3>
          <p className="muted">{bike.category} · {bike.city}</p>
          <div className="bike-price-row">
            <div><strong>{formatRupees(bike.hourlyRatePaise)}</strong><small> / hour</small></div>
          </div>
          <Link className="text-link" href={`/bikes/${bike.id}`}>View bike details →</Link>
        </aside>
      </div>
      {createdBookingId && (
        <div className="booking-success-backdrop" role="presentation">
          <section
            className="booking-success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-success-title"
            aria-describedby="booking-success-description"
          >
            <span className="booking-success-mark" aria-hidden="true">✓</span>
            <h2 id="booking-success-title">Booking request created!</h2>
            <p id="booking-success-description">Your request is pending availability confirmation. Review your trip details and pickup QR code.</p>
            <Link className="button booking-success-action" href={`/bookings/${createdBookingId}`}>
              View Booking Details
            </Link>
          </section>
        </div>
      )}
    </main>
  );
}
