
export const ENTITY_TYPES = ['hotel', 'restaurant', 'bar', 'lounge', 'tour_operator', 'travel_agent', 'hospitality_org', 'other'] as const;

export const LOCAL_GOVERNMENTS = [
  'Abak', 'Eastern Obolo', 'Eket', 'Esit Eket', 'Essien Udim',
  'Etim Ekpo', 'Etinan', 'Ibeno', 'Ibesikpo Asutan', 'Ibiono Ibom',
  'Ika', 'Ikono', 'Ikot Abasi', 'Ikot Ekpene', 'Ini', 'Itu',
  'Mbo', 'Mkpat Enin', 'Nsit Atai', 'Nsit Ibom', 'Nsit Ubium',
  'Obot Akara', 'Okobo', 'Onna', 'Oron', 'Oruk Anam',
  'Udung Uko', 'Ukanafun', 'Uruan', 'Urue-Offong/Oruko', 'Uyo'
];

export const ENTITY_LABELS: Record<string, string> = {
  hotel: 'Hotel',
  bar: 'Bar',
  restaurant: 'Restaurant',
  lounge: 'Lounge',
  tour_operator: 'Tour Operator',
  travel_agent: 'Travel Agent',
  hospitality_org: 'Hospitality Organization',
  other: 'Other',
};

// Facility options for hotels
export const FACILITY_OPTIONS = [
  'Board room',
  'Conference hall',
  'Swimming pool',
  'Basketball court',
  'Table tennis court',
  'Lawn tennis court',
  'Internet cyber cafe',
];

// Service type options for restaurants, bars, lounges
export const SERVICE_TYPE_OPTIONS = [
  'Continental dishes',
  'Local/Nigerian dishes',
  'Inter-continental dishes',
  'Chinese',
  'Indian',
  'Italian',
  'Bakery/Pastries',
  'Fast food',
  'Seafood',
  'Grill/BBQ',
  'Cafe',
];

export const STORAGE_KEY = 'bulk_entity_registrations';

export const initialEntityState = {
  entityType: '',
  businessName: '',
  businessPhoneNumber: '',
  address: '',
  localGovernment: '',
  hasWebsite: false,
  website: '',
  yearEstablished: new Date().getFullYear(),
  contactName: '',
  contactPhoneNumber: '',
  contactEmail: '',
  businessEmail: '',
  // Hotel-specific fields
  roomCount: '',
  bedSpaces: '',
  facilities: [] as string[],
  facilitiesOther: '',
  // Restaurant/Bar/Lounge-specific fields
  seatingCapacity: '',
  serviceTypes: [] as string[],
  serviceTypesOther: '',
  // Tour operator/Travel agent/Hospitality org/Other fields
  description: '',
};