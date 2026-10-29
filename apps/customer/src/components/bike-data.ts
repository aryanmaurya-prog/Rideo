export type Bike = {
  id: string;
  name: string;
  category: string;
  city: string;
  hourlyRatePaise: number;
  rating: number;
  totalRides: number;
  description: string;
  registrationNumber: string;
  imageUrl: string;
};

// Photo URLs — from Unsplash
const PHOTOS = {
  activa6g: 'https://images.unsplash.com/photo-1716574400004-ba794161f8cd?w=600&auto=format&fit=crop&q=60',
  activa5g: 'https://images.unsplash.com/photo-1716574400004-ba794161f8cd?w=600&auto=format&fit=crop&q=60',
  jupiter: 'https://images.unsplash.com/photo-1716574400004-ba794161f8cd?w=600&auto=format&fit=crop&q=60',
  dio: 'https://images.unsplash.com/photo-1736079696431-41b38ff09e1d?w=600&auto=format&fit=crop&q=60',
  cbShine: 'https://images.unsplash.com/photo-1684607396581-e037c3a5984d?w=600&auto=format&fit=crop&q=60',
  splendor: 'https://images.unsplash.com/photo-1684607396581-e037c3a5984d?w=600&auto=format&fit=crop&q=60',
  reClassic: 'https://images.unsplash.com/photo-1721543724893-a62b3ffdf8c9?w=600&auto=format&fit=crop&q=60',
  reBullet350: 'https://images.unsplash.com/photo-1721543724893-a62b3ffdf8c9?w=600&auto=format&fit=crop&q=60',
  reBullet500: 'https://images.unsplash.com/photo-1622547918989-02ebc7a89eb0?w=600&auto=format&fit=crop&q=60',
  reHimalayan: 'https://images.unsplash.com/photo-1699972551272-e0eaee1916b2?w=600&auto=format&fit=crop&q=60',
  reMeteor: 'https://images.unsplash.com/photo-1680737035701-7f5546a80e0a?w=600&auto=format&fit=crop&q=60',
  avenger: 'https://images.unsplash.com/photo-1737698007984-b0323567f4cf?w=600&auto=format&fit=crop&q=60',
  apache160: 'https://images.unsplash.com/photo-1711435470785-4e1146a16dcc?w=600&auto=format&fit=crop&q=60',
  apacheRR310: 'https://images.unsplash.com/photo-1699386660666-cbf19f69a5ad?w=600&auto=format&fit=crop&q=60',
  pulsar150: 'https://images.unsplash.com/photo-1697683051660-01921a39bb62?w=1170&auto=format&fit=crop&q=80',
  pulsarNS200: 'https://images.unsplash.com/photo-1697683051660-01921a39bb62?w=1170&auto=format&fit=crop&q=80',
  dominar400: 'https://images.unsplash.com/photo-1644879796656-94f5d2bf1b95?w=600&auto=format&fit=crop&q=60',
  ather450X: 'https://images.unsplash.com/photo-1610267037736-abf3096c88fb?w=600&auto=format&fit=crop&q=60',
  ather450Plus: 'https://images.unsplash.com/photo-1610267037736-abf3096c88fb?w=600&auto=format&fit=crop&q=60',
  chetak: 'https://images.unsplash.com/photo-1610267037736-abf3096c88fb?w=600&auto=format&fit=crop&q=60',
};

