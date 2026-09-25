export const ENTITY_TYPES = [
  "hotel",
  "restaurant",
  "bar",
  "lounge",
  "tour_operator",
  "travel_agent",
  "hospitality_org",
  "other",
] as const;

export type EntityType = (typeof ENTITY_TYPES)[number];

export const ENTITY_TYPE_LABELS: Record<EntityType, string> = {
  hotel: "Hotel",
  restaurant: "Restaurant",
  bar: "Bar",
  lounge: "Lounge",
  tour_operator: "Tour Operator",
  travel_agent: "Travel Agent",
  hospitality_org: "Hospitality Organization",
  other: "Other",
};

export const HOTEL_LIKE_TYPES: EntityType[] = ["hotel"];
export const DINING_LIKE_TYPES: EntityType[] = ["restaurant", "lounge", "bar"];

export const REGISTRATION_STATUSES = ["Pending", "Approved", "Rejected", "Draft"] as const;
export type RegistrationStatus = (typeof REGISTRATION_STATUSES)[number];
