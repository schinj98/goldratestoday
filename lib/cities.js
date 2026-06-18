export const CITIES = [
  { slug: 'delhi',      name: 'Delhi',      state: 'Delhi' },
  { slug: 'mumbai',     name: 'Mumbai',     state: 'Maharashtra' },
  { slug: 'bangalore',  name: 'Bangalore',  state: 'Karnataka' },
  { slug: 'chennai',    name: 'Chennai',    state: 'Tamil Nadu' },
  { slug: 'hyderabad',  name: 'Hyderabad',  state: 'Telangana' },
  { slug: 'kolkata',    name: 'Kolkata',    state: 'West Bengal' },
  { slug: 'pune',       name: 'Pune',       state: 'Maharashtra' },
  { slug: 'ahmedabad',  name: 'Ahmedabad',  state: 'Gujarat' },
  { slug: 'jaipur',     name: 'Jaipur',     state: 'Rajasthan' },
  { slug: 'lucknow',    name: 'Lucknow',    state: 'Uttar Pradesh' },
  { slug: 'chandigarh', name: 'Chandigarh', state: 'Punjab' },
  { slug: 'surat',      name: 'Surat',      state: 'Gujarat' },
  { slug: 'gurgaon',    name: 'Gurgaon',    state: 'Haryana' },
  { slug: 'noida',      name: 'Noida',      state: 'Uttar Pradesh' },
  { slug: 'faridabad',  name: 'Faridabad',  state: 'Haryana' },
];

export function getCityBySlug(slug) {
  return CITIES.find((c) => c.slug === slug?.toLowerCase()) || null;
}

export function getCityName(slug) {
  return getCityBySlug(slug)?.name || slug;
}
