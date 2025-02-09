interface JobListingDurationProps {
  days: number;
  price: number;
  description: string;
}

export const jobListingDurationPricing: JobListingDurationProps[] = [
  {
    days: 30,
    price: 99,
    description: 'Standard listing',
  },
  {
    days: 60,
    price: 149,
    description: 'Extended visibility',
  },
  {
    days: 90,
    price: 199,
    description: 'Premium exposure',
  },
];
