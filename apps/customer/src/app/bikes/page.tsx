'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { BikeCard } from '../../components/bike-card';
import { useSearchParams } from 'next/navigation';

type Bike = {
  id: string;
  name: string;
  category: string;
  city: string;
  hourlyRatePaise: number;
  status: string;
  imageUrl: string;
  rating: number;
  totalRides: number;
  registrationNumber: string;
  description: string;
};

function BikesListContent() {
  const searchParams = useSearchParams();
  const city = searchParams.get('city') || '';
  const category = searchParams.get('category') || '';
  const query = searchParams.get('q') || '';
  const sort = searchParams.get('sort') || 'recommended';

  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (category) params.set('category', category);
    if (query) params.set('q', query);
    if (sort !== 'recommended') params.set('sort', sort);
    params.set('limit', '50'); // Fetch more for frontend filtering

    fetch(`http://localhost:4000/api/bikes?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setBikes(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [city, category, query, sort]);

  return (
    <main className="container">
      <section className="page-hero">
        <span className="eyebrow">The open road is yours</span>
        <h1>Find a ride for today.</h1>
        <p>Pick a city, find a two-wheeler that fits your plans and take the scenic route.</p>
      </section>

      <div className="catalog-layout">
        {/* Filters */}
        <form className="filter-panel" action="/bikes">
          <h2>Find your ride</h2>
          <div className="filter-group">
            <label htmlFor="bike-search">Search bikes</label>
            <input
              id="bike-search"
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Try Activa or cruiser"
            />
          </div>
          <div className="filter-group">
            <label htmlFor="bike-city">Pickup city</label>
            <select id="bike-city" name="city" defaultValue={city}>
              <option value="">All cities</option>
              {[
                'Bangalore',
                'Mumbai',
                'Goa',
                'Manali',
                'Udaipur',
                'Pune',
                'Rishikesh',
                'Hyderabad',
              ].map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <fieldset className="filter-group" style={{ border: 0, padding: 0 }}>
            <legend>Bike type</legend>
            {['Scooter', 'Sports', 'Cruiser', 'EV'].map((cat) => (
              <label key={cat}>
                <input
                  type="checkbox"
                  name="category"
                  value={cat}
                  defaultChecked={category === cat}
                />
                {cat}
              </label>
            ))}
          </fieldset>
          <div className="filter-group">
            <label htmlFor="bike-sort">Sort by</label>
            <select id="bike-sort" name="sort" defaultValue={sort}>
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </div>
          <div className="filter-group">
            <button className="button" type="submit">
              Apply filters
            </button>
            <Link className="text-link" href="/bikes">
              Clear filters
            </Link>
          </div>
        </form>

        {/* Results */}
        <section>
          <div className="catalog-toolbar">
            <strong>{bikes.length} rides to explore</strong>
          </div>

          {loading ? (
            <div className="content-panel empty-state">Loading bikes...</div>
          ) : bikes.length > 0 ? (
            <div className="bike-grid">
              {bikes.map((bike) => (
                <BikeCard bike={bike} key={bike.id} />
              ))}
            </div>
          ) : (
            <div className="content-panel empty-state">
              <h2>No rides match just yet</h2>
              <p>Try another city or clear a filter to see more bikes.</p>
              <Link className="button" href="/bikes">
                Show all bikes
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default function BikesPage() {
  return (
    <Suspense fallback={<main className="container"><div className="content-panel empty-state">Loading bikes...</div></main>}>
      <BikesListContent />
    </Suspense>
  );
}
