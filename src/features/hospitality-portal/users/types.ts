import type { EntityType, RegistrationStatus } from "@/shared/content";

export type AdminUserRole = "user" | "admin";

export interface AdminUser {
  id: string;
  fullName: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  nin: string | null;
  dateOfBirth: string | null;
  role: AdminUserRole;
  emailVerified: boolean;
  establishmentCount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Minimal shape of an establishment owned by a user, as returned nested
 * inside `GET /admin/users/:id`.
 *
 * NOTE: this is the same `Establishment` the `entities` feature defines at
 * `src/features/hospitality-portal/entities/types.ts`. That file didn't
 * exist yet at the time this feature was built (a parallel effort owns it),
 * so this is a local, minimal stand-in covering only what the owned-
 * establishments sub-table needs. It should be unified with (i.e. replaced
 * by an import of) the entities feature's `Establishment` type once that
 * feature lands, so the two features agree on a single shape.
 */
export interface OwnedEstablishment {
  id: string;
  entityType: EntityType;
  businessName: string;
  uniqueBusinessId?: string | null;
  registrationStatus: RegistrationStatus;
  submittedAt: string | null;
  localGovernment: string | null;
  address?: string | null;
  businessPhoneNumber?: string | null;
}

export interface UserDetail extends AdminUser {
  establishments: OwnedEstablishment[];
  establishmentCount: number;
  establishmentsPagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
