import { BookingContent } from '../../../components/booking-content';

export default function BookingForBikePage({ params }: { params: { bikeId: string } }) {
  return <BookingContent bikeId={params.bikeId} />;
}
