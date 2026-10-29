import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="container">
      <section className="page-hero">
        <span className="eyebrow">We&apos;re here to help</span>
        <h1>Let&apos;s talk rides.</h1>
        <p>Questions about your plans? Sign in to reach support, or browse our rides while we get the contact centre ready.</p>
      </section>
      <div className="page-panel-grid" style={{ paddingBottom: 72 }}>
        <section className="content-panel">
          <h2>Rider support</h2>
          <p className="muted">Booking support and help requests will be handled through your Rideo account when support services are connected.</p>
          <Link className="button" href="/auth">Go to sign in</Link>
        </section>
        <section className="content-panel">
          <h2>Send us a message</h2>
          <p className="muted">The contact form is a preview; messages are not submitted yet.</p>
          <form className="form-stack">
            <label>Your name<input name="name" placeholder="Name" /></label>
            <label>Email address<input name="email" type="email" placeholder="you@example.com" /></label>
            <label>How can we help?<input name="message" placeholder="Tell us a little about it" /></label>
            <button className="button" type="button" disabled style={{ opacity: 0.58, cursor: 'not-allowed' }}>Send message · coming soon</button>
          </form>
        </section>
      </div>
    </main>
  );
}
