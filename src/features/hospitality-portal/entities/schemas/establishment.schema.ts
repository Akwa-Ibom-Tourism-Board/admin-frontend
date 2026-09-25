import { z } from "zod";
import { LOCAL_GOVERNMENTS, ENTITY_TYPES, HOTEL_LIKE_TYPES, DINING_LIKE_TYPES } from "@/shared/content";
import type { EntityType } from "../types";

const NIGERIAN_PHONE_REGEX = /^(0[789][01]\d{8}|234[789][01]\d{8})$/;

export const branchSchema = z.object({
  businessName: z.string().trim().optional(),
  address: z.string().trim().min(1, "Branch address is required").max(500),
  localGovernment: z.enum(LOCAL_GOVERNMENTS, { errorMap: () => ({ message: "Select a local government" }) }),
  businessPhoneNumber: z
    .string()
    .regex(NIGERIAN_PHONE_REGEX, "Invalid Nigerian phone number. Format: 0803XXXXXXX or 234803XXXXXXX"),
  contactName: z.string().trim().min(1, "Branch contact name is required").max(100),
  contactPhoneNumber: z.string().regex(NIGERIAN_PHONE_REGEX, "Invalid Nigerian phone number"),
  contactEmail: z.string().trim().email("Enter a valid email address"),
});

const baseEstablishmentSchema = z.object({
  entityType: z.enum(ENTITY_TYPES),
  businessName: z.string().trim().min(2, "Business name is required").max(200),
  businessPhoneNumber: z
    .string()
    .regex(NIGERIAN_PHONE_REGEX, "Invalid Nigerian phone number. Format: 0803XXXXXXX or 234803XXXXXXX"),
  address: z.string().trim().min(4, "Full business address is required").max(500),
  localGovernment: z.enum(LOCAL_GOVERNMENTS, { errorMap: () => ({ message: "Select a local government" }) }),
  hasWebsite: z.boolean().default(false),
  website: z.string().trim().optional().or(z.literal("")),
  yearEstablished: z.coerce
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  contactName: z.string().trim().min(2, "Contact name is required").max(100),
  contactPhoneNumber: z.string().regex(NIGERIAN_PHONE_REGEX, "Invalid Nigerian phone number"),
  contactEmail: z.string().trim().email("Enter a valid contact email address"),
  businessEmail: z.string().trim().email("Enter a valid business email address"),
  roomCount: z.coerce.number().int().min(1).optional(),
  bedSpaces: z.coerce.number().int().min(1).optional(),
  facilities: z.array(z.string()).default([]),
  seatingCapacity: z.coerce.number().int().min(1).optional(),
  serviceTypes: z.array(z.string()).default([]),
  branches: z.array(branchSchema).optional(),
});

export const establishmentSchema = baseEstablishmentSchema.superRefine((data, ctx) => {
  if (HOTEL_LIKE_TYPES.includes(data.entityType)) {
    if (!data.roomCount) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Room count is required for hotels", path: ["roomCount"] });
    }
    if (!data.bedSpaces) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Bed spaces is required for hotels", path: ["bedSpaces"] });
    }
  }
  if (DINING_LIKE_TYPES.includes(data.entityType) && !data.seatingCapacity) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Seating capacity is required for restaurants, bars, and lounges",
      path: ["seatingCapacity"],
    });
  }
  if (data.hasWebsite && !data.website) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Website URL is required when you have a website",
      path: ["website"],
    });
  }
});

export type BranchFormValues = z.infer<typeof branchSchema>;
export type EstablishmentFormValues = z.infer<typeof establishmentSchema>;

// No shared top-level entityType — admin seeding is a mixed batch, each
// establishment carries its own type (validated per-item above).
export const bulkEstablishmentsSchema = z.object({
  establishments: z.array(establishmentSchema).min(1, "Add at least one establishment"),
});

export type BulkEstablishmentsFormValues = z.infer<typeof bulkEstablishmentsSchema>;

/** Default values for a freshly-added branch row. Cast through `unknown`
 * since the schema's literal-union fields (e.g. `localGovernment`) can't be
 * defaulted to an empty string without a broader type. */
export const createEmptyBranch = (): BranchFormValues =>
  ({
    businessName: "",
    address: "",
    localGovernment: "",
    businessPhoneNumber: "",
    contactName: "",
    contactPhoneNumber: "",
    contactEmail: "",
  }) as unknown as BranchFormValues;

/** Default values for a freshly-added establishment row, locked to the
 * batch's chosen entity type. */
export const createEmptyEstablishment = (entityType: EntityType): EstablishmentFormValues =>
  ({
    entityType,
    businessName: "",
    businessPhoneNumber: "",
    address: "",
    localGovernment: "",
    hasWebsite: false,
    website: "",
    yearEstablished: new Date().getFullYear(),
    contactName: "",
    contactPhoneNumber: "",
    contactEmail: "",
    businessEmail: "",
    roomCount: undefined,
    bedSpaces: undefined,
    facilities: [],
    seatingCapacity: undefined,
    serviceTypes: [],
    branches: [],
  }) as unknown as EstablishmentFormValues;
