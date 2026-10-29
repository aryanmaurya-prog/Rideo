import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { BikeCard } from '../components/bike-card';
import { fetchBikes } from '../lib/api';

export const metadata: Metadata = {
  title: 'Rent bikes by the hour | Rideo',
  description: 'Explore scooters, motorcycles and EVs and book your next ride with Rideo.',
};

const cities = [
  {
    name: 'Bangalore',
    count: 145,
    image:
      'https://images.unsplash.com/photo-1596796679119-7cf1a9e5448b?w=600&auto=format&fit=crop&q=60',
  },
  {
    name: 'Mumbai',
    count: 128,
    image:
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&h=400&fit=crop&q=80&auto=format',
  },
  {
    name: 'Goa',
    count: 98,
    image:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop&q=80&auto=format',
  },
  {
    name: 'Manali',
    count: 67,
    image:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&h=400&fit=crop&q=80&auto=format',
  },
  {
    name: 'Udaipur',
    count: 54,
    image:
      'https://images.unsplash.com/photo-1695956353120-54ce5e91632b?w=600&auto=format&fit=crop&q=60',
  },
  {
    name: 'Pune',
    count: 89,
    image:
      'https://images.unsplash.com/photo-1517462035531-76bc910a6903?w=600&auto=format&fit=crop&q=60',
  },
  {
    name: 'Rishikesh',
    count: 42,
    image:
      'https://images.unsplash.com/photo-1718383537411-6f9e727ae0bb?w=600&auto=format&fit=crop&q=60',
  },
  {
    name: 'Hyderabad',
    count: 76,
    image:
      'https://images.unsplash.com/photo-1741545979534-02f59c742730?w=600&auto=format&fit=crop&q=60',
  },
];

