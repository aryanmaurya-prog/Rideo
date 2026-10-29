import { InfoPage } from '../../components/info-page';

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="The Rideo story"
      title="A little more freedom, on two wheels."
      intro="Rideo makes it easier to find a ride for the everyday, the unplanned and everything in between."
      sections={[
        { title: 'Made for city life', copy: 'Quick errands, daily commutes and last-minute plans are all better when you can move on your own time.' },
        { title: 'Room for the long way', copy: 'A new city or an open road can change the whole trip. Find the ride that helps you take it in.' },
        { title: 'Simple by design', copy: 'We are building a clear, friendly way to discover two-wheelers and plan a ride.' },
        { title: 'Built for India', copy: 'From Bengaluru traffic to a coastal detour in Goa, Rideo is designed around the way India gets out and about.' },
      ]}
    />
  );
}
