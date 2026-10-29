import { InfoPage } from '../../components/info-page';

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Rideo policies · booking terms"
      title="Terms of service"
      intro="These terms summarize the current booking flow and should be reviewed and completed before the service is made broadly available."
      sections={[
        { title: 'Booking requests', copy: 'Submitting the booking form creates a booking request with a pending status. Requests are subject to bike availability and confirmation by Rideo.' },
        { title: 'Pricing and payment', copy: 'The displayed estimate is calculated from the selected duration, rounded up to whole hours. Online payment is not available; payment is due at pickup.' },
        { title: 'Rider responsibilities', copy: 'You must provide accurate booking and identity details, hold a valid driving license, follow local traffic rules and use the bike responsibly. By booking, you agree to be responsible for damage to the bike.' },
        { title: 'Before riding', copy: 'Review the bike condition with Rideo at pickup and report any existing damage before starting the ride. Cancellation, refunds and other policies must be published by Rideo before broad production use.' },
      ]}
    />
  );
}