export default async function HomePage() {
  // Fetching from API instead of mock data
  const bikesData = await fetchBikes({ limit: 6 });
  const displayBikes = bikesData.data || [];

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" /> Your city, your pace
            </span>
            <h1>
              Bike rental, <span>simplified.</span>
            </h1>
            <p className="hero-copy">
              From Bengaluru traffic to Goa beaches — rent scooters, bikes, and EVs by the hour. No
              paperwork, no waiting.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/bikes?city=Bangalore">
                Find your ride <span aria-hidden="true">→</span>
              </Link>
              <a className="button button-secondary" href="#how-it-works">
                How it works
              </a>
            </div>
            <div className="trust-row" aria-label="Rideo at a glance">
              <div className="trust-item">
                <strong>8 cities</strong>
                <span>850+ bikes live</span>
              </div>
              <div className="trust-item">
                <strong>4.8★</strong>
                <span>12,847 rides</span>
              </div>
              <div className="trust-item">
                <strong>12 min</strong>
                <span>avg delivery</span>
              </div>
              <div className="trust-item">
                <strong>24/7</strong>
                <span>support</span>
              </div>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <Image
              src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop&q=80&auto=format"
              alt="Person riding a scooter through an Indian city street"
              fill
              priority
              className="hero-photo"
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <div className="hero-image-overlay" />
            <span className="hero-image-top-badge">⚡ 850+ bikes live</span>
            <span className="hero-image-badge">Your next detour is calling ✨</span>
          </div>
        </div>
      </section>

      <div className="container search-wrap">
        <form className="search-bar" action="/bikes">
          <div className="search-field">
            <label htmlFor="pickup-city">Where to?</label>
            <select id="pickup-city" name="city" defaultValue="Bangalore">
              {cities.map((city) => (
                <option key={city.name}>{city.name}</option>
              ))}
            </select>
          </div>
          <div className="search-field">
            <label htmlFor="pickup-date">Pick-up date</label>
            <input id="pickup-date" type="date" name="date" />
          </div>
          <div className="search-field">
            <label htmlFor="pickup-time">Pick-up time</label>
            <input id="pickup-time" type="time" name="time" defaultValue="10:00" />
          </div>
          <button className="button" type="submit">
            Search bikes <span aria-hidden="true">→</span>
          </button>
        </form>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Picked for the road</span>
              <h2>Find your kind of ride</h2>
              <p>Easy city scooters, weekend cruisers and everything in between.</p>
            </div>
            <Link className="text-link" href="/bikes">
              Explore all bikes →
            </Link>
          </div>
          <div className="bike-grid">
            {displayBikes.map((bike: any) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Go a little further</span>
              <h2>Pick your city</h2>
              <p>From city shortcuts to long weekend plans, start wherever you are.</p>
            </div>
            <Link className="text-link" href="/bikes">
              See all locations →
            </Link>
          </div>
          <div className="city-grid">
            {cities.map((city) => (
              <Link key={city.name} href={`/bikes?city=${city.name}`} className="city-card">
                <Image
                  src={city.image}
                  alt={`${city.name} city view`}
                  fill
                  className="city-photo"
                  sizes="(max-width: 620px) 100vw, (max-width: 900px) 50vw, 25vw"
                />
                <div className="city-overlay" />
                <div className="city-card-content">
                  <div>
                    <strong>{city.name}</strong>
                    <span className="city-bike-count">{city.count}+ bikes</span>
                  </div>
                  <span className="city-arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Four steps, then go</span>
              <h2>Your ride, made simple</h2>
              <p>No long queues. Just pick a ride and get moving.</p>
            </div>
          </div>
          <div className="steps-grid">
            <div className="info-card">
              <span className="step-number">01</span>
              <h3>Choose your city</h3>
              <p>Pick where you want to start and when you need your ride.</p>
            </div>
            <div className="info-card">
              <span className="step-number">02</span>
              <h3>Find your bike</h3>
              <p>Compare rides and choose the one that fits your plans.</p>
            </div>
            <div className="info-card">
              <span className="step-number">03</span>
              <h3>Confirm your trip</h3>
              <p>Review the details and follow the booking steps.</p>
            </div>
            <div className="info-card">
              <span className="step-number">04</span>
              <h3>Ride your way</h3>
              <p>Pick up your two-wheeler and enjoy the open road.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Why Rideo</span>
              <h2>More road. Less hassle.</h2>
            </div>
          </div>
          <div className="features-grid">
            <div className="info-card">
              <span className="info-icon">⚡</span>
              <h3>Quick to book</h3>
              <p>Book in under 60 seconds. UPI, cards, netbanking — all supported.</p>
            </div>
            <div className="info-card">
              <span className="info-icon">✓</span>
              <h3>Rides you can trust</h3>
              <p>Inspected weekly. All rides insured up to ₹5 lakhs.</p>
            </div>
            <div className="info-card">
              <span className="info-icon">🛵</span>
              <h3>Made for your city</h3>
              <p>8 cities, 50+ pickup hubs. Free helmet with every ride.</p>
            </div>
            <div className="info-card">
              <span className="info-icon">💬</span>
              <h3>Here to help</h3>
              <p>24/7 roadside assistance. Average response: 8 minutes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">A little rider love</span>
              <h2>Good rides, good stories</h2>
            </div>
          </div>
          <div className="review-grid">
            <div className="review-card">
              <p>
                "Booked an Activa for a day of errands. Picked up from Koramangala hub in 15
                minutes. Ride was smooth, price was fair."
              </p>
              <div className="review-person">
                <span className="avatar">RS</span>
                <div>
                  <strong>Rohit Sharma</strong>
                  <small>Bengaluru</small>
                </div>
              </div>
            </div>
            <div className="review-card">
              <p>
                "Took a Royal Enfield to Lonavala for the weekend. Delivered to my doorstep in
                Bandra. Bike was in perfect condition."
              </p>
              <div className="review-person">
                <span className="avatar">PM</span>
                <div>
                  <strong>Priya Menon</strong>
                  <small>Mumbai</small>
                </div>
              </div>
            </div>
            <div className="review-card">
              <p>
                "Ather 450X for a week of office commute. Saved ₹2,000 compared to daily cabs.
                Charging stations all over Hitech City."
              </p>
              <div className="review-person">
                <span className="avatar">AR</span>
                <div>
                  <strong>Arjun Reddy</strong>
                  <small>Hyderabad</small>
                </div>
              </div>
            </div>
            <div className="review-card">
              <p>
                "Rented an Activa for 3 days in North Goa. Beach hopping made easy. Team even helped
                with route suggestions."
              </p>
              <div className="review-person">
                <span className="avatar">SP</span>
                <div>
                  <strong>Sneha Patel</strong>
                  <small>Goa</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <div className="cta-panel">
            <div>
              <h2>Want to get moving?</h2>
              <p>Browse the rides available in your city.</p>
            </div>
            <Link className="button" href="/bikes">
              Explore bikes →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
