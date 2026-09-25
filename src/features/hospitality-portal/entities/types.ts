import type { EntityType, RegistrationStatus } from "@/shared/content";

export type { EntityType, RegistrationStatus };

/** The subset of registration statuses the backend accepts as a list filter
 * (Draft is always excluded server-side and never offered in the UI). */
export type FilterableRegistrationStatus = Exclude<RegistrationStatus, "Draft">;

export interface Branch {
  id: string;
  businessName: string | null;
  uniqueBusinessId: string | null;
  address: string;
  localGovernment: string;
  businessPhoneNumber: string;
  contactName: string;
  contactPhoneNumber: string;
  contactEmail: string;
  registrationStatus: RegistrationStatus;
}

export interface EstablishmentOwner {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
}

/** A branch's own parent, when this establishment IS a branch. A branch is
 * its own licensable entity (own id, own uniqueBusinessId, approved/rejected
 * independently) but a branch can never itself have branches. */
export interface EstablishmentParent {
  id: string;
  businessName: string | null;
  uniqueBusinessId: string | null;
}

export interface Establishment {
  id: string;
  ownerId: string | null;
  parentEstablishmentId: string | null;
  entityType: EntityType;
  businessName: string | null;
  uniqueBusinessId: string | null;
  businessPhoneNumber: string | null;
  phoneVerified: boolean;
  address: string | null;
  localGovernment: string | null;
  hasWebsite: boolean;
  website: string | null;
  yearEstablished: number | null;
  contactName: string | null;
  contactPhoneNumber: string | null;
  contactEmail: string | null;
  businessEmail: string | null;
  roomCount: number | null;
  bedSpaces: number | null;
  facilities: string[];
  seatingCapacity: number | null;
  serviceTypes: string[];
  registrationStatus: RegistrationStatus;
  submittedAt: string | null;
  approvedAt: string | null;
  approvedBy: string | null;
  rejectionReason: string | null;
  branches?: Branch[];
  parent?: EstablishmentParent | null;
  owner?: EstablishmentOwner | null;
  createdAt: string;
  updatedAt: string;
}

/** A single branch as submitted to the backend (register/bulk-add). */
export interface BranchInput {
  businessName?: string;
  address: string;
  localGovernment: string;
  businessPhoneNumber: string;
  contactName: string;
  contactPhoneNumber: string;
  contactEmail: string;
}

/** A single establishment as submitted to the backend (register/bulk-add). */
export interface EstablishmentInput {
  entityType: EntityType;
  businessName: string;
  businessPhoneNumber: string;
  address: string;
  localGovernment: string;
  hasWebsite: boolean;
  website?: string;
  yearEstablished: number;
  contactName: string;
  contactPhoneNumber: string;
  contactEmail: string;
  businessEmail: string;
  roomCount?: number;
  bedSpaces?: number;
  facilities: string[];
  seatingCapacity?: number;
  serviceTypes: string[];
  branches?: BranchInput[];
}

/** `PATCH /admin/establishments/:id` accepts any subset of the editable
 * fields — the server silently strips id/uniqueBusinessId/submittedAt/
 * approvedAt/approvedBy/registrationStatus/rejectionReason from whatever is
 * sent, so those are intentionally absent from this type. */
export type EstablishmentUpdatePayload = Partial<Omit<EstablishmentInput, "entityType">>;

/** Each item carries its own `entityType` — admin seeding is a mixed batch
 * of pre-existing records, not one form submission of a single type, so
 * unlike the owner-facing bulk-create there's no shared top-level type. */
export interface BulkAddPayload {
  establishments: EstablishmentInput[];
}

export interface BulkAddError {
  index: number;
  businessName: string;
  error: string;
}

export interface BulkAddResult {
  successful: number;
  failed: number;
  errors?: BulkAddError[];
  establishments: Establishment[];
}

export interface EstablishmentListParams {
  registrationStatus?: FilterableRegistrationStatus;
  entityType?: EntityType;
  search?: string;
  page?: number;
  limit?: number;
}
