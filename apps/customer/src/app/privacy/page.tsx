import { InfoPage } from '../../components/info-page';

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Rideo policies · privacy"
      title="Privacy at Rideo"
      intro="This summary describes information submitted by the current booking flow. Publish a complete, legally reviewed privacy notice before opening bookings broadly."
      sections={[
        { title: 'Information collected', copy: 'When you make a booking request, Rideo receives your account details, selected bike and trip times, pickup address, Aadhaar number, driving license number and your agreement to the damage responsibility terms.' },
        { title: 'How information is used', copy: 'The submitted details are stored with the booking and used to create, manage and display your booking. Payment is not collected in the app; payment is due at pickup.' },
        { title: 'Sensitive information', copy: 'Aadhaar and driving license numbers are sensitive personal information. Only submit them when you are ready to make a booking request. Rideo must publish verified retention, access and deletion practices before broad production use.' },
        { title: 'Your choices and support', copy: 'For access, correction or deletion requests, contact Rideo through its published support channel. A complete notice should identify applicable rights, service providers and data retention periods.' },
      ]}
    />
  );
}