export const featuredBikes: Bike[] = [
  // BANGALORE
  { id: 'activa-bangalore', name: 'Honda Activa 6G', category: 'Scooter', city: 'Bangalore', hourlyRatePaise: 8000, rating: 4.8, totalRides: 234, registrationNumber: 'KA-01-AB-1234', imageUrl: PHOTOS.activa6g, description: 'Easy-going city rides with plenty of room for your day.' },
  { id: 'classic-bangalore', name: 'Royal Enfield Classic 350', category: 'Cruiser', city: 'Bangalore', hourlyRatePaise: 18000, rating: 4.9, totalRides: 189, registrationNumber: 'KA-05-CD-5678', imageUrl: PHOTOS.reClassic, description: 'A relaxed classic for the long way home.' },
  { id: 'ather-bangalore', name: 'Ather 450X', category: 'EV', city: 'Bangalore', hourlyRatePaise: 12000, rating: 4.7, totalRides: 156, registrationNumber: 'KA-03-EF-9012', imageUrl: PHOTOS.ather450X, description: 'Quiet, quick and ready for a cleaner city commute.' },
  { id: 'apache-bangalore', name: 'TVS Apache RTR 160', category: 'Sports', city: 'Bangalore', hourlyRatePaise: 10000, rating: 4.6, totalRides: 142, registrationNumber: 'KA-02-GH-3456', imageUrl: PHOTOS.apache160, description: 'A nimble ride for taking the scenic route.' },
  { id: 'jupiter-bangalore', name: 'TVS Jupiter', category: 'Scooter', city: 'Bangalore', hourlyRatePaise: 7000, rating: 4.5, totalRides: 178, registrationNumber: 'KA-04-JK-7890', imageUrl: PHOTOS.jupiter, description: 'Smooth, stable and built for everyday city comfort.' },
  
  // MUMBAI
  { id: 'pulsar-mumbai', name: 'Bajaj Pulsar 150', category: 'Sports', city: 'Mumbai', hourlyRatePaise: 9000, rating: 4.5, totalRides: 198, registrationNumber: 'MH-02-IJ-7890', imageUrl: PHOTOS.pulsar150, description: 'A dependable pick for busy streets and open roads.' },
  { id: 'dio-mumbai', name: 'Honda Dio', category: 'Scooter', city: 'Mumbai', hourlyRatePaise: 7500, rating: 4.4, totalRides: 156, registrationNumber: 'MH-01-MN-6789', imageUrl: PHOTOS.dio, description: 'Light, practical and perfect for quick city hops.' },
  { id: 'himalayan-mumbai', name: 'Royal Enfield Himalayan', category: 'Cruiser', city: 'Mumbai', hourlyRatePaise: 20000, rating: 4.8, totalRides: 98, registrationNumber: 'MH-03-OP-2345', imageUrl: PHOTOS.reHimalayan, description: 'Built for adventure, ready for the long haul.' },
  
  // GOA
  { id: 'bullet-goa', name: 'Royal Enfield Bullet 350', category: 'Cruiser', city: 'Goa', hourlyRatePaise: 15000, rating: 4.9, totalRides: 267, registrationNumber: 'GA-03-KL-2345', imageUrl: PHOTOS.reBullet350, description: 'Take the coast at your own pace.' },
  { id: 'activa-goa', name: 'Honda Activa 5G', category: 'Scooter', city: 'Goa', hourlyRatePaise: 8000, rating: 4.6, totalRides: 234, registrationNumber: 'GA-01-QR-6789', imageUrl: PHOTOS.activa5g, description: 'Beach hopping made easy with this reliable scooter.' },
  { id: 'avenger-goa', name: 'Bajaj Avenger 220', category: 'Cruiser', city: 'Goa', hourlyRatePaise: 13000, rating: 4.7, totalRides: 145, registrationNumber: 'GA-02-ST-1234', imageUrl: PHOTOS.avenger, description: 'Cruise the coastline in comfort and style.' },
  
  // MANALI
  { id: 'himalayan-manali', name: 'Royal Enfield Himalayan', category: 'Cruiser', city: 'Manali', hourlyRatePaise: 22000, rating: 4.9, totalRides: 89, registrationNumber: 'HP-01-OP-1234', imageUrl: PHOTOS.reHimalayan, description: 'Built for mountain air and the roads beyond.' },
  { id: 'splendor-manali', name: 'Hero Splendor Plus', category: 'Scooter', city: 'Manali', hourlyRatePaise: 6500, rating: 4.4, totalRides: 167, registrationNumber: 'HP-02-UV-5678', imageUrl: PHOTOS.splendor, description: 'Reliable and fuel-efficient for hill rides.' },
  { id: 'dominar-manali', name: 'Bajaj Dominar 400', category: 'Sports', city: 'Manali', hourlyRatePaise: 18000, rating: 4.7, totalRides: 112, registrationNumber: 'HP-03-WX-9012', imageUrl: PHOTOS.dominar400, description: 'Power and stability for the winding mountain roads.' },
  
  // UDAIPUR
  { id: 'bullet-udaipur', name: 'Royal Enfield Bullet 500', category: 'Cruiser', city: 'Udaipur', hourlyRatePaise: 17000, rating: 4.8, totalRides: 134, registrationNumber: 'RJ-01-YZ-3456', imageUrl: PHOTOS.reBullet500, description: 'The classic thump through royal streets.' },
  { id: 'ns200-udaipur', name: 'Bajaj Pulsar NS200', category: 'Sports', city: 'Udaipur', hourlyRatePaise: 12000, rating: 4.6, totalRides: 98, registrationNumber: 'RJ-02-AB-7890', imageUrl: PHOTOS.pulsarNS200, description: 'Aggressive styling and quick acceleration.' },
  
  // PUNE
  { id: 'shine-pune', name: 'Honda CB Shine', category: 'Scooter', city: 'Pune', hourlyRatePaise: 7500, rating: 4.5, totalRides: 189, registrationNumber: 'MH-12-CD-1234', imageUrl: PHOTOS.cbShine, description: 'The go-to commuter for everyday rides.' },
  { id: 'meteor-pune', name: 'Royal Enfield Meteor 350', category: 'Cruiser', city: 'Pune', hourlyRatePaise: 16000, rating: 4.8, totalRides: 145, registrationNumber: 'MH-14-EF-5678', imageUrl: PHOTOS.reMeteor, description: 'Smooth cruiser for weekend getaways.' },
  { id: 'ather-pune', name: 'Ather 450 Plus', category: 'EV', city: 'Pune', hourlyRatePaise: 11000, rating: 4.6, totalRides: 167, registrationNumber: 'MH-12-GH-9012', imageUrl: PHOTOS.ather450Plus, description: 'Smart electric scooter for the modern commute.' },
  
  // HYDERABAD
  { id: 'chetak-hyderabad', name: 'Bajaj Chetak EV', category: 'EV', city: 'Hyderabad', hourlyRatePaise: 10000, rating: 4.5, totalRides: 123, registrationNumber: 'TS-01-IJ-3456', imageUrl: PHOTOS.chetak, description: 'Retro-styled electric with modern range.' },
  { id: 'apache-hyderabad', name: 'TVS Apache RR 310', category: 'Sports', city: 'Hyderabad', hourlyRatePaise: 19000, rating: 4.8, totalRides: 89, registrationNumber: 'TS-02-KL-7890', imageUrl: PHOTOS.apacheRR310, description: 'Track-inspired performance for the city rider.' },
  
  // RISHIKESH
  { id: 'classic-rishikesh', name: 'Royal Enfield Classic 350', category: 'Cruiser', city: 'Rishikesh', hourlyRatePaise: 16000, rating: 4.9, totalRides: 156, registrationNumber: 'UK-07-MN-1234', imageUrl: PHOTOS.reClassic, description: 'Perfect for mountain roads and riverside rides.' },
  { id: 'shine-rishikesh', name: 'Honda Shine', category: 'Scooter', city: 'Rishikesh', hourlyRatePaise: 7000, rating: 4.4, totalRides: 134, registrationNumber: 'UK-07-OP-5678', imageUrl: PHOTOS.cbShine, description: 'Practical and reliable for everyday exploration.' },
];

export function formatRupees(paise: number): string {
  return `₹${(paise / 100).toLocaleString('en-IN')}`;
}
