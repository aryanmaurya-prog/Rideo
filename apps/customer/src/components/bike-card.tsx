import Link from 'next/link';
import Image from 'next/image';
import { formatRupees, type Bike } from './bike-data';

export function BikeCard({ bike }: { bike: Bike }) {
  return (
    <article className="bike-card">
      <div className="bike-image-wrapper">
        <Image
          src={bike.imageUrl}
          alt={`${bike.name} available for rent in ${bike.city}`}
          fill
          className="bike-photo"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="badge-verified">✓ Verified</span>
        <span className="badge-insured">🛡 Insured</span>
      </div>
      <div className="bike-card-body">
        <div className="bike-meta">
          <span className="category-tag">{bike.category}</span>
          <span>📍 {bike.city}</span>
        </div>
        <div className="bike-title-row">
          <h3>{bike.name}</h3>
          <span className="rating-with-count">★ {bike.rating}</span>
        </div>
        <p className="muted">{bike.description}</p>
        <p className="ride-count">{bike.totalRides} rides · {bike.registrationNumber}</p>
        <div className="bike-price-row">
          <div><strong>{formatRupees(bike.hourlyRatePaise)}</strong><small> / hour</small></div>
          <Link className="button button-small" href={`/bikes/${bike.id}`}>View ride</Link>
        </div>
      </div>
    </article>
  );
}
